export type AlertType = "success" | "error" | "warning" | "info"

export interface AlertItem {
	id: string
	type: AlertType
	title?: string
	message: string
	closable?: boolean
	autoClose?: number
	icon?: React.ReactNode
}

export interface AlertContextType {
	alerts: AlertItem[]
	showAlert: (
		message: string,
		title?: string,
		type?: AlertType,
		options?: Partial<Omit<AlertItem, "id" | "message" | "title" | "type">>
	) => void
	showSuccess: (
		message: string,
		title?: string,
		options?: Partial<Omit<AlertItem, "id" | "message" | "title" | "type">>
	) => void
	showError: (
		message: string,
		title?: string,
		options?: Partial<Omit<AlertItem, "id" | "message" | "title" | "type">>
	) => void
	showWarning: (
		message: string,
		title?: string,
		options?: Partial<Omit<AlertItem, "id" | "message" | "title" | "type">>
	) => void
	showInfo: (
		message: string,
		title?: string,
		options?: Partial<Omit<AlertItem, "id" | "message" | "title" | "type">>
	) => void
	removeAlert: (id: string) => void
	clearAlerts: () => void
}
