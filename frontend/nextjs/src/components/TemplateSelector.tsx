import { CiEdit } from "react-icons/ci"
import { IoHammerOutline } from "react-icons/io5"
import { RxReload } from "react-icons/rx"

import type { Translation } from "@/utils"
import useResumeStore from "@/store/useResumeStore"

type TemplateSelectorProps = {
	setShowSlider: (value: boolean) => void
	showSlider: boolean
	t: Translation
}

export default function TemplateSelector({
	setShowSlider,
	showSlider,
	t,
}: TemplateSelectorProps) {
	const resetResume = useResumeStore((state) => state.reset)

	return (
		<div className="flex template_selector_buttons px-2 items-center mx-auto justify-center mt-2 gap-4">
			<button
				onClick={() => setShowSlider(false)}
				className={`border-cyan-500 border capitalize text-black text-lg font-medium w-30 py-1 px-3 rounded-md transition-all duration-200 hover:bg-cyan-100 ${
					!showSlider ? "ring-teal-500 ring-2" : ""
				}`}
			>
				<CiEdit className="inline mr-2" />{" "}
				{t.resume_builder.labels.general.edit}
			</button>
			<button
				onClick={() => setShowSlider(true)}
				className={`border-cyan-700 border capitalize text-black text-lg font-medium w-30 py-1 px-3 rounded-md transition-all duration-200 hover:bg-cyan-100 ${
					showSlider ? "ring-teal-500 ring-2" : ""
				}`}
			>
				<IoHammerOutline className="inline mr-2" />{" "}
				{t.resume_builder.labels.general.layout}
			</button>
			{!showSlider && (
				<button
					onClick={() => {
						if (
							window.confirm(
								t.resume_builder.labels.general.confirm_clear_inputs
							)
						)
							resetResume()
					}}
					className={`border-cyan-700 border capitalize text-red-500 text-lg font-medium w-80 py-1 px-3 rounded-md transition-all duration-200 hover:bg-cyan-100
				}`}
				>
					<RxReload className="inline mr-2" />{" "}
					{t.resume_builder.labels.general.reset_all_inputs}
				</button>
			)}
		</div>
	)
}
