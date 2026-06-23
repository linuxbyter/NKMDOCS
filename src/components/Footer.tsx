import Link from "next/link";
import { FileText, Mail, Phone, MapPin } from "lucide-react";
import { BRAND } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      {/* Consultation CTA */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">{BRAND.consultationCta.replace("→", "")}</h3>
              <p className="text-slate-400 text-sm mt-1">
                For complex legal matters, our advocates provide personalized consultation.
              </p>
            </div>
            <a
              href="https://nkm-advocates.co.ke/contact-us/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-navy hover:bg-brand-gold-light transition-colors whitespace-nowrap"
            >
              Book a Consultation
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-gold">
                <FileText className="h-5 w-5 text-brand-navy" />
              </div>
              <span className="text-lg font-bold">NKM Documents</span>
            </Link>
            <p className="text-slate-400 text-sm max-w-md">
              {BRAND.tagline}. Part of{" "}
              <a
                href="https://nkm-advocates.co.ke"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-gold hover:text-brand-gold-light"
              >
                NKM Advocates
              </a>
              .
            </p>
            <p className="text-slate-500 text-xs mt-3 max-w-md">{BRAND.disclaimer}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
              Documents
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#catalogue" className="text-slate-300 hover:text-white">
                  Browse All
                </Link>
              </li>
              <li>
                <Link href="/documents/tenancy-agreement" className="text-slate-300 hover:text-white">
                  Tenancy Agreement
                </Link>
              </li>
              <li>
                <Link href="/documents/demand-letter" className="text-slate-300 hover:text-white">
                  Demand Letter
                </Link>
              </li>
              <li>
                <Link href="/documents/non-disclosure-agreement" className="text-slate-300 hover:text-white">
                  NDA
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-slate-300">
                <Phone className="h-4 w-4 text-brand-gold" />
                0707 329 013
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Mail className="h-4 w-4 text-brand-gold" />
                contact@nkm-advocates.co.ke
              </li>
              <li className="flex items-start gap-2 text-slate-300">
                <MapPin className="h-4 w-4 text-brand-gold mt-0.5" />
                Wilkem Edge Business Center, 1st Floor, Matasia
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} NKM Advocates. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-slate-300">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-slate-300">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-slate-300">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
