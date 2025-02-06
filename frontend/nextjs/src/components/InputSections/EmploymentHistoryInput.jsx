import { useState } from "react"

export default function EmploymentHistory({ experience, setExperience }) {
	const [formData, setFormData] = useState({
		company: "",
		role: "",
		project: "",
		year: "",
		responsibilities: "",
	})

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!formData.company || !formData.role || !formData.year) return
		const obj = {
			...formData,
			responsibilities: formData.responsibilities.split("\n").filter(Boolean),
		}
		setExperience([...experience, obj])
		setFormData({
			company: "",
			role: "",
			project: "",
			year: "",
			responsibilities: "",
		})
	}

	return (
		<div className="p-6 bg-white ring-1 ring-slate-200 shadow-lg rounded-xl">
			{experience
				? experience.map((exp, index) => {
						return (
							<button
								className="bg-slate-600 text-white rounded-md px-2 py-1 w-full text-left mb-2"
								key={index}
							>
								{exp.company} | {exp.role}
							</button>
						)
				  })
				: null}
			{experience.length ? <hr className="mb-2" /> : null}
			<h2 className="text-xl font-bold mb-4">Add Employment History</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<input
					type="text"
					name="company"
					placeholder="Company"
					value={formData.company}
					onChange={handleChange}
					className="w-full p-2 border rounded"
					required
				/>
				<input
					type="text"
					name="role"
					placeholder="Role"
					value={formData.role}
					onChange={handleChange}
					className="w-full p-2 border rounded"
					required
				/>
				<input
					type="text"
					name="project"
					placeholder="Project (optional)"
					value={formData.project}
					onChange={handleChange}
					className="w-full p-2 border rounded"
				/>
				<input
					type="text"
					name="year"
					placeholder="Year (e.g., 2020 - Present)"
					value={formData.year}
					onChange={handleChange}
					className="w-full p-2 border rounded"
					required
				/>
				<textarea
					name="responsibilities"
					placeholder="Responsibilities (each on a new line)"
					value={formData.responsibilities}
					onChange={handleChange}
					className="w-full p-2 border rounded h-24"
				/>
				<button
					type="submit"
					className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
				>
					Add Experience
				</button>
			</form>
		</div>
	)
}
