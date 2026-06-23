// data/documents.ts
// Catalogue + merge-field metadata for LegalDocsKE.
// Each entry's `slug` matches a file in /templates/{slug}.docx exactly.
// `questions` drives the guided Q&A wizard; each question `id` maps 1:1 to a {{merge_field}}.
// Boolean questions whose id is referenced by a {{#conditional}} block toggle that clause.
//
// NOTE: clause text inside the .docx is advocate-pre-approved (pending review). The app only
// fills fields and toggles pre-written clauses. No legal text is generated at runtime.

export type FieldType = "text" | "number" | "date" | "select" | "textarea" | "boolean" | "phone" | "email";

export interface Question {
  id: string;
  label: string;
  type: FieldType;
  options?: string[];
  required?: boolean;
  default?: string | number | boolean;
  conditionalOn?: string; // show only if this boolean field is true
  helpText?: string;
  // For select fields: option values that require the user to elaborate.
  // When the user picks one of these, a required follow-up textarea appears,
  // and its value is what gets merged into the document (not the bare "other").
  // Defaults to ["other","custom"] for any select unless overridden.
  elaborateOn?: string[];
  // The merge-field id that captures the elaboration text. Convention: `${id}_detail`.
  elaborateFieldId?: string;
}

export interface LegalDocument {
  slug: string;
  title: string;
  description: string;
  price: number;          // KES
  category: "property" | "debt" | "business" | "employment" | "family" | "corporate";
  templateFile: string;   // /templates/{slug}.docx
  questions: Question[];
}

// Helper shorthand
const q = (id: string, label: string, type: FieldType, extra: Partial<Question> = {}): Question =>
  ({ id, label, type, required: true, ...extra });

export const DOCUMENTS: LegalDocument[] = [
  {
    slug: "tenancy-agreement",
    title: "Tenancy Agreement",
    description: "A comprehensive rental agreement covering terms, rent, deposits, and obligations for both landlord and tenant.",
    price: 1500, category: "property", templateFile: "/templates/tenancy-agreement.docx",
    questions: [
      q("agreement_date","Date of agreement","date"),
      q("landlord_name","Landlord full name","text"),
      q("landlord_id_number","Landlord ID number","text"),
      q("landlord_address","Landlord address","textarea"),
      q("landlord_phone","Landlord phone","phone"),
      q("landlord_email","Landlord email","email"),
      q("tenant_name","Tenant full name","text"),
      q("tenant_id_number","Tenant ID number","text"),
      q("tenant_address","Tenant address","textarea"),
      q("tenant_phone","Tenant phone","phone"),
      q("tenant_email","Tenant email","email"),
      q("property_address","Property address","textarea"),
      q("property_type","Property type","select",{options:["apartment","house","commercial","studio"]}),
      q("monthly_rent","Monthly rent (KES)","number"),
      q("rent_due_day","Rent due day (1-28)","number",{default:5}),
      q("security_deposit_amount","Security deposit (KES)","number"),
      q("deposit_return_days","Deposit return period (days)","number",{default:30}),
      q("lease_start_date","Lease start date","date"),
      q("lease_end_date","Lease end date","date"),
      q("lease_term_months","Lease term (months)","number",{default:12}),
      q("notice_period_days","Notice period (days)","number",{default:30}),
      q("utilities_included","Utilities included in rent","textarea",{required:false}),
      q("late_fee_amount","Late fee (KES)","number",{required:false}),
      q("late_fee_grace_days","Late fee grace period (days)","number",{default:7}),
      q("number_of_occupants","Number of occupants","number",{default:1}),
      q("parking_spaces","Parking spaces","number",{default:0,required:false}),
      q("renewal_option","Include renewal option?","boolean",{default:false}),
      q("renewal_notice_days","Renewal notice (days)","number",{default:60,conditionalOn:"renewal_option"}),
      q("has_furniture","Property furnished?","boolean",{default:false}),
      q("furniture_inventory","Furniture inventory","textarea",{conditionalOn:"has_furniture"}),
      q("has_pet_clause","Include pet clause?","boolean",{default:false}),
      q("pet_description","Pet description","textarea",{conditionalOn:"has_pet_clause"}),
      q("pet_deposit_amount","Pet deposit (KES)","number",{conditionalOn:"has_pet_clause"}),
      q("has_subletting","Include subletting clause?","boolean",{default:false}),
      q("has_early_termination","Include early termination clause?","boolean",{default:false}),
      q("early_termination_fee","Early termination fee (KES)","number",{conditionalOn:"has_early_termination"}),
      q("has_guarantor","Include a guarantor?","boolean",{default:false}),
      q("guarantor_name","Guarantor name","text",{conditionalOn:"has_guarantor"}),
      q("guarantor_id_number","Guarantor ID","text",{conditionalOn:"has_guarantor"}),
      q("guarantor_phone","Guarantor phone","phone",{conditionalOn:"has_guarantor"}),
      q("guarantor_address","Guarantor address","textarea",{conditionalOn:"has_guarantor"}),
      q("governing_law","Governing law","text",{default:"Republic of Kenya"}),
    ],
  },
  {
    slug: "demand-letter",
    title: "Demand Letter",
    description: "Formal letter demanding payment of debt with clear terms, deadlines, and consequences of non-compliance.",
    price: 1000, category: "debt", templateFile: "/templates/demand-letter.docx",
    questions: [
      q("letter_date","Date of letter","date"),
      q("creditor_name","Creditor name","text"),
      q("creditor_type","Creditor type","select",{options:["individual","company","partnership"]}),
      q("creditor_id_number","Creditor ID/Reg number","text"),
      q("creditor_address","Creditor address","textarea"),
      q("creditor_phone","Creditor phone","phone"),
      q("creditor_email","Creditor email","email"),
      q("debtor_name","Debtor name","text"),
      q("debtor_address","Debtor address","textarea"),
      q("debt_amount","Debt amount (KES)","number"),
      q("debt_description","Description of the debt","textarea"),
      q("default_date","Date debt became due","date"),
      q("include_interest","Include interest?","boolean",{default:false}),
      q("interest_rate","Interest rate (%)","number",{conditionalOn:"include_interest"}),
      q("demand_deadline_days","Payment deadline (days)","number",{default:7}),
      q("payment_instructions","Payment instructions","textarea"),
      q("legal_consequences","Consequences of non-payment","textarea"),
      q("has_lawyer","Sent by an advocate?","boolean",{default:false}),
      q("lawyer_name","Advocate name","text",{conditionalOn:"has_lawyer"}),
    ],
  },
  {
    slug: "non-disclosure-agreement",
    title: "Non-Disclosure Agreement",
    description: "Protect confidential information with a mutual or one-way NDA suitable for business partnerships and employment.",
    price: 1200, category: "business", templateFile: "/templates/non-disclosure-agreement.docx",
    questions: [
      q("agreement_date","Date of agreement","date"),
      q("disclosing_party_name","Disclosing party name","text"),
      q("disclosing_party_address","Disclosing party address","textarea"),
      q("receiving_party_name","Receiving party name","text"),
      q("receiving_party_address","Receiving party address","textarea"),
      q("nda_type","NDA type","select",{options:["mutual","one_way"]}),
      q("purpose_description","Purpose of disclosure","textarea"),
      q("confidentiality_period_years","Confidentiality period (years)","number",{default:3}),
      q("confidential_info_definition","Definition of confidential information","textarea"),
      q("conf_info_scope","Scope of confidential info","select",{options:["all","specific"]}),
      q("specific_conf_info","Specific confidential info","textarea",{required:false}),
      q("permitted_disclosures","Permitted disclosures","textarea",{required:false}),
      q("exclusions_from_confidential","Exclusions","textarea",{required:false}),
      q("return_of_materials","Require return of materials?","boolean",{default:true}),
      q("return_deadline_days","Return deadline (days)","number",{default:30,conditionalOn:"return_of_materials"}),
      q("oral_disclosures","Cover oral disclosures?","boolean",{default:false}),
      q("oral_confirmation_required","Require written confirmation of oral disclosures?","boolean",{default:false,conditionalOn:"oral_disclosures"}),
      q("has_non_compete","Include non-compete?","boolean",{default:false}),
      q("non_compete_period_months","Non-compete period (months)","number",{conditionalOn:"has_non_compete"}),
      q("non_compete_scope","Non-compete scope","textarea",{conditionalOn:"has_non_compete"}),
      q("has_non_solicit","Include non-solicitation?","boolean",{default:false}),
      q("non_solicit_period_months","Non-solicit period (months)","number",{conditionalOn:"has_non_solicit"}),
      q("has_employees_bound","Bind employees/agents?","boolean",{default:false}),
      q("liquidated_damages","Include liquidated damages?","boolean",{default:false}),
      q("liquidated_damages_amount","Liquidated damages (KES)","number",{conditionalOn:"liquidated_damages"}),
      q("governing_law","Governing law","text",{default:"Republic of Kenya"}),
      q("jurisdiction","Jurisdiction","text",{default:"Kenya"}),
    ],
  },
  // ---- The remaining 15 documents follow the same pattern. Field lists are in
  // TEMPLATE-FIELD-REFERENCE.md; copy them in as you build each document's wizard.
  // Stubs below so routes/catalogue resolve; fill `questions` from the reference file.
  { slug:"commercial-lease", title:"Commercial Lease Agreement", description:"Lease agreement for commercial premises with escalation, service charge, and permitted-use terms.", price:2000, category:"property", templateFile:"/templates/commercial-lease.docx", questions:[] },
  { slug:"land-sale-agreement", title:"Agreement for Sale of Land", description:"Agreement for the sale and purchase of land, including title, consents, and completion terms.", price:2500, category:"property", templateFile:"/templates/land-sale-agreement.docx", questions:[] },
  { slug:"loan-agreement", title:"Loan Agreement", description:"Loan agreement with interest, repayment schedule, security, and guarantor options.", price:1500, category:"debt", templateFile:"/templates/loan-agreement.docx", questions:[] },
  { slug:"guarantor-agreement", title:"Guarantor Agreement", description:"Guarantee of another party's obligations, with limited/unlimited and joint-and-several options.", price:1200, category:"debt", templateFile:"/templates/guarantor-agreement.docx", questions:[] },
  { slug:"service-agreement", title:"Service Agreement", description:"Agreement for the provision of services, with scope, payment, IP, and termination terms.", price:1500, category:"business", templateFile:"/templates/service-agreement.docx", questions:[] },
  { slug:"partnership-agreement", title:"Partnership Agreement", description:"Agreement governing a business partnership: contributions, profit sharing, management, and dissolution.", price:2000, category:"business", templateFile:"/templates/partnership-agreement.docx", questions:[] },
  { slug:"sale-of-goods", title:"Sale of Goods Agreement", description:"Agreement for the sale of goods, with delivery, payment, warranty, and return terms.", price:1500, category:"business", templateFile:"/templates/sale-of-goods.docx", questions:[] },
  { slug:"employment-contract", title:"Employment Contract", description:"Contract of employment compliant with the Employment Act, covering salary, leave, and termination.", price:1500, category:"employment", templateFile:"/templates/employment-contract.docx", questions:[] },
  { slug:"independent-contractor", title:"Independent Contractor Agreement", description:"Agreement engaging an independent contractor, clarifying status, IP, and deliverables.", price:1200, category:"employment", templateFile:"/templates/independent-contractor.docx", questions:[] },
  { slug:"internship-agreement", title:"Internship Agreement", description:"Agreement for an internship or industrial attachment, with objectives, stipend, and duration.", price:1000, category:"employment", templateFile:"/templates/internship-agreement.docx", questions:[] },
  { slug:"last-will", title:"Last Will and Testament", description:"A will compliant with the Law of Succession Act, appointing executors and distributing the estate.", price:2000, category:"family", templateFile:"/templates/last-will.docx", questions:[] },
  { slug:"power-of-attorney", title:"Power of Attorney", description:"General, specific, or enduring power of attorney granting authority to act on the donor's behalf.", price:1500, category:"family", templateFile:"/templates/power-of-attorney.docx", questions:[] },
  { slug:"board-resolution", title:"Board Resolution", description:"A company board or shareholders' resolution under the Companies Act, 2015.", price:1500, category:"corporate", templateFile:"/templates/board-resolution.docx", questions:[] },
  { slug:"shareholders-agreement", title:"Shareholders Agreement", description:"Agreement among shareholders covering transfers, governance, dividends, and exit.", price:2500, category:"corporate", templateFile:"/templates/shareholders-agreement.docx", questions:[] },
  { slug:"consent-letter", title:"Consent Letter (Minor Travel)", description:"Parental consent letter authorising a minor to travel, with accompanying-adult and validity terms.", price:800, category:"family", templateFile:"/templates/consent-letter.docx", questions:[] },
];

export const getDocument = (slug: string) => DOCUMENTS.find(d => d.slug === slug);
