import React from "react"
import Alert from "./Alert"
import { useAlert } from "@/contexts/alertContext"

interface AlertContainerProps {
	position?: {
		vertical: "top" | "bottom" | "center"
		horizontal: "left" | "right" | "center"
	}
	maxWidth?: string
	zIndex?: number
}

const AlertContainer: React.FC<AlertContainerProps> = ({
	position = { vertical: "top", horizontal: "right" },
	maxWidth = "28rem",
	zIndex = 50,
}) => {
	const { alerts, removeAlert } = useAlert()

	const getPositionClasses = () => {
		const { vertical, horizontal } = position

		const verticalClasses = {
			top: "top-4",
			bottom: "bottom-4",
			center: "top-1/2 transform -translate-y-1/2",
		}

		const horizontalClasses = {
			left: "left-4",
			right: "right-4",
			center: "left-1/2 transform -translate-x-1/2",
		}

		return `${verticalClasses[vertical]} ${horizontalClasses[horizontal]}`
	}

	const getAlignmentClasses = () => {
		const { vertical, horizontal } = position

		if (vertical === "center" && horizontal === "center") {
			return "items-center justify-center"
		}

		const alignVertical =
			vertical === "top"
				? "items-start"
				: vertical === "bottom"
				? "items-end"
				: "items-center"

		const alignHorizontal =
			horizontal === "left"
				? "justify-start"
				: horizontal === "right"
				? "justify-end"
				: "justify-center"

		return `${alignVertical} ${alignHorizontal}`
	}

	if (alerts.length === 0) return null

	return (
		<div
			className={`fixed ${getPositionClasses()} z-${zIndex} flex flex-col space-y-3 p-4 ${getAlignmentClasses()}`}
			style={{ maxWidth }}
		>
			{alerts.map((alert) => (
				<Alert
					key={alert.id}
					type={alert.type}
					title={alert.title}
					message={alert.message}
					closable={alert.closable}
					autoClose={alert.autoClose}
					icon={alert.icon}
					onClose={() => removeAlert(alert.id)}
					className="w-full"
				/>
			))}
		</div>
	)
}

export default AlertContainer
