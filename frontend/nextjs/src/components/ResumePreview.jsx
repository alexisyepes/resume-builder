import { useState, useRef, useEffect } from "react"
import { FaDownload } from "react-icons/fa"
import ClassicTemplate from "../components/Templates/ClassicTemplate"
import ModernTemplate from "./Templates/ModernTemplate"
import CreativeTemplate from "./Templates/CreativeTemplate"
import ElegantTemplate from "./Templates/ElegantTemplate"
import ClassicTemplateATS from "./Templates/ClassicTemplateATS"

export default function ResumePreview({
	t,
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
	return (
		<div className="border ring-4 ring-gray-50 p-2 bg-gray-100 rounded-md">
			<div className="flex download-section justify-between items-center">
				<span className="text-black font-bold ml-6 text-lg capitalize">
					{t.resume_builder.labels.general.template_selector.selected_template}:{" "}
					{template}
				</span>
				<button
					className="bg-cyan-500 text-white font-bold p-3 rounded-md text-lg"
					onClick={() => handleDownloadPDF("pdf")}
				>
					<FaDownload className="inline mr-2" />
					{t.resume_builder.labels.general.template_selector.download}
				</button>
				{/* <button onClick={() => handleDownloadPDF("txt")}>
					Download as TXT
				</button>
				<button onClick={() => handleDownloadPDF("docx")}>
					Download as DOCX
				</button> */}
			</div>
			<div className="rounded py-8">
				<div className="" ref={resumeRef}>
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
