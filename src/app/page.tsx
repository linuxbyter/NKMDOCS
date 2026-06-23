import Link from "next/link";
import { FileText, ArrowRight, CheckCircle, Shield, Clock, Users } from "lucide-react";
import { BRAND, SITE_DESCRIPTION } from "@/lib/constants";
import { formatKES } from "@/lib/utils";

const documents = [
  {
    id: "tenancy-agreement",
    name: "Tenancy Agreement",
    desc: "A comprehensive rental agreement template covering terms, rent, deposits, and obligations for both landlord and tenant.",
    price: 1500,
    icon: FileText,
  },
  {
    id: "demand-letter",
    name: "Demand Letter",
    desc: "Formal letter demanding payment of debt with clear terms, deadlines, and consequences of non-compliance.",
    price: 1000,
    icon: FileText,
  },
  {
    id: "non-disclosure-agreement",
    name: "Non-Disclosure Agreement",
    desc: "Protect confidential information with a mutual or one-way NDA suitable for business partnerships and employment.",
    price: 1200,
    icon: FileText,
  },
];

const steps = [
  {
    title: "Choose a Template",
    desc: "Browse our catalogue of professionally drafted legal document templates.",
    icon: FileText,
  },
  {
    title: "Answer a Few Questions",
    desc: "Our guided Q&A fills in the details for you. Simple questions, clear answers.",
    icon: Users,
  },
  {
    title: "Review & Customize",
    desc: "Preview your completed document before checkout.",
    icon: CheckCircle,
  },
  {
    title: "Download Instantly",
    desc: "Pay once via M-Pesa and receive your PDF immediately by email.",
    icon: Shield,
  },
];

const stats = [
  { label: "Documents Created", value: "500+" },
  { label: "Active Users", value: "300+" },
  { label: "Avg. Processing Time", value: "< 2 min" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Legal Documents Made Simple
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              {BRAND.tagline}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/#catalogue"
                className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-navy font-semibold px-8 py-3.5 rounded-xl transition-colors text-lg"
              >
                Browse Templates
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-brand-navy-light border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-3 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl sm:text-3xl font-bold text-brand-gold">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Get your legal document in three simple steps.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div key={step.title} className="text-center">
                <div className="w-16 h-16 rounded-full bg-brand-gold-light/30 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-8 w-8 text-brand-gold-dark" />
                </div>
                <div className="text-brand-gold font-bold text-lg mb-1">
                  Step {idx + 1}
                </div>
                <h3 className="font-semibold text-brand-navy mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing/Catalogue */}
      <section id="catalogue" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-4">
              Our Templates
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Choose from professionally drafted templates, ready to be customized to your needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {documents.map((doc) => (
              <Link
                key={doc.id}
                href={`/documents/${doc.id}`}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-brand-gold flex flex-col"
              >
                <div className="w-14 h-14 rounded-xl bg-brand-gold-light/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <doc.icon className="h-7 w-7 text-brand-gold-dark" />
                </div>
                <h3 className="text-xl font-bold text-brand-navy mb-2">{doc.name}</h3>
                <p className="text-sm text-slate-600 mb-4 flex-1">{doc.desc}</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-2xl font-bold text-brand-gold-dark">
                    {formatKES(doc.price)}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-gold-dark group-hover:gap-2 transition-all">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-brand-navy text-white py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            Choose a template and have your document ready in minutes.
          </p>
          <Link
            href="/#catalogue"
            className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-navy font-semibold px-8 py-3.5 rounded-xl transition-colors text-lg"
          >
            Browse All Templates
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
