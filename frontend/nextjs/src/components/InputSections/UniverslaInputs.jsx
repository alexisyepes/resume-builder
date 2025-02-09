import { useState, useRef } from "react"
import { MdOutlineEdit, MdOutlineDeleteOutline } from "react-icons/md"
import dynamic from "next/dynamic"
import { RiDeleteBin5Line } from "react-icons/ri"
import "react-quill-new/dist/quill.snow.css"

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false })

const modules = {
	toolbar: [
		[{ header: [1, 2, false] }],
		["bold", "italic", "underline", "strike"],
		[{ list: "ordered" }, { list: "bullet" }],
		[{ color: [] }, { background: [] }],
	],
}

export default function UniversalInput({
	title,
	fields,
	data,
	setData,
	removeTabHandler,
	activeTab,
	tabs,
	setActiveTab,
}) {
	const initialState = fields.reduce((acc, field) => {
		acc[field.name] = ""
		return acc
	}, {})
	const [formData, setFormData] = useState(initialState)
	const [editingIndex, setEditingIndex] = useState(null)
	const [editingField, setEditingField] = useState(null)
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
		console.log(formData)
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
		setData(data.filter((_, i) => i !== index))
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
			[field]: field === "responsibilities" ? value.split("\n") : value, // Ensure responsibilities stay as an array
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
		removeTabHandler(tabs.indexOf(activeTab))
		const nextTabIndex = tabs.indexOf(activeTab) + 1
		const nextActiveTab = tabs[nextTabIndex]
		setActiveTab(nextActiveTab)
	}

	return (
		<div className="p-6 bg-white ring-1 ring-slate-200 shadow-lg rounded-xl">
			<div className="flex justify-between border-b-2 pb-4 mb-2">
				<h2 className="text-xl font-bold">{title}</h2>
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
					Add {title}
				</button>
			</form>

			{data.length ? <hr className="mt-6" /> : null}

			{data.map((item, index) => (
				<div
					key={index}
					className="bg-blue-100 flex items-center justify-between rounded-md px-2 py-1 w-full text-left mt-2"
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
											onChange={(e) => handleEditChange(e, index, field.name)}
											onBlur={handleInputBlur}
											className="w-full px-2 py-1 border rounded h-24"
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
												className="h-40 mb-20 mt-4"
											/>
										</div>
									) : (
										<input
											type="text"
											value={item[field.name]}
											onChange={(e) => handleEditChange(e, index, field.name)}
											onBlur={handleInputBlur}
											className="w-full px-2 py-1 border rounded"
											autoFocus
										/>
									)
								) : field.type === "richtextarea" ? (
									<div
										className="text-gray-700 cursor-pointer"
										onClick={() => handleEditClick(index, field.name)}
										dangerouslySetInnerHTML={{ __html: item[field.name] || "" }}
									/>
								) : (
									<span
										className="text-gray-700 cursor-pointer"
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
			))}
		</div>
	)
}
