export interface ConfirmWindowProps {
	isOpen: boolean
	title?: string
	message: string
	confirmText?: string
	cancelText?: string
	onConfirm: () => void
	onCancel: () => void
	variant?: "danger" | "warning" | "info" | "success"
	showCloseButton?: boolean
}

export interface ConfirmOptions {
	title?: string
	message: string
	confirmText?: string
	cancelText?: string
	variant?: "danger" | "warning" | "info" | "success"
}

export type ConfirmFunction = (options: ConfirmOptions) => Promise<boolean>
