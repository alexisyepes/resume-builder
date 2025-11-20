import type { ReactNode, RefObject } from "react"

import type { Translation } from "@/utils"
import type {
	CertificationItem,
	CustomSectionItem,
	EducationItem,
	ExperienceItem,
	HobbyItem,
	LanguageItem,
	LinkItem,
	ReferenceItem,
	ResumeData,
	ResumeSnapshot,
} from "./resume"

export interface TemplateCommonProps {
	resumeRef: RefObject<HTMLDivElement>
	resume: ResumeData
	photo?: string
	firstName: string
	lastName: string
	jobTitle: string
	email: string
	phone: string
	address: string
	cityPostCode: string
	experience: ExperienceItem[]
	orderedTabs: string[]
	certifications: CertificationItem[]
	educations: EducationItem[]
	references: ReferenceItem[]
	links: LinkItem[]
	hobbies: HobbyItem[]
	customSections: CustomSectionItem[]
	languages: LanguageItem[]
	objective: string
	skills: string[]
	customTitles: Record<string, string>
	t: Translation
	pages: ReactNode[][]
	template: string
}
