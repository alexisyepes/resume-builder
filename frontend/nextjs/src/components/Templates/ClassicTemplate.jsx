import { useState, useEffect } from "react"
import {
	CERTIFICATIONS,
	EDUCATION,
	EMPLOYMENT_HISTORY,
	REFERENCES,
	SKILLS,
} from "@/constants"
import SectionDoubleLineDivider from "../SectionDoubleLineDivider"

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
	tabs,
	certifications,
	educations,
	references,
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
			<div className="relative text-center pb-4 mb-4">
				<h1 className="text-2xl capitalize font-bold">
					{firstName || resume.firstName} {lastName || resume.lastName}
				</h1>
				<p className="text-sm font-bold text-black capitalize">
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
				<h2 className="text-lg relative font-semibold pb-1 mb-2">
					Summary <SectionDoubleLineDivider />
				</h2>

				<p className="text-sm text-gray-700">
					{objective ? (
						<span dangerouslySetInnerHTML={{ __html: objective }} />
					) : (
						<span>{resume.objective}</span>
					)}
				</p>
			</section>

			{/* Experience Section */}
			{experience.length
				? tabs.includes(EMPLOYMENT_HISTORY) && (
						<section className="mb-4">
							<h2 className="text-lg relative font-semibold pb-1 mb-2">
								Employment History
								<SectionDoubleLineDivider />
							</h2>

							{experience.map((exp, index) => (
								<div key={index} className="mb-3">
									<h3 className="capitalize flex justify-between text-sm font-semibold">
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
							))}
						</section>
				  )
				: null}

			{/* Education Section */}
			{educations && educations.length
				? tabs.includes(EDUCATION) && (
						<section className="mb-4">
							<h2 className="text-lg font-semibold relative pb-1 mb-2">
								Education
								<SectionDoubleLineDivider />
							</h2>
							{educations.map((edu, index) => (
								<h3
									key={index}
									className="mb-2 flex text-sm font-semibold justify-between items-center capitalize"
								>
									<span>
										{edu.degree} - {edu.institution}
									</span>
									<span>{edu.year}</span>
								</h3>
							))}
						</section>
				  )
				: null}

			{/* Skills Section */}
			{tabs.includes(SKILLS) && (
				<section className="mb-4">
					{skills.length ? (
						<>
							<h2 className="text-lg font-semibold relative pb-1 mb-2">
								Skills
								<SectionDoubleLineDivider />
							</h2>
							{skills.map((skill, index) => {
								return (
									<span
										key={index}
										className="text-sm mr-1 capitalize text-gray-700"
									>
										{skill}
										{index === skills.length - 1 ? "." : ","}
									</span>
								)
							})}
						</>
					) : null}
				</section>
			)}

			{/* Certification Section */}
			{certifications.length
				? tabs.includes(CERTIFICATIONS) && (
						<section>
							<h2 className="text-lg font-semibold relative pb-1 mb-2">
								Certifications
								<SectionDoubleLineDivider />
							</h2>
							{certifications &&
								certifications.map((cert, index) => (
									<ul className="list-disc pl-5 text-sm text-gray-700">
										<li className="capitalize" key={index}>
											{cert.institution} {cert.year}
										</li>
									</ul>
								))}
						</section>
				  )
				: null}

			{/* References Section */}
			{references.length
				? tabs.includes(REFERENCES) && (
						<section>
							<h2 className="text-lg font-semibold relative pb-1 mb-2">
								References
								<SectionDoubleLineDivider />
							</h2>
							{references &&
								references.map((reference, index) => (
									<ul className="list-disc pl-5 text-sm text-gray-700">
										<li className="capitalize" key={index}>
											{reference.name} {reference.company}{" "}
											{reference.email_phone}
										</li>
									</ul>
								))}
						</section>
				  )
				: null}
		</div>
	)
}
