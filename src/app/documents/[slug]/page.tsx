import { notFound } from "next/navigation";
import Link from "next/link";
import { getDocumentBySlug, documents } from "@/data/documents";
import { formatKES } from "@/lib/utils";
import {
  Clock, FileText, CheckCircle2, AlertTriangle, ArrowRight,
  Building2, Receipt, Briefcase, Star, HelpCircle,
} from "lucide-react";
import type { Metadata } from "next";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2, Receipt, Briefcase,
};

export async function generateStaticParams() {
  return documents.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDocumentBySlug(slug);
  if (!doc) return {};
  return {
    title: `${doc.name} | NKM Documents`,
    description: doc.shortDescription,
  };
}

export default async function DocumentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDocumentBySlug(slug);
  if (!doc) notFound();

  const Icon = iconMap[doc.icon] || FileText;

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/#catalogue" className="hover:text-white">Documents</Link>
            <span>/</span>
            <span className="text-brand-gold">{doc.name}</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gold">
                  <Icon className="h-6 w-6 text-brand-navy" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{doc.name}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    {doc.popular && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-brand-gold/20 px-2 py-0.5 text-xs font-semibold text-brand-gold">
                        <Star className="h-3 w-3" /> Popular
                      </span>
                    )}
                    <span className="text-sm text-slate-400">{doc.difficulty}</span>
                  </div>
                </div>
              </div>

              <p className="text-slate-300 max-w-2xl">{doc.longDescription}</p>

              <div className="flex items-center gap-6 mt-6 text-sm text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {doc.estimatedTime} to complete
                </div>
                <div className="flex items-center gap-1.5">
                  <FileText className="h-4 w-4" />
                  {doc.pageCount} pages
                </div>
              </div>
            </div>

            {/* Price Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <div className="text-center">
                <div className="text-sm text-slate-400 mb-1">Document Only</div>
                <div className="text-3xl font-bold text-brand-gold">{formatKES(doc.price)}</div>
                <div className="text-xs text-slate-400 mt-1">Instant delivery</div>
              </div>

              <div className="my-4 border-t border-white/10" />

              <div className="text-center">
                <div className="text-sm text-slate-400 mb-1">With Advocate Review</div>
                <div className="text-2xl font-bold">{formatKES(doc.reviewPrice)}</div>
                <div className="text-xs text-slate-400 mt-1">Reviewed before release</div>
              </div>

              <Link
                href={`/documents/${doc.slug}/review`}
                className="mt-6 block w-full rounded-lg bg-brand-gold text-center py-3 text-sm font-semibold text-brand-navy hover:bg-brand-gold-light transition-colors"
              >
                Customize This Document
                <ArrowRight className="inline ml-2 h-4 w-4" />
              </Link>

              <p className="text-center text-[10px] text-slate-500 mt-3">
                This is a template, not legal advice
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {/* At a Glance */}
              <div>
                <h2 className="text-2xl font-bold text-brand-navy mb-4">At a Glance</h2>
                <div className="rounded-xl border border-brand-border bg-white p-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1">
                        When to use
                      </div>
                      <p className="text-sm">{doc.whenToUse}</p>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1">
                        Jurisdictions
                      </div>
                      <div className="flex gap-2 mt-1">
                        {doc.jurisdictions.map((j) => (
                          <span key={j} className="rounded-full bg-brand-navy/5 px-3 py-1 text-xs font-medium text-brand-navy">
                            {j}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* What's Inside */}
              <div>
                <h2 className="text-2xl font-bold text-brand-navy mb-4">What&apos;s Inside</h2>
                <div className="rounded-xl border border-brand-border bg-white p-6">
                  <ul className="space-y-2">
                    {doc.whatInside.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-brand-success mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-2xl font-bold text-brand-navy mb-4">Key Features</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {doc.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 rounded-lg border border-brand-border bg-white p-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-brand-accent shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              {/* Common Mistakes */}
              <div>
                <h2 className="text-2xl font-bold text-brand-navy mb-4">Common Mistakes to Avoid</h2>
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
                  <ul className="space-y-3">
                    {doc.commonMistakes.map((m) => (
                      <li key={m} className="flex items-start gap-2 text-sm">
                        <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                        <span className="text-amber-900">{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Start */}
              <div className="rounded-xl border border-brand-border bg-white p-6 sticky top-24">
                <h3 className="font-semibold text-brand-navy mb-3">Quick Start</h3>
                <p className="text-sm text-brand-muted mb-4">
                  Answer {doc.questions.length} guided questions. Takes about {doc.estimatedTime}.
                </p>
                <Link
                  href={`/documents/${doc.slug}/review`}
                  className="block w-full rounded-lg bg-brand-navy text-center py-3 text-sm font-semibold text-white hover:bg-brand-navy-light transition-colors"
                >
                  Start Customizing
                  <ArrowRight className="inline ml-2 h-4 w-4" />
                </Link>

                <div className="mt-4 pt-4 border-t border-brand-border">
                  <h4 className="text-xs font-semibold text-brand-muted uppercase mb-2">You&apos;ll need</h4>
                  <ul className="space-y-1.5 text-xs text-brand-muted">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3 w-3 text-brand-success" />
                      Full names of all parties
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3 w-3 text-brand-success" />
                      ID / Registration numbers
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3 w-3 text-brand-success" />
                      Relevant dates and amounts
                    </li>
                  </ul>
                </div>
              </div>

              {/* FAQs */}
              <div className="rounded-xl border border-brand-border bg-white p-6">
                <h3 className="font-semibold text-brand-navy mb-4 flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {doc.faqs.map((faq) => (
                    <div key={faq.question}>
                      <h4 className="text-sm font-medium text-brand-navy">{faq.question}</h4>
                      <p className="text-xs text-brand-muted mt-1">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consultation CTA */}
              <div className="rounded-xl bg-brand-navy text-white p-6">
                <h3 className="font-semibold mb-2">Need More Help?</h3>
                <p className="text-sm text-slate-300 mb-4">
                  For complex matters, book a consultation with one of our advocates.
                </p>
                <a
                  href="https://nkm-advocates.co.ke/contact-us/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded-lg bg-brand-gold text-center py-2.5 text-sm font-semibold text-brand-navy hover:bg-brand-gold-light transition-colors"
                >
                  Book Consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
