import { useState, useRef, RefObject, ChangeEvent, FormEvent } from "react"
import dynamic from "next/dynamic"
import { MdOutlineEdit, MdOutlineDeleteOutline } from "react-icons/md"
import { RiDeleteBin5Line } from "react-icons/ri"
import { CiEdit } from "react-icons/ci"
import { GrLinkNext } from "react-icons/gr"
import { AnimatePresence, motion } from "framer-motion"
import DOMPurify from "dompurify"
import CustomTitleInput from "./CustomTitleInput"
import { EMPLOYMENT_HISTORY } from "@/constants"

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false })
import "react-quill-new/dist/quill.snow.css"

const modules = {
	toolbar: [
		["bold", "italic", "underline", "strike"],
		[{ color: [] }, { background: [] }],
	],
}

interface Field {
	name: string
	label: string
	placeholder: string
	type: "text" | "textarea" | "richtextarea" | string
	required?: boolean
}

interface UniversalInputProps<T extends Record<string, any>> {
	t: any
	cta_label: string
	title: string
	fields: Field[]
	data: T[]
	setData: (data: T[]) => void
	removeTabHandler: (tab: string) => void
	activeTab: string
	tabs: string[]
	setActiveTab: (tab: string) => void
	editing: string | null
	setEditing: (value: string | null) => void
	customTitles: Record<string, string>
	handleCustomTitleOnChange: (key: string, value: string) => void
	inputRef: RefObject<HTMLInputElement>
	nextTabHandler: () => void
}

export default function UniversalInput<T extends Record<string, any>>({
	t,
	cta_label,
	title,
	fields,
	data,
	setData,
	activeTab,
	tabs,
	setActiveTab,
	removeTabHandler,
	editing,
	setEditing,
	customTitles,
	handleCustomTitleOnChange,
	inputRef,
	nextTabHandler,
}: UniversalInputProps<T>) {
	const initialState = fields.reduce<T>((acc, field) => {
		acc[field.name as keyof T] = "" as any
		return acc
	}, {} as T)

	const [formData, setFormData] = useState<T>(initialState)
	const [editingIndex, setEditingIndex] = useState<number | null>(null)
	const [editingField, setEditingField] = useState<string | null>(null)
	const [deletingIndex, setDeletingIndex] = useState<number | null>(null)
	const quillRef = useRef<HTMLDivElement>(null)

	// INPUT CHANGE
	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleRichTextChange = (value: string, fieldName: string) => {
		setFormData((prev) => ({
			...prev,
			[fieldName]: value,
		}))
	}

	// SUBMIT
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const isValid = fields.every(
			(field) => !field.required || formData[field.name as keyof T]
		)
		if (!isValid) return

		const newForm: T = { ...formData }

		if (
			(newForm as any).responsibilities &&
			typeof (newForm as any).responsibilities === "string"
		) {
			;(newForm as any).responsibilities = (newForm as any).responsibilities
				.split("\n")
				.filter(Boolean)
		}

		setData([...data, newForm])
		setFormData(initialState)
	}

	// DELETE
	const handleDelete = (index: number) => {
		setDeletingIndex(index)
		setData(data.filter((_, i) => i !== index))
		setTimeout(() => setDeletingIndex(null), 200)
	}

	// EDIT
	const handleEditClick = (index: number, fieldName: string) => {
		setEditingIndex(index)
		setEditingField(fieldName)
	}

	const handleEditChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		index: number,
		field: keyof T
	) => {
		const { value } = e.target
		const updatedData = [...data]

		let formattedValue: string[] | string = value.split("\n")
		if (formattedValue.length === 1 && formattedValue[0].trim() === "")
			formattedValue = []

		updatedData[index] = {
			...updatedData[index],
			[field]:
				field === "responsibilities" || field === "languages"
					? formattedValue
					: value,
		}

		setData(updatedData)
	}

	const handleRichTextEditChange = (
		value: string,
		index: number,
		field: keyof T
	) => {
		const updatedData = [...data]
		updatedData[index] = {
			...updatedData[index],
			[field]: value,
		}
		setData(updatedData)
	}

	const handleInputBlur = () => {
		setEditingIndex(null)
		setEditingField(null)
	}

	const handleRichTextBlur = (e: React.FocusEvent<HTMLDivElement>) => {
		if (
			quillRef.current &&
			!quillRef.current.contains(e.relatedTarget as Node)
		) {
			setEditingIndex(null)
			setEditingField(null)
		}
	}

	// REMOVE SECTION
	const handleRemoveSection = () => {
		const currentActiveTabIndex = tabs.indexOf(activeTab)
		const nextTabIndex =
			currentActiveTabIndex === tabs.length - 1
				? currentActiveTabIndex - 1
				: currentActiveTabIndex + 1
		setActiveTab(tabs[nextTabIndex])
		removeTabHandler(activeTab)
	}

	// RENDER
	return (
		<div className="p-6 bg-white ring-1 ring-slate-200 shadow-lg rounded-md">
			{/* Header */}
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
				)}
				<RiDeleteBin5Line
					onClick={handleRemoveSection}
					className="cursor-pointer"
					size={24}
				/>
			</div>

			{/* Form */}
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
								value={formData[field.name as keyof T] as any}
								onChange={handleChange}
								className="w-full p-2 border rounded h-24"
							/>
						) : field.type === "richtextarea" ? (
							<ReactQuill
								value={(formData[field.name as keyof T] as any) || ""}
								onChange={(value) => handleRichTextChange(value, field.name)}
								modules={modules}
								className="h-40 mb-20 mt-4"
							/>
						) : (
							<input
								type={field.type}
								name={field.name}
								placeholder={field.placeholder}
								value={formData[field.name as keyof T] as any}
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

			{/* Next tab button */}
			{data.length > 0 && (
				<button
					onClick={nextTabHandler}
					className="w-full capitalize mt-4 bg-cyan-500 text-white p-2 rounded"
				>
					{t.resume_builder.labels.general.next}
					<GrLinkNext className="inline ml-2" />
				</button>
			)}

			{/* Items list */}
			<AnimatePresence>
				{data.map((item, index) => (
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
						<div className="flex-grow text-white">
							{fields.map((field) => {
								const fieldValue = item[field.name as keyof T]
								const textareaValue = Array.isArray(fieldValue)
									? fieldValue.join("\n")
									: fieldValue || ""

								const displayValue = Array.isArray(fieldValue)
									? fieldValue.join(", ")
									: fieldValue || ""

								return (
									<div key={field.name} className="flex items-center gap-2">
										{/* edit icon */}
										{editingIndex !== index && (
											<MdOutlineEdit
												onClick={() => handleEditClick(index, field.name)}
												className="cursor-pointer"
											/>
										)}

										{/* Editable field */}
										{editingIndex === index && editingField === field.name ? (
											field.type === "textarea" ? (
												<textarea
													value={textareaValue}
													onChange={(e) =>
														handleEditChange(e, index, field.name as keyof T)
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
												>
													<ReactQuill
														value={item[field.name as keyof T] as any}
														onChange={(value) =>
															handleRichTextEditChange(
																value,
																index,
																field.name as keyof T
															)
														}
														modules={modules}
														className="h-36 bg-white text-black pb-11 mt-4"
													/>
												</div>
											) : (
												<input
													type="text"
													value={item[field.name as keyof T] as any}
													onChange={(e) =>
														handleEditChange(e, index, field.name as keyof T)
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
													__html: DOMPurify.sanitize(
														item[field.name as keyof T] as any
													),
												}}
											/>
										) : (
											<span
												className="cursor-pointer"
												onClick={() => handleEditClick(index, field.name)}
											>
												<strong>{field.label}:</strong> {displayValue}
											</span>
										)}
									</div>
								)
							})}
						</div>

						{/* delete icon */}
						{editingIndex !== index && (
							<MdOutlineDeleteOutline
								onClick={() => handleDelete(index)}
								className="cursor-pointer"
							/>
						)}
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	)
}
