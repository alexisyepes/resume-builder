import {
	CERTIFICATIONS,
	CONTACT_INFORMATION,
	CUSTOM_SECTION,
	EDUCATION,
	EMPLOYMENT_HISTORY,
	HOBBIES,
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
import { IoSchool, IoPerson } from "react-icons/io5"
import { HiLink, HiMusicalNote } from "react-icons/hi2"
import { FaMedal } from "react-icons/fa6"
import { MdOutlineContactEmergency } from "react-icons/md"
import { BsBuildings } from "react-icons/bs"

const READ_ONLY_TABS = [
	PERSONAL_DETAILS,
	CONTACT_INFORMATION,
	PROFESSIONAL_SUMMARY,
]

const AVAILABLE_SECTIONS = [
	SKILLS,
	EMPLOYMENT_HISTORY,
	EDUCATION,
	LINKS,
	HOBBIES,
	CERTIFICATIONS,
	REFERENCES,
	CUSTOM_SECTION,
]

const DraggableTab = ({
	tab,
	index,
	moveTabHandler,
	onTabChange,
	removeTabHandler,
	activeTab,
}) => {
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
			} flex justify-between items-center rounded-lg px-4 py-2 cursor-${
				isReadOnly ? "default" : "grab"
			} ${isDragging ? "opacity-50" : ""}`}
		>
			<button className="w-full text-left" onClick={() => onTabChange(tab)}>
				{!READ_ONLY_TABS.includes(tab) && (
					<MdOutlineDragIndicator className="inline mr-2" />
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
				{tab}
			</button>
			{!isReadOnly && (
				<RiDeleteBin5Line
					onClick={() => removeTabHandler(index)}
					size={20}
					className="cursor-pointer"
				/>
			)}
		</li>
	)
}

export default function TabSelector({
	activeTab,
	onTabChange,
	tabs,
	removeTabHandler,
	addTabHandler,
	moveTabHandler,
}) {
	const [isAddSectionOpen, setIsAddSectionOpen] = useState(false)

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="w-full sm:w-1/5 bg-white p-4 border rounded-lg shadow-md">
				<ul className="space-y-2">
					{tabs.map((tab, index) => (
						<DraggableTab
							key={tab}
							tab={tab}
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
						+ Add a Section
						{isAddSectionOpen ? (
							<FaChevronDown className="inline ml-2" />
						) : (
							<FaChevronUp className="inline ml-2" />
						)}
					</p>
					{isAddSectionOpen &&
						AVAILABLE_SECTIONS.map((section) => (
							<button
								key={section}
								onClick={() => addTabHandler(section)}
								disabled={tabs.includes(section)}
								className={`${
									tabs.includes(section)
										? "text-slate-400 cursor-not-allowed"
										: "text-cyan-500 hover:text-cyan-700"
								} flex justify-between items-center p-2 rounded-lg hover:bg-gray-200 w-full cursor-pointer`}
							>
								+ {section}{" "}
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
							</button>
						))}
				</div>
			</div>
		</DndProvider>
	)
}
