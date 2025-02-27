import { CiEdit } from "react-icons/ci"
import { IoHammerOutline } from "react-icons/io5"

export default function TemplateSelector({ setShowSlider, showSlider, t }) {
	return (
		<div className="flex template_selector_buttons items-center mx-auto w-1/2 justify-start gap-4">
			<button
				onClick={() => setShowSlider(false)}
				className={`border-cyan-700 border capitalize text-black text-lg font-medium w-1/2 p-3 rounded-sm transition-all duration-200 hover:bg-cyan-100 ${
					!showSlider ? "ring-teal-500 ring-2" : ""
				}`}
			>
				<CiEdit className="inline mr-2" />{" "}
				{t.resume_builder.labels.general.edit}
			</button>
			<button
				onClick={() => setShowSlider(true)}
				className={`bg-teal-500 capitalize text-white text-lg font-medium w-1/2 p-3 rounded-sm transition-all duration-200 hover:bg-teal-600 ${
					showSlider ? "ring-cyan-800 ring-2" : ""
				}`}
			>
				<IoHammerOutline className="inline mr-2" />{" "}
				{t.resume_builder.labels.general.layout}
			</button>
		</div>
	)
}
