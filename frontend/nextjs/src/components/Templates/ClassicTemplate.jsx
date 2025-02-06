import { useState, useEffect } from "react"

export default function ClassicTemaplate({
	resume,
	email,
	firstName,
	lastName,
	jobTitle,
	phone,
	address,
	cityPostCode,
	objective,
	experience,
	skills,
}) {
	const [scale, setScale] = useState(1)

	useEffect(() => {
		const updateScale = () => {
			setScale(Math.min(1, window.innerWidth / 1200))
		}

		updateScale()
		window.addEventListener("resize", updateScale)

		return () => window.removeEventListener("resize", updateScale)
	}, [])

	if (!resume) return <p>Loading resume data...</p>

	return (
		<div
			className="resume-template w-[8.5in] h-[11in] bg-white shadow-lg rounded-md p-12 mx-auto border overflow-auto origin-top"
			style={{ transform: `scale(${scale})` }}
		>
			{/* Header Section */}
			<div className="text-center border-b-2 pb-4 mb-4">
				<h1 className="text-3xl capitalize font-bold">
					{firstName || resume.firstName} {lastName || resume.lastName}
				</h1>
				<p className="text-sm font-bold text-gray-600 capitalize">
					{jobTitle || resume.jobTitle}
				</p>
				<p className="text-sm">
					{email || resume.contact.email} | {phone || resume.contact.phone}
				</p>
				<p className="text-sm">
					{address || resume.contact.address},{" "}
					{cityPostCode || resume.contact.cityPostCode}
				</p>
			</div>

			{/* Summary Section */}
			<section className="mb-4">
				<h2 className="text-lg font-semibold border-b-2 pb-1 mb-2">Summary</h2>
				<p className="text-sm text-gray-700">
					<span dangerouslySetInnerHTML={{ __html: objective }} />
				</p>
			</section>

			{/* Experience Section */}
			<section className="mb-4">
				<h2 className="text-lg font-semibold border-b-2 pb-1 mb-2">
					Experience
				</h2>
				{experience && experience.length ? (
					experience.map((exp, index) => (
						<div key={index} className="mb-3">
							<h3 className="capitalize flex justify-between font-semibold">
								<span>
									{exp.company} - {exp.role}
								</span>
								<span>{exp.year}</span>
							</h3>
							<ul className="list-disc pl-5 text-sm text-gray-700">
								{exp.responsibilities.map((task, i) => (
									<li className="capitalize" key={i}>
										{task}
									</li>
								))}
							</ul>
						</div>
					))
				) : (
					<span>No experience added yet.</span>
				)}
			</section>

			{/* Education Section */}
			<section className="mb-4">
				<h2 className="text-lg font-semibold border-b-2 pb-1 mb-2">
					Education
				</h2>
				{resume.education.map((edu, index) => (
					<div key={index} className="mb-2">
						<h3 className="font-semibold">
							{edu.degree} - {edu.institution}
						</h3>
						<p className="text-xs text-gray-500">{edu.period}</p>
					</div>
				))}
			</section>

			{/* Skills Section */}
			<section className="mb-4">
				{skills.length ? (
					<>
						<h2 className="text-lg font-semibold border-b-2 pb-1 mb-2">
							Skills
						</h2>
						{skills.map((skill, index) => {
							return (
								<p key={index} className="text-sm capitalize text-gray-700">
									{skill}
								</p>
							)
						})}
					</>
				) : null}
			</section>

			{/* Certification Section */}
			<section>
				<h2 className="text-lg font-semibold border-b-2 pb-1 mb-2">
					Certifications
				</h2>
				{resume.certifications &&
					resume.certifications.map((cert, index) => (
						<p key={index} className="text-sm text-gray-700">
							{cert}
						</p>
					))}
			</section>
		</div>
	)
}
