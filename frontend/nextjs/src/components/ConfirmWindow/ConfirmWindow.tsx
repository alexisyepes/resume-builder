"use client"

import { useEffect, useRef } from "react"
import { ConfirmWindowProps } from "@/types/confirmWindow"
import { useConfirmWindowStore } from "@/store/useConfirmWindowStore"

export function ConfirmWindow({
	isOpen,
	title = "Confirm action",
	message,
	confirmText = "Confirm",
	cancelText = "Cancel",
	onConfirm,
	onCancel,
	variant = "warning",
	showCloseButton = true,
}: ConfirmWindowProps) {
	const modalRef = useRef<HTMLDivElement>(null)

	const handleCancel = (e?: React.MouseEvent) => {
		if (e) {
			e.stopPropagation()
			e.preventDefault()
		}
		console.log("Cancel clicked")
		onCancel()
	}

	const handleConfirm = (e?: React.MouseEvent) => {
		if (e) {
			e.stopPropagation()
			e.preventDefault()
		}
		console.log("Confirm clicked")
		onConfirm()
	}

	const handleClickOutside = (e: React.MouseEvent) => {
		e.stopPropagation()
		e.preventDefault()
		console.log("Click outside")
		onCancel()
	}

	useEffect(() => {
		const handleClickOutsideListener = (event: MouseEvent) => {
			const target = event.target as HTMLElement
			const isButton =
				target.tagName === "BUTTON" ||
				target.closest("button") !== null ||
				target.closest('[role="button"]') !== null

			if (isButton && modalRef.current?.contains(target)) {
				return
			}

			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				setTimeout(() => {
					onCancel()
				}, 10)
			}
		}

		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === "Escape" && isOpen) {
				event.stopPropagation()
				event.stopImmediatePropagation()

				setTimeout(() => {
					onCancel()
				}, 10)
				return false
			}
		}

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutsideListener, {
				capture: true,
			})
			document.addEventListener("keydown", handleEscapeKey, {
				capture: true,
				passive: false,
			})
			document.body.style.overflow = "hidden"

			return () => {
				document.removeEventListener("mousedown", handleClickOutsideListener, {
					capture: true,
				})
				document.removeEventListener("keydown", handleEscapeKey, {
					capture: true,
				})
				document.body.style.overflow = "unset"
			}
		}
	}, [isOpen, onCancel])

	if (!isOpen) return null

	const variantClasses = {
		danger: {
			bg: "bg-red-50",
			text: "text-red-800",
			button: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
			icon: "text-red-600",
		},
		warning: {
			bg: "bg-yellow-50",
			text: "text-yellow-800",
			button: "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500",
			icon: "text-yellow-600",
		},
		info: {
			bg: "bg-blue-50",
			text: "text-blue-800",
			button: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
			icon: "text-blue-600",
		},
		success: {
			bg: "bg-green-50",
			text: "text-green-800",
			button: "bg-green-600 hover:bg-green-700 focus:ring-green-500",
			icon: "text-green-600",
		},
	}

	const currentVariant = variantClasses[variant]

	return (
		<>
			{/* Backdrop */}
			<div
				className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-sm transition-opacity duration-300"
				aria-hidden="true"
			/>

			{/* Modal */}
			<div
				className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
				onMouseDown={(e) => {
					if (e.target === e.currentTarget) {
						e.stopPropagation()
						e.preventDefault()
						handleClickOutside(e)
					}
				}}
			>
				<div
					ref={modalRef}
					className={`relative w-full max-w-md rounded-lg shadow-xl transform transition-all duration-300 ${currentVariant.bg}`}
					role="dialog"
					aria-modal="true"
					aria-labelledby="modal-title"
					aria-describedby="modal-description"
					onMouseDown={(e) => e.stopPropagation()}
				>
					{/* Header */}
					<div className="flex items-center justify-between p-4 border-b border-gray-200">
						<div className="flex items-center">
							<div className={`flex-shrink-0 w-5 h-5 ${currentVariant.icon}`}>
								<svg
									className="w-full h-full"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
							<h3
								id="modal-title"
								className={`ml-3 text-lg font-semibold ${currentVariant.text}`}
							>
								{title}
							</h3>
						</div>

						{showCloseButton && (
							<button
								type="button"
								onMouseDown={(e) => {
									e.stopPropagation()
									e.preventDefault()
								}}
								onClick={handleCancel}
								className="rounded-md p-1.5 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
								aria-label="Cerrar"
							>
								<span className="sr-only">Cerrar</span>
								<svg
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						)}
					</div>

					{/* Content */}
					<div className="p-6">
						<div className="mt-2">
							<p id="modal-description" className="text-gray-700">
								{message}
							</p>
						</div>
					</div>

					{/* Footer */}
					<div className="px-6 py-4 bg-gray-50 rounded-b-lg flex flex-col sm:flex-row-reverse sm:justify-start sm:space-x-reverse sm:space-x-3">
						<button
							type="button"
							onMouseDown={(e) => {
								e.stopPropagation()
								e.preventDefault()
							}}
							onClick={handleConfirm}
							className={`w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm ${currentVariant.button}`}
						>
							{confirmText}
						</button>
						<button
							type="button"
							onMouseDown={(e) => {
								e.stopPropagation()
								e.preventDefault()
							}}
							onClick={handleCancel}
							className="mt-3 sm:mt-0 w-full sm:w-auto inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:text-sm"
						>
							{cancelText}
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export function GlobalConfirmWindow() {
	const {
		isOpen,
		title,
		message,
		confirmText,
		cancelText,
		variant,
		showCloseButton,
		confirm,
		cancel,
	} = useConfirmWindowStore()

	return (
		<ConfirmWindow
			isOpen={isOpen}
			title={title}
			message={message}
			confirmText={confirmText}
			cancelText={cancelText}
			variant={variant}
			showCloseButton={showCloseButton}
			onConfirm={confirm}
			onCancel={cancel}
		/>
	)
}
