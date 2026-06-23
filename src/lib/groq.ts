import Groq from "groq-sdk";
import { getDocumentBySlug } from "@/data/documents";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
});

const MODEL = "llama-3.3-70b-versatile";

function buildSystemPrompt(slug: string, tone: string): string {
  const doc = getDocumentBySlug(slug);
  if (!doc) return "";

  const toneGuide: Record<string, string> = {
    formal: "Use formal legal language with proper recitals, 'whereas' clauses, and precise terminology. Maintain a professional, authoritative tone throughout.",
    simple: "Use plain, clear language that is easy to understand. Avoid legalese. Keep the document accessible while remaining legally valid.",
    firm: "Use strong, assertive language. Make demands clear and unambiguous. Include warnings about consequences firmly but professionally.",
    casual: "Use a friendly but professional tone. Keep it straightforward and approachable while maintaining legal validity.",
  };

  const toneDesc = toneGuide[tone] || toneGuide.formal;

  const sections = doc.whatInside?.map((s) => `- ${s}`).join("\n") || "";
  const features = doc.features?.map((f) => `- ${f}`).join("\n") || "";
  const vars = doc.templateVariables?.map((v) => `- {{${v}}}`).join("\n") || "";

  return `You are a legal document drafting assistant. Your task is to generate a complete, ready-to-use legal document.

DOCUMENT TYPE: ${doc.name}
${doc.longDescription ? `DESCRIPTION: ${doc.longDescription}` : ""}

TONE: ${toneDesc}

DOCUMENT STRUCTURE - Include these sections:
${sections}

KEY FEATURES (ensure these are reflected):
${features}

VARIABLES TO INCORPORATE:
${vars}

FORMAT REQUIREMENTS:
- Output the complete document as plain text with clear section headings
- Use proper legal formatting with numbered clauses
- Include a title at the top
- Add signature lines at the bottom for all relevant parties
- Use "[DATE]" for the date field
- Placeholder values in the format: [description] where user input is missing
- Include a disclaimer: "This document is a template and does not constitute legal advice. For complex matters, please consult a qualified legal professional."
- Do NOT include any meta-commentary, only the document text itself
- Do not wrap the output in markdown code blocks`;
}

function buildUserPrompt(answers: Record<string, unknown>, tone: string): string {
  const formattedAnswers = Object.entries(answers)
    .filter(([_, v]) => v !== undefined && v !== null && v !== "")
    .map(([key, value]) => {
      const formatted = typeof value === "object" ? JSON.stringify(value) : String(value);
      return `- ${key}: ${formatted}`;
    })
    .join("\n");

  return `Generate the document with a "${tone}" tone using the following user-provided answers:

${formattedAnswers}

If any required field is missing from the answers above, use a reasonable default or placeholder like [missing field description]. Do NOT make up specific names, amounts, or dates — use placeholders for missing values.

The document should be complete and ready for the user to review and sign.`;
}

export async function generateDocumentWithGroq(
  slug: string,
  answers: Record<string, unknown>,
  tone: string
): Promise<string> {
  const systemPrompt = buildSystemPrompt(slug, tone);
  const userPrompt = buildUserPrompt(answers, tone);

  const completion = await groq.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    model: MODEL,
    temperature: 0.3,
    max_tokens: 8192,
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("Groq returned empty response");
  }

  return content;
}
