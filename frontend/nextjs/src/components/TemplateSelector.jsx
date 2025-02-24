import { CiEdit } from "react-icons/ci"
import { IoHammerOutline } from "react-icons/io5"

export default function TemplateSelector({ setShowSlider, showSlider, t }) {
	return (
		<div className="flex items-center mx-auto w-1/2 justify-between gap-4">
			<button
				onClick={() => setShowSlider(false)}
				className={`bg-gray-900 capitalize text-white text-lg font-medium w-1/2 p-3 rounded-sm transition-all duration-200 hover:bg-gray-800 ${
					!showSlider ? "ring-teal-500 ring-4" : ""
				}`}
			>
				<CiEdit className="inline mr-2" />{" "}
				{t.resume_builder.labels.general.edit}
			</button>
			<button
				onClick={() => setShowSlider(true)}
				className={`bg-teal-500 capitalize text-white text-lg font-medium w-1/2 p-3 rounded-sm transition-all duration-200 hover:bg-teal-600 ${
					showSlider ? "ring-slate-800 ring-4" : ""
				}`}
			>
				<IoHammerOutline className="inline mr-2" />{" "}
				{t.resume_builder.labels.general.layout}
			</button>
		</div>
	)
}
