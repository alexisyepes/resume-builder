import { useState, useRef, useEffect } from "react"

import ClassicTemplate from "../components/Templates/ClassicTemplate"
import ModernTemplate from "./Templates/ModernTemplate"
import CreativeTemplate from "./Templates/CreativeTemplate"
import ElegantTemplate from "./Templates/ElegantTemplate"
import ClassicTemplateATS from "./Templates/ClassicTemplateATS"

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
	resumeRef,
	customTitles,
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

	return (
		<div className="w-full sm:w-1/2 border p-2 bg-gray-900 rounded-md">
			<div className="flex justify-between items-center">
				<span className="text-white ml-6 text-lg capitalize">
					Selected Template: {template}
				</span>

				<button
					className="bg-white p-3 rounded-md text-lg"
					onClick={handleDownloadPDF}
				>
					Download
				</button>
			</div>
			<div className="rounded py-8">
				<div
					ref={resumeRef}
					className="  origin-top"
					style={{ transform: `scale(${scale})` }}
				>
					{template === "classic" && (
						<ClassicTemplate
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
					{template === "classic-ats" && (
						<ClassicTemplateATS
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
							template={template}
							languages={languages}
							customTitles={customTitles}
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
		</div>
	)
}
