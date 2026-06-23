# Template Field Reference

Merge fields per document, for populating the `questions` arrays in `documents.ts`.
Types: text, number, date, select, textarea, boolean, phone, email.
"(cond: X)" = show only when boolean field X is true. "(default: N)" = suggested default.
Fully-specced in documents.ts already: tenancy-agreement, demand-letter, non-disclosure-agreement.
Populate the 15 below.

---

## commercial-lease (KES 2,000 · property)
agreement_date(date), lessor_name(text), lessor_id_number(text), lessor_address(textarea),
lessor_phone(phone), lessor_email(email), lessee_name(text), lessee_company_registration(text),
lessee_address(textarea), lessee_phone(phone), lessee_email(email), premises_description(textarea),
premises_square_metres(number), lease_term_years(number), lease_start_date(date), lease_end_date(date),
monthly_rent(number), rent_escalation_percentage(number), rent_escalation_interval(number),
service_charge(number), security_deposit_months(number default:3), deposit_amount(number),
business_hours_start(text), business_hours_end(text), permitted_use(textarea),
signage_rights(boolean), signage_description(textarea cond:signage_rights),
renovation_allowed(boolean), renovation_approval_required(boolean cond:renovation_allowed),
has_guarantor(boolean), guarantor_name(text cond:has_guarantor), guarantor_id_number(text cond:has_guarantor),
lease_renewal_option(boolean), renewal_notice_days(number default:90 cond:lease_renewal_option),
termination_notice_days(number default:90), governing_law(text default:"Republic of Kenya")

## land-sale-agreement (KES 2,500 · property)
agreement_date(date), vendor_name(text), vendor_id_number(text), vendor_phone(phone), vendor_email(email),
purchaser_name(text), purchaser_id_number(text), purchaser_phone(phone), purchaser_email(email),
property_title_number(text), property_lr_number(text), property_location(textarea), property_size(text),
purchase_price(number), deposit_amount(number), deposit_due_date(date), balance_due_date(date),
completion_date(date), has_land_control_board_consent(boolean),
lcb_consent_date(date cond:has_land_control_board_consent), has_encumbrances(boolean),
encumbrance_details(textarea cond:has_encumbrances), has_caveat_emptor(boolean),
caveat_details(textarea cond:has_caveat_emptor), possession_date(date),
governing_law(text default:"Republic of Kenya")

## loan-agreement (KES 1,500 · debt)
agreement_date(date), lender_name(text), lender_id_number(text), lender_address(textarea),
borrower_name(text), borrower_id_number(text), borrower_address(textarea), borrower_phone(phone),
borrower_email(email), loan_amount(number), loan_amount_words(text), interest_rate(number),
interest_type(select: fixed/reducing), repayment_term_months(number), monthly_instalment(number),
first_payment_date(date), disbursement_date(date), late_payment_interest(number),
late_payment_grace_days(number default:7), has_collateral(boolean),
collateral_description(textarea cond:has_collateral), collateral_value(number cond:has_collateral),
has_guarantor(boolean), guarantor_name(text cond:has_guarantor), guarantor_id_number(text cond:has_guarantor),
guarantor_phone(phone cond:has_guarantor), prepayment_allowed(boolean),
prepayment_penalty(number cond:prepayment_allowed), default_interest_rate(number),
loan_purpose(textarea), governing_law(text default:"Republic of Kenya")

## guarantor-agreement (KES 1,200 · debt)
agreement_date(date), creditor_name(text), creditor_address(textarea), principal_debtor_name(text),
principal_debtor_id_number(text), principal_debtor_address(textarea), guarantor_name(text),
guarantor_id_number(text), guarantor_address(textarea), guarantor_phone(phone), guarantor_email(email),
guaranteed_amount(number), guaranteed_amount_words(text), underlying_obligation_description(textarea),
guarantee_type(select: limited/unlimited), guarantee_term_months(number), effective_date(date),
expiry_date(date), demand_before_enforcement(boolean),
demand_period_days(number default:7 cond:demand_before_enforcement),
has_indemnity_clause(boolean), has_joint_and_several(boolean),
co_guarantor_name(text cond:has_joint_and_several), co_guarantor_id_number(text cond:has_joint_and_several),
governing_law(text default:"Republic of Kenya")

## service-agreement (KES 1,500 · business)
agreement_date(date), service_provider_name(text), service_provider_id_number_or_reg(text),
service_provider_address(textarea), service_provider_phone(phone), service_provider_email(email),
client_name(text), client_id_number_or_reg(text), client_address(textarea), client_phone(phone),
client_email(email), service_description(textarea), scope_of_work(textarea), service_start_date(date),
service_end_date(date), contract_term_months(number), payment_amount(number),
payment_frequency(select: one_time/monthly/quarterly/milestone), payment_terms_days(number default:30),
late_payment_interest(number), has_milestones(boolean),
milestone_description(textarea cond:has_milestones), milestone_payment_schedule(textarea cond:has_milestones),
has_renewal_clause(boolean), renewal_term_months(number cond:has_renewal_clause),
termination_notice_days(number default:30), termination_for_cause(boolean),
cure_period_days(number default:14), has_non_compete(boolean),
non_compete_period_months(number cond:has_non_compete), has_confidentiality(boolean),
ip_ownership(select: provider/client/joint), has_indemnification(boolean),
indemnification_scope(textarea cond:has_indemnification), insurance_required(boolean),
insurance_details(textarea cond:insurance_required), governing_law(text default:"Republic of Kenya")

## partnership-agreement (KES 2,000 · business)
agreement_date(date), partnership_name(text), partnership_business_address(textarea),
partnership_business_purpose(textarea), partner_count(number),
partner_1_name(text), partner_1_id_number(text), partner_1_address(textarea), partner_1_contribution(textarea), partner_1_ownership_percentage(number),
partner_2_name(text), partner_2_id_number(text), partner_2_address(textarea), partner_2_contribution(textarea), partner_2_ownership_percentage(number),
partner_3_name(text), partner_3_id_number(text), partner_3_address(textarea), partner_3_contribution(textarea), partner_3_ownership_percentage(number),
capital_contribution_total(number), profit_sharing_ratio(textarea), loss_sharing_ratio(textarea),
has_salary_drawings(boolean), salary_drawings_details(textarea cond:has_salary_drawings),
management_structure(textarea), decision_making(select: unanimous/majority/managing_partner),
managing_partner_name(text cond:[decision_making=managing_partner]), meeting_frequency(text),
voting_rights(textarea), admission_of_new_partners(boolean),
new_partner_approval(select: unanimous/majority cond:admission_of_new_partners),
withdrawal_notice_period(number), dissolution_conditions(textarea),
dispute_resolution(select: mediation/arbitration/litigation), has_non_compete(boolean),
non_compete_period_months(number cond:has_non_compete), accounting_period(text),
auditor_required(boolean), governing_law(text default:"Republic of Kenya")

## sale-of-goods (KES 1,500 · business)
agreement_date(date), seller_name(text), seller_registration_number(text), seller_address(textarea),
seller_phone(phone), seller_email(email), buyer_name(text), buyer_registration_number(text),
buyer_address(textarea), buyer_phone(phone), buyer_email(email), goods_description(textarea),
quantity(number), unit_price(number), total_price(number), currency(text default:"KES"),
delivery_date(date), delivery_location(textarea), delivery_method(textarea), delivery_cost(number),
payment_terms(select: full_upon_order/deposit_balance/upon_delivery/credit),
deposit_percentage(number cond), deposit_due_date(date cond), balance_due_date(date cond),
credit_period_days(number cond), late_payment_interest_rate(number),
inspection_period_days(number default:7), acceptance_criteria(textarea),
warranty_period_months(number), warranty_terms(textarea), has_return_policy(boolean),
return_period_days(number cond:has_return_policy), return_conditions(textarea cond:has_return_policy),
has_installation(boolean), installation_details(textarea cond:has_installation),
governing_law(text default:"Republic of Kenya")

## employment-contract (KES 1,500 · employment)
contract_date(date), employer_name(text), employer_registration_number(text), employer_address(textarea),
employer_phone(phone), employer_email(email), employee_name(text), employee_id_number(text),
employee_date_of_birth(date), employee_gender(select: male/female/other), employee_phone(phone),
employee_email(email), employee_address(textarea), employee_kra_pin(text), employee_nssf_number(text),
employee_nhif_number(text), job_title(text), department(text),
employment_type(select: permanent/fixed_term/probationary/casual), contract_start_date(date),
contract_end_date(date cond:[employment_type=fixed_term]), probation_period_months(number default:3),
probation_extension(boolean), probation_extension_months(number cond:probation_extension),
reporting_to(text), job_description(textarea), workplace_location(textarea),
working_hours_per_week(number default:45), working_days(text), lunch_break_minutes(number default:60),
gross_salary(number), salary_currency(text default:"KES"), payment_date(text),
has_house_allowance(boolean), house_allowance_amount(number cond:has_house_allowance),
has_transport_allowance(boolean), transport_allowance_amount(number cond:has_transport_allowance),
has_medical_cover(boolean), medical_cover_details(textarea cond:has_medical_cover),
annual_leave_days(number default:21), sick_leave_days(number default:30),
maternity_leave_days(number default:90), paternity_leave_days(number default:14),
notice_period_by_employee(number), notice_period_by_employer(number), has_overtime(boolean),
overtime_rate(number cond:has_overtime), has_non_compete(boolean),
non_compete_period_months(number cond:has_non_compete), non_compete_scope(textarea cond:has_non_compete),
has_confidentiality_clause(boolean), disciplinary_policy_reference(textarea),
termination_grounds(textarea), governing_law(text default:"Republic of Kenya")
[NOTE for advocate review: spec said NHIF; Kenya has migrated to SHIF/SHA — confirm wording. Template uses SHIF/NHIF.]

## independent-contractor (KES 1,200 · employment)
agreement_date(date), company_name(text), company_registration(text), company_address(textarea),
company_phone(phone), company_email(email), contractor_name(text), contractor_id_number(text),
contractor_address(textarea), contractor_phone(phone), contractor_email(email), contractor_kra_pin(text),
services_description(textarea), deliverables(textarea), project_start_date(date), project_end_date(date),
contract_term(textarea), compensation_amount(number), compensation_type(select: fixed/hourly/milestone),
payment_schedule(textarea), payment_terms_days(number default:30), has_expenses_reimbursement(boolean),
reimbursable_expenses(textarea cond:has_expenses_reimbursement),
expense_approval_required(boolean cond:has_expenses_reimbursement), has_milestones(boolean),
milestone_description(textarea cond:has_milestones), milestone_payment_amounts(textarea cond:has_milestones),
work_independently(boolean), equipment_provided_by(select: contractor/company),
company_provided_equipment(textarea cond:[equipment_provided_by=company]), insurance_required(boolean),
insurance_type(textarea cond:insurance_required), has_confidentiality(boolean),
ip_ownership(select: company/contractor/joint), has_non_compete(boolean),
non_compete_period_months(number cond:has_non_compete), termination_notice_days(number default:14),
termination_for_cause(boolean), cure_period_days(number default:7),
dispute_resolution(select: mediation/arbitration/court), governing_law(text default:"Republic of Kenya")

## internship-agreement (KES 1,000 · employment)
agreement_date(date), organisation_name(text), organisation_address(textarea), organisation_phone(phone),
organisation_email(email), supervisor_name(text), supervisor_title(text), intern_name(text),
intern_id_number(text), intern_phone(phone), intern_email(email), intern_address(textarea),
intern_institution(text), intern_course(text), intern_year_of_study(number),
internship_type(select: industrial_attachment/internship/apprenticeship), internship_start_date(date),
internship_end_date(date), internship_duration_weeks(number), department(text),
learning_objectives(textarea), duties_and_responsibilities(textarea), has_stipend(boolean),
stipend_amount(number cond:has_stipend), stipend_payment_date(text), has_allowance(boolean),
allowance_type(textarea cond:has_allowance), allowance_amount(number cond:has_allowance),
working_hours(text), working_days(text), has_leave(boolean), leave_days(number cond:has_leave),
confidentiality_required(boolean), reporting_requirements(textarea), evaluation_required(boolean),
evaluation_frequency(textarea cond:evaluation_required), has_extension_option(boolean),
extension_criteria(textarea cond:has_extension_option), termination_notice_days(number default:7),
governing_law(text default:"Republic of Kenya")

## last-will (KES 2,000 · family)
testator_name(text), testator_id_number(text), testator_date_of_birth(date),
testator_gender(select: male/female), testator_phone(phone), testator_email(email),
testator_address(textarea), will_date(date), marital_status(select: married/divorced/widowed/single),
spouse_name(text cond:[marital_status=married]), spouse_id_number(text cond:[marital_status=married]),
number_of_children(number), child_1_name(text), child_1_id_number(text), child_2_name(text),
child_2_id_number(text), child_3_name(text), child_3_id_number(text), child_4_name(text),
child_4_id_number(text), child_5_name(text), child_5_id_number(text), executor_name(text),
executor_id_number(text), executor_address(textarea), executor_phone(phone), executor_email(email),
alternate_executor_name(text), alternate_executor_id_number(text), property_description(textarea),
property_allocation(textarea), has_specific_bequests(boolean),
specific_bequests_details(textarea cond:has_specific_bequests), has_cash_bequests(boolean),
cash_bequests_details(textarea cond:has_cash_bequests), residual_estate_beneficiary(textarea),
has_testamentary_trust(boolean), trust_details(textarea cond:has_testamentary_trust),
trustee_name(text cond:has_testamentary_trust), has_guardian_minor_children(boolean),
guardian_name(text cond:has_guardian_minor_children), guardian_id_number(text cond:has_guardian_minor_children),
funeral_wishes(textarea), witnesses_required(number default:2),
governing_law(text default:"Republic of Kenya"), testator_mental_capacity_confirmed(boolean),
has_previous_wills_revoked(boolean default:true)

## power-of-attorney (KES 1,500 · family)
document_date(date), donor_name(text), donor_id_number(text), donor_dob(date), donor_address(textarea),
donor_phone(phone), donor_email(email), attorney_name(text), attorney_id_number(text),
attorney_address(textarea), attorney_phone(phone), attorney_email(email),
poa_type(select: general/specific/enduring), specific_purpose(textarea cond:[poa_type=specific]),
scope_of_authority(textarea), has_real_estate_powers(boolean), has_financial_powers(boolean),
has_legal_powers(boolean), has_business_powers(boolean), has_banking_powers(boolean),
has_tax_powers(boolean), other_powers_description(textarea), commencement_date(date), expiry_date(date),
is_revocable(boolean default:true), revocation_conditions(textarea cond:is_revocable),
has_alternate_attorney(boolean), alternate_attorney_name(text cond:has_alternate_attorney),
alternate_attorney_id_number(text cond:has_alternate_attorney), has_remuneration(boolean),
remuneration_details(textarea cond:has_remuneration), indemnity_provision(boolean),
notarization_required(boolean), witness_1_name(text), witness_1_id_number(text), witness_2_name(text),
witness_2_id_number(text), governing_law(text default:"Republic of Kenya")

## board-resolution (KES 1,500 · corporate)
resolution_date(date), company_name(text), company_registration_number(text), company_address(textarea),
resolution_number(text), meeting_type(select: annual_general/extraordinary/special/board),
meeting_date(date), meeting_venue(textarea), chairman_name(text), chairman_id_number(text),
secretary_name(text), secretary_id_number(text), directors_present(textarea), quorum_confirmed(boolean),
resolution_title(text), resolution_preamble(textarea), resolution_body(textarea),
resolution_type(select: ordinary/special/unanimous), has_vote(boolean),
votes_for(number cond:has_vote), votes_against(number cond:has_vote), votes_abstain(number cond:has_vote),
is_unanimous(boolean), effective_date(date), has_schedule(boolean),
schedule_description(textarea cond:has_schedule), chairman_to_sign(boolean), secretary_to_sign(boolean),
governing_law(text default:"Republic of Kenya / Companies Act, 2015"), company_seal_affixed(boolean)

## shareholders-agreement (KES 2,500 · corporate)
agreement_date(date), company_name(text), company_registration_number(text), company_address(textarea),
number_of_shareholders(number), shareholder_1_name(text), shareholder_1_id_number(text),
shareholder_1_shares(number), shareholder_1_percentage(number), shareholder_2_name(text),
shareholder_2_id_number(text), shareholder_2_shares(number), shareholder_2_percentage(number),
shareholder_3_name(text), shareholder_3_id_number(text), shareholder_3_shares(number),
shareholder_3_percentage(number), total_authorized_shares(number),
share_class(select: ordinary/preference/other), preference_share_details(textarea cond:[share_class=preference]),
pre_emptive_rights(boolean), right_of_first_refusal(boolean), tag_along_rights(boolean),
drag_along_rights(boolean), board_composition(textarea), board_meeting_frequency(text),
quorum_requirements(textarea), dividend_policy(textarea),
dividend_declaration(select: annual/semi_annual/quarterly), has_veto_rights(boolean),
veto_matters(textarea cond:has_veto_rights), has_share_transfer_restrictions(boolean),
transfer_approval_required(select: board/unanimous/majority cond:has_share_transfer_restrictions),
dispute_resolution(select: mediation/arbitration/court), deadlock_resolution(textarea),
exit_strategy(textarea), has_non_compete_directors(boolean), confidentiality_of_agreement(boolean),
governing_law(text default:"Republic of Kenya / Companies Act, 2015"), jurisdiction(text default:"Kenya")

## consent-letter (KES 800 · family)
document_date(date), parent_1_name(text), parent_1_id_number(text), parent_1_phone(phone),
parent_1_email(email), parent_1_address(textarea), parent_2_name(text cond:[!has_single_parent]),
parent_2_id_number(text cond:[!has_single_parent]), parent_2_phone(phone), parent_2_email(email),
parent_2_address(textarea), has_single_parent(boolean),
single_parent_reason(textarea cond:has_single_parent), minor_name(text), minor_date_of_birth(date),
minor_birth_certificate_number(text), minor_passport_number(text), accompanying_adult_name(text),
accompanying_adult_id_number(text), accompanying_adult_phone(phone), accompanying_adult_relationship(text),
destination_country(text), travel_dates(textarea), travel_purpose(textarea), emergency_contact_name(text),
emergency_contact_phone(phone), duration_of_travel_days(number), return_date(date),
consent_validity_period(textarea), notarization_required(boolean), witness_1_name(text),
witness_1_id_number(text), witness_2_name(text), witness_2_id_number(text),
governing_law(text default:"Republic of Kenya")

---

## "OTHER" / OPEN-ENDED SELECTS — ELABORATION REQUIRED

Global rule (see INTEGRATION-GUIDE.md §5): any select whose value is "other"/"custom"
must reveal a REQUIRED follow-up textarea, and the elaboration text replaces the value
merged into the template.

Select fields in the 18 documents whose options include an open-ended choice
(these specifically need the elaboration follow-up):

- demand-letter: debt_source (loan/goods_services/rent/**other**)
- tenancy-agreement: property_type — no "other" in spec; add one only if you widen options
- nda: conf_info_scope (all/**specific** → "specific" already triggers specific_conf_info textarea)
- last-will: testator_gender, marital_status — closed lists, no elaboration needed
- power-of-attorney: poa_type (general/**specific**/enduring → "specific" triggers specific_purpose)
- service-agreement / independent-contractor: ip_ownership — closed list
- partnership-agreement: decision_making (… /managing_partner → triggers managing_partner_name)

Also apply the rule to any free-form "type"/"category" select you ADD later.
Where a select already has a dedicated conditional follow-up (e.g. nda "specific" →
specific_conf_info, poa "specific" → specific_purpose), that existing conditional field
IS the elaboration — no second box needed; just make it required when triggered.

For demand-letter `debt_source = other`: collect the description into `debt_description`
(already a required field) — so "other" naturally flows into the existing description.
