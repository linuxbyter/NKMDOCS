"use client";

import Link from "next/link";
import { categories, documents } from "@/data/documents";
import { formatKES } from "@/lib/utils";
import { BRAND } from "@/lib/constants";
import {
  Building2, Receipt, Briefcase, Heart, Map, Shield,
  Clock, CheckCircle2, CreditCard, Download, ArrowRight,
  Star, Zap, ShieldCheck, Users, ChevronRight, FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2, Receipt, Briefcase, Heart, Map, Shield,
};

const steps = [
  {
    icon: FileText,
    title: "Pick a Document",
    description: "Browse our catalogue of advocate-drafted templates. Each one is designed for a specific legal need.",
  },
  {
    icon: CheckCircle2,
    title: "Answer Simple Questions",
    description: "Our guided Q&A walks you through each field. No legal knowledge needed — just fill in the blanks.",
  },
  {
    icon: CreditCard,
    title: "Pay & Receive",
    description: "Pay via M-Pesa or bank transfer. Your customized document is generated instantly and emailed to you.",
  },
];

const stats = [
  { value: "3+", label: "Document Templates" },
  { value: "15 min", label: "Average Completion" },
  { value: "100%", label: "Advocate-Drafted" },
  { value: "24/7", label: "Available Online" },
];

const testimonials = [
  {
    quote: "Got my tenancy agreement in 10 minutes. Saved me a trip to the lawyer's office.",
    name: "Grace W.",
    role: "Landlord, Nairobi",
  },
  {
    quote: "Professional, clear, and affordable. The guided questions made it so easy.",
    name: "James K.",
    role: "Small Business Owner",
  },
  {
    quote: "Much faster than waiting for a lawyer to draft from scratch. Highly recommend.",
    name: "Mary A.",
    role: "Tenant, Mombasa",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-brand-navy text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-brand-gold-light mb-6 backdrop-blur-sm">
                <ShieldCheck className="h-4 w-4" />
                Advocate-Drafted Templates
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Your Legal Documents,{" "}
                <span className="text-brand-gold">Done Right.</span>
              </h1>

              <p className="mt-6 text-lg text-slate-300 max-w-lg">
                {BRAND.tagline}. Customize professional legal templates by answering simple questions. No legal expertise required.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="#catalogue"
                  className="inline-flex items-center justify-center rounded-lg bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-navy hover:bg-brand-gold-light transition-colors"
                >
                  Browse Documents
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  How It Works
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-10 flex items-center gap-6 text-sm text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Shield className="h-4 w-4 text-brand-gold" />
                  Legally Compliant
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-brand-gold" />
                  Instant Delivery
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-brand-gold" />
                  Trusted by Hundreds
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="hidden lg:block relative">
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
                {/* Document Preview Mockup */}
                <div className="bg-white rounded-xl shadow-2xl p-6 text-foreground">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                    <div className="h-3 w-3 rounded-full bg-green-400" />
                    <span className="ml-2 text-xs text-gray-400">tenancy-agreement.pdf</span>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-brand-navy/10 rounded w-3/4" />
                    <div className="h-3 bg-brand-navy/5 rounded w-full" />
                    <div className="h-3 bg-brand-navy/5 rounded w-5/6" />
                    <div className="h-3 bg-brand-navy/5 rounded w-4/5" />
                    <div className="h-8 bg-brand-gold/20 rounded w-1/3 mt-4" />
                    <div className="h-3 bg-brand-navy/5 rounded w-full" />
                    <div className="h-3 bg-brand-navy/5 rounded w-2/3" />
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="h-12 bg-brand-navy/5 rounded" />
                      <div className="h-12 bg-brand-navy/5 rounded" />
                    </div>
                  </div>
                  <div className="mt-6 flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-brand-gold/30" />
                    <div>
                      <div className="h-2 bg-brand-navy/10 rounded w-20" />
                      <div className="h-1.5 bg-brand-navy/5 rounded w-14 mt-1" />
                    </div>
                  </div>
                </div>
                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 bg-brand-gold text-brand-navy rounded-full px-4 py-2 text-sm font-bold shadow-lg">
                  Ready to Sign
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-brand-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-brand-navy">{stat.value}</div>
                <div className="text-sm text-brand-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 lg:py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-brand-navy">How It Works</h2>
            <p className="mt-3 text-brand-muted">
              Three simple steps to get your customized legal document
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.title} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[calc(50%+40px)] right-[calc(-50%+40px)] h-0.5 bg-brand-border">
                    <ChevronRight className="absolute -right-2 -top-2 h-5 w-5 text-brand-border" />
                  </div>
                )}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-brand-navy text-white mb-4">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-7 h-7 rounded-full bg-brand-gold text-brand-navy text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-brand-navy mt-2">{step.title}</h3>
                  <p className="text-sm text-brand-muted mt-2 max-w-xs mx-auto">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Document Catalogue */}
      <section id="catalogue" className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-brand-navy">Document Catalogue</h2>
            <p className="mt-3 text-brand-muted">
              Choose from our growing library of advocate-drafted templates
            </p>
          </div>

          {/* Categories */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {categories.map((cat) => {
              const Icon = iconMap[cat.icon] || FileText;
              const docCount = documents.filter((d) => d.category === cat.id).length;
              return (
                <div
                  key={cat.id}
                  className="rounded-xl border border-brand-border bg-white p-5 card-hover cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-navy/5">
                      <Icon className="h-5 w-5 text-brand-navy" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-brand-navy text-sm">{cat.name}</h3>
                      <p className="text-xs text-brand-muted mt-0.5 line-clamp-2">{cat.description}</p>
                      <span className="inline-block mt-2 text-xs font-medium text-brand-accent">
                        {docCount} template{docCount !== 1 ? "s" : ""} →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Document Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => {
              const Icon = iconMap[doc.icon] || FileText;
              return (
                <Link
                  key={doc.id}
                  href={`/documents/${doc.slug}`}
                  className="group rounded-xl border border-brand-border bg-white overflow-hidden card-hover"
                >
                  {/* Card Header */}
                  <div className="bg-brand-navy/5 px-6 py-4 border-b border-brand-border">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-navy text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-brand-navy group-hover:text-brand-accent transition-colors truncate">
                          {doc.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          {doc.popular && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-brand-gold/20 px-2 py-0.5 text-[10px] font-semibold text-brand-gold">
                              <Star className="h-2.5 w-2.5" /> Popular
                            </span>
                          )}
                          <span className="text-xs text-brand-muted">{doc.difficulty}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="px-6 py-4">
                    <p className="text-sm text-brand-muted line-clamp-2">{doc.shortDescription}</p>

                    <div className="mt-4 flex items-center gap-4 text-xs text-brand-muted">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {doc.estimatedTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="h-3.5 w-3.5" />
                        {doc.pageCount} pages
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {doc.features.slice(0, 3).map((f) => (
                        <span
                          key={f}
                          className="inline-block rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-brand-muted"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 py-4 border-t border-brand-border bg-slate-50/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl font-bold text-brand-navy">{formatKES(doc.price)}</span>
                        <span className="text-xs text-brand-muted ml-1">only</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-accent group-hover:gap-2 transition-all">
                        Customize <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 lg:py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-brand-navy">Simple, Transparent Pricing</h2>
            <p className="mt-3 text-brand-muted">
              Pay per document. No subscriptions. Optional advocate review for extra peace of mind.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Tier 1: Document Only */}
            <div className="rounded-2xl border border-brand-border bg-white p-8">
              <div className="text-sm font-semibold text-brand-muted uppercase tracking-wider">
                Document Only
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-brand-navy">From KES 1,200</span>
              </div>
              <p className="mt-2 text-sm text-brand-muted">
                Per document. Instant delivery.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  "Advocate-drafted template",
                  "Guided Q&A customization",
                  "Instant document generation",
                  "Formatted & ready to print",
                  "Email delivery with download link",
                  "Standard support",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-brand-success mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="#catalogue"
                className="mt-8 block w-full rounded-lg border-2 border-brand-navy text-center py-3 text-sm font-semibold text-brand-navy hover:bg-brand-navy hover:text-white transition-colors"
              >
                Choose a Document
              </Link>
            </div>

            {/* Tier 2: Document + Review */}
            <div className="rounded-2xl border-2 border-brand-gold bg-white p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-navy rounded-full px-4 py-1 text-xs font-bold">
                Recommended
              </div>
              <div className="text-sm font-semibold text-brand-gold uppercase tracking-wider">
                Document + Advocate Review
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-brand-navy">From KES 3,500</span>
              </div>
              <p className="mt-2 text-sm text-brand-muted">
                Per document. Reviewed before release.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  "Everything in Document Only",
                  "Advocate reviews your document",
                  "Professional verification",
                  "Legal compliance check",
                  "Personalized feedback",
                  "Priority support",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-brand-success mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="#catalogue"
                className="mt-8 block w-full rounded-lg bg-brand-navy text-center py-3 text-sm font-semibold text-white hover:bg-brand-navy-light transition-colors"
              >
                Choose a Document
              </Link>
            </div>
          </div>

          <p className="text-center text-xs text-brand-muted mt-8 max-w-lg mx-auto">
            {BRAND.disclaimer}
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-brand-navy">Trusted by Kenyans</h2>
            <p className="mt-3 text-brand-muted">
              See what our clients say about the experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-xl border border-brand-border bg-white p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-brand-gold text-brand-gold" />
                  ))}
                </div>
                <p className="text-sm text-brand-muted italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-4 pt-4 border-t border-brand-border">
                  <p className="text-sm font-semibold text-brand-navy">{t.name}</p>
                  <p className="text-xs text-brand-muted">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-brand-navy text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mt-3 text-slate-300 max-w-lg mx-auto">
            Pick a document, answer a few questions, and receive your customized legal document in minutes.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="#catalogue"
              className="inline-flex items-center justify-center rounded-lg bg-brand-gold px-8 py-3 text-sm font-semibold text-brand-navy hover:bg-brand-gold-light transition-colors"
            >
              Browse Documents
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <a
              href="https://nkm-advocates.co.ke/contact-us/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-white/20 px-8 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Book a Consultation
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
