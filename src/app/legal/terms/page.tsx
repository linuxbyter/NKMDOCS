import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | LegalDocsKE",
  description: "Terms and conditions for using LegalDocsKE document templates.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-brand-navy mb-8">Terms of Service</h1>

      <div className="prose prose-slate max-w-none space-y-6 text-sm text-slate-700">
        <p><strong>Last updated:</strong> June 2026</p>

        <h2 className="text-xl font-semibold text-brand-navy mt-8">1. Service Description</h2>
        <p>
          LegalDocsKE provides automated legal document templates. You complete a guided
          questionnaire, and our system merges your answers into a pre-written, advocate-vetted
          document template. The result is a self-help document intended for informational and
          educational purposes.
        </p>

        <h2 className="text-xl font-semibold text-brand-navy mt-8">2. No Legal Advice</h2>
        <p>
          LegalDocsKE does not provide legal advice, legal representation, or create an
          advocate-client relationship. The documents generated are templates and may not
          be suitable for your specific circumstances. For complex matters, you should
          consult a qualified legal professional.
        </p>

        <h2 className="text-xl font-semibold text-brand-navy mt-8">3. No Advocate-Client Relationship</h2>
        <p>
          Use of this platform does not create an advocate-client relationship between you and
          LegalDocsKE or any advocate associated with the drafting of our templates. Your
          communications and document answers do not constitute privileged communications.
        </p>

        <h2 className="text-xl font-semibold text-brand-navy mt-8">4. Licence to Use</h2>
        <p>
          Upon payment, you receive a non-exclusive, non-transferable, single-use licence to
          use the generated document for your personal or business purposes. You may not
          resell, redistribute, or republish the generated document or the underlying template.
        </p>

        <h2 className="text-xl font-semibold text-brand-navy mt-8">5. User Responsibilities</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>You must provide accurate and complete information in the Q&A.</li>
          <li>You are responsible for reviewing the generated document for accuracy.</li>
          <li>You must not use the platform for any unlawful purpose.</li>
          <li>You must not attempt to reverse-engineer or extract our template masters.</li>
        </ul>

        <h2 className="text-xl font-semibold text-brand-navy mt-8">6. Payment and Refunds</h2>
        <p>
          All payments are processed via M-Pesa through the Safaricom Daraja API. Once
          a document has been generated and delivered, no refund will be issued, as the
          product is digital and customised to your inputs. If a technical error prevents
          delivery, we will issue a full refund.
        </p>

        <h2 className="text-xl font-semibold text-brand-navy mt-8">7. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, LegalDocsKE shall not be liable for any
          direct, indirect, incidental, special, or consequential damages arising from the
          use or inability to use the platform or generated documents. The templates are
          provided &ldquo;as is&rdquo; without warranty of any kind.
        </p>

        <h2 className="text-xl font-semibold text-brand-navy mt-8">8. Governing Law</h2>
        <p>
          These terms are governed by the laws of the Republic of Kenya. Any disputes
          shall be subject to the exclusive jurisdiction of the courts of Kenya.
        </p>

        <h2 className="text-xl font-semibold text-brand-navy mt-8">9. Changes to Terms</h2>
        <p>
          We may update these terms at any time. Continued use of the platform after
          changes constitutes acceptance of the new terms.
        </p>
      </div>
    </div>
  );
}
