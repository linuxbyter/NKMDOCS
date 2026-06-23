import { NextRequest, NextResponse } from "next/server";
import { getDocumentBySlug } from "@/data/documents";
import fs from "fs";
import path from "path";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";

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

    const templatePath = path.join(process.cwd(), "templates", `${slug}.docx`);

    // Check if template exists on disk
    if (!fs.existsSync(templatePath)) {
      return NextResponse.json(
        {
          success: true,
          orderId,
          downloadUrl: `/api/download/${orderId}`,
          message: "Template not yet available on disk. Placeholder generated.",
          details: `Place the ${slug}.docx template in /templates/ to enable real generation.`,
        }
      );
    }

    const content = fs.readFileSync(templatePath, "binary");
    const zip = new PizZip(content);
    const docx = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // Merge answers into template fields
    docx.setData(answers);
    docx.render();

    const generated = docx.getZip().generate({
      type: "nodebuffer",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    // Save generated document
    const outputDir = path.join(process.cwd(), "generated");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, `${orderId}.docx`);
    fs.writeFileSync(outputPath, generated);

    const downloadUrl = `/api/download/${orderId}`;

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
