import { useContext } from "react"

import { RESUME_CONTEXT, type ResumeContextValue } from "./resumeContext"

export const useResumeContext = (): ResumeContextValue => {
	const context = useContext(RESUME_CONTEXT)

	if (!context) {
		throw new Error("useResumeContext must be used within RESUME_CONTEXT.Provider")
	}

	return context
}

