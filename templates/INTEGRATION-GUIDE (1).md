# LegalDocsKE — Template Integration Guide
## For the OpenCode IDE Agent

This package contains **18 advocate-pre-approved document templates** (`.docx`) using docxtemplater syntax, plus the catalogue data file. Here is exactly how to wire them into the LegalDocsKE Next.js app.

---

## ⚠️ READ FIRST — LEGAL GATE

These templates were drafted to be **structurally complete and engine-ready**, with competent generic Kenyan-law clause language. They are **NOT yet advocate-vetted for sale**. Before any document goes live:

- A qualified Kenyan advocate MUST review each `.docx` clause-by-clause.
- High-risk documents especially: **Last Will** (Law of Succession Act execution/attestation), **Power of Attorney** (registration/notarisation), **Land Sale** (Land Act, LCB consent, RDA forms), **Shareholders/Board** (Companies Act 2015), **Employment** (Employment Act statutory minimums).
- The engine treats the `.docx` as the source of truth. Fix legal substance in the `.docx`, never in code.

Do not enable a document in the live catalogue until its template has passed advocate review.

---

## 1. WHAT'S IN THIS PACKAGE

```
templates/                       ← 18 docxtemplater .docx files
  tenancy-agreement.docx
  demand-letter.docx
  non-disclosure-agreement.docx
  commercial-lease.docx
  land-sale-agreement.docx
  loan-agreement.docx
  guarantor-agreement.docx
  service-agreement.docx
  partnership-agreement.docx
  sale-of-goods.docx
  employment-contract.docx
  independent-contractor.docx
  internship-agreement.docx
  last-will.docx
  power-of-attorney.docx
  board-resolution.docx
  shareholders-agreement.docx
  consent-letter.docx
documents.ts                     ← catalogue + Q&A schema (3 fully populated, 15 stubbed)
TEMPLATE-FIELD-REFERENCE.md      ← every merge field per document (fill the 15 stubs from here)
INTEGRATION-GUIDE.md             ← this file
```

Place `templates/` at the project root (or `/public` is NOT correct — keep templates server-side, never publicly downloadable). Put `documents.ts` in `data/`.

---

## 2. TEMPLATE SYNTAX USED

- Single field: `{{field_name}}`
- Conditional/optional clause (renders only when the boolean is true):
  `{{#has_pet_clause}} ...clause text... {{/has_pet_clause}}`
- Inverted (renders when false/absent): `{{^has_lawyer}} ...creditor signs... {{/has_lawyer}}`
- Delimiters are **`{{ }}`** (not the docxtemplater default `{ }`) — you MUST configure this (see §4).

---

## 3. INSTALL

```bash
npm install docxtemplater pizzip
# for PDF output (server) you'll also want libreoffice on the host, or a PDF lib:
# carbone, or libreoffice-convert, or a hosted conversion step
```

---

## 4. THE GENERATION ENDPOINT (server-side only, after payment)

```ts
// app/api/generate/route.ts
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import fs from "node:fs";
import path from "node:path";
import { getDocument } from "@/data/documents";

export async function POST(req: Request) {
  const { slug, answers, orderId } = await req.json();

  // 1. Confirm the order is PAID before generating (never trust the client)
  //    const order = await db.order.findUnique({ where: { id: orderId } });
  //    if (order?.status !== "paid") return new Response("Unpaid", { status: 402 });

  const docMeta = getDocument(slug);
  if (!docMeta) return new Response("Unknown document", { status: 404 });

  // 2. Load the advocate-vetted template
  const tplPath = path.join(process.cwd(), "templates", `${slug}.docx`);
  const content = fs.readFileSync(tplPath, "binary");
  const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    delimiters: { start: "{{", end: "}}" }, // CRITICAL — templates use {{ }}
    nullGetter: () => "",                    // blank for any unanswered optional field
  });

  // 3. Merge. Booleans drive the {{#conditional}} clauses; everything else fills slots.
  doc.render(answers);

  const buf = doc.getZip().generate({ type: "nodebuffer" });

  // 4. (Optional) convert to PDF here, then store both .docx and .pdf
  //    and return a signed, expiring download URL. Do NOT return the file inline
  //    until payment is confirmed.

  return new Response(buf, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="${slug}.docx"`,
    },
  });
}
```

**Answer shape:** `answers` is a flat object keyed by question `id`. Booleans must be real booleans (`true`/`false`), not the strings `"true"/"false"`, or the `{{#conditional}}` blocks won't toggle correctly. Coerce in the wizard before submitting.

---

## 5. THE Q&A WIZARD

Drive it from `documents.ts`:

```ts
const doc = getDocument(slug);
doc.questions.forEach(question => {
  // render an input by question.type
  // if question.conditionalOn is set, only show when answers[question.conditionalOn] === true
});
```

- `type: "boolean"` → toggle/checkbox. These are the clause switches.
- `conditionalOn` → hide the field unless its parent boolean is true (e.g. `pet_description` only shows if `has_pet_clause` is on).
- Validate required fields before allowing checkout.
- Coerce numbers and booleans to their real types before calling `/api/generate`.

### "Other" / custom selections MUST require elaboration

Any `select` whose chosen value is open-ended (`"other"`, `"custom"`, or anything in the question's `elaborateOn` list — default `["other","custom"]`) must reveal a **required** free-text box. The user cannot proceed until they describe what they mean. This matters because a bare `"other"` merged into a legal clause is meaningless and could invalidate the document.

Behavior to implement in the wizard:

```ts
function selectNeedsElaboration(question: Question, value: string): boolean {
  const triggers = question.elaborateOn ?? ["other", "custom"];
  return question.type === "select" && triggers.includes(value);
}

// When true:
//  - show a required textarea (label e.g. "Please describe")
//  - block "Next"/checkout until it is non-empty
//  - store it under question.elaborateFieldId ?? `${question.id}_detail`
```

**What gets merged:** when the user elaborates, send the *elaboration text* as the value the template uses, not the literal `"other"`. Two ways to wire it, pick one and be consistent:

1. **Override the field value** (simplest): if the user picks "other", set `answers[question.id] = elaborationText`. The template's `{{field}}` then renders the user's words directly.
2. **Separate detail field**: keep `answers[question.id] = "other"` and also send `answers[`${question.id}_detail`] = elaborationText`. Use this only if a template explicitly references the `_detail` field.

Use option 1 unless a specific template was authored to read a `_detail` field. None of the shipped 18 templates expect `_detail` fields, so **option 1 is the default** — the elaboration text replaces the value that flows into `{{field}}`.

This rule is global: it applies to every current and future `select` with an open-ended option, so implement it once in the shared select component rather than per field.

Three documents (tenancy, demand-letter, NDA) ship with **fully populated** question arrays. The other 15 are **stubbed with `questions: []`** — populate them from `TEMPLATE-FIELD-REFERENCE.md`, which lists every field, type, and which are conditional.

---

## 6. ORDER FLOW (recap)

```
Q&A (answers saved to draft order, status=unpaid)
  → checkout → M-Pesa STK push
  → Daraja callback marks order PAID
  → call /api/generate (server confirms paid, merges, stores file)
  → email signed expiring download link
```

Generation must never run client-side and never before the paid callback.

---

## 7. WHAT TO DO NEXT

1. Drop `templates/` (server-side) and `data/documents.ts` into the project.
2. Wire the catalogue + `[slug]` pages off `DOCUMENTS`.
3. Build the wizard for **demand-letter** first (it's fully specced and simplest), prove Q&A→pay→generate→deliver end to end.
4. Then tenancy and NDA (also fully specced).
5. Populate the remaining 15 question arrays from the field reference as you build each.
6. Keep every template behind advocate review before flipping it live.
