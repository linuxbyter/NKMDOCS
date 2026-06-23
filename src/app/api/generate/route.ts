import { NextRequest, NextResponse } from "next/server";
import { getDocumentBySlug } from "@/data/documents";

// Document generation API
// In production, this would use docxtemplater or Carbone to merge answers into .docx templates
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, answers, orderId } = body;

    if (!slug || !answers || !orderId) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const doc = getDocumentBySlug(slug);
    if (!doc) {
      return NextResponse.json(
        { success: false, message: "Document template not found" },
        { status: 404 }
      );
    }

    // TODO: In production, use docxtemplater to generate the document
    // This is a placeholder for the actual template engine integration

    /*
    const Docxtemplater = require("docxtemplater");
    const fs = require("fs");
    const path = require("path");

    // Load the template
    const templatePath = path.join(process.cwd(), "templates", `${slug}.docx`);
    const content = fs.readFileSync(templatePath, "binary");

    const doc = new Docxtemplater();
    doc.loadZip(content);
    doc.setData(answers);
    doc.render();

    const generatedDoc = doc.getZip().generate({ type: "nodebuffer" });

    // Save to storage and get download URL
    // Upload to Supabase Storage / S3
    */

    // Simulated response for demo
    const downloadUrl = `/api/download/${orderId}`;

    // TODO: Send email with download link
    // Using Resend or Brevo

    return NextResponse.json({
      success: true,
      orderId,
      downloadUrl,
      message: "Document generated successfully",
    });
  } catch (error) {
    console.error("Document generation error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to generate document" },
      { status: 500 }
    );
  }
}
