import { NextRequest, NextResponse } from "next/server";
import { updateOrderStatus, getOrderByPaymentRef } from "@/lib/db";
import { sendOrderConfirmation } from "@/lib/email";

// M-Pesa Daraja callback for STK push results
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { Body } = body;

    if (!Body) {
      return NextResponse.json({ ResultCode: 0, ResultDesc: "Success" });
    }

    const { stkCallback } = Body;

    if (stkCallback) {
      const { ResultCode, ResultDesc, MerchantRequestID, CheckoutRequestID } = stkCallback;

      if (ResultCode === 0) {
        // Payment successful
        const callbackMetadata = stkCallback.CallbackMetadata?.Item || [];
        const amount = callbackMetadata.find((i: { Name: string }) => i.Name === "Amount")?.Value;
        const mpesaReceiptNumber = callbackMetadata.find((i: { Name: string }) => i.Name === "MpesaReceiptNumber")?.Value;

        // Find and update order
        const order = await getOrderByPaymentRef(CheckoutRequestID);
        if (order) {
          await updateOrderStatus(order.id, "paid");

          // Send confirmation email
          const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
          await sendOrderConfirmation({
            to: order.customer_email,
            customerName: order.customer_name,
            orderId: order.id,
            documentName: order.document_name,
            downloadUrl: `${appUrl}/api/download/${order.id}`,
            reviewRequested: order.review_requested,
          });
        }
      } else {
        // Payment failed or cancelled
        const order = await getOrderByPaymentRef(CheckoutRequestID);
        if (order) {
          await updateOrderStatus(order.id, "payment_failed");
        }
        console.log("Payment failed:", { resultCode: ResultCode, resultDesc: ResultDesc });
      }
    }

    return NextResponse.json({ ResultCode: 0, ResultDesc: "Success" });
  } catch (error) {
    console.error("M-Pesa callback error:", error);
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Success" });
  }
}
