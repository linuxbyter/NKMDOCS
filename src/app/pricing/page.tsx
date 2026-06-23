import type { Metadata } from "next";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getDocumentBySlug, documents } from "@/data/documents";
import { formatKES } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing | LegalDocsKE",
  description: "Simple, transparent pricing for LegalDocsKE legal document templates. Pay once and receive your document instantly.",
};

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-brand-navy mb-4">Simple Pricing</h1>
        <p className="text-brand-muted max-w-lg mx-auto">
          One price per document. No subscriptions. No hidden fees.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {documents.map((doc) => (
          <div
            key={doc.slug}
            className="rounded-2xl border border-brand-border bg-white p-6 flex flex-col"
          >
            <div className="mb-4">
              <h2 className="text-lg font-bold text-brand-navy">{doc.name}</h2>
              <p className="text-sm text-slate-600 mt-1">{doc.shortDescription}</p>
            </div>

            <div className="text-center py-4 border-y border-brand-border mb-4">
              <div className="text-3xl font-bold text-brand-navy">{formatKES(doc.price)}</div>
              <div className="text-xs text-brand-muted mt-1">One-time payment</div>
            </div>

            <ul className="space-y-2 text-sm flex-1 mb-6">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-success shrink-0 mt-0.5" />
                <span>Advocate-drafted template</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-success shrink-0 mt-0.5" />
                <span>Customised to your answers</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-success shrink-0 mt-0.5" />
                <span>Instant PDF delivery</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-success shrink-0 mt-0.5" />
                <span>M-Pesa payment</span>
              </li>
            </ul>

            <Link
              href={`/documents/${doc.slug}`}
              className="block w-full rounded-lg bg-brand-navy text-center py-2.5 text-sm font-semibold text-white hover:bg-brand-navy-light transition-colors"
            >
              Get Started
              <ArrowRight className="inline ml-2 h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-brand-navy text-white p-8 text-center">
        <h2 className="text-xl font-bold mb-2">Not sure which template you need?</h2>
        <p className="text-slate-300 mb-4">
          Browse our catalogue and read detailed descriptions to find the right one.
        </p>
        <Link
          href="/#catalogue"
          className="inline-flex items-center gap-2 bg-brand-gold text-brand-navy px-6 py-3 rounded-lg font-semibold hover:bg-brand-gold-light transition-colors"
        >
          View All Templates
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
