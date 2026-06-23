# TEMPLATE MASTER SPECIFICATION
# Give this file to Claude (or your advocate) to create the actual .docx files
# Each .docx goes in /templates/{slug}.docx with {{merge_field}} placeholders

## NAMING CONVENTION FOR PLACEHOLDERS
# Use double curly braces: {{variable_name}}
# Example: "This Agreement is made between {{landlord_name}} (hereinafter 'Landlord')"
#
# For optional clauses, the entire clause block should be wrapped:
# {{#optional_pet_clause}}
#   [clause text here]
# {{/optional_pet_clause}}
#
# For lists/arrays:
# {{#list_items}}
#   - {{item}}
# {{/list_items}}
#
# For conditionals (boolean):
# {{#has_co_signer}}
#   [co-signer clause]
# {{/has_co_signer}}

---

## 1. TENANCY AGREEMENT  (existing)
slug: tenancy-agreement
price: KES 1,500
category: property

### Merge fields:
- agreement_date (date)
- landlord_name (text)
- landlord_id_number (text)
- landlord_address (textarea)
- landlord_phone (phone)
- landlord_email (email)
- tenant_name (text)
- tenant_id_number (text)
- tenant_address (textarea)
- tenant_phone (phone)
- tenant_email (email)
- property_address (textarea)
- property_type (select: apartment/house/commercial/studio)
- monthly_rent (number)
- rent_due_day (number: 1-28)
- security_deposit_amount (number)
- deposit_return_days (number: default 30)
- lease_start_date (date)
- lease_end_date (date)
- lease_term_months (number)
- notice_period_days (number: default 30)
- utilities_included (textarea: which utilities)
- late_fee_amount (number)
- late_fee_grace_days (number: default 7)
- renewal_option (boolean)
- renewal_notice_days (number: default 60)
- has_guarantor (boolean)
- guarantor_name (text, conditional)
- guarantor_id_number (text, conditional)
- guarantor_phone (phone, conditional)
- guarantor_address (textarea, conditional)
- has_pet_clause (boolean)
- pet_description (textarea, conditional)
- pet_deposit_amount (number, conditional)
- has_subletting (boolean)
- has_early_termination (boolean)
- early_termination_fee (number, conditional)
- number_of_occupants (number)
- parking_spaces (number)
- has_furniture (boolean)
- furniture_inventory (textarea, conditional)
- governing_law (default: "Republic of Kenya")

### .docx structure:
- Title: "RESIDENTIAL TENANCY AGREEMENT"
- Parties section: Landlord and Tenant
- Premises: property_address
- Term: lease_start_date to lease_end_date
- Rent clause: monthly_rent, rent_due_day
- Deposit clause: security_deposit_amount, deposit_return_days
- Utilities: utilities_included
- Late payment: late_fee_amount, late_fee_grace_days
- {{#has_pet_clause}}Pet clause{{/has_pet_clause}}
- {{#has_guarantor}}Guarantor clause{{/has_guarantor}}
- {{#has_subletting}}Subletting clause{{/has_subletting}}
- {{#has_early_termination}}Early termination clause{{/has_early_termination}}
- Occupancy limits
- Governing law: laws of Kenya
- Signatures: Landlord, Tenant, (witness)

---

## 2. COMMERCIAL LEASE AGREEMENT
slug: commercial-lease
price: KES 2,000
category: property

### Merge fields:
- agreement_date (date)
- lessor_name (text)
- lessor_id_number (text)
- lessor_address (textarea)
- lessor_phone (phone)
- lessor_email (email)
- lessee_name (text)
- lessee_company_registration (text)
- lessee_address (textarea)
- lessee_phone (phone)
- lessee_email (email)
- premises_description (textarea)
- premises_square_metres (number)
- lease_term_years (number)
- lease_start_date (date)
- lease_end_date (date)
- monthly_rent (number)
- rent_escalation_percentage (number)
- rent_escalation_interval (number: months)
- service_charge (number)
- security_deposit_months (number: default 3)
- deposit_amount (number)
- business_hours_start (text: "8:00 AM")
- business_hours_end (text: "6:00 PM")
- permitted_use (textarea)
- signage_rights (boolean)
- signage_description (textarea, conditional)
- renovation_allowed (boolean)
- renovation_approval_required (boolean, conditional)
- has_guarantor (boolean)
- guarantor_name (text, conditional)
- guarantor_id_number (text, conditional)
- lease_renewal_option (boolean)
- renewal_notice_days (number: default 90)
- termination_notice_days (number: default 90)
- governing_law (default: "Republic of Kenya")

---

## 3. AGREEMENT FOR SALE OF LAND
slug: land-sale-agreement
price: KES 2,500
category: property

### Merge fields:
- agreement_date (date)
- vendor_name (text)
- vendor_id_number (text)
- vendor_phone (phone)
- vendor_email (email)
- purchaser_name (text)
- purchaser_id_number (text)
- purchaser_phone (phone)
- purchaser_email (email)
- property_title_number (text)
- property_lr_number (text)
- property_location (textarea)
- property_size (text: acres/hectares)
- purchase_price (number)
- deposit_amount (number)
- deposit_due_date (date)
- balance_due_date (date)
- completion_date (date)
- has_land_control_board_consent (boolean)
- lcb_consent_date (date, conditional)
- has_encumbrances (boolean)
- encumbrance_details (textarea, conditional)
- has_caveat_emptor (boolean)
- caveat_details (textarea, conditional)
- possession_date (date)
- governing_law (default: "Republic of Kenya")

---

## 4. DEMAND LETTER  (existing)
slug: demand-letter
price: KES 1,000
category: debt

### Merge fields:
- letter_date (date)
- creditor_name (text)
- creditor_type (select: individual/company/partnership)
- creditor_id_number (number)
- creditor_address (textarea)
- creditor_phone (phone)
- creditor_email (email)
- debtor_name (text)
- debtor_type (select: individual/company/partnership)
- debtor_id_number (number)
- debtor_address (textarea)
- debtor_phone (phone)
- debtor_email (email)
- debt_amount (number)
- debt_source (select: loan/goods_services/rent/other)
- debt_description (textarea)
- contract_date (date, conditional on debt_source)
- invoice_number (text, conditional on debt_source)
- default_date (date)
- interest_rate (number)
- include_interest (boolean)
- has_lawyer (boolean)
- lawyer_name (text, conditional)
- has_contract (boolean)
- demand_deadline_days (number: default 7)
- payment_instructions (textarea)
- legal_consequences (textarea)

### .docx structure:
- Title: "DEMAND LETTER" (formal letterhead style)
- Creditor info block
- Date
- Debtor name and address
- Re: "DEMAND FOR PAYMENT"
- Body: debt_description, debt_amount, default_date
- Interest: {{#include_interest}}interest clause{{/include_interest}}
- Deadline: demand_deadline_days
- Consequences: legal_consequences
- {{#has_lawyer}}Lawyer signature{{/has_lawyer}}
- {{^has_lawyer}}Creditor signature{{/has_lawyer}}

---

## 5. LOAN AGREEMENT
slug: loan-agreement
price: KES 1,500
category: debt

### Merge fields:
- agreement_date (date)
- lender_name (text)
- lender_id_number (text)
- lender_address (textarea)
- borrower_name (text)
- borrower_id_number (text)
- borrower_address (textarea)
- borrower_phone (phone)
- borrower_email (email)
- loan_amount (number)
- loan_amount_words (text)
- interest_rate (number: percentage)
- interest_type (select: fixed/reducing)
- repayment_term_months (number)
- monthly_instalment (number)
- first_payment_date (date)
- disbursement_date (date)
- late_payment_interest (number: percentage)
- late_payment_grace_days (number: default 7)
- has_collateral (boolean)
- collateral_description (textarea, conditional)
- collateral_value (number, conditional)
- has_guarantor (boolean)
- guarantor_name (text, conditional)
- guarantor_id_number (text, conditional)
- guarantor_phone (phone, conditional)
- prepayment_allowed (boolean)
- prepayment_penalty (number: percentage, conditional)
- default_interest_rate (number)
- loan_purpose (textarea)
- governing_law (default: "Republic of Kenya")

---

## 6. GUARANTOR AGREEMENT
slug: guarantor-agreement
price: KES 1,200
category: debt

### Merge fields:
- agreement_date (date)
- creditor_name (text)
- creditor_address (textarea)
- principal_debtor_name (text)
- principal_debtor_id_number (text)
- principal_debtor_address (textarea)
- guarantor_name (text)
- guarantor_id_number (text)
- guarantor_address (textarea)
- guarantor_phone (phone)
- guarantor_email (email)
- guaranteed_amount (number)
- guaranteed_amount_words (text)
- underlying_obligation_description (textarea)
- guarantee_type (select: limited/unlimited)
- guarantee_term_months (number)
- effective_date (date)
- expiry_date (date)
- demand_before_enforcement (boolean)
- demand_period_days (number: default 7)
- governing_law (default: "Republic of Kenya")
- has_indemnity_clause (boolean)
- has_joint_and_several (boolean)
- co_guarantor_name (text, conditional)
- co_guarantor_id_number (text, conditional)

---

## 7. NON-DISCLOSURE AGREEMENT  (existing)
slug: non-disclosure-agreement
price: KES 1,200
category: business

### Merge fields:
- agreement_date (date)
- disclosing_party_name (text)
- disclosing_party_address (textarea)
- receiving_party_name (text)
- receiving_party_address (textarea)
- nda_type (select: mutual/one_way)
- purpose_description (textarea)
- confidentiality_period_years (number)
- confidential_info_definition (textarea)
- conf_info_scope (select: all/specific)
- specific_conf_info (textarea, conditional)
- permitted_disclosures (textarea)
- exclusions_from_confidential (textarea)
- return_of_materials (boolean)
- return_deadline_days (number: default 30)
- governing_law (default: "Republic of Kenya")
- jurisdiction (text: "Kenya")
- has_non_compete (boolean)
- non_compete_period_months (number, conditional)
- non_compete_scope (textarea, conditional)
- has_non_solicit (boolean)
- non_solicit_period_months (number, conditional)
- oral_disclosures (boolean)
- oral_confirmation_required (boolean, conditional)
- has_employees_bound (boolean)
- liquidated_damages (boolean)
- liquidated_damages_amount (number, conditional)

### .docx structure:
- Title: "NON-DISCLOSURE AGREEMENT" (or "MUTUAL NDA" if mutual)
- {{#nda_type}} {{#one_way}}One-way structure{{/one_way}} {{#mutual}}Mutual structure{{/mutual}} {{/nda_type}}
- Definition of Confidential Information
- Exclusions
- Obligations of Receiving Party
- {{#return_of_materials}}Return clause{{/return_of_materials}}
- {{#has_non_compete}}Non-compete clause{{/has_non_compete}}
- {{#has_non_solicit}}Non-solicit clause{{/has_non_solicit}}
- {{#liquidated_damages}}Liquidated damages clause{{/liquidated_damages}}
- Term: confidentiality_period_years
- Governing law
- Signatures

---

## 8. SERVICE AGREEMENT
slug: service-agreement
price: KES 1,500
category: business

### Merge fields:
- agreement_date (date)
- service_provider_name (text)
- service_provider_id_number_or_reg (text)
- service_provider_address (textarea)
- service_provider_phone (phone)
- service_provider_email (email)
- client_name (text)
- client_id_number_or_reg (text)
- client_address (textarea)
- client_phone (phone)
- client_email (email)
- service_description (textarea)
- scope_of_work (textarea)
- service_start_date (date)
- service_end_date (date)
- contract_term_months (number)
- payment_amount (number)
- payment_frequency (select: one_time/monthly/quarterly/milestone)
- payment_terms_days (number: default 30)
- late_payment_interest (number)
- has_milestones (boolean)
- milestone_description (textarea, conditional)
- milestone_payment_schedule (textarea, conditional)
- has_renewal_clause (boolean)
- renewal_term_months (number, conditional)
- termination_notice_days (number: default 30)
- termination_for_cause (boolean)
- cure_period_days (number: default 14)
- has_non_compete (boolean)
- non_compete_period_months (number, conditional)
- has_confidentiality (boolean)
- ip_ownership (select: provider/client/joint)
- has_indemnification (boolean)
- indemnification_scope (textarea, conditional)
- insurance_required (boolean)
- insurance_details (textarea, conditional)
- governing_law (default: "Republic of Kenya")

---

## 9. PARTNERSHIP AGREEMENT
slug: partnership-agreement
price: KES 2,000
category: business

### Merge fields:
- agreement_date (date)
- partnership_name (text)
- partnership_business_address (textarea)
- partnership_business_purpose (textarea)
- partner_count (number)
- partner_1_name (text)
- partner_1_id_number (text)
- partner_1_address (textarea)
- partner_1_contribution (textarea)
- partner_1_ownership_percentage (number)
- partner_2_name (text)
- partner_2_id_number (text)
- partner_2_address (textarea)
- partner_2_contribution (textarea)
- partner_2_ownership_percentage (number)
- partner_3_name (text)
- partner_3_id_number (text)
- partner_3_address (textarea)
- partner_3_contribution (textarea)
- partner_3_ownership_percentage (number)
- capital_contribution_total (number)
- profit_sharing_ratio (textarea)
- loss_sharing_ratio (textarea)
- has_salary_drawings (boolean)
- salary_drawings_details (textarea)
- management_structure (textarea)
- decision_making (select: unanimous/majority/managing_partner)
- managing_partner_name (text, conditional)
- meeting_frequency (text: "quarterly")
- voting_rights (textarea)
- admission_of_new_partners (boolean)
- new_partner_approval (select: unanimous/majority)
- withdrawal_notice_period (number: days)
- dissolution_conditions (textarea)
- dispute_resolution (select: mediation/arbitration/litigation)
- has_non_compete (boolean)
- non_compete_period_months (number, conditional)
- accounting_period (text: "financial year ending 31 December")
- auditor_required (boolean)
- governing_law (default: "Republic of Kenya")

---

## 10. SALE OF GOODS AGREEMENT
slug: sale-of-goods
price: KES 1,500
category: business

### Merge fields:
- agreement_date (date)
- seller_name (text)
- seller_registration_number (text)
- seller_address (textarea)
- seller_phone (phone)
- seller_email (email)
- buyer_name (text)
- buyer_registration_number (text)
- buyer_address (textarea)
- buyer_phone (phone)
- buyer_email (email)
- goods_description (textarea)
- quantity (number)
- unit_price (number)
- total_price (number)
- currency (default: "KES")
- delivery_date (date)
- delivery_location (textarea)
- delivery_method (textarea)
- delivery_cost (number)
- payment_terms (select: full_upon_order/deposit_balance/upon_delivery/credit)
- deposit_percentage (number, conditional)
- deposit_due_date (date, conditional)
- balance_due_date (date, conditional)
- credit_period_days (number, conditional)
- late_payment_interest_rate (number)
- inspection_period_days (number: default 7)
- acceptance_criteria (textarea)
- warranty_period_months (number)
- warranty_terms (textarea)
- has_return_policy (boolean)
- return_period_days (number, conditional)
- return_conditions (textarea, conditional)
- has_installation (boolean)
- installation_details (textarea, conditional)
- governing_law (default: "Republic of Kenya")

---

## 11. EMPLOYMENT CONTRACT
slug: employment-contract
price: KES 1,500
category: employment

### Merge fields:
- contract_date (date)
- employer_name (text)
- employer_registration_number (text)
- employer_address (textarea)
- employer_phone (phone)
- employer_email (email)
- employee_name (text)
- employee_id_number (text)
- employee_date_of_birth (date)
- employee_gender (select: male/female/other)
- employee_phone (phone)
- employee_email (email)
- employee_address (textarea)
- employee_kra_pin (text)
- employee_nssf_number (text)
- employee_nhif_number (text)
- job_title (text)
- department (text)
- employment_type (select: permanent/fixed_term/probationary/casual)
- contract_start_date (date)
- contract_end_date (date, conditional)
- probation_period_months (number: default 3)
- probation_extension (boolean)
- probation_extension_months (number, conditional)
- reporting_to (text)
- job_description (textarea)
- workplace_location (textarea)
- working_hours_per_week (number: default 45)
- working_days (text: "Monday to Friday")
- lunch_break_minutes (number: default 60)
- gross_salary (number)
- salary_currency (default: "KES")
- payment_date (text: "last working day of the month")
- has_house_allowance (boolean)
- house_allowance_amount (number, conditional)
- has_transport_allowance (boolean)
- transport_allowance_amount (number, conditional)
- has_medical_cover (boolean)
- medical_cover_details (textarea, conditional)
- annual_leave_days (number: default 21)
- sick_leave_days (number: default 30)
- maternity_leave_days (number: default 90)
- paternity_leave_days (number: default 14)
- notice_period_by_employee (number: days)
- notice_period_by_employer (number: days)
- has_overtime (boolean)
- overtime_rate (number: multiplier, conditional)
- has_non_compete (boolean)
- non_compete_period_months (number, conditional)
- non_compete_scope (textarea, conditional)
- has_confidentiality_clause (boolean)
- disciplinary_policy_reference (textarea)
- termination_grounds (textarea)
- governing_law (default: "Republic of Kenya")
- parties_acknowledge (boolean: confirmation)

---

## 12. INDEPENDENT CONTRACTOR AGREEMENT
slug: independent-contractor
price: KES 1,200
category: employment

### Merge fields:
- agreement_date (date)
- company_name (text)
- company_registration (text)
- company_address (textarea)
- company_phone (phone)
- company_email (email)
- contractor_name (text)
- contractor_id_number (text)
- contractor_address (textarea)
- contractor_phone (phone)
- contractor_email (email)
- contractor_kra_pin (text)
- services_description (textarea)
- deliverables (textarea)
- project_start_date (date)
- project_end_date (date)
- contract_term (textarea)
- compensation_amount (number)
- compensation_type (select: fixed/hourly/milestone)
- payment_schedule (textarea)
- payment_terms_days (number: default 30)
- has_expenses_reimbursement (boolean)
- reimbursable_expenses (textarea, conditional)
- expense_approval_required (boolean, conditional)
- has_milestones (boolean)
- milestone_description (textarea, conditional)
- milestone_payment_amounts (textarea, conditional)
- work_independently (boolean)
- equipment_provided_by (select: contractor/company)
- company_provided_equipment (textarea, conditional)
- insurance_required (boolean)
- insurance_type (textarea, conditional)
- has_confidentiality (boolean)
- ip_ownership (select: company/contractor/joint)
- has_non_compete (boolean)
- non_compete_period_months (number, conditional)
- termination_notice_days (number: default 14)
- termination_for_cause (boolean)
- cure_period_days (number: default 7)
- dispute_resolution (select: mediation/arbitration/court)
- governing_law (default: "Republic of Kenya")

---

## 13. INTERNSHIP AGREEMENT
slug: internship-agreement
price: KES 1,000
category: employment

### Merge fields:
- agreement_date (date)
- organisation_name (text)
- organisation_address (textarea)
- organisation_phone (phone)
- organisation_email (email)
- supervisor_name (text)
- supervisor_title (text)
- intern_name (text)
- intern_id_number (text)
- intern_phone (phone)
- intern_email (email)
- intern_address (textarea)
- intern_institution (text)
- intern_course (text)
- intern_year_of_study (number)
- internship_type (select: industrial_attachment/internship/apprenticeship)
- internship_start_date (date)
- internship_end_date (date)
- internship_duration_weeks (number)
- department (text)
- learning_objectives (textarea)
- duties_and_responsibilities (textarea)
- has_stipend (boolean)
- stipend_amount (number, conditional)
- stipend_payment_date (text: "25th of each month")
- has_allowance (boolean)
- allowance_type (textarea, conditional)
- allowance_amount (number, conditional)
- working_hours (text: "40 hours per week")
- working_days (text: "Monday to Friday")
- has_leave (boolean)
- leave_days (number, conditional: default 0)
- confidentiality_required (boolean)
- reporting_requirements (textarea)
- evaluation_required (boolean)
- evaluation_frequency (textarea, conditional)
- has_extension_option (boolean)
- extension_criteria (textarea, conditional)
- termination_notice_days (number: default 7)
- governing_law ("Republic of Kenya")

---

## 14. LAST WILL AND TESTAMENT
slug: last-will
price: KES 2,000
category: family

### Merge fields:
- testator_name (text)
- testator_id_number (text)
- testator_date_of_birth (date)
- testator_gender (select: male/female)
- testator_phone (phone)
- testator_email (email)
- testator_address (textarea)
- will_date (date)
- marital_status (select: married/divorced/widowed/single)
- spouse_name (text, conditional)
- spouse_id_number (text, conditional)
- number_of_children (number)
- child_1_name (text)
- child_1_id_number (text)
- child_2_name (text)
- child_2_id_number (text)
- child_3_name (text)
- child_3_id_number (text)
- child_4_name (text)
- child_4_id_number (text)
- child_5_name (text)
- child_5_id_number (text)
- executor_name (text)
- executor_id_number (text)
- executor_address (textarea)
- executor_phone (phone)
- executor_email (email)
- alternate_executor_name (text)
- alternate_executor_id_number (text)
- property_description (textarea)
- property_allocation (textarea)
- has_specific_bequests (boolean)
- specific_bequests_details (textarea, conditional)
- has_cash_bequests (boolean)
- cash_bequests_details (textarea, conditional)
- residual_estate_beneficiary (textarea)
- has_testamentary_trust (boolean)
- trust_details (textarea, conditional)
- trustee_name (text, conditional)
- has_guardian_minor_children (boolean)
- guardian_name (text, conditional)
- guardian_id_number (text, conditional)
- funeral_wishes (textarea)
- witnesses_required (number: default 2)
- governing_law (default: "Republic of Kenya")
- testator_mental_capacity_confirmed (boolean)
- has_previous_wills_revoked (boolean: default true)

---

## 15. POWER OF ATTORNEY
slug: power-of-attorney
price: KES 1,500
category: family

### Merge fields:
- document_date (date)
- donor_name (text)
- donor_id_number (text)
- donor_dob (date)
- donor_address (textarea)
- donor_phone (phone)
- donor_email (email)
- attorney_name (text)
- attorney_id_number (text)
- attorney_address (textarea)
- attorney_phone (phone)
- attorney_email (email)
- poa_type (select: general/specific/enduring)
- specific_purpose (textarea, conditional on type)
- scope_of_authority (textarea)
- has_real_estate_powers (boolean)
- has_financial_powers (boolean)
- has_legal_powers (boolean)
- has_business_powers (boolean)
- has_banking_powers (boolean)
- has_tax_powers (boolean)
- other_powers_description (textarea)
- commencement_date (date)
- expiry_date (date)
- is_revocable (boolean: default true)
- revocation_conditions (textarea, conditional)
- has_alternate_attorney (boolean)
- alternate_attorney_name (text, conditional)
- alternate_attorney_id_number (text, conditional)
- has_remuneration (boolean)
- remuneration_details (textarea, conditional)
- indemnity_provision (boolean)
- notarization_required (boolean)
- witness_1_name (text)
- witness_1_id_number (text)
- witness_2_name (text)
- witness_2_id_number (text)
- governing_law (default: "Republic of Kenya")

---

## 16. BOARD RESOLUTION
slug: board-resolution
price: KES 1,500
category: corporate

### Merge fields:
- resolution_date (date)
- company_name (text)
- company_registration_number (text)
- company_address (textarea)
- resolution_number (text)
- meeting_type (select: annual_general/extraordinary/special/board)
- meeting_date (date)
- meeting_venue (textarea)
- chairman_name (text)
- chairman_id_number (text)
- secretary_name (text)
- secretary_id_number (text)
- directors_present (textarea)
- quorum_confirmed (boolean)
- resolution_title (text)
- resolution_preamble (textarea)
- resolution_body (textarea)
- resolution_type (select: ordinary/special/unanimous)
- has_vote (boolean)
- votes_for (number, conditional)
- votes_against (number, conditional)
- votes_abstain (number, conditional)
- is_unanimous (boolean)
- effective_date (date)
- has_schedule (boolean)
- schedule_description (textarea, conditional)
- chairman_to_sign (boolean)
- secretary_to_sign (boolean)
- governing_law (default: "Republic of Kenya / Companies Act, 2015")
- company_seal_affixed (boolean)

---

## 17. SHAREHOLDERS AGREEMENT
slug: shareholders-agreement
price: KES 2,500
category: corporate

### Merge fields:
- agreement_date (date)
- company_name (text)
- company_registration_number (text)
- company_address (textarea)
- number_of_shareholders (number)
- shareholder_1_name (text)
- shareholder_1_id_number (text)
- shareholder_1_shares (number)
- shareholder_1_percentage (number)
- shareholder_2_name (text)
- shareholder_2_id_number (text)
- shareholder_2_shares (number)
- shareholder_2_percentage (number)
- shareholder_3_name (text)
- shareholder_3_id_number (text)
- shareholder_3_shares (number)
- shareholder_3_percentage (number)
- total_authorized_shares (number)
- share_class (select: ordinary/preference/other)
- preference_share_details (textarea, conditional)
- pre_emptive_rights (boolean)
- right_of_first_refusal (boolean)
- tag_along_rights (boolean)
- drag_along_rights (boolean)
- board_composition (textarea)
- board_meeting_frequency (text)
- quorum_requirements (textarea)
- dividend_policy (textarea)
- dividend_declaration (select: annual/semi_annual/quarterly)
- has_veto_rights (boolean)
- veto_matters (textarea, conditional)
- has_share_transfer_restrictions (boolean)
- transfer_approval_required (select: board/unanimous/majority, conditional)
- dispute_resolution (select: mediation/arbitration/court)
- deadlock_resolution (textarea)
- exit_strategy (textarea)
- has_non_compete_directors (boolean)
- confidentiality_of_agreement (boolean)
- governing_law (default: "Republic of Kenya / Companies Act, 2015")
- jurisdiction (text: "Kenya")

---

## 18. CONSENT LETTER (minor travel)
slug: consent-letter
price: KES 800
category: family

### Merge fields:
- document_date (date)
- parent_1_name (text)
- parent_1_id_number (text)
- parent_1_phone (phone)
- parent_1_email (email)
- parent_1_address (textarea)
- parent_2_name (text)
- parent_2_id_number (text)
- parent_2_phone (phone)
- parent_2_email (email)
- parent_2_address (textarea)
- has_single_parent (boolean)
- single_parent_reason (textarea, conditional)
- minor_name (text)
- minor_date_of_birth (date)
- minor_birth_certificate_number (text)
- minor_passport_number (text)
- accompanying_adult_name (text)
- accompanying_adult_id_number (text)
- accompanying_adult_phone (phone)
- accompanying_adult_relationship (text)
- destination_country (text)
- travel_dates (textarea)
- travel_purpose (textarea)
- emergency_contact_name (text)
- emergency_contact_phone (phone)
- duration_of_travel_days (number)
- return_date (date)
- consent_validity_period (textarea)
- notarization_required (boolean)
- witness_1_name (text)
- witness_1_id_number (text)
- witness_2_name (text)
- witness_2_id_number (text)
- governing_law ("Republic of Kenya")

---

## INSTRUCTIONS FOR CLAUDE (OR ADVOCATE)

For each template listed above:

1. Create a `.docx` file using docxtemplater syntax
2. Save it to `/templates/{slug}.docx` in the LegalDocsKE project
3. Use `{{variable_name}}` for single-value fields
4. Use `{{#boolean_variable}}...{{/boolean_variable}}` for conditional/optional clauses
5. Use `{{#list_name}}{{.}}{{/list_name}}` for repeating elements (if any)

### Example clause with conditionals:

```
{{#has_pet_clause}}
13. PET CLAUSE
The Tenant shall not keep any pets on the Premises except for the following: {{pet_description}}.
A non-refundable pet deposit of KES {{pet_deposit_amount}} shall be paid upon signing.
{{/has_pet_clause}}
```

### Template file naming:
The file in `/templates/` must match the slug exactly:
- `templates/tenancy-agreement.docx`
- `templates/commercial-lease.docx`
- `templates/land-sale-agreement.docx`
- ... (one .docx per slug)

### Pricing summary for the data/documents.ts:
- KES 800: consent-letter
- KES 1,000: demand-letter, internship-agreement
- KES 1,200: non-disclosure-agreement, independent-contractor, guarantor-agreement
- KES 1,500: tenancy-agreement, loan-agreement, service-agreement, sale-of-goods, employment-contract, power-of-attorney, board-resolution
- KES 2,000: commercial-lease, partnership-agreement, last-will
- KES 2,500: land-sale-agreement, shareholders-agreement
