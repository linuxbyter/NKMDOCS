import Link from "next/link";
import { FileText } from "lucide-react";
import { BRAND } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-gold">
                <FileText className="h-5 w-5 text-brand-navy" />
              </div>
              <span className="text-lg font-bold">LegalDocsKE</span>
            </Link>
            <p className="text-slate-400 text-sm max-w-md">
              {BRAND.tagline}
            </p>
            <p className="text-slate-500 text-xs mt-3 max-w-md">{BRAND.disclaimer}</p>
          </div>

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

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
              Support
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:support@legaldocske.vercel.app" className="text-slate-300 hover:text-white">
                  Email Support
                </a>
              </li>
              <li>
                <Link href="#" className="text-slate-300 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="text-slate-300 hover:text-white">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} LegalDocsKE. All rights reserved.</p>
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
