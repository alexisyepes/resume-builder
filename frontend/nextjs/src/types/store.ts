import { GeneratedResume } from "./resume"

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
	languages: string[]
	setLanguages: (value: string[] | ((prev: string[]) => string[])) => void

	// Experience
	experience: any[]
	setExperience: (value: any[] | ((prev: any[]) => any[])) => void

	// Certifications
	certifications: any[]
	setCertifications: (value: any[] | ((prev: any[]) => any[])) => void

	// References
	references: any[]
	setReferences: (value: any[] | ((prev: any[]) => any[])) => void

	// Educations
	educations: any[]
	setEducations: (value: any[] | ((prev: any[]) => any[])) => void

	// Links
	links: any[]
	setLinks: (value: any[] | ((prev: any[]) => any[])) => void

	// Hobbies
	hobbies: any[]
	setHobbies: (value: any[] | ((prev: any[]) => any[])) => void

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

	editing: any
	setEditing: (value: any) => void

	// Custom sections
	customSections: string[]
	setCustomSections: (value: string[] | ((prev: string[]) => string[])) => void

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
	user: any
	setUser: (value: any) => void

	authError: string | null
	setAuthError: (value: string | null) => void

	isAuthenticated: boolean
	setIsAuthenticated: (value: boolean) => void

	// Reset actions
	reset: () => void
	resetOrderedTabs: () => void
}
