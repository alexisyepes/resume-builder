import type {
	CertificationItem,
	CustomSectionItem,
	EducationItem,
	ExperienceItem,
	GeneratedResume,
	HobbyItem,
	LanguageItem,
	LinkItem,
	ReferenceItem,
} from "./resume"

type ResumeUser = Record<string, unknown> | null

export interface ResumeStore {
	apiBaseUrl: string | undefined

	firstName: string
	setFirstName: (value: string) => void

	lastName: string
	setLastName: (value: string) => void

	jobTitle: string
	setJobTitle: (value: string) => void

	photo: string
	setPhoto: (value: string) => void

	fileName: string
	setFileName: (value: string) => void

	email: string
	setEmail: (value: string) => void

	phone: string
	setPhone: (value: string) => void

	address: string
	setAddress: (value: string) => void

	cityPostCode: string
	setCityPostCode: (value: string) => void

	// Tabs
	tabs: string[]
	setTabs: (value: string[] | ((prev: string[]) => string[])) => void

	// Skills
	skills: string[]
	setSkills: (value: string[] | ((prev: string[]) => string[])) => void

	suggestedSkills: string[]
	setSuggestedSkills: (value: string[]) => void

	// Languages
	languages: LanguageItem[]
	setLanguages: (
		value: LanguageItem[] | ((prev: LanguageItem[]) => LanguageItem[])
	) => void

	// Experience
	experience: ExperienceItem[]
	setExperience: (
		value: ExperienceItem[] | ((prev: ExperienceItem[]) => ExperienceItem[])
	) => void

	// Certifications
	certifications: CertificationItem[]
	setCertifications: (
		value:
			| CertificationItem[]
			| ((prev: CertificationItem[]) => CertificationItem[])
	) => void

	// References
	references: ReferenceItem[]
	setReferences: (
		value: ReferenceItem[] | ((prev: ReferenceItem[]) => ReferenceItem[])
	) => void

	// Educations
	educations: EducationItem[]
	setEducations: (
		value: EducationItem[] | ((prev: EducationItem[]) => EducationItem[])
	) => void

	// Links
	links: LinkItem[]
	setLinks: (value: LinkItem[] | ((prev: LinkItem[]) => LinkItem[])) => void

	// Hobbies
	hobbies: HobbyItem[]
	setHobbies: (
		value: HobbyItem[] | ((prev: HobbyItem[]) => HobbyItem[])
	) => void

	// Summary / Objective
	objective: string
	setObjective: (value: string) => void

	// Resume output
	generatedResume: GeneratedResume
	setGeneratedResume: (value: GeneratedResume) => void

	template: string
	setTemplate: (value: string) => void

	// UI
	activeTab: string
	setActiveTab: (value: string) => void

	isLoading: boolean
	setIsLoading: (value: boolean) => void

	showSlider: boolean
	setShowSlider: (value: boolean) => void

	editing: string | null
	setEditing: (value: string | null) => void

	// Custom sections
	customSections: CustomSectionItem[]
	setCustomSections: (
		value:
			| CustomSectionItem[]
			| ((prev: CustomSectionItem[]) => CustomSectionItem[])
	) => void

	customTitles: Record<string, string>
	setCustomTitles: (value: Record<string, string>) => void
	resetCustomTitles: () => void

	// Counters
	counter: number
	setCounter: (value: number) => void
	countdown: number
	setCountdown: (value: number | ((prev: number) => number)) => void
	running: boolean
	setRunning: (value: boolean) => void

	// Auth
	user: ResumeUser
	setUser: (value: ResumeUser) => void

	authError: string | null
	setAuthError: (value: string | null) => void

	isAuthenticated: boolean
	setIsAuthenticated: (value: boolean) => void

	isProfileModalOpen: boolean
	setIsProfileModalOpen: (isOpen: boolean) => void

	// Reset actions
	reset: () => void
	resetOrderedTabs: () => void
}
