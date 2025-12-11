import React, {
	createContext,
	useState,
	useContext,
	useCallback,
	ReactNode,
} from "react"
import { AlertItem, AlertContextType, AlertType } from "../types/alert"

const AlertContext = createContext<AlertContextType | undefined>(undefined)

interface AlertProviderProps {
	children: ReactNode
	defaultPosition?: {
		vertical: "top" | "bottom" | "center"
		horizontal: "left" | "right" | "center"
	}
	defaultMaxAlerts?: number
}

export const AlertProvider: React.FC<AlertProviderProps> = ({
	children,
	defaultPosition = { vertical: "top", horizontal: "right" },
	defaultMaxAlerts = 5,
}) => {
	const [alerts, setAlerts] = useState<AlertItem[]>([])

	const generateId = () =>
		`alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

	const showAlert = useCallback(
		(
			message: string,
			title?: string,
			type: AlertType = "info",
			options = {}
		) => {
			const newAlert: AlertItem = {
				id: generateId(),
				type,
				message,
				title,
				...options,
			}

			setAlerts((prev) => {
				const updatedAlerts = [newAlert, ...prev]
				return updatedAlerts.slice(0, defaultMaxAlerts)
			})
		},
		[defaultMaxAlerts]
	)

	const showSuccess = useCallback(
		(message: string, title?: string, options = {}) => {
			showAlert(message, title, "success", options)
		},
		[showAlert]
	)

	const showError = useCallback(
		(message: string, title?: string, options = {}) => {
			showAlert(message, title, "error", options)
		},
		[showAlert]
	)

	const showWarning = useCallback(
		(message: string, title?: string, options = {}) => {
			showAlert(message, title, "warning", options)
		},
		[showAlert]
	)

	const showInfo = useCallback(
		(message: string, title?: string, options = {}) => {
			showAlert(message, title, "info", options)
		},
		[showAlert]
	)

	// Eliminar alerta
	const removeAlert = useCallback((id: string) => {
		setAlerts((prev) => prev.filter((alert) => alert.id !== id))
	}, [])

	// Limpiar todas
	const clearAlerts = useCallback(() => {
		setAlerts([])
	}, [])

	const value = {
		alerts,
		showAlert,
		showSuccess,
		showError,
		showWarning,
		showInfo,
		removeAlert,
		clearAlerts,
	}

	return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
}

export const useAlert = () => {
	const context = useContext(AlertContext)
	if (!context) {
		throw new Error("useAlert debe usarse dentro de AlertProvider")
	}
	return context
}

export const useAlertWithPosition = () => {
	const context = useAlert()

	const showAlertAtPosition = useCallback(
		(
			message: string,
			title?: string,
			type: AlertType = "info",
			position?: {
				vertical: "top" | "bottom" | "center"
				horizontal: "left" | "right" | "center"
			},
			options = {}
		) => {
			const alertId = `alert-${Date.now()}-${Math.random()
				.toString(36)
				.substr(2, 9)}`

			const newAlert: AlertItem & { position?: any } = {
				id: alertId,
				type,
				message,
				title,
				position,
				...options,
			}

			context.showAlert(message, title, type, newAlert)

			return alertId
		},
		[context]
	)

	return {
		...context,
		showAlertAtPosition,
	}
}
