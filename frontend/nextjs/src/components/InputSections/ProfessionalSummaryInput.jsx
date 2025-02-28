import RingLoader from "react-spinners/RingLoader"
import dynamic from "next/dynamic"
import "react-quill-new/dist/quill.snow.css"
import { RxReload } from "react-icons/rx"
import { PROFESSIONAL_SUMMARY } from "@/constants"
import { CiEdit } from "react-icons/ci"
import CustomTitleInput from "./CustomTitleInput"
import { GrLinkNext } from "react-icons/gr"
import useResumeStore from "@/store/useResumeStore"
import { FaRobot } from "react-icons/fa"

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false })

const modules = {
	toolbar: [
		// [{ header: [1, 2, true] }],
		// [{ size: ["small", false, "large", "huge"] }],
		["bold", "italic", "underline", "strike"],
		[{ list: "ordered" }, { list: "bullet" }],
		[{ color: [] }, { background: [] }],
	],
}

export default function ProfessionalSummaryInput({
	t,
	setCounter,
	counter,
	handleGenerateResume,
	minutes,
	seconds,
	nextTabHandler,
	editing,
	setEditing,
	handleCustomTitleOnChange,
	inputRef,
}) {
	const { objective, setObjective, isLoading, customTitles } = useResumeStore()

	return (
		<div className="w-full p-2">
			<div className="flex justify-between border-b-2 mb-2">
				{editing === PROFESSIONAL_SUMMARY ? (
					<CustomTitleInput
						inputRef={inputRef}
						customTitleValue={customTitles[PROFESSIONAL_SUMMARY]}
						sectionKey={PROFESSIONAL_SUMMARY}
						handleCustomTitleOnChange={handleCustomTitleOnChange}
					/>
				) : (
					<h2 className="text-xl mb-2 font-bold">
						<CiEdit
							size={24}
							onClick={() =>
								setEditing(
									editing === PROFESSIONAL_SUMMARY ? null : PROFESSIONAL_SUMMARY
								)
							}
							className="cursor-pointer inline mr-2"
						/>
						{customTitles[PROFESSIONAL_SUMMARY] ||
							t.resume_builder.labels.professional_summary.title}
					</h2>
				)}
			</div>
			{counter === 5 ? (
				<p>
					{t.resume_builder.labels.professional_summary.counter.time_left}{" "}
					{minutes}:{seconds.toString().padStart(2, "0")}
				</p>
			) : (
				<h6>{t.resume_builder.labels.professional_summary.description}</h6>
			)}
			<ReactQuill
				value={objective}
				onChange={setObjective}
				modules={modules}
				className="h-40 mb-20 mt-4"
			/>
			{isLoading && (
				<RingLoader className="mx-auto my-8" size={55} color="purple" />
			)}
			{counter > 0 && (
				<p>
					{
						t.resume_builder.labels.professional_summary.counter
							.num_of_tries_left
					}{" "}
					{5 - counter} of (5)
				</p>
			)}

			{objective && objective.length > 3 && (
				<div className="flex mt-2 gap-4 flex-col">
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
						{isLoading
							? t.resume_builder.labels.professional_summary.cta_1
							: t.resume_builder.labels.professional_summary.cta_2}
						<FaRobot size={30} className="inline ml-4" />
					</button>
					{objective.length > 12 && (
						<button
							disabled={!objective}
							onClick={nextTabHandler}
							className={`w-full ${
								!objective ? "bg-cyan-300" : "bg-cyan-500"
							}  text-white p-2 rounded capitalize`}
						>
							{t.resume_builder.labels.general.next}
							<GrLinkNext className="inline ml-2" />
						</button>
					)}
				</div>
			)}
		</div>
	)
}
