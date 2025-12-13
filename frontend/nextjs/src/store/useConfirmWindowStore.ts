import { create } from "zustand"

export interface ConfirmState {
	isOpen: boolean
	title: string
	message: string
	confirmText: string
	cancelText: string
	variant: "danger" | "warning" | "info" | "success"
	resolvePromise: ((value: boolean) => void) | null
	showCloseButton: boolean

	openConfirm: (options: {
		title?: string
		message: string
		confirmText?: string
		cancelText?: string
		variant?: "danger" | "warning" | "info" | "success"
		showCloseButton?: boolean
	}) => Promise<boolean>

	confirm: () => void
	cancel: () => void
	closeConfirm: () => void
}

const defaultState = {
	isOpen: false,
	title: "Confirm action",
	message: "",
	confirmText: "Confirm",
	cancelText: "Cancel",
	variant: "warning" as const,
	resolvePromise: null,
	showCloseButton: true,
}

export const useConfirmWindowStore = create<ConfirmState>((set, get) => ({
	...defaultState,

	openConfirm: (options) => {
		return new Promise<boolean>((resolve) => {
			set({
				isOpen: true,
				title: options.title || defaultState.title,
				message: options.message,
				confirmText: options.confirmText || defaultState.confirmText,
				cancelText: options.cancelText || defaultState.cancelText,
				variant: options.variant || defaultState.variant,
				showCloseButton:
					options.showCloseButton !== undefined
						? options.showCloseButton
						: defaultState.showCloseButton,
				resolvePromise: resolve,
			})
		})
	},

	confirm: () => {
		const { resolvePromise } = get()
		if (resolvePromise) {
			resolvePromise(true)
		}
		set({ isOpen: false, resolvePromise: null })
	},

	cancel: () => {
		const { resolvePromise } = get()
		if (resolvePromise) {
			resolvePromise(false)
		}
		set({ isOpen: false, resolvePromise: null })
	},

	closeConfirm: () => {
		const { resolvePromise } = get()
		if (resolvePromise) {
			resolvePromise(false)
		}
		set({ isOpen: false, resolvePromise: null })
	},
}))
