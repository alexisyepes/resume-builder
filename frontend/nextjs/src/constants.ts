export const PERSONAL_DETAILS = "Personal information"
export const CONTACT_INFORMATION = "Contact information"
export const PROFESSIONAL_SUMMARY = "Professional summary"
export const EMPLOYMENT_HISTORY = "Employment History"
export const SKILLS = "Skills"
export const EDUCATION = "Education"
export const REFERENCES = "References"
export const CERTIFICATIONS = "Certifications"
export const LINKS = "Links"
export const HOBBIES = "Hobbies"
export const LANGUAGES = "Languages"
export const CUSTOM_SECTION = "Custom Section"

export type TemplateDesign = {
	name: string
	value: string
	image: string
}

const BASIC_PLAN_PRICE = 4.99
const PREMIUM_PLAN_PRICE = 9.99
export const YEARLY_DISCOUNT_PERCENT = 20
export const PRICING_BASIC_PLAN_MONTHLY = BASIC_PLAN_PRICE.toFixed(2)
export const PRICING_BASIC_PLAN_YEARLY = (
	Number(PRICING_BASIC_PLAN_MONTHLY) *
	12 *
	(1 - YEARLY_DISCOUNT_PERCENT / 100)
).toFixed(2)
export const PRICING_PREMIUM_PLAN_MONTHLY = PREMIUM_PLAN_PRICE.toFixed(2)
export const PRICING_PREMIUM_PLAN_YEARLY = (
	Number(PRICING_PREMIUM_PLAN_MONTHLY) *
	12 *
	(1 - YEARLY_DISCOUNT_PERCENT / 100)
).toFixed(2)
