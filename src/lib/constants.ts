export const SITE_NAME = "NKM Documents";
export const SITE_DESCRIPTION = "Advocate-drafted legal documents, customized to your answers. Ready in minutes.";
export const SITE_URL = "https://documents.nkm-advocates.co.ke";

export const BRAND = {
  name: "NKM Documents",
  tagline: "Advocate-Drafted. Your Answers. Ready in Minutes.",
  disclaimer: "This is a template, not legal advice. For complex matters, add an advocate review at checkout.",
  reviewUpsell: "Add advocate review for comprehensive verification",
  consultationCta: "Need advice or a custom matter? Book a consultation →",
  documentCta: "Need a document now? →",
} as const;

export const NAV_LINKS: { href: string; label: string; external?: boolean }[] = [
  { href: "/", label: "Home" },
  { href: "/#catalogue", label: "Documents" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "https://nkm-advocates.co.ke/contact-us/", label: "Contact", external: true },
] as const;

export const PRICING = {
  advocateReview: 2500,
  documentOnly: 0, // Set per document
} as const;
