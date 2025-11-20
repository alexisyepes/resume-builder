import type { ChangeEvent, Dispatch, SetStateAction } from "react"
import { createContext } from "react"

import type { TemplateDesign } from "@/constants"
import type { ResumeStore } from "@/types/store"
import type { Translation } from "@/utils"

export type ResumeContextValue = ResumeStore & {
    t: Translation
    langPrefix?: string | null
    handleImageUpload: (event: ChangeEvent<HTMLInputElement>) => void
    templateDesigns: TemplateDesign[]
    resumeContentTriggered: boolean
    setResumeContentTriggered: Dispatch<SetStateAction<boolean>>
}

export const RESUME_CONTEXT = createContext<ResumeContextValue | null>(null)
