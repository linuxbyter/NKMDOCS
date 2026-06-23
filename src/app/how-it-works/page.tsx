import type { Metadata } from "next";
import { FileText, Users, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How It Works | LegalDocsKE",
  description: "Learn how LegalDocsKE works — choose a template, answer questions, pay via M-Pesa, and receive your document instantly.",
};

const steps = [
  {
    step: 1,
    title: "Choose a Template",
    desc: "Browse our catalogue of advocate-drafted legal templates. Each template is designed for a specific purpose — tenancy, demand letters, NDAs, and more.",
    icon: FileText,
  },
  {
    step: 2,
    title: "Answer Guided Questions",
    desc: "Fill in your details through our simple step-by-step Q&A. Your answers are inserted directly into pre-written clauses — no legal knowledge needed.",
    icon: Users,
  },
  {
    step: 3,
    title: "Pay via M-Pesa",
    desc: "Pay securely using M-Pesa STK Push. Your transaction is processed through the Safaricom Daraja API. No card details are stored on our servers.",
    icon: Shield,
  },
  {
    step: 4,
    title: "Receive Your Document",
    desc: "Your customised document is generated and emailed to you as a PDF. The download link is signed and expires in 24 hours for security.",
    icon: ArrowRight,
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-brand-navy mb-4">How It Works</h1>
      <p className="text-brand-muted mb-12">
        Getting a legal document takes about 5 minutes, start to finish.
      </p>

      <div className="space-y-10">
        {steps.map((s) => (
          <div key={s.step} className="flex gap-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-navy text-white text-sm font-bold">
              {s.step}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-brand-navy">{s.title}</h2>
              <p className="text-sm text-slate-600 mt-1">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/#catalogue"
          className="inline-flex items-center gap-2 bg-brand-navy text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-navy-light transition-colors"
        >
          Browse Templates
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
