# LegalDocsKE

Professional legal document templates, customized to your answers. Ready in minutes.

## Tech Stack

- **Framework:** Next.js 16 (React 19)
- **Styling:** Tailwind CSS v4
- **Forms:** React Hook Form + Zod validation
- **Hosting:** Vercel
- **Database:** Neon (Postgres)
- **Payments:** M-Pesa Daraja API (STK Push)
- **Email:** Resend

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── generate/          # Document generation endpoint
│   │   └── payment/mpesa/     # M-Pesa STK push + callback
│   ├── documents/[slug]/
│   │   ├── page.tsx           # Document detail page
│   │   ├── review/page.tsx    # Guided Q&A flow
│   │   └── checkout/
│   │       ├── page.tsx       # Payment page
│   │       └── success/       # Order confirmation
│   ├── layout.tsx
│   ├── page.tsx               # Landing page + catalogue
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── GuidedQA.tsx           # Dynamic Q&A renderer
├── data/
│   └── documents.ts           # Document schemas & templates
└── lib/
    ├── constants.ts
    ├── types.ts
    └── utils.ts
```

## Adding New Documents

1. Create a new entry in `src/data/documents.ts`
2. Define the question schema (JSON)
3. Create the .docx template file
4. Map schema variables to template placeholders

## Deployment

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy

## Legal Disclaimer

This platform provides pre-drafted legal templates, not legal advice. All templates are pre-approved. The guided Q&A customizes defined fields only — no novel legal text is generated per order.
