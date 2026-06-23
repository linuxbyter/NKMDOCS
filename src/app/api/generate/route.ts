import { NextRequest, NextResponse } from "next/server";
import { getDocumentBySlug } from "@/data/documents";
import { updateOrderStatus } from "@/lib/db";
import fs from "fs";
import path from "path";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, answers, orderId, tone } = body;

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

    if (fs.existsSync(templatePath)) {
      const content = fs.readFileSync(templatePath, "binary");
      const zip = new PizZip(content);
      const docx = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
        delimiters: { start: "{{", end: "}}" },
        nullGetter: () => "",
      });

      docx.setData(answers);
      docx.render();

      const generated = docx.getZip().generate({
        type: "nodebuffer",
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      const outputDir = path.join(process.cwd(), "generated");
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      fs.writeFileSync(path.join(outputDir, `${orderId}.docx`), generated);

      await updateOrderStatus(orderId, "ready", `/api/download/${orderId}`);

      return NextResponse.json({
        success: true,
        orderId,
        downloadUrl: `/api/download/${orderId}`,
        message: "Document generated successfully",
      });
    }

    // Fallback: generate text summary if no template exists
    const lines = [`${doc.name.toUpperCase()}`, ""];
    for (const q of doc.questions) {
      const val = answers[q.id];
      if (val !== undefined && val !== "") {
        lines.push(`${q.label}: ${String(val)}`);
      }
    }
    lines.push("");
    lines.push("This is a template document, not legal advice.");
    lines.push("For complex matters, please consult a qualified legal professional.");

    const outputDir = path.join(process.cwd(), "generated");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    fs.writeFileSync(path.join(outputDir, `${orderId}.txt`), lines.join("\n"));

    await updateOrderStatus(orderId, "ready", `/api/download/${orderId}`);

    return NextResponse.json({
      success: true,
      orderId,
      downloadUrl: `/api/download/${orderId}`,
      message: "Document generated (text format)",
    });
  } catch (error) {
    console.error("Document generation error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to generate document" },
      { status: 500 }
    );
  }
}
