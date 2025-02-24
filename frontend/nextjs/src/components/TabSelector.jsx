import {
	CERTIFICATIONS,
	CONTACT_INFORMATION,
	CUSTOM_SECTION,
	EDUCATION,
	EMPLOYMENT_HISTORY,
	HOBBIES,
	LANGUAGES,
	LINKS,
	PERSONAL_DETAILS,
	PROFESSIONAL_SUMMARY,
	REFERENCES,
	SKILLS,
} from "@/constants"
import { RiDeleteBin5Line } from "react-icons/ri"
import {
	MdOutlineDragIndicator,
	MdWork,
	MdOutlineContactPhone,
} from "react-icons/md"
import { useState } from "react"
import { useDrag, useDrop, DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"
import { FaHeadSideVirus } from "react-icons/fa"
import { IoSchool, IoPerson, IoLanguage } from "react-icons/io5"
import { HiLink, HiMusicalNote } from "react-icons/hi2"
import { FaMedal } from "react-icons/fa6"
import { MdOutlineContactEmergency } from "react-icons/md"
import { BsBuildings } from "react-icons/bs"
import { BiCustomize } from "react-icons/bi"

const DraggableTab = ({
	t,
	tab,
	tabs,
	index,
	moveTabHandler,
	onTabChange,
	removeTabHandler,
	activeTab,
}) => {
	const READ_ONLY_TABS = [
		PERSONAL_DETAILS,
		CONTACT_INFORMATION,
		PROFESSIONAL_SUMMARY,
	]

	const isReadOnly = READ_ONLY_TABS.includes(tab)

	// Drag logic
	const [{ isDragging }, drag] = useDrag({
		type: "TAB",
		item: { index },
		canDrag: !isReadOnly, // Prevent dragging read-only tabs
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	})

	// Drop logic
	const [, drop] = useDrop({
		accept: "TAB",
		hover: (draggedItem) => {
			if (draggedItem.index !== index) {
				moveTabHandler(draggedItem.index, index)
				draggedItem.index = index
			}
		},
	})

	return (
		<li
			ref={!isReadOnly ? (node) => drag(drop(node)) : null}
			className={`${
				activeTab === tab
					? "bg-cyan-500 text-white"
					: "bg-cyan-100 text-gray-700 hover:bg-blue-100"
			} flex justify-between items-center rounded-sm px-4 py-2 cursor-${
				isReadOnly ? "default" : "grab"
			} ${isDragging ? "opacity-50" : ""}`}
		>
			<button className="w-full text-left" onClick={() => onTabChange(tab)}>
				{!READ_ONLY_TABS.includes(tab) && (
					<MdOutlineDragIndicator className="cursor-move inline mr-2" />
				)}
				{tab === PERSONAL_DETAILS && (
					<IoPerson size={20} className="inline mr-2" />
				)}
				{tab === CONTACT_INFORMATION && (
					<MdOutlineContactEmergency size={20} className="inline mr-2" />
				)}
				{tab === PROFESSIONAL_SUMMARY && (
					<BsBuildings size={20} className="inline mr-2" />
				)}
				{tab === SKILLS && (
					<FaHeadSideVirus size={20} className="inline mr-2" />
				)}
				{tab === EMPLOYMENT_HISTORY && (
					<MdWork size={20} className="inline mr-2" />
				)}
				{tab === EDUCATION && <IoSchool size={20} className="inline mr-2" />}
				{tab === LINKS && <HiLink size={20} className="inline mr-2" />}
				{tab === HOBBIES && <HiMusicalNote size={20} className="inline mr-2" />}
				{tab === CERTIFICATIONS && (
					<FaMedal size={20} className="inline mr-2" />
				)}
				{tab === REFERENCES && (
					<MdOutlineContactPhone size={20} className="inline mr-2" />
				)}
				{tab === LANGUAGES && <IoLanguage size={20} className="inline mr-2" />}
				{tab === CUSTOM_SECTION && (
					<BiCustomize size={20} className="inline mr-2" />
				)}
				{tab === PERSONAL_DETAILS
					? t.resume_builder.labels.personal_information.title
					: tab === CONTACT_INFORMATION
					? t.resume_builder.labels.contact_information.title
					: tab === PROFESSIONAL_SUMMARY
					? t.resume_builder.labels.professional_summary.title
					: tab === SKILLS
					? t.resume_builder.labels.skills.title
					: tab === EDUCATION
					? t.resume_builder.labels.education.title
					: tab === LINKS
					? t.resume_builder.labels.links.title
					: tab === CERTIFICATIONS
					? t.resume_builder.labels.certifications.title
					: tab === REFERENCES
					? t.resume_builder.labels.references.title
					: tab === EMPLOYMENT_HISTORY
					? t.resume_builder.labels.employment_history.title
					: tab === CUSTOM_SECTION
					? t.resume_builder.labels.custom_section.title
					: tab === LANGUAGES
					? t.resume_builder.labels.languages.title
					: tab === HOBBIES
					? t.resume_builder.labels.hobbies.title
					: tab}
			</button>
			{!isReadOnly && (
				<RiDeleteBin5Line
					onClick={() => {
						const nextTabIndex =
							index === tabs.length - 1 ? index - 1 : index + 1
						const nextActiveTab = tabs[nextTabIndex]
						onTabChange(nextActiveTab)
						removeTabHandler(index)
					}}
					size={20}
					className="cursor-pointer"
				/>
			)}
		</li>
	)
}

export default function TabSelector({
	t,
	activeTab,
	onTabChange,
	tabs,
	removeTabHandler,
	addTabHandler,
	moveTabHandler,
	setActiveTab,
}) {
	const [isAddSectionOpen, setIsAddSectionOpen] = useState(false)

	const AVAILABLE_SECTIONS = [
		SKILLS,
		EMPLOYMENT_HISTORY,
		EDUCATION,
		LINKS,
		HOBBIES,
		CERTIFICATIONS,
		REFERENCES,
		LANGUAGES,
		CUSTOM_SECTION,
	]

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="w-full sm:w-1/5 bg-white p-4 border rounded-md shadow-md">
				<ul className="space-y-2">
					{tabs.map((tab, index) => (
						<DraggableTab
							t={t}
							key={tab}
							tab={tab}
							tabs={tabs}
							index={index}
							moveTabHandler={moveTabHandler}
							onTabChange={onTabChange}
							removeTabHandler={removeTabHandler}
							activeTab={activeTab}
						/>
					))}
				</ul>

				{/* Dropdown to Add New Tabs */}
				<div className="mt-4 border rounded px-2 py-1 bg-slate-50">
					<p
						onClick={() => setIsAddSectionOpen(!isAddSectionOpen)}
						className="text-gray-600 text-md text-center mb-1 cursor-pointer"
					>
						+ {t.resume_builder.labels.general.add_more_sections}
						{isAddSectionOpen ? (
							<FaChevronDown className="inline ml-2" />
						) : (
							<FaChevronUp className="inline ml-2" />
						)}
					</p>
					{isAddSectionOpen &&
						AVAILABLE_SECTIONS.map((section) => {
							console.log(tabs.includes(section))
							return (
								<button
									key={section}
									onClick={() => {
										addTabHandler(section)
										setActiveTab(section)
										setIsAddSectionOpen(!isAddSectionOpen)
									}}
									disabled={tabs.includes(section)}
									className={`${
										tabs.includes(section)
											? "text-slate-400 cursor-not-allowed"
											: "text-cyan-500 hover:text-cyan-700"
									} flex justify-between items-center p-2 rounded-lg hover:bg-gray-200 w-full cursor-pointer`}
								>
									+{" "}
									{section === PERSONAL_DETAILS
										? t.resume_builder.labels.personal_information.title
										: section === CONTACT_INFORMATION
										? t.resume_builder.labels.contact_information.title
										: section === PROFESSIONAL_SUMMARY
										? t.resume_builder.labels.professional_summary.title
										: section === SKILLS
										? t.resume_builder.labels.skills.title
										: section === EDUCATION
										? t.resume_builder.labels.education.title
										: section === LINKS
										? t.resume_builder.labels.links.title
										: section === CERTIFICATIONS
										? t.resume_builder.labels.certifications.title
										: section === REFERENCES
										? t.resume_builder.labels.references.title
										: section === EMPLOYMENT_HISTORY
										? t.resume_builder.labels.employment_history.title
										: section === HOBBIES
										? t.resume_builder.labels.hobbies.title
										: section === LANGUAGES
										? t.resume_builder.labels.languages.title
										: section === CUSTOM_SECTION
										? t.resume_builder.labels.custom_section.title
										: section}{" "}
									{section === SKILLS && (
										<FaHeadSideVirus size={20} className="inline ml-2" />
									)}
									{section === EMPLOYMENT_HISTORY && (
										<MdWork size={20} className="inline ml-2" />
									)}
									{section === EDUCATION && (
										<IoSchool size={20} className="inline ml-2" />
									)}
									{section === LINKS && (
										<HiLink size={20} className="inline ml-2" />
									)}
									{section === HOBBIES && (
										<HiMusicalNote size={20} className="inline ml-2" />
									)}
									{section === CERTIFICATIONS && (
										<FaMedal size={20} className="inline ml-2" />
									)}
									{section === REFERENCES && (
										<MdOutlineContactPhone size={20} className="inline ml-2" />
									)}
									{section === LANGUAGES && (
										<IoLanguage size={20} className="inline ml-2" />
									)}
									{section === CUSTOM_SECTION && (
										<BiCustomize size={20} className="inline ml-2" />
									)}
								</button>
							)
						})}
				</div>
			</div>
		</DndProvider>
	)
}
