export interface ContactInfo {
	email: string
	phone: string
	address: string
	cityPostCode: string
}

export interface EducationItem {
	degree: string
	institution: string
	year: string
}

export interface ExperienceItem {
	company: string
	role: string
	project?: string
	year: string
	responsibilities: string[]
}

export interface ReferenceItem {
	name: string
	relationship: string
	contact: string
}

export interface CertificationItem {
	institution: string
	name: string
	year?: string
}

export interface LanguageItem {
	language: string
	level?: string
}

export interface HobbyItem {
	hobby: string
}

export interface LinkItem {
	name: string
	url: string
}

export interface CustomSectionItem {
	header: string
	subHeader?: string
	content?: string
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
