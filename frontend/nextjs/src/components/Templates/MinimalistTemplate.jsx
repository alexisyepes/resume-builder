import DOMPurify from "dompurify"
import {
	PERSONAL_DETAILS,
	PROFESSIONAL_SUMMARY,
	EMPLOYMENT_HISTORY,
	EDUCATION,
	SKILLS,
	CERTIFICATIONS,
	REFERENCES,
	LINKS,
	LANGUAGES,
	HOBBIES,
	CUSTOM_SECTION,
} from "@/constants"
import { TfiEmail } from "react-icons/tfi"
import { FiPhone } from "react-icons/fi"
import { CiLocationOn } from "react-icons/ci"
import { PiCityLight } from "react-icons/pi"
import React from "react"

const MinimalistTemplate = ({
	resumeRef,
	resume,
	photo,
	firstName,
	lastName,
	jobTitle,
	email,
	phone,
	address,
	cityPostCode,
	experience,
	orderedTabs,
	certifications,
	educations,
	references,
	links,
	hobbies,
	customSections,
	languages,
	customTitles,
	t,
	objective,
	skills,
	isPdf = false,
}) => {
	const cleanHTML = DOMPurify.sanitize(objective, { ALLOWED_ATTR: ["style"] })

	if (!resume || !resume.experience) {
		return <p>Loading resume data...</p>
	}

	const sectionMap = {
		[PROFESSIONAL_SUMMARY]: (
			<section className="mt-6">
				{objective && (
					<>
						<h2
							className={`text-xl font-bold text-gray-800 mb-3 border-l-4 border-blue-500 pl-3 ${
								isPdf ? "section-border" : ""
							}`}
						>
							{customTitles[PROFESSIONAL_SUMMARY] ||
								t.resume_builder.labels.professional_summary.title}
						</h2>
						<div
							className="text-gray-600 leading-relaxed"
							dangerouslySetInnerHTML={{ __html: cleanHTML }}
						/>
					</>
				)}
			</section>
		),
		[EMPLOYMENT_HISTORY]: (
			<section className="mt-6">
				{experience.length > 0 && (
					<>
						<h2
							className={`text-xl font-bold text-gray-800 mb-4 border-l-4 border-blue-500 pl-3 ${
								isPdf ? "section-border" : ""
							}`}
						>
							{customTitles[t.resume_builder.labels.employment_history.title] ||
								t.resume_builder.labels.employment_history.title}
						</h2>
						<div className="space-y-4">
							{experience.map((exp, index) => (
								<div key={index} className="">
									<div className="flex justify-between items-start mb-2">
										<h3 className="font-semibold text-gray-800 text-lg">
											{exp.role}
										</h3>
										<span
											className={`text-blue-600 text-sm font-medium bg-blue-50 px-2 py-1 rounded ${
												isPdf ? "year-badge" : ""
											}`}
										>
											{exp.year}
										</span>
									</div>
									<p className="text-gray-600 text-sm mb-2">{exp.company}</p>
									{exp.responsibilities && (
										<ul className="list-disc pl-5 text-gray-600 space-y-1">
											{exp.responsibilities.map((task, i) => (
												<li key={`${exp.company}-${i}`} className="text-sm">
													{task}
												</li>
											))}
										</ul>
									)}
								</div>
							))}
						</div>
					</>
				)}
			</section>
		),
		[SKILLS]: (
			<section className="mt-6">
				{skills.length > 0 && (
					<>
						<h2
							className={`text-xl font-bold text-gray-800 mb-3 border-l-4 border-blue-500 pl-3 ${
								isPdf ? "section-border" : ""
							}`}
						>
							{customTitles[SKILLS] || t.resume_builder.labels.skills.title}
						</h2>
						<div className="flex flex-wrap gap-2">
							{skills.map((skill, index) => (
								<span
									key={index}
									className={`bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm border border-gray-300 ${
										isPdf ? "skill-badge" : ""
									}`}
								>
									{skill}
								</span>
							))}
						</div>
					</>
				)}
			</section>
		),
		[CERTIFICATIONS]: (
			<section className="mt-6">
				{certifications && certifications.length > 0 && (
					<>
						<h2
							className={`text-xl font-bold text-gray-800 mb-3 border-l-4 border-blue-500 pl-3 ${
								isPdf ? "section-border" : ""
							}`}
						>
							{customTitles[t.resume_builder.labels.certifications.title] ||
								t.resume_builder.labels.certifications.title}
						</h2>
						<div className="space-y-2">
							{certifications.map((cert, index) => (
								<div
									key={`${cert.institution}-${cert.year}`}
									className="flex justify-between"
								>
									<span className="text-gray-700">
										{cert.certificationName}
									</span>
									<span
										className={`text-blue-600 text-sm ${
											isPdf ? "year-badge" : ""
										}`}
									>
										{cert.year}
									</span>
								</div>
							))}
						</div>
					</>
				)}
			</section>
		),
		[LANGUAGES]: (
			<section className="mt-6">
				{languages && languages.length > 0 && (
					<>
						<h2
							className={`text-xl font-bold text-gray-800 mb-3 border-l-4 border-blue-500 pl-3 ${
								isPdf ? "section-border" : ""
							}`}
						>
							{customTitles[LANGUAGES] ||
								t.resume_builder.labels.languages.title}
						</h2>
						<div className="flex flex-wrap gap-2">
							{languages.map((language, index) => (
								<span
									key={index}
									className={`bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm ${
										isPdf ? "skill-badge" : ""
									}`}
								>
									{language.language}
								</span>
							))}
						</div>
					</>
				)}
			</section>
		),
		[HOBBIES]: (
			<section className="mt-6">
				{hobbies && hobbies.length > 0 && (
					<>
						<h2
							className={`text-xl font-bold text-gray-800 mb-3 border-l-4 border-blue-500 pl-3 ${
								isPdf ? "section-border" : ""
							}`}
						>
							{customTitles[t.resume_builder.labels.hobbies.title] ||
								t.resume_builder.labels.hobbies.title}
						</h2>
						<div className="flex flex-wrap gap-2">
							{hobbies.map((hobby, index) => (
								<span
									key={`${hobby.hobbies}-${index}`}
									className={`bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm ${
										isPdf ? "skill-badge" : ""
									}`}
								>
									{hobby.hobbies}
								</span>
							))}
						</div>
					</>
				)}
			</section>
		),
		[LINKS]: (
			<section className="mt-6">
				{links && links.length > 0 && (
					<>
						<h2
							className={`text-xl font-bold text-gray-800 mb-3 border-l-4 border-blue-500 pl-3 ${
								isPdf ? "section-border" : ""
							}`}
						>
							{customTitles[t.resume_builder.labels.links.title] ||
								t.resume_builder.labels.links.title}
						</h2>
						<div className="space-y-2">
							{links.map((link, index) => (
								<div key={index} className="text-blue-600 hover:text-blue-800">
									<a
										href={link.link}
										target="_blank"
										rel="noopener noreferrer"
										className="text-sm"
									>
										{link.name}
									</a>
								</div>
							))}
						</div>
					</>
				)}
			</section>
		),
		[REFERENCES]: (
			<section className="mt-6">
				{references && references.length > 0 && (
					<>
						<h2
							className={`text-xl font-bold text-gray-800 mb-3 border-l-4 border-blue-500 pl-3 ${
								isPdf ? "section-border" : ""
							}`}
						>
							{customTitles[REFERENCES] ||
								t.resume_builder.labels.references.title}
						</h2>
						<div className="space-y-3">
							{references.map((reference, index) => (
								<div key={index} className="text-sm text-gray-600">
									<p className="font-semibold">{reference.name}</p>
									<p>{reference.company}</p>
									<p>{reference.email_phone}</p>
								</div>
							))}
						</div>
					</>
				)}
			</section>
		),
		[CUSTOM_SECTION]: (
			<section className="mt-6">
				{customSections &&
					customSections.map((section, index) => (
						<div key={`${section.header}-${index}`} className="mb-4">
							{section.header && (
								<h2
									className={`text-xl font-bold text-gray-800 mb-3 border-l-4 border-blue-500 pl-3 ${
										isPdf ? "section-border" : ""
									}`}
								>
									{section.header}
								</h2>
							)}
							{section.subHeader && (
								<h3 className="font-semibold text-gray-700 mb-2">
									{section.subHeader}
								</h3>
							)}
							{section.content && (
								<div
									className="text-gray-600 leading-relaxed"
									dangerouslySetInnerHTML={{ __html: section.content }}
								/>
							)}
						</div>
					))}
			</section>
		),
	}

	return (
		<div
			ref={resumeRef}
			className={`min-h-screen bg-white element element3 ${
				isPdf ? "minimalist-template" : ""
			}`}
		>
			{/* Header Section */}
			<div
				className={`bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 px-12 ${
					isPdf ? "header-gradient" : ""
				}`}
			>
				<div className="flex justify-between items-start">
					<div className="flex-1">
						<h1 className="text-4xl font-bold mb-2">
							{firstName} {lastName}
						</h1>
						<h2 className="text-xl text-blue-100 mb-4">{jobTitle}</h2>

						{/* Contact Info */}
						<div
							className={`grid grid-cols-2 gap-2 text-sm ${
								isPdf ? "contact-grid" : ""
							}`}
						>
							{email && (
								<div className="flex items-center">
									<TfiEmail className="mr-2" />
									<span>{email}</span>
								</div>
							)}
							{phone && (
								<div className="flex items-center">
									<FiPhone className="mr-2" />
									<span>{phone}</span>
								</div>
							)}
							{address && (
								<div className="flex items-center">
									<CiLocationOn className="mr-2" />
									<span>{address}</span>
								</div>
							)}
							{cityPostCode && (
								<div className="flex items-center">
									<PiCityLight className="mr-2" />
									<span>{cityPostCode}</span>
								</div>
							)}
						</div>
					</div>

					{photo && (
						<div className="w-32 h-32 overflow-hidden rounded-full border-4 border-white shadow-lg">
							<img
								src={photo}
								alt="Profile"
								className="w-full h-full object-cover"
							/>
						</div>
					)}
				</div>
			</div>

			{/* Main Content */}
			<div className="content-area px-12 py-8">
				{orderedTabs.map((tab, i) => {
					const section = sectionMap[tab]
					if (React.isValidElement(section)) {
						// Clonar el elemento y agregar clases para PDF
						return React.cloneElement(section, {
							key: i,
							className: `${section.props.className || ""} ${
								isPdf ? "pdf-section" : ""
							}`,
						})
					}
					return <div key={i}>{section}</div>
				})}
			</div>
		</div>
	)
}

export default MinimalistTemplate
