import RingLoader from "react-spinners/RingLoader"
import dynamic from "next/dynamic"
import "react-quill-new/dist/quill.snow.css"
import { RxReload } from "react-icons/rx"
import { PROFESSIONAL_SUMMARY } from "@/constants"
import { CiEdit } from "react-icons/ci"

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false })

const modules = {
	toolbar: [
		// [{ header: [1, 2, true] }],
		[{ size: ["small", false, "large", "huge"] }],
		["bold", "italic", "underline", "strike"],
		[{ list: "ordered" }, { list: "bullet" }],
		[{ color: [] }, { background: [] }],
	],
}

export default function ProfessionalSummaryInput({
	setCounter,
	counter,
	objective,
	setObjective,
	experience,
	setExperience,
	handleGenerateResume,
	isLoading,
	minutes,
	seconds,
	nextTabHandler,
}) {
	return (
		<div className="w-full p-2">
			<div className="flex justify-between border-b-2 mb-2">
				<h2 className="text-xl mb-2 font-bold">{PROFESSIONAL_SUMMARY}</h2>
				<CiEdit size={24} />
			</div>
			{counter === 5 ? (
				<p>
					Time Left to regenerate text: {minutes}:
					{seconds.toString().padStart(2, "0")}
				</p>
			) : (
				<h6>
					List your professional title, years of experience, and highlight your
					most notable accomplishments, and our AI generator will help you
					create it.
				</h6>
			)}
			<ReactQuill
				value={objective}
				onChange={setObjective}
				modules={modules}
				className="h-40 mb-20 mt-4"
			/>
			{isLoading && (
				<RingLoader className="mx-auto my-4" size={25} color="#42eff5" />
			)}
			{counter > 0 && (
				<p>Number of Ai generations left: {5 - counter} of (5)</p>
			)}

			{objective && objective.length > 3 && (
				<div className="flex mt-2 gap-1 flex-row">
					<button
						disabled={isLoading || counter === 5 || objective.length < 10}
						onClick={() => {
							setCounter(counter + 1)
							if (counter < 5) {
								handleGenerateResume()
							}
						}}
						className={`w-full ${
							isLoading || objective.length < 10 || counter === 5
								? "bg-purple-400"
								: "bg-purple-500"
						}  text-white p-2 rounded`}
					>
						<RxReload color="" className="inline mr-2" />
						{isLoading ? "Generating..." : "Generate with AI"}
					</button>
					<button
						disabled={!objective}
						onClick={nextTabHandler}
						className={`w-full ${
							!objective ? "bg-cyan-300" : "bg-cyan-500"
						}  text-white p-2 rounded`}
					>
						Next
					</button>
				</div>
			)}
		</div>
	)
}
