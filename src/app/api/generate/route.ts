import { NextRequest, NextResponse } from "next/server";
import { getDocumentBySlug } from "@/data/documents";
import { generateDocumentWithGroq } from "@/lib/groq";
import { updateOrderStatus } from "@/lib/db";
import fs from "fs";
import path from "path";
import PizZip from "pizzip";

function createDocxFromText(text: string): Buffer {
  const zip = new PizZip();

  // Content Types
  zip.file("[Content_Types].xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
</Types>`);

  // Relationships
  zip.file("_rels/.rels", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`);

  zip.file("word/_rels/document.xml.rels", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`);

  // Styles
  zip.file("word/styles.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:style w:type="paragraph" w:styleId="Normal">
    <w:name w:val="Normal"/>
    <w:pPr><w:spacing w:after="200" w:line="276" w:lineRule="auto"/></w:pPr>
    <w:rPr><w:sz w:val="22"/><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Title">
    <w:name w:val="Title"/>
    <w:pPr><w:jc w:val="center"/><w:spacing w:after="400"/></w:pPr>
    <w:rPr><w:b/><w:sz w:val="32"/><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading1">
    <w:name w:val="heading 1"/>
    <w:pPr><w:spacing w:before="360" w:after="200"/></w:pPr>
    <w:rPr><w:b/><w:sz w:val="26"/><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/></w:rPr>
  </w:style>
</w:styles>`);

  // Escape XML special chars
  function escapeXml(s: string): string {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  }

  // Build document XML with proper formatting
  const lines = text.split("\n");
  let bodyXml = "";
  let inList = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      bodyXml += `<w:p><w:pPr><w:spacing w:after="200"/></w:pPr></w:p>`;
      continue;
    }

    const isTitle = trimmed === trimmed.toUpperCase() && trimmed.length > 5 && !trimmed.startsWith("-");
    const isHeading = trimmed.endsWith(":") && trimmed.length < 80 || trimmed.match(/^\d+[\.\)]/) && trimmed.length < 80;
    const isListItem = trimmed.startsWith("- ") || trimmed.startsWith("• ");

    if (isListItem && !inList) {
      inList = true;
      bodyXml += `<w:p><w:pPr><w:spacing w:after="120"/><w:ind w:left="720"/></w:pPr><w:r><w:t>${escapeXml(trimmed)}</w:t></w:r></w:p>`;
    } else if (!isListItem && inList) {
      inList = false;
      bodyXml += `<w:p><w:pPr><w:spacing w:after="200"/></w:pPr></w:p>`;
      bodyXml += `<w:p><w:pPr><w:spacing w:after="200"/></w:pPr><w:r><w:t>${escapeXml(trimmed)}</w:t></w:r></w:p>`;
    } else {
      const style = isTitle ? "Title" : isHeading ? "Heading1" : "Normal";
      bodyXml += `<w:p><w:pPr><w:pStyle w:val="${style}"/></w:pPr><w:r><w:t>${escapeXml(trimmed)}</w:t></w:r></w:p>`;
    }
  }

  zip.file("word/document.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>${bodyXml}</w:body>
</w:document>`);

  return zip.generate({ type: "nodebuffer", mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, answers, orderId, tone = "formal" } = body;

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

    // Generate document content using Groq AI
    const documentText = await generateDocumentWithGroq(slug, answers, tone);

    // Create .docx from generated text
    const docxBuffer = createDocxFromText(documentText);

    // Save generated document
    const outputDir = path.join(process.cwd(), "generated");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, `${orderId}.docx`);
    fs.writeFileSync(outputPath, docxBuffer);

    const downloadUrl = `/api/download/${orderId}`;

    // Update order with download URL
    await updateOrderStatus(orderId, "ready", downloadUrl);

    return NextResponse.json({
      success: true,
      orderId,
      downloadUrl,
      message: "Document generated successfully using AI",
    });
  } catch (error) {
    console.error("Document generation error:", error);
    const message = error instanceof Error ? error.message : "Failed to generate document";
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}
