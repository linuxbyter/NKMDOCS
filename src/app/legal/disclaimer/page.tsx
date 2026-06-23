import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | LegalDocsKE",
  description: "Important legal disclaimer about LegalDocsKE document templates.",
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-brand-navy mb-8">Disclaimer</h1>

      <div className="prose prose-slate max-w-none space-y-6 text-sm text-slate-700">
        <h2 className="text-xl font-semibold text-brand-navy mt-8">This Is Not Legal Advice</h2>
        <p>
          LegalDocsKE provides pre-drafted legal document templates. The documents generated
          through this platform are self-help tools intended for informational and educational
          purposes only. They do not constitute legal advice, legal opinion, or a substitute
          for professional legal counsel.
        </p>

        <h2 className="text-xl font-semibold text-brand-navy mt-8">No Advocate-Client Relationship</h2>
        <p>
          Use of this platform does not create an advocate-client relationship between you
          and LegalDocsKE, its operators, or any advocate involved in drafting the underlying
          templates. Communications made through the platform are not confidential or
          subject to legal professional privilege.
        </p>

        <h2 className="text-xl font-semibold text-brand-navy mt-8">Templates Are Not One-Size-Fits-All</h2>
        <p>
          While our templates are drafted and vetted by qualified advocates, they are
          standardised documents designed for common situations. They may not address
          specific nuances or complexities of your circumstances. You should review the
          generated document carefully and, if needed, seek independent legal advice.
        </p>

        <h2 className="text-xl font-semibold text-brand-navy mt-8">Accuracy of Information</h2>
        <p>
          You are solely responsible for the accuracy and completeness of the information
          you provide through the guided Q&A. LegalDocsKE does not verify the information
          you enter and is not liable for any errors, omissions, or consequences arising
          from incorrect inputs.
        </p>

        <h2 className="text-xl font-semibold text-brand-navy mt-8">Jurisdictional Limits</h2>
        <p>
          Our templates are prepared for use in Kenya and are governed by Kenyan law. They
          may not be suitable or enforceable in other jurisdictions. If your matter involves
          another jurisdiction, consult an advocate qualified in that jurisdiction.
        </p>

        <h2 className="text-xl font-semibold text-brand-navy mt-8">Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, LegalDocsKE disclaims all warranties,
          express or implied, regarding the templates and generated documents. In no event
          shall LegalDocsKE be liable for any loss, damage, claim, or expense arising from
          your use of the platform or reliance on any generated document.
        </p>

        <h2 className="text-xl font-semibold text-brand-navy mt-8">When to See an Advocate</h2>
        <p>
          You should consult a qualified advocate if:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>The value of the subject matter is substantial.</li>
          <li>The matter involves complex or unusual terms.</li>
          <li>You are unsure whether the template is suitable for your situation.</li>
          <li>The other party has legal representation.</li>
          <li>You need representation in negotiations or dispute resolution.</li>
        </ul>

        <div className="mt-8 p-4 rounded-lg bg-amber-50 border border-amber-200">
          <p className="text-amber-900 font-medium text-sm">
            By using LegalDocsKE, you acknowledge that you have read, understood, and
            accepted this disclaimer. If you do not agree, do not use this service.
          </p>
        </div>
      </div>
    </div>
  );
}
