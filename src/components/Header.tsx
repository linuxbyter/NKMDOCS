"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS, BRAND } from "@/lib/constants";
import { FileText, Menu, X } from "lucide-react";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-brand-navy text-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-gold">
              <FileText className="h-5 w-5 text-brand-navy" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-tight tracking-tight">
                NKM Documents
              </span>
              <span className="hidden sm:block text-[10px] text-brand-gold-light leading-tight">
                Advocate-Drafted Templates
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="https://nkm-advocates.co.ke/contact-us/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center rounded-lg bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-navy hover:bg-brand-gold-light transition-colors"
            >
              Book Consultation
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-brand-navy-light">
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg"
                >
                  {link.label}
                </Link>
              )
            )}
            <a
              href="https://nkm-advocates.co.ke/contact-us/"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 text-sm font-semibold text-brand-navy bg-brand-gold rounded-lg text-center mt-2"
            >
              Book Consultation
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
