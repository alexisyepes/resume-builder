import React, { useState, useRef, useLayoutEffect, useEffect } from "react"
import { FaDownload } from "react-icons/fa"
import ClassicTemplate from "../components/Templates/ClassicTemplate"
import ModernTemplate from "./Templates/ModernTemplate"
import CreativeTemplate from "./Templates/CreativeTemplate"
import ElegantTemplate from "./Templates/ElegantTemplate"
import ClassicTemplateATS from "./Templates/ClassicTemplateATS"
import ReactDOMServer from "react-dom/server"
import { useRouter } from "next/router"
import { loadTranslations } from "@/utils"
import useResumeStore from "@/store/useResumeStore"
import {
	CERTIFICATIONS,
	CONTACT_INFORMATION,
	CUSTOM_SECTION,
	EDUCATION,
	EMPLOYMENT_HISTORY,
	HOBBIES,
	LANGUAGES,
	LINKS,
	PERSONAL_DETAILS,
	PROFESSIONAL_SUMMARY,
	REFERENCES,
	SKILLS,
} from "@/constants"
import DOMPurify from "dompurify"

export default function ResumePreview({
	generatedResume,
	email,
	phone,
	address,
	cityPostCode,
	firstName,
	lastName,
	skills,
	experience,
	objective,
	jobTitle,
	tabs,
	certifications,
	educations,
	references,
	links,
	hobbies,
	customSections,
	photo,
	template,
	handleDownloadPDF,
	languages,
}) {
	const [pages, setPages] = useState([])
	const { customTitles } = useResumeStore()
	const resumeRef = useRef(null)
	const letterSizeHeight = 850

	const router = useRouter()
	const t = loadTranslations(router)
	const mt_sections = "mt-4"

	useEffect(() => {
		console.log(pages)
	}, [pages])

	useLayoutEffect(() => {
		if (pages.length === 0) {
			paginateContent()
		}
	}, [])

	useLayoutEffect(() => {
		if (pages.length === 0) {
			setPages([
				[...tabs.map((tab, i) => <div key={i}>{sectionMap[tab]}</div>)],
			])
		}
	}, [
		photo,
		pages,
		firstName,
		lastName,
		jobTitle,
		email,
		phone,
		address,
		cityPostCode,
		objective,
		tabs,
	])

	useEffect(() => {
		requestAnimationFrame(() => {
			paginateContent()
		})
	}, [tabs])

	const paginateContent = () => {
		const content = resumeRef.current
		if (!content) return

		const newPages = []
		let currentPage = []
		let currentHeight = 0
		tabs.forEach((tab) => {
			console.log(tab)
			if (tab === CONTACT_INFORMATION) return
			if (!(tab in sectionRefs)) return

			const section = sectionRefs[tab].current
			if (!section) return

			const sectionHeight = section.offsetHeight || 0

			if (currentHeight + sectionHeight > letterSizeHeight) {
				newPages.push(currentPage)
				currentPage = []
				currentHeight = 0
			}

			currentPage.push(
				React.cloneElement(sectionMap[tab], { key: tab + newPages.length })
			)
			currentHeight += sectionHeight
		})

		if (currentPage.length) {
			newPages.push(currentPage)
		}

		// ✅ Ensure at least one empty page if nothing is set
		if (newPages.length === 0) {
			newPages.push([])
		}

		setPages(newPages)
	}

	useEffect(() => {
		paginateContent()
	}, [
		photo,
		firstName,
		lastName,
		jobTitle,
		email,
		phone,
		address,
		cityPostCode,
		objective,
		tabs,
		experience,
		skills,
		certifications,
		educations,
		references,
		links,
		hobbies,
		customSections,
		languages,
		customTitles,
		// paginateContent,
	])

	const sectionRefs = {
		[PERSONAL_DETAILS]: useRef(null),
		[PROFESSIONAL_SUMMARY]: useRef(null),
		[EMPLOYMENT_HISTORY]: useRef(null),
		[EDUCATION]: useRef(null),
		[SKILLS]: useRef(null),
		[CERTIFICATIONS]: useRef(null),
		[REFERENCES]: useRef(null),
		[LINKS]: useRef(null),
		[LANGUAGES]: useRef(null),
		[HOBBIES]: useRef(null),
		[CUSTOM_SECTION]: useRef(null),
	}

	const handleDownload = async () => {
		const htmlContent = `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Resume</title>
				<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
				<link rel="stylesheet" href="http://localhost:3000/tailwind.css">
				<link rel="stylesheet" href="http://localhost:3000/styles/globals.css">
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.6/quill.snow.min.css">
			</head>
			<body>
				${ReactDOMServer.renderToString(
					<ClassicTemplateATS
						t={t}
						orderedTabs={tabs}
						paginateContent={paginateContent}
						pages={pages}
						tabs={tabs}
						email={email}
						firstName={firstName}
						lastName={lastName}
						jobTitle={jobTitle}
						phone={phone}
						address={address}
						cityPostCode={cityPostCode}
						objective={objective}
						experience={experience}
						resume={generatedResume}
						skills={skills}
						certifications={certifications}
						educations={educations}
						references={references}
						links={links}
						hobbies={hobbies}
						customSections={customSections}
						photo={photo}
						template={template}
						languages={languages}
						customTitles={customTitles}
						isPdf
					/>
				)}
			</body>
			</html>
		`

		try {
			const response = await fetch("http://localhost:4000/generate-pdf", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ html: htmlContent }),
			})

			if (!response.ok) {
				throw new Error("Failed to generate PDF")
			}

			// Convert response to an ArrayBuffer (to avoid data corruption)
			const arrayBuffer = await response.arrayBuffer()
			const blob = new Blob([arrayBuffer], { type: "application/pdf" })

			// Create a temporary URL for the PDF
			const url = window.URL.createObjectURL(blob)

			// Create a hidden download link and click it
			const a = document.createElement("a")
			a.href = url
			a.download = "generated.pdf"
			document.body.appendChild(a)
			a.click()

			// Cleanup
			document.body.removeChild(a)
			window.URL.revokeObjectURL(url)
		} catch (error) {
			console.error("Error:", error)
		}
	}

	const cleanHTML = DOMPurify.sanitize(objective, { ALLOWED_ATTR: ["style"] })

	const sectionMap = {
		[PERSONAL_DETAILS]: (
			<section ref={sectionRefs[PERSONAL_DETAILS]} className="mb-4">
				<div className="relative text-center pb-4 mb-4">
					{photo && (
						<div className="w-16 h-16 mx-auto my-4 overflow-hidden rounded-full">
							<img
								src={photo}
								alt="Uploaded preview"
								className="w-full h-full object-cover"
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
						{email} {email && phone && "|"} {phone}
					</p>
					<p className="text-sm">
						{address}
						{address && cityPostCode && ","} {cityPostCode}
					</p>
				</div>
			</section>
		),

		[PROFESSIONAL_SUMMARY]: (
			<section ref={sectionRefs[PROFESSIONAL_SUMMARY]} className="mb-4">
				<h2 className="text-lg relative border-b-2 border-black font-semibold mb-2">
					{customTitles[PROFESSIONAL_SUMMARY] ||
						t.resume_builder.labels.professional_summary.title}
				</h2>
				<span
					className="text-sm text-gray-700"
					dangerouslySetInnerHTML={{
						__html: cleanHTML,
					}}
				/>
			</section>
		),
		[EMPLOYMENT_HISTORY]: (
			<section ref={sectionRefs[EMPLOYMENT_HISTORY]} className={mt_sections}>
				{experience.length ? (
					<>
						<h2
							style={{ letterSpacing: "0.01px" }}
							className="text-lg font-semibold border-b-2 border-black"
						>
							{customTitles[t.resume_builder.labels.employment_history.title] ||
								t.resume_builder.labels.employment_history.title}
						</h2>

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
					</>
				) : null}
			</section>
		),
		[EDUCATION]: (
			<section ref={sectionRefs[EDUCATION]} className={mt_sections}>
				{educations.length ? (
					<>
						<h2 className="text-lg border-b-2 border-black font-semibold relative pb-1 mb-2">
							{customTitles[t.resume_builder.labels.education.title] ||
								t.resume_builder.labels.education.title}
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
					</>
				) : null}
			</section>
		),
		[SKILLS]: (
			<section ref={sectionRefs[SKILLS]} className={mt_sections}>
				{skills.length ? (
					<>
						<h2 className="text-lg border-b-2 border-black font-semibold relative pb-1 mt-2">
							{customTitles[SKILLS] || t.resume_builder.labels.skills.title}
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
		[CERTIFICATIONS]: (
			<section ref={sectionRefs[CERTIFICATIONS]} className={mt_sections}>
				<h2 className="text-lg border-b-2 border-black font-semibold relative pb-1">
					{customTitles[t.resume_builder.labels.certifications.title] ||
						t.resume_builder.labels.certifications.title}
				</h2>
				{certifications &&
					certifications.map((cert, index) => (
						<h3
							key={`${cert.institution}-${cert.year}`}
							className="mb-2 flex text-sm font-semibold justify-between items-center capitalize"
						>
							<span>
								{cert.institution} - {cert.certificationName}
							</span>
							<span>{cert.year}</span>
						</h3>
					))}
			</section>
		),
		[REFERENCES]: (
			<section ref={sectionRefs[REFERENCES]} className={mt_sections}>
				<h2 className="text-lg border-b-2 border-black font-semibold relative pb-1">
					{customTitles[REFERENCES] || t.resume_builder.labels.references.title}
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
			<section ref={sectionRefs[LINKS]} className={mt_sections}>
				<h2 className="text-lg border-b-2 border-black font-semibold relative pb-1">
					{customTitles[t.resume_builder.labels.links.title] ||
						t.resume_builder.labels.links.title}
				</h2>
				{links &&
					links.map((link, index) => (
						<ul key={index} className="list-disc pl-5 text-sm text-gray-700">
							<li>
								<span className="capitalize">{link.name}</span>: {link.link}
							</li>
						</ul>
					))}
			</section>
		),
		[LANGUAGES]: (
			<section ref={sectionRefs[LANGUAGES]} className={mt_sections}>
				<h2 className="text-lg border-b-2 border-black font-semibold relative pb-1">
					{customTitles[LANGUAGES] || t.resume_builder.labels.languages.title}
				</h2>
				{languages &&
					languages.map((language, index) => (
						<span key={index} className="text-sm mr-1 capitalize text-gray-700">
							{language.language}
							{index === languages.length - 1 ? "." : ","}
						</span>
					))}
			</section>
		),
		[HOBBIES]: (
			<section ref={sectionRefs[HOBBIES]} className={mt_sections}>
				<h2 className="text-lg border-b-2 border-black font-semibold relative pb-1">
					{customTitles[t.resume_builder.labels.hobbies.title] ||
						t.resume_builder.labels.hobbies.title}
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
			<section ref={sectionRefs[CUSTOM_SECTION]} className={mt_sections}>
				{customSections &&
					customSections.map((section, index) => {
						return (
							<div className="text-sm" key={`${section.header}-${index}`}>
								{section.header && (
									<h2 className="text-lg font-semibold relative">
										{section.header}
									</h2>
								)}
								{section.subHeader && (
									<h3 className="text-md font-semibold relative">
										{section.subHeader}
									</h3>
								)}
								{section.content && (
									<div
										className="ql-editor ql-editor-custom-section text-gray-700 cursor-pointer"
										dangerouslySetInnerHTML={{ __html: section.content }}
									/>
								)}
							</div>
						)
					})}
			</section>
		),
	}

	return (
		<div className="border ring-4 ring-gray-50 p-2 bg-gray-200 rounded-md">
			<div className="flex download-section justify-between items-center">
				<span className="text-black font-bold ml-6 text-lg capitalize">
					{t.resume_builder.labels.general.template_selector.selected_template}:{" "}
					{template}
				</span>
				<button
					className="bg-cyan-500 text-white font-bold p-3 rounded-md text-lg"
					onClick={() => handleDownload()}
				>
					<FaDownload className="inline mr-2" />
					{t.resume_builder.labels.general.template_selector.download}
				</button>
				{/* <button onClick={() => handleDownloadPDF("docx")}>
					Download as DOCX
				</button> */}
			</div>
			<div className="rounded py-8">
				{template === "classic" && (
					<ClassicTemplate
						resumeRef={resumeRef}
						sectionRefs={sectionRefs}
						orderedTabs={tabs}
						tabs={tabs}
						email={email}
						firstName={firstName}
						lastName={lastName}
						jobTitle={jobTitle}
						phone={phone}
						address={address}
						cityPostCode={cityPostCode}
						objective={objective}
						experience={experience}
						resume={generatedResume}
						skills={skills}
						certifications={certifications}
						educations={educations}
						references={references}
						links={links}
						hobbies={hobbies}
						customSections={customSections}
						photo={photo}
						languages={languages}
						pages={pages}
						setPages={setPages}
						customTitles={customTitles}
					/>
				)}
				{template === "classic-ats" && (
					<ClassicTemplateATS
						resumeRef={resumeRef}
						resume={generatedResume}
						email={email}
						firstName={firstName}
						lastName={lastName}
						jobTitle={jobTitle}
						phone={phone}
						address={address}
						cityPostCode={cityPostCode}
						objective={objective}
						experience={experience}
						skills={skills}
						orderedTabs={tabs}
						certifications={certifications}
						educations={educations}
						references={references}
						links={links}
						hobbies={hobbies}
						customSections={customSections}
						photo={photo}
						languages={languages}
						t={t}
						pages={pages}
					/>
				)}
				{template === "elegant" && (
					<ElegantTemplate
						orderedTabs={tabs}
						tabs={tabs}
						email={email}
						firstName={firstName}
						lastName={lastName}
						jobTitle={jobTitle}
						phone={phone}
						address={address}
						cityPostCode={cityPostCode}
						objective={objective}
						experience={experience}
						resume={generatedResume}
						skills={skills}
						certifications={certifications}
						educations={educations}
						references={references}
						links={links}
						hobbies={hobbies}
						customSections={customSections}
						photo={photo}
						languages={languages}
					/>
				)}
				{template === "modern" && (
					<ModernTemplate
						orderedTabs={tabs}
						tabs={tabs}
						email={email}
						firstName={firstName}
						lastName={lastName}
						jobTitle={jobTitle}
						phone={phone}
						address={address}
						cityPostCode={cityPostCode}
						objective={objective}
						experience={experience}
						resume={generatedResume}
						skills={skills}
						certifications={certifications}
						educations={educations}
						references={references}
						links={links}
						hobbies={hobbies}
						customSections={customSections}
						photo={photo}
						languages={languages}
					/>
				)}
				{template === "creative" && (
					<CreativeTemplate
						orderedTabs={tabs}
						tabs={tabs}
						email={email}
						firstName={firstName}
						lastName={lastName}
						jobTitle={jobTitle}
						phone={phone}
						address={address}
						cityPostCode={cityPostCode}
						objective={objective}
						experience={experience}
						resume={generatedResume}
						skills={skills}
						certifications={certifications}
						educations={educations}
						references={references}
						links={links}
						hobbies={hobbies}
						customSections={customSections}
						photo={photo}
						languages={languages}
					/>
				)}
			</div>
		</div>
	)
}
