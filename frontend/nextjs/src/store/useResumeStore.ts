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
	RESUME_VIEW_TAB,
} from "@/constants"

import { defaultResume } from "@/defaultResume"
import type { ResumeStore } from "@/types/store"

const initialCustomTitles: Record<string, string> = {
	[PROFESSIONAL_SUMMARY]: "",
	[CONTACT_INFORMATION]: "",
	[EDUCATION]: "",
	[SKILLS]: "",
	[EMPLOYMENT_HISTORY]: "",
	[HOBBIES]: "",
	[LINKS]: "",
	[CERTIFICATIONS]: "",
	[REFERENCES]: "",
	[LANGUAGES]: "",
}

const useResumeStore = create<ResumeStore>()(
	persist(
		(set, get) => ({
			apiBaseUrl: process.env.NEXT_PUBLIC_BACKEND_SERVER,

			firstName: "",
			setFirstName: (firstName) => set({ firstName }),

			lastName: "",
			setLastName: (lastName) => set({ lastName }),

			jobTitle: "",
			setJobTitle: (jobTitle) => set({ jobTitle }),

			photo: "",
			setPhoto: (photo) => set({ photo }),

			fileName: "",
			setFileName: (fileName) => set({ fileName: fileName || get().fileName }),

			email: "",
			setEmail: (email) => set({ email }),

			phone: "",
			setPhone: (phone) => set({ phone }),

			address: "",
			setAddress: (address) => set({ address }),

			cityPostCode: "",
			setCityPostCode: (cityPostCode) => set({ cityPostCode }),

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
			setSkills: (updater) =>
				set((state) => ({
					skills:
						typeof updater === "function"
							? [...updater(state.skills)]
							: [...updater],
				})),
			suggestedSkills: [],
			setSuggestedSkills: (suggestedSkills) =>
				set({ suggestedSkills: [...suggestedSkills] }),

			languages: [],
			setLanguages: (updater) =>
				set((state) => ({
					languages:
						typeof updater === "function"
							? [...updater(state.languages)]
							: [...updater],
				})),

			experience: [],
			setExperience: (updater) =>
				set((state) => ({
					experience:
						typeof updater === "function"
							? [...updater(state.experience)]
							: [...updater],
				})),

			certifications: [],
			setCertifications: (updater) =>
				set((state) => ({
					certifications:
						typeof updater === "function"
							? [...updater(state.certifications)]
							: [...updater],
				})),

			references: [],
			setReferences: (updater) =>
				set((state) => ({
					references:
						typeof updater === "function"
							? [...updater(state.references)]
							: [...updater],
				})),

			educations: [],
			setEducations: (updater) =>
				set((state) => ({
					educations:
						typeof updater === "function"
							? [...updater(state.educations)]
							: [...updater],
				})),

			links: [],
			setLinks: (updater) =>
				set((state) => ({
					links:
						typeof updater === "function"
							? [...updater(state.links)]
							: [...updater],
				})),

			hobbies: [],
			setHobbies: (updater) =>
				set((state) => ({
					hobbies:
						typeof updater === "function"
							? [...updater(state.hobbies)]
							: [...updater],
				})),

			objective: "",
			setObjective: (objective) => set({ objective }),

			counter: 0,
			setCounter: (value) => set({ counter: value }),
			countdown: 300_000,
			setCountdown: (value) =>
				set((state) => ({
					countdown:
						typeof value === "function" ? value(state.countdown) : value,
				})),
			running: false,
			setRunning: (value) => set({ running: value }),

			generatedResume: defaultResume,
			setGeneratedResume: (generatedResume) => set({ generatedResume }),

			template: "classic-ats",
			setTemplate: (template) => set({ template }),

			activeTab: PERSONAL_DETAILS,
			setActiveTab: (activeTab) => set({ activeTab }),

			activeResumeViewTab: RESUME_VIEW_TAB.build_resume,
			setActiveResumeViewTab: (activeResumeViewTab) =>
				set({ activeResumeViewTab }),

			isLoading: false,
			setIsLoading: (isLoading) => set({ isLoading }),

			showSlider: false,
			setShowSlider: (showSlider) => set({ showSlider }),

			customSections: [],
			setCustomSections: (updater) =>
				set((state) => ({
					customSections:
						typeof updater === "function"
							? [...updater(state.customSections)]
							: [...updater],
				})),

			customTitles: { ...initialCustomTitles },
			setCustomTitles: (update) =>
				set((state) => ({
					customTitles: { ...state.customTitles, ...update },
				})),
			resetCustomTitles: () =>
				set({ customTitles: { ...initialCustomTitles } }),

			editing: null,
			setEditing: (editing) => set({ editing }),

			user: null,
			setUser: (user) => set({ user }),

			isAuthenticated: false,
			setIsAuthenticated: (auth) => set({ isAuthenticated: auth }),

			authError: null,
			setAuthError: (authError) => set({ authError }),

			isProfileModalOpen: false,
			setIsProfileModalOpen: (isOpen) => set({ isProfileModalOpen: isOpen }),

			reset: () =>
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
					template: "classic-ats",
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
				}),

			resetOrderedTabs: () =>
				set((state) => {
					const initialTabs = [
						PERSONAL_DETAILS,
						CONTACT_INFORMATION,
						PROFESSIONAL_SUMMARY,
						SKILLS,
						EMPLOYMENT_HISTORY,
						EDUCATION,
					]

					const addedTabs = state.tabs.filter(
						(tab) => !initialTabs.includes(tab)
					)

					return { tabs: Array.from(new Set([...initialTabs, ...addedTabs])) }
				}),

			rehydrate: async () => {
				await useResumeStore.persist.rehydrate()
			},
		}),
		{
			name: "resume-storage",
			partialize: (state) => ({
				apiBaseUrl: state.apiBaseUrl,
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
				activeResumeViewTab: state.activeResumeViewTab,
				customSections: state.customSections,
				customTitles: state.customTitles,
			}),
		}
	)
)

export default useResumeStore
