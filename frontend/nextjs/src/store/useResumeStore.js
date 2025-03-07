import { create } from "zustand"
import { persist } from "zustand/middleware"
import {
	PERSONAL_DETAILS,
	CONTACT_INFORMATION,
	PROFESSIONAL_SUMMARY,
	SKILLS,
	EMPLOYMENT_HISTORY,
	EDUCATION,
	HOBBIES,
	LINKS,
	CERTIFICATIONS,
	REFERENCES,
	LANGUAGES,
} from "@/constants"
import { defaultResume } from "@/defaultResume"

const initialCustomTitles = {
	[PROFESSIONAL_SUMMARY]: "",
	[EDUCATION]: "",
	[SKILLS]: "",
	[EMPLOYMENT_HISTORY]: "",
	[HOBBIES]: "",
	[LINKS]: "",
	[CERTIFICATIONS]: "",
	[REFERENCES]: "",
	[LANGUAGES]: "",
}

const useResumeStore = create(
	persist(
		(set, get) => ({
			// Basic Info
			firstName: "",
			setFirstName: (name) => set({ firstName: name }),

			lastName: "",
			setLastName: (name) => set({ lastName: name }),

			jobTitle: "",
			setJobTitle: (title) => set({ jobTitle: title }),

			photo: "",
			setPhoto: (photoFile) => set({ photo: photoFile }),

			fileName: "",
			setFileName: (name) => set({ fileName: name || get().defaultFileName }),
			defaultFileName: "",

			email: "",
			setEmail: (email) => set({ email }),

			phone: "",
			setPhone: (phone) => set({ phone }),

			address: "",
			setAddress: (address) => set({ address }),

			cityPostCode: "",
			setCityPostCode: (cityPostCode) => set({ cityPostCode }),

			// Resume Sections
			tabs: [
				PERSONAL_DETAILS,
				CONTACT_INFORMATION,
				PROFESSIONAL_SUMMARY,
				SKILLS,
				EMPLOYMENT_HISTORY,
				EDUCATION,
			],
			setTabs: (update) =>
				set((state) => ({
					tabs: typeof update === "function" ? update(state.tabs) : update,
				})),

			skills: [],
			setSkills: (skills) => set({ skills }),

			suggestedSkills: [],
			setSuggestedSkills: (suggestedSkills) => set({ suggestedSkills }),

			languages: [],
			setLanguages: (updater) =>
				set((state) => {
					const newData =
						typeof updater === "function" ? updater(state.languages) : updater
					return {
						languages: Array.isArray(newData)
							? [...newData]
							: [...state.languages],
					}
				}),

			experience: [],
			setExperience: (updater) =>
				set((state) => {
					const newData =
						typeof updater === "function" ? updater(state.experience) : updater
					return {
						experience: Array.isArray(newData)
							? [...newData]
							: [...state.experience],
					}
				}),

			certifications: [],
			setCertifications: (updater) =>
				set((state) => {
					const newData =
						typeof updater === "function"
							? updater(state.certifications)
							: updater
					return {
						certifications: Array.isArray(newData)
							? [...newData]
							: [...state.certifications],
					}
				}),

			references: [],
			setReferences: (updater) =>
				set((state) => {
					const newData =
						typeof updater === "function" ? updater(state.references) : updater
					return {
						references: Array.isArray(newData)
							? [...newData]
							: [...state.references],
					}
				}),

			educations: [],
			setEducations: (updater) =>
				set((state) => {
					const newData =
						typeof updater === "function" ? updater(state.educations) : updater
					return {
						educations: Array.isArray(newData)
							? [...newData]
							: [...state.educations],
					}
				}),

			links: [],
			setLinks: (updater) =>
				set((state) => {
					const newData =
						typeof updater === "function" ? updater(state.links) : updater
					return {
						links: Array.isArray(newData) ? [...newData] : [...state.links],
					}
				}),

			hobbies: [],
			setHobbies: (updater) =>
				set((state) => {
					const newData =
						typeof updater === "function" ? updater(state.hobbies) : updater
					return {
						hobbies: Array.isArray(newData) ? [...newData] : [...state.hobbies],
					}
				}),

			objective: "",
			setObjective: (objective) => set({ objective }),

			generatedResume: defaultResume,
			setGeneratedResume: (resume) => set({ generatedResume: resume }),

			template: "classic-ats",
			setTemplate: (template) => set({ template }),

			// UI State
			activeTab: PERSONAL_DETAILS,
			setActiveTab: (tab) => set({ activeTab: tab }),

			isLoading: false,
			setIsLoading: (isLoading) => set({ isLoading }),

			showSlider: false,
			setShowSlider: (showSlider) => set({ showSlider }),

			customSections: [],
			setCustomSections: (updater) =>
				set((state) => {
					const newData =
						typeof updater === "function"
							? updater(state.customSections)
							: updater

					return {
						customSections: Array.isArray(newData)
							? [...newData]
							: [...state.customSections],
					}
				}),

			customTitles: { ...initialCustomTitles },

			setCustomTitles: (update) => {
				set((state) => ({
					customTitles: { ...state.customTitles, ...update },
				}))
			},

			resetCustomTitles: () => {
				set({ customTitles: { ...initialCustomTitles } })
			},

			editing: null,
			setEditing: (editing) => set({ editing }),

			user: null,
			setUser: (user) => set({ user }),

			authError: null,
			setAuthError: (authError) => set({ authError }),

			isAuthenticated: false,
			setIsAuthenticated: (auth) => set({ isAuthenticated: auth }),

			// Reset function
			reset: () => {
				set({
					firstName: "",
					lastName: "",
					jobTitle: "",
					photo: "",
					fileName: "",
					email: "",
					phone: "",
					address: "",
					cityPostCode: "",
					tabs: [
						PERSONAL_DETAILS,
						CONTACT_INFORMATION,
						PROFESSIONAL_SUMMARY,
						SKILLS,
						EMPLOYMENT_HISTORY,
						EDUCATION,
					],
					skills: [],
					suggestedSkills: [],
					languages: [],
					experience: [],
					certifications: [],
					references: [],
					educations: [],
					links: [],
					hobbies: [],
					objective: "",
					generatedResume: defaultResume,
					activeTab: PERSONAL_DETAILS,
					showSlider: false,
					customSections: [],
					customTitles: { ...initialCustomTitles },
					editing: null,
					authError: null,
				})
			},
		}),
		{
			name: "resume-storage", // Key for localStorage
			partialize: (state) => ({
				isAuthenticated: state.isAuthenticated,
				authError: state.authError,
				user: state.user,
				firstName: state.firstName,
				lastName: state.lastName,
				jobTitle: state.jobTitle,
				photo: state.photo,
				fileName: state.fileName,
				email: state.email,
				phone: state.phone,
				address: state.address,
				cityPostCode: state.cityPostCode,
				tabs: state.tabs,
				skills: state.skills,
				suggestedSkills: state.suggestedSkills,
				languages: state.languages,
				experience: state.experience,
				certifications: state.certifications,
				references: state.references,
				educations: state.educations,
				links: state.links,
				hobbies: state.hobbies,
				objective: state.objective,
				generatedResume: state.generatedResume,
				template: state.template,
				activeTab: state.activeTab,
				customSections: state.customSections,
				customTitles: state.customTitles,
			}),
		}
	)
)

export default useResumeStore
