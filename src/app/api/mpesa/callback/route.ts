import { NextRequest, NextResponse } from "next/server";
import { updateOrderStatus, getOrderByPaymentRef, getOrderById } from "@/lib/db";
import { sendOrderConfirmation } from "@/lib/email";

async function triggerDocumentGeneration(slug: string, answers: Record<string, unknown>, orderId: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  try {
    await fetch(`${appUrl}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, answers, orderId, tone: "formal" }),
    });
  } catch (err) {
    console.error("Document generation trigger failed:", err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { Body } = body;

    if (!Body) {
      return NextResponse.json({ ResultCode: 0, ResultDesc: "Success" });
    }

    const { stkCallback } = Body;

    if (stkCallback) {
      const { ResultCode, CheckoutRequestID } = stkCallback;

      // Find order by payment reference
      const order = await getOrderByPaymentRef(CheckoutRequestID);

      if (ResultCode === 0) {
        if (order) {
          await updateOrderStatus(order.id, "paid");

          // Trigger document generation
          await triggerDocumentGeneration(order.document_slug, order.answers || {}, order.id);

          // Send confirmation email (non-blocking)
          const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
          sendOrderConfirmation({
            to: order.customer_email,
            customerName: order.customer_name,
            orderId: order.id,
            documentName: order.document_name,
            downloadUrl: `${appUrl}/api/download/${order.id}`,
            reviewRequested: order.review_requested,
          }).catch((err) => console.error("Failed to send callback email:", err));
        }
      } else {
        if (order) {
          await updateOrderStatus(order.id, "payment_failed");
        }
      }
    }

    return NextResponse.json({ ResultCode: 0, ResultDesc: "Success" });
  } catch (error) {
    console.error("M-Pesa callback error:", error);
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Success" });
  }
}
