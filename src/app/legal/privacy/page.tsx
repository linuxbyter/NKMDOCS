import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | LegalDocsKE",
  description: "How LegalDocsKE collects, uses, and protects your personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-brand-navy mb-8">Privacy Policy</h1>

      <div className="prose prose-slate max-w-none space-y-6 text-sm text-slate-700">
        <p><strong>Last updated:</strong> June 2026</p>

        <h2 className="text-xl font-semibold text-brand-navy mt-8">1. Who We Are</h2>
        <p>
          LegalDocsKE provides automated legal document templates. We operate the website
          at legaldocske.vercel.app. This policy explains how we collect, use, and protect
          personal data submitted through our platform.
        </p>

        <h2 className="text-xl font-semibold text-brand-navy mt-8">2. Information We Collect</h2>
        <p>When you use our service, we collect:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Identity data:</strong> full names, ID/passport numbers, and company registration numbers as provided in your document answers.</li>
          <li><strong>Contact data:</strong> email address, phone number, and physical address.</li>
          <li><strong>Document data:</strong> all answers you provide through the guided Q&A, which are used solely to generate your selected document.</li>
          <li><strong>Payment data:</strong> M-Pesa transaction details. We do not store your M-Pesa PIN or full bank account details. Payment processing is handled through the Safaricom Daraja API.</li>
          <li><strong>Technical data:</strong> IP address, browser type, and usage patterns for analytics and security.</li>
        </ul>

        <h2 className="text-xl font-semibold text-brand-navy mt-8">3. How We Use Your Data</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>To generate your requested legal document.</li>
          <li>To process your payment and deliver the document to your email.</li>
          <li>To communicate with you about your order.</li>
          <li>To improve our templates and platform.</li>
          <li>To comply with legal obligations.</li>
        </ul>

        <h2 className="text-xl font-semibold text-brand-navy mt-8">4. Legal Basis (Kenya Data Protection Act)</h2>
        <p>
          We process your data on the following lawful bases: (a) performance of a contract
          — to generate and deliver your document; (b) consent — you provide information
          voluntarily through the Q&A; (c) legal obligation — where required to retain
          records for tax or regulatory purposes.
        </p>

        <h2 className="text-xl font-semibold text-brand-navy mt-8">5. Data Retention</h2>
        <p>
          We retain order data (including document answers) for a period of 12 months from
          the date of completion, after which it is permanently deleted. Payment records are
          retained for 7 years as required by Kenyan tax law. You may request earlier deletion
          by contacting us.
        </p>

        <h2 className="text-xl font-semibold text-brand-navy mt-8">6. Data Sharing</h2>
        <p>
          We do not sell your data. We share data only with trusted third-party service providers
          necessary to operate the platform:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Neon (Postgres):</strong> database hosting for order records.</li>
          <li><strong>Resend:</strong> email delivery of documents and order confirmations.</li>
          <li><strong>Safaricom (Daraja API):</strong> M-Pesa payment processing.</li>
          <li><strong>Vercel:</strong> hosting and serverless function execution.</li>
        </ul>

        <h2 className="text-xl font-semibold text-brand-navy mt-8">7. Your Rights</h2>
        <p>Under the Kenya Data Protection Act, 2019, you have the right to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Access your personal data held by us.</li>
          <li>Correct inaccurate data.</li>
          <li>Delete your data (subject to legal retention requirements).</li>
          <li>Object to processing of your data.</li>
          <li>Lodge a complaint with the Office of the Data Protection Commissioner (ODPC).</li>
        </ul>

        <h2 className="text-xl font-semibold text-brand-navy mt-8">8. Security</h2>
        <p>
          We implement appropriate technical and organisational measures to protect your data,
          including encryption in transit (TLS), encrypted database storage, and restricted
          access to personal data. However, no internet transmission is completely secure.
        </p>

        <h2 className="text-xl font-semibold text-brand-navy mt-8">9. Contact</h2>
        <p>
          For privacy-related inquiries, contact us at{" "}
          <a href="mailto:support@legaldocske.vercel.app" className="text-brand-navy underline">support@legaldocske.vercel.app</a>.
        </p>
      </div>
    </div>
  );
}
