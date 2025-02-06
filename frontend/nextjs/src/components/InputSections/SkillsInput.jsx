import { MdOutlineEdit, MdOutlineDeleteOutline } from "react-icons/md"
import { RxReload } from "react-icons/rx"
import RingLoader from "react-spinners/RingLoader"

export default function SkillsInput({
	regenerateSkillsSuggestions,
	suggestedSkills,
	isLoading,
	skills,
	setSkills,
	editingId,
	setEditingId,
	handleChange,
	handleEditClick,
	nextTabHandler,
}) {
	return (
		<div className="w-full p-2">
			<div className="border p-2 rounded-md mb-2">
				<h5 className="font-bold mb-2 text-center">
					Choose from the options below (based on your job title)
				</h5>
				<button
					onClick={regenerateSkillsSuggestions}
					className="bg-purple-500 rounded-lg px-2 py-1 text-white w-full inline-block"
				>
					<RxReload color="" className="inline mr-2" />
					{!suggestedSkills.length ? "Generate" : "Regenerate"} Suggestions
				</button>
				{isLoading ? (
					<RingLoader color="#42eff5" className="mx-auto my-4" />
				) : (
					<div className="mt-2">
						{suggestedSkills.length
							? suggestedSkills.map((skill, index) => (
									<span
										key={index}
										onClick={() => setSkills([...skills, skill])}
										className="cursor-pointer ml-1 bg-slate-400 capitalize rounded-md px-2 py-1 m-2 inline-block text-white"
									>
										+ {skill}
									</span>
							  ))
							: null}
					</div>
				)}
			</div>
			{skills.length
				? skills.map((skill, index) => (
						<div
							key={index}
							className="cursor-pointer justify-between flex bg-slate-700 rounded-md px-2 py-1 my-2 text-white"
						>
							{editingId === index ? (
								<input
									type="text"
									value={skills[index] || ""}
									onChange={(e) => handleChange(e, index)}
									className="px-2 border border-gray-300 text-black rounded"
									onBlur={() => setEditingId(null)}
									autoFocus
								/>
							) : (
								<span className="capitalize">{skill}</span>
							)}{" "}
							<span>
								<MdOutlineEdit
									onClick={() => handleEditClick(index)}
									className="inline mr-4"
								/>
								<span
									onClick={() => {
										const newSkills = skills.filter((s, i) => i !== index)
										setSkills(newSkills)
									}}
								>
									<MdOutlineDeleteOutline className="inline" />
								</span>
							</span>
						</div>
				  ))
				: null}
			<button
				onClick={nextTabHandler}
				className="w-full bg-blue-500 text-white p-2 rounded"
			>
				Next
			</button>
		</div>
	)
}
