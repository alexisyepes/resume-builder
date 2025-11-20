export interface ContactInfo {
	email: string
	phone: string
	address: string
	cityPostCode: string
}

export interface ExperienceItem {
	company: string
	role: string
	project?: string
	year: string
	responsibilities: string[]
}

export interface EducationItem {
	institution: string
	degree: string
	year: string
}

export interface ReferenceItem {
	name: string
	company: string
	email_phone: string
}

export interface CertificationItem {
	institution: string
	certificationName: string
	year?: string
}

export interface LanguageItem {
	language: string
	proficiency?: string
}

export interface HobbyItem {
	hobbies: string
}

export interface LinkItem {
	name: string
	link: string
}

export interface CustomSectionItem {
	header: string
	subHeader?: string
	content?: string
}

export interface ResumeSnapshot {
	firstName: string
	lastName: string
	jobTitle: string
	email: string
	phone: string
	address: string
	cityPostCode: string
	objective: string
	skills: string[]
	experience: ExperienceItem[]
	certifications: CertificationItem[]
	educations: EducationItem[]
	references: ReferenceItem[]
	links: LinkItem[]
	hobbies: HobbyItem[]
	customSections: CustomSectionItem[]
	languages: LanguageItem[]
	photo?: string
}

export interface ResumeExportData extends ResumeSnapshot {
	orderedTabs: string[]
	template: string
	contact?: ContactInfo
	professional_summary_title?: string
	employment_history_title?: string
	certifications_title?: string
	links_title?: string
	skills_title?: string
	education_title?: string
	hobbies_title?: string
	references_title?: string
	languages_title?: string
}

export interface ResumeData {
	firstName: string
	lastName: string
	jobTitle: string
	contact: ContactInfo
	objective: string
	education: EducationItem[]
	experience: ExperienceItem[]
	skills: string[]
	references: ReferenceItem[]
	certifications?: CertificationItem[]
	languages?: LanguageItem[]
	hobbies?: HobbyItem[]
	links?: LinkItem[]
	customSections?: CustomSectionItem[]
}

export interface GeneratedResume {
	resume: ResumeData
}
