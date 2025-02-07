import { useState } from "react"
import { MdOutlineEdit, MdOutlineDeleteOutline } from "react-icons/md"

export default function UniversalInput({ title, fields, data, setData }) {
	const initialState = fields.reduce((acc, field) => {
		acc[field.name] = ""
		return acc
	}, {})

	const [formData, setFormData] = useState(initialState)
	const [editingIndex, setEditingIndex] = useState(null)
	const [editingField, setEditingField] = useState(null) // Track which field is being edited

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		const isValid = fields.every(
			(field) => !field.required || formData[field.name]
		)
		if (!isValid) return

		const formattedData = { ...formData }
		fields.forEach((field) => {
			if (field.type === "textarea") {
				formattedData[field.name] = formData[field.name]
					.split("\n")
					.filter(Boolean)
			}
		})

		setData([...data, formattedData])
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
		const updatedData = [...data]
		updatedData[index] = { ...updatedData[index], [field]: e.target.value }
		setData(updatedData)
	}

	const handleBlur = () => {
		setEditingIndex(null)
		setEditingField(null)
	}

	return (
		<div className="p-6 bg-white ring-1 ring-slate-200 shadow-lg rounded-xl">
			<h2 className="text-xl font-bold mb-4">{title}</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				{fields.map((field) => (
					<div key={field.name}>
						<label
							htmlFor={field.name}
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							{field.label}
						</label>
						{field.type === "textarea" ? (
							<textarea
								id={field.name}
								name={field.name}
								placeholder={field.placeholder}
								value={formData[field.name]}
								onChange={handleChange}
								className="w-full p-2 border rounded h-24"
							/>
						) : (
							<input
								id={field.name}
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
									<input
										type="text"
										value={item[field.name]}
										onChange={(e) => handleEditChange(e, index, field.name)}
										onBlur={handleBlur}
										className="w-full px-2 py-1 border rounded"
										autoFocus
									/>
								) : (
									<span
										className="text-gray-700 cursor-pointer"
										onClick={() => handleEditClick(index, field.name)}
									>
										<strong>{field.label}:</strong> {item[field.name]}
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
