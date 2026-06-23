import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | LegalDocsKE",
  description: "Frequently asked questions about LegalDocsKE document templates.",
};

const faqs = [
  {
    q: "Are these documents legally valid in Kenya?",
    a: "Yes. All our templates are drafted and vetted by qualified advocates and comply with Kenyan law. However, their suitability depends on your specific circumstances. For complex matters, we recommend having an advocate review the final document.",
  },
  {
    q: "Is this legal advice?",
    a: "No. LegalDocsKE provides pre-drafted templates and a guided Q&A tool. The generated document is a self-help tool. It does not constitute legal advice or create an advocate-client relationship.",
  },
  {
    q: "How long does it take to get my document?",
    a: "The Q&A takes about 5 minutes. Once you complete payment via M-Pesa, the document is generated and emailed to you within seconds.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept M-Pesa via STK Push (Lipa na M-Pesa). You enter your phone number, and we send a payment request to your phone. Approve it with your PIN, and the document is released instantly.",
  },
  {
    q: "Can I get a refund?",
    a: "Because the document is digital and customised to your inputs, we do not offer refunds after delivery. If a technical error prevents delivery, we will issue a full refund.",
  },
  {
    q: "What if I make a mistake in my answers?",
    a: "You can review your answers before confirming payment. Once the document is generated, you would need to start again — we recommend double-checking your answers on the review screen.",
  },
  {
    q: "Can I add an advocate review?",
    a: "Yes. Select the 'Advocate Review' option at checkout. A qualified advocate will review your generated document before release, typically within 1-2 business days.",
  },
  {
    q: "How long is the download link valid?",
    a: "The download link in your email expires after 24 hours. We recommend downloading and saving your document immediately.",
  },
  {
    q: "What happens to my data?",
    a: "We store your order data for 12 months, then delete it. Payment records are retained longer for tax compliance. See our Privacy Policy for full details.",
  },
  {
    q: "Can I use these documents outside Kenya?",
    a: "Our templates are prepared for Kenyan law and may not be enforceable in other jurisdictions. If your matter involves another country, consult an advocate qualified there.",
  },
];

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-brand-navy mb-4">Frequently Asked Questions</h1>
      <p className="text-brand-muted mb-10">
        Common questions about using LegalDocsKE.
      </p>

      <div className="space-y-6">
        {faqs.map((faq) => (
          <div key={faq.q} className="rounded-xl border border-brand-border bg-white p-6">
            <h2 className="font-semibold text-brand-navy mb-2">{faq.q}</h2>
            <p className="text-sm text-slate-600">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
