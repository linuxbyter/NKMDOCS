import { NextRequest, NextResponse } from "next/server";
import { createOrder, updateOrderStatus } from "@/lib/db";
import { sendOrderConfirmation } from "@/lib/email";
import { getDocumentBySlug } from "@/data/documents";

// M-Pesa Daraja API Configuration
const MPESA_CONFIG = {
  consumerKey: process.env.MPESA_CONSUMER_KEY || "",
  consumerSecret: process.env.MPESA_CONSUMER_SECRET || "",
  shortCode: process.env.MPESA_SHORTCODE || "",
  passkey: process.env.MPESA_PASSKEY || "",
  callbackUrl: process.env.MPESA_CALLBACK_URL || "",
  environment: process.env.MPESA_ENVIRONMENT || "sandbox",
};

const getBaseUrl = () =>
  MPESA_CONFIG.environment === "production"
    ? "https://api.safaricom.co.ke"
    : "https://sandbox.safaricom.co.ke";

async function getAccessToken(): Promise<string> {
  const auth = Buffer.from(
    `${MPESA_CONFIG.consumerKey}:${MPESA_CONFIG.consumerSecret}`
  ).toString("base64");

  const response = await fetch(
    `${getBaseUrl()}/oauth/v1/generate?grant_type=client_credentials`,
    { headers: { Authorization: `Basic ${auth}` } }
  );

  const data = await response.json();
  return data.access_token;
}

function getTimestamp(): string {
  const now = new Date();
  return [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
    String(now.getHours()).padStart(2, "0"),
    String(now.getMinutes()).padStart(2, "0"),
    String(now.getSeconds()).padStart(2, "0"),
  ].join("");
}

function generatePassword(timestamp: string): string {
  const data = `${MPESA_CONFIG.shortCode}${MPESA_CONFIG.passkey}${timestamp}`;
  return Buffer.from(data).toString("base64");
}

function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `NKM-${timestamp}-${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phoneNumber, amount, documentSlug, documentName, customerName, customerEmail, reviewRequested } = body;

    if (!phoneNumber || !amount || !documentSlug || !customerName || !customerEmail) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const orderId = generateOrderId();

    // Format phone number
    const formattedPhone = phoneNumber.replace(/[^0-9]/g, "");
    const phone = formattedPhone.startsWith("254")
      ? formattedPhone
      : formattedPhone.startsWith("0")
      ? `254${formattedPhone.slice(1)}`
      : `254${formattedPhone}`;

    // Save order to Neon
    const order = await createOrder({
      id: orderId,
      documentSlug,
      documentName,
      answers: body.answers || {},
      customerName,
      customerEmail,
      customerPhone: phoneNumber,
      amount,
      reviewRequested: reviewRequested || false,
      paymentMethod: "mpesa",
    });

    // Sandbox mode - simulate payment
    if (MPESA_CONFIG.environment === "sandbox" && !MPESA_CONFIG.consumerKey) {
      const simulatedRequestId = `ws_CO_${Date.now()}_${Math.random().toString(36).substring(7)}`;

      // Update order status
      await updateOrderStatus(orderId, "paid");

      // Send confirmation email
      await sendOrderConfirmation({
        to: customerEmail,
        customerName,
        orderId,
        documentName,
        downloadUrl: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/download/${orderId}`,
        reviewRequested: reviewRequested || false,
      });

      return NextResponse.json({
        success: true,
        orderId,
        checkoutRequestId: simulatedRequestId,
        message: "Payment confirmed (sandbox mode). Confirmation email sent.",
      });
    }

    // Production: Initiate real STK push
    const accessToken = await getAccessToken();
    const timestamp = getTimestamp();
    const password = generatePassword(timestamp);

    const stkPushPayload = {
      BusinessShortCode: MPESA_CONFIG.shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: MPESA_CONFIG.shortCode,
      PhoneNumber: phone,
      CallBackURL: `${MPESA_CONFIG.callbackUrl}/api/payment/mpesa/callback`,
      AccountReference: orderId,
      TransactionDesc: `Payment for ${documentName} - Order ${orderId}`,
    };

    const response = await fetch(`${getBaseUrl()}/mpesa/stkpush/v1/processrequest`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stkPushPayload),
    });

    const data = await response.json();

    if (data.ResponseCode === "0") {
      // Update order with payment reference
      await updateOrderStatus(orderId, "paid", undefined);

      return NextResponse.json({
        success: true,
        orderId,
        checkoutRequestId: data.CheckoutRequestID,
        message: "STK push sent. Please check your phone to complete payment.",
      });
    } else {
      await updateOrderStatus(orderId, "payment_failed");
      return NextResponse.json(
        { success: false, message: data.CustomerMessage || "Payment initiation failed." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("M-Pesa payment error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
