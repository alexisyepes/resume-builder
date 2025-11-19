import { RefObject } from "react"
import {
	CertificationItem,
	CustomSectionItem,
	EducationItem,
	ExperienceItem,
	HobbyItem,
	LanguageItem,
	LinkItem,
	ReferenceItem,
} from "./resume"

export interface InputsProps {
	t: any

	firstName: string
	setFirstName: (value: string) => void

	lastName: string
	setLastName: (value: string) => void

	jobTitle: string
	setJobTitle: (value: string) => void

	// EXPERIENCE
	experience: ExperienceItem[]
	setExperience: (
		value: ExperienceItem[] | ((prev: ExperienceItem[]) => ExperienceItem[])
	) => void

	// SKILLS
	skills: string[]
	setSkills: (value: string[] | ((prev: string[]) => string[])) => void

	suggestedSkills: string[]

	// LINKS
	links: LinkItem[]
	setLinks: (value: LinkItem[] | ((prev: LinkItem[]) => LinkItem[])) => void

	// RESUME GENERATOR
	handleGenerateResume: () => void

	selectedTab: string
	nextTabHandler: () => void

	isLoading: boolean
	regenerateSkillsSuggestions: () => void

	// CERTIFICATIONS
	certifications: CertificationItem[]
	setCertifications: (
		value:
			| CertificationItem[]
			| ((prev: CertificationItem[]) => CertificationItem[])
	) => void

	// EDUCATION
	educations: EducationItem[]
	setEducations: (
		value: EducationItem[] | ((prev: EducationItem[]) => EducationItem[])
	) => void

	// REFERENCES
	references: ReferenceItem[]
	setReferences: (
		value: ReferenceItem[] | ((prev: ReferenceItem[]) => ReferenceItem[])
	) => void

	// HOBBIES
	hobbies: HobbyItem[]
	setHobbies: (
		value: HobbyItem[] | ((prev: HobbyItem[]) => HobbyItem[])
	) => void

	// CUSTOM SECTIONS
	customSections: CustomSectionItem[]
	setCustomSections: (
		value:
			| CustomSectionItem[]
			| ((prev: CustomSectionItem[]) => CustomSectionItem[])
	) => void

	removeTabHandler: (tab: string) => void

	activeTab: string
	tabs: string[]
	setTabs: (tabs: string[] | ((prev: string[]) => string[])) => void

	// LANGUAGES
	languages: LanguageItem[]
	setLanguages: (
		value: LanguageItem[] | ((prev: LanguageItem[]) => LanguageItem[])
	) => void

	setActiveTab: (tab: string) => void

	customTitles: Record<string, string>
	handleCustomTitleOnChange: (key: string, value: string) => void

	editing: string | null
	setEditing: (value: string | null) => void

	inputRef: RefObject<HTMLInputElement>
}
