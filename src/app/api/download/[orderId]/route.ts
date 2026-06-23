import { NextRequest, NextResponse } from "next/server";
import { getOrderById, updateOrderStatus } from "@/lib/db";

// Document download endpoint
// In production, this would serve the generated .docx from storage
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;

    const order = await getOrderById(orderId);

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    if (order.status !== "paid" && order.status !== "ready") {
      return NextResponse.json(
        { success: false, message: "Document not ready yet" },
        { status: 400 }
      );
    }

    // TODO: In production, serve the actual generated .docx file
    // For now, return a placeholder response
    // The actual file would be stored in Supabase Storage / S3 / local storage

    /*
    // Production implementation:
    const filePath = path.join(process.cwd(), "generated", `${orderId}.docx`);
    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${order.document_name.replace(/\s+/g, "_")}.docx"`,
      },
    });
    */

    // Placeholder: generate a simple text file as demo
    const content = `
LEGALDOCSKE - GENERATED DOCUMENT
===================================

Document: ${order.document_name}
Order ID: ${order.id}
Generated: ${new Date().toISOString()}

This is a placeholder document.
In production, this would be the actual customized legal document
generated from your answers using docxtemplater.

Answers provided:
${JSON.stringify(order.answers, null, 2)}
`;

    await updateOrderStatus(orderId, "delivered");

    return new NextResponse(content, {
      headers: {
        "Content-Type": "text/plain",
        "Content-Disposition": `attachment; filename="${order.document_name.replace(/\s+/g, "_")}.txt"`,
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      { success: false, message: "Download failed" },
      { status: 500 }
    );
  }
}
