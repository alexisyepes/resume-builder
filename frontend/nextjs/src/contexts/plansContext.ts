import { createContext, useContext } from "react"

export type PlansContextValue = {
	selectedPlan: string
	setSelectedPlan?: (plan: string) => void
}

export const PLANS_CONTEXT = createContext<PlansContextValue | undefined>(
	undefined
)

export const usePlansContext = () => {
	const context = useContext(PLANS_CONTEXT)

	if (context === undefined) {
		throw new Error("usePlansContext debe ser usado dentro de PlansProvider")
	}

	return context
}
