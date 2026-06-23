import Link from "next/link";
import { documents } from "@/data/documents";
import { formatKES } from "@/lib/utils";
import { FileText, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Templates | LegalDocsKE",
  description: "Browse our catalogue of advocate-drafted legal document templates for Kenya.",
};

export default function CataloguePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-brand-navy mb-4">All Templates</h1>
        <p className="text-brand-muted max-w-lg mx-auto">
          Choose from our catalogue of advocate-drafted legal document templates, ready to be customised to your needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {documents.map((doc) => (
          <Link
            key={doc.slug}
            href={`/documents/${doc.slug}`}
            className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-brand-gold flex flex-col"
          >
            <div className="w-14 h-14 rounded-xl bg-brand-gold-light/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="h-7 w-7 text-brand-gold-dark" />
            </div>
            <h2 className="text-xl font-bold text-brand-navy mb-2">{doc.name}</h2>
            <p className="text-sm text-slate-600 mb-4 flex-1">{doc.shortDescription}</p>
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-2xl font-bold text-brand-gold-dark">
                {formatKES(doc.price)}
              </span>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-gold-dark group-hover:gap-2 transition-all">
                View Details
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
