import { useState, useRef } from "react"
import { MdOutlineEdit, MdOutlineDeleteOutline } from "react-icons/md"
import dynamic from "next/dynamic"
import { RiDeleteBin5Line } from "react-icons/ri"
import "react-quill-new/dist/quill.snow.css"
import DOMPurify from "dompurify"
import { motion, AnimatePresence } from "framer-motion"
import { EMPLOYMENT_HISTORY } from "@/constants"
import CustomTitleInput from "./CustomTitleInput"
import { CiEdit } from "react-icons/ci"
import { GrLinkNext } from "react-icons/gr"

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false })

const modules = {
	toolbar: [
		// [{ header: [1, 2, false] }],
		["bold", "italic", "underline", "strike"],
		// [{ list: "ordered" }, { list: "bullet" }],
		[{ color: [] }, { background: [] }],
	],
}

export default function UniversalInput({
	t,
	cta_label,
	title,
	fields,
	data,
	setData,
	removeTabHandler,
	activeTab,
	tabs,
	setActiveTab,
	editing,
	setEditing,
	customTitles,
	handleCustomTitleOnChange,
	inputRef,
	nextTabHandler,
}) {
	const initialState = fields.reduce((acc, field) => {
		acc[field.name] = ""
		return acc
	}, {})
	const [formData, setFormData] = useState(initialState)
	const [editingIndex, setEditingIndex] = useState(null)
	const [editingField, setEditingField] = useState(null)
	const [deletingIndex, setDeletingIndex] = useState(null)
	const quillRef = useRef(null)

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleRichTextChange = (value, fieldName) => {
		setFormData((prev) => ({ ...prev, [fieldName]: value }))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const isValid = fields.every(
			(field) => !field.required || formData[field.name]
		)
		if (!isValid) return

		if (formData.responsibilities) {
			console.log(formData.responsibilities)
			formData.responsibilities = formData.responsibilities
				.split("\n")
				.filter(Boolean)
		}

		setData([...data, formData])
		setFormData(initialState)
	}

	const handleDelete = (index) => {
		setDeletingIndex(index)

		setData((prev) => {
			if (!Array.isArray(prev)) {
				console.error("customSections is not an array:", prev)
				return prev
			}
			const newData = prev.filter((_, i) => i !== index)

			return [...newData]
		})

		setTimeout(() => {
			setDeletingIndex(null)
		}, 200)
	}

	const handleEditClick = (index, fieldName) => {
		setEditingIndex(index)
		setEditingField(fieldName)
	}

	const handleEditChange = (e, index, field) => {
		const { value } = e.target
		const updatedData = [...data]

		updatedData[index] = {
			...updatedData[index],
			[field]:
				field === "responsibilities" || field === "languages"
					? value.split("\n")
					: value, // Ensure responsibilities stay as an array
		}

		setData(updatedData)
	}
	const handleRichTextEditChange = (value, index, field) => {
		const updatedData = [...data]
		updatedData[index] = { ...updatedData[index], [field]: value }
		setData(updatedData)
	}

	// 🟢 Handles blur for text inputs only
	const handleInputBlur = () => {
		setEditingIndex(null)
		setEditingField(null)
	}

	// 🟢 Handles blur for ReactQuill only when clicking outside of it
	const handleRichTextBlur = (e) => {
		if (
			quillRef.current &&
			!quillRef.current.contains(e.relatedTarget) // Prevent blur if clicking inside the editor
		) {
			setEditingIndex(null)
			setEditingField(null)
		}
	}

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
		<div className="p-6 bg-white ring-1 ring-slate-200 shadow-lg rounded-md">
			<div className="flex justify-between border-b-2 pb-2 mb-2">
				{editing === title ? (
					<CustomTitleInput
						inputRef={inputRef}
						customTitleValue={customTitles[title]}
						sectionKey={title}
						handleCustomTitleOnChange={handleCustomTitleOnChange}
					/>
				) : (
					<h2 className="text-xl mb-2 font-bold">
						<CiEdit
							size={24}
							onClick={() => setEditing(editing === title ? null : title)}
							className="cursor-pointer inline mr-2"
						/>
						{customTitles[title] || title}{" "}
						{activeTab === EMPLOYMENT_HISTORY && (
							<span className="text-xs text-slate-500 inline-block">
								({t.resume_builder.labels.employment_history.title_2})
							</span>
						)}
					</h2>
				)}{" "}
				<RiDeleteBin5Line
					onClick={handleRemoveSection}
					className="cursor-pointer"
					size={24}
				/>
			</div>
			<form onSubmit={handleSubmit} className="space-y-4">
				{fields.map((field) => (
					<div key={field.name}>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							{field.label}
						</label>
						{field.type === "textarea" ? (
							<textarea
								name={field.name}
								placeholder={field.placeholder}
								value={formData[field.name]}
								onChange={handleChange}
								className="w-full p-2 border rounded h-24"
							/>
						) : field.type === "richtextarea" ? (
							<ReactQuill
								value={formData[field.name]}
								onChange={(value) => handleRichTextChange(value, field.name)}
								modules={modules}
								className="h-40 mb-20 mt-4"
							/>
						) : (
							<input
								type={field.type}
								name={field.name}
								placeholder={field.placeholder}
								value={formData[field.name]}
								onChange={handleChange}
								className="w-full p-2 border rounded"
								required={field.required}
							/>
						)}
					</div>
				))}
				<button
					type="submit"
					className="w-full bg-cyan-600 text-white py-2 rounded hover:bg-cyan-700 transition"
				>
					+ {cta_label}
				</button>
			</form>
			<button
				onClick={nextTabHandler}
				className="w-full capitalize mt-4 bg-cyan-500 text-white p-2 rounded"
			>
				{t.resume_builder.labels.general.next}
				<GrLinkNext className="inline ml-2" />
			</button>

			{data.length ? <hr className="mt-6" /> : null}

			<AnimatePresence>
				{(Array.isArray(data) ? data : []).map((item, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={
							deletingIndex === index
								? { opacity: 0, rotate: -360, scale: 0.5 }
								: {}
						}
						transition={{ duration: 0.7, ease: "easeInOut" }}
						className="bg-[#336e7b] flex items-center justify-between rounded-md px-2 py-1 w-full text-left mt-2"
					>
						<div
							key={index}
							className="bg-[#336e7b] text-white flex items-center justify-between rounded-md px-2 py-1 w-full text-left mt-2"
						>
							<div className="flex-grow">
								{fields.map((field) => (
									<div key={field.name} className="flex items-center gap-2">
										{editingIndex !== index && (
											<MdOutlineEdit
												onClick={() => handleEditClick(index, field.name)}
												className="cursor-pointer"
											/>
										)}
										{editingIndex === index && editingField === field.name ? (
											field.type === "textarea" ? (
												<textarea
													value={
														Array.isArray(item[field.name])
															? item[field.name].join("\n")
															: item[field.name]
													} // Ensure it's a string for textarea
													onChange={(e) =>
														handleEditChange(e, index, field.name)
													}
													onBlur={handleInputBlur}
													className="w-full text-black px-2 py-1 border rounded h-24"
													autoFocus
												/>
											) : field.type === "richtextarea" ? (
												<div
													ref={quillRef}
													onBlur={handleRichTextBlur}
													tabIndex={0}
													className="relative"
												>
													<ReactQuill
														value={item[field.name] || ""}
														onChange={(value) =>
															handleRichTextEditChange(value, index, field.name)
														}
														modules={modules}
														className="h-36 bg-white text-black pb-11 mt-4"
													/>
												</div>
											) : (
												<input
													type="text"
													value={item[field.name]}
													onChange={(e) =>
														handleEditChange(e, index, field.name)
													}
													onBlur={handleInputBlur}
													className="w-full text-black px-2 py-1 border rounded"
													autoFocus
												/>
											)
										) : field.type === "richtextarea" ? (
											<div
												className="cursor-pointer"
												onClick={() => handleEditClick(index, field.name)}
												dangerouslySetInnerHTML={{
													__html: DOMPurify.sanitize(item[field.name] || ""),
												}}
											/>
										) : (
											<span
												className="cursor-pointer"
												onClick={() => handleEditClick(index, field.name)}
											>
												<strong>{field.label}:</strong>{" "}
												{Array.isArray(item[field.name])
													? item[field.name].join(", ")
													: item[field.name]}
											</span>
										)}
									</div>
								))}
							</div>
							{editingIndex !== index && (
								<MdOutlineDeleteOutline
									onClick={() => handleDelete(index)}
									className="cursor-pointer"
								/>
							)}
						</div>
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	)
}
