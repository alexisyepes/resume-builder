import { useState } from "react"
import { MdOutlineEdit, MdOutlineDeleteOutline } from "react-icons/md"
import { RxReload } from "react-icons/rx"
import RingLoader from "react-spinners/RingLoader"
import { RiDeleteBin5Line } from "react-icons/ri"
import { GrLinkNext } from "react-icons/gr"

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
	removeTabHandler,
	activeTab,
	tabs,
	setActiveTab,
	t,
}) {
	const [skillToAdd, setSkillToAdd] = useState("")

	const handleRemoveSection = () => {
		const currentActiveTabIndex = tabs.indexOf(activeTab)
		const nextTabIndex =
			currentActiveTabIndex === tabs.length - 1
				? currentActiveTabIndex - 1
				: currentActiveTabIndex + 1
		const nextActiveTab = tabs[nextTabIndex]
		setActiveTab(nextActiveTab)
		removeTabHandler(currentActiveTabIndex)
	}

	return (
		<div className="w-full border p-4 rounded-md">
			<div className="flex justify-between border-b-2 mb-2">
				<h2 className="text-xl mb-2 font-bold">
					{t.resume_builder.labels.skills.title}
				</h2>
				<RiDeleteBin5Line
					onClick={handleRemoveSection}
					className="cursor-pointer"
					size={24}
				/>{" "}
			</div>
			<h4 className="block text-sm font-medium text-gray-700 mb-1">
				{t.resume_builder.labels.skills.add_skill_below}
			</h4>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					setSkills([...skills, skillToAdd])
					setSkillToAdd("")
				}}
				className="flex mb-2 justify-between"
			>
				<input
					id="skill"
					type="text"
					value={skillToAdd}
					onChange={(e) => setSkillToAdd(e.target.value)}
					placeholder={t.resume_builder.labels.skills.placeholder}
					className="p-2 w-1/2 border border-gray-300 rounded"
				/>
				<button className="bg-cyan-500 rounded-r-md text-white w-1/2">
					+ {t.resume_builder.labels.skills.add_skill}
				</button>
			</form>
			<div className="border p-2 rounded-md mb-2">
				<h5 className="text-sm mb-2 text-center">
					{t.resume_builder.labels.skills.info}
				</h5>
				<button
					onClick={regenerateSkillsSuggestions}
					className="bg-purple-500 rounded-md px-2 py-1 text-white w-full inline-block"
				>
					<RxReload color="" className="inline mr-2" />
					{!suggestedSkills.length
						? t.resume_builder.labels.skills.cta_1
						: t.resume_builder.labels.skills.cta_2}{" "}
					{t.resume_builder.labels.skills.cta_3}
				</button>
				{isLoading ? (
					<RingLoader className="mx-auto my-8" size={55} color="purple" />
				) : (
					<div className="mt-2">
						{suggestedSkills.length
							? suggestedSkills.map((skill, index) => {
									const skillExists = skills.find((item) => item === skill)
									return (
										<span
											key={index}
											onClick={() => {
												if (skillExists) {
													return alert("Skill has been already added")
												}
												setSkills([...skills, skill])
											}}
											className={`cursor-pointer ml-1 ${
												skillExists ? "bg-slate-600" : "bg-slate-400"
											}  capitalize rounded-md px-2 py-1 m-2 inline-block text-white`}
										>
											+ {skill}
										</span>
									)
							  })
							: null}
					</div>
				)}
			</div>
			{skills.length
				? skills.map((skill, index) => (
						<div
							key={index}
							className="cursor-pointer justify-between flex bg-[#336e7b] text-white rounded-md px-2 py-1 my-2"
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
				className="w-full capitalize mt-4 bg-cyan-500 text-white p-2 rounded"
			>
				{t.resume_builder.labels.general.next}
				<GrLinkNext className="inline ml-2" />
			</button>
		</div>
	)
}
