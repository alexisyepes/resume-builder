import { type ReactNode } from "react"

import {
	CERTIFICATIONS,
	CUSTOM_SECTION,
	EDUCATION,
	EMPLOYMENT_HISTORY,
	HOBBIES,
	LANGUAGES,
	LINKS,
	REFERENCES,
	SKILLS,
} from "@/constants"
import DOMPurify from "dompurify"

import SectionDoubleLineDivider from "../SectionDoubleLineDivider"
import type { TemplateCommonProps } from "@/types/templates"

type ClassicTemplateProps = TemplateCommonProps

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
	orderedTabs,
	certifications,
	educations,
	references,
	links,
	hobbies,
	customSections,
	languages,
	photo,
}: ClassicTemplateProps) {
	const mt_sections = "mt-4"
	const sectionMap: Record<string, ReactNode> = {
		[EMPLOYMENT_HISTORY]: (
			<section className={mt_sections}>
				<h2
					style={{ letterSpacing: "0.01px" }}
					className="text-lg font-semibold"
				>
					{EMPLOYMENT_HISTORY}
				</h2>
				<SectionDoubleLineDivider />

				{experience &&
					experience.map((exp, index) => (
						<div key={index} className="mb-3 mt-2">
							<h3 className="capitalize flex justify-between text-sm font-semibold">
								<span>
									{exp.company} - {exp.role}
								</span>
								<span>{exp.year}</span>
							</h3>
							{exp.responsibilities && (
								<ul className="list-disc pl-5 text-sm text-gray-700">
									{exp.responsibilities.map((task, i) => (
										<li className="capitalize" key={`${exp.company}-${i}`}>
											{task}
										</li>
									))}
								</ul>
							)}
						</div>
					))}
			</section>
		),
		[EDUCATION]: (
			<section className={mt_sections}>
				<h2 className="text-lg font-semibold relative pb-1 mb-2">
					{EDUCATION}
					<SectionDoubleLineDivider />
				</h2>
				{educations.map((edu, index) => (
					<h3
						key={`${edu.institution}-${edu.degree}`}
						className="mb-2 flex text-sm font-semibold justify-between items-center capitalize"
					>
						<span>
							{edu.degree} - {edu.institution}
						</span>
						<span>{edu.year}</span>
					</h3>
				))}
			</section>
		),
		[SKILLS]: (
			<section className={mt_sections}>
				{skills.length ? (
					<>
						<h2 className="text-lg font-semibold relative pb-1 mt-2">
							{SKILLS}
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
		),
		[LANGUAGES]: (
			<section className={mt_sections}>
				{languages.length ? (
					<>
						<h2 className="text-lg font-semibold relative pb-1 mt-2">
							{LANGUAGES}
							<SectionDoubleLineDivider />
						</h2>
						{languages.map((language, index) => {
							return (
								<span
									key={index}
									className="text-sm mr-1 capitalize text-gray-700"
								>
									{language.language}
									{index === languages.length - 1 ? "." : ","}
								</span>
							)
						})}
					</>
				) : null}
			</section>
		),
		[CERTIFICATIONS]: (
			<section className={mt_sections}>
				<h2 className="text-lg font-semibold relative pb-1">
					{CERTIFICATIONS}
					<SectionDoubleLineDivider />
				</h2>
				{certifications &&
					certifications.map((cert, index) => (
						<h3
							key={`${cert.institution}-${cert.year}`}
							className="mb-2 flex text-sm font-semibold justify-between items-center capitalize"
						>
							<span>{cert.institution}</span>
							<span>{cert.year}</span>
						</h3>
					))}
			</section>
		),
		[REFERENCES]: (
			<section className={mt_sections}>
				<h2 className="text-lg font-semibold relative pb-1">
					{REFERENCES}
					<SectionDoubleLineDivider />
				</h2>
				{references &&
					references.map((reference, index) => (
						<ul key={index} className="list-disc pl-5 text-sm text-gray-700">
							<li className="capitalize">
								{reference.name} {reference.company} {reference.email_phone}
							</li>
						</ul>
					))}
			</section>
		),
		[LINKS]: (
			<section className={mt_sections}>
				<h2 className="text-lg font-semibold relative pb-1">
					{LINKS}
					<SectionDoubleLineDivider />
				</h2>
				{links &&
					links.map((link, index) => (
						<ul key={index} className="list-disc pl-5 text-sm text-gray-700">
							<li>
								{link.name}: {link.link}
							</li>
						</ul>
					))}
			</section>
		),
		[HOBBIES]: (
			<section className={mt_sections}>
				<h2 className="text-lg font-semibold relative pb-1">
					{HOBBIES}
					<SectionDoubleLineDivider />
				</h2>
				{hobbies &&
					hobbies.map((hobby, index) => (
						<span
							className="capitalize text-sm mr-1"
							key={`${hobby.hobbies}-${index}`}
						>
							{hobby.hobbies}
							{index === hobbies.length - 1 ? "." : ","}
						</span>
					))}
			</section>
		),
		[CUSTOM_SECTION]: (
			<section className={mt_sections}>
				{customSections &&
					customSections.map((section, index) => {
						console.log(section)
						return (
							<div
								className="capitalize text-sm"
								key={`${section.header}-${index}`}
							>
								{section.header && (
									<h2 className="text-lg font-semibold relative pb-1 ">
										{section.header}
									</h2>
								)}
								{section.subHeader && (
									<h3 className="text-md font-semibold relative pb-1">
										{section.subHeader}
									</h3>
								)}
								{section.content && (
									<div
										className="ql-editor text-gray-700 cursor-pointer"
										dangerouslySetInnerHTML={{ __html: section.content }}
									/>
								)}
							</div>
						)
					})}
			</section>
		),
	}

	if (!resume) return <p>Loading resume data...</p>

	return (
		<div className="resume-template shadow-[0_10px_30px_rgba(0,0,0,0.4)] p-10 ring-slate-200 bg-white h-[1056px] w-[816px] mx-auto rounded-md ring-2">
			{/* Header Section */}
			<div className="relative text-center pb-4 mb-4">
				{photo && (
					<div
						className="w-24 h-auto mx-auto my-4 overflow-hidden rounded-lg"
						// style={{ aspectRatio: "1 / 1" }}
					>
						<img
							src={photo}
							alt="Uploaded preview"
							className="w-full h-auto rounded-full object-cover"
						/>
					</div>
				)}

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
				<h2 className="text-lg relative font-semibold mb-2">
					Summary
					<SectionDoubleLineDivider />
				</h2>

				<p className="text-sm text-gray-700">
					{objective ? (
						<span
							dangerouslySetInnerHTML={{
								__html: DOMPurify.sanitize(objective),
							}}
						/>
					) : (
						<span>{resume.objective}</span>
					)}
				</p>
			</section>

			{orderedTabs.map((tab, i) => (
				<div key={i}>{sectionMap[tab]}</div>
			))}
		</div>
	)
}
