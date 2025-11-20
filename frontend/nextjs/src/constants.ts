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

export const templateDesigns: TemplateDesign[] = [
    {
        name: "Classic",
        value: "classic",
        image: "/images/templateDesigns/classic.png",
    },
    {
        name: "Classic - ATS",
        value: "classic-ats",
        image: "/images/templateDesigns/classic.png",
    },
    {
        name: "Elegant",
        value: "elegant",
        image: "/images/templateDesigns/elegant.png",
    },
    {
        name: "Modern",
        value: "modern",
        image: "/images/templateDesigns/modern.png",
    },
    // {
    // 	name: "Creative - ATS",
    // 	value: "creative-ats",
    // 	image: "/images/creative-ats.png",
    // },
] as const

export const translationKeyMap: Record<string, string> = {
    personal_information: "personal_information",
    contact_information: "contact_information",
    professional_summary: "professional_summary",
    employment_history: "employment_history",
    skills: "skills",
    education: "education",
    references: "references",
    certifications: "certifications",
    links: "links",
    hobbies: "hobbies",
    languages: "languages",
    customSection: "custom_section",
}
