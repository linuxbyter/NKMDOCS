export const SITE_NAME = "LegalDocsKE";
export const SITE_DESCRIPTION = "Professional legal document templates, customized to your answers. Ready in minutes.";
export const SITE_URL = "https://legaldocske.vercel.app";

export const BRAND = {
  name: "LegalDocsKE",
  tagline: "Professional Templates. Your Answers. Ready in Minutes.",
  disclaimer: "This is a template, not legal advice. For complex matters, please consult a qualified legal professional.",
} as const;

export const NAV_LINKS: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/documents", label: "Templates" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
] as const;
