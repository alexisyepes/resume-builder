import { useState } from "react"
import ClassicTemplate from "../components/Templates/ClassicTemplate"
import ModernTemplate from "./Templates/ModernTemplate"
import CreativeTemplate from "./Templates/CreativeTemplate"
import ElegantTemplate from "./Templates/ElegantTemplate"

export default function ResumePreview({
	resumeRef,
	generatedResume,
	handleDownloadPDF,
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
}) {
	const [template, setTemplate] = useState("classic") // Default template

	return (
		<div className="w-full sm:w-1/2 p-2">
			<div className="rounded">
				<h3 className="text-lg font-semibold">Current Layout:</h3>
				<select
					className="w-full p-2 border rounded mb-2"
					value={template}
					onChange={(e) => setTemplate(e.target.value)}
				>
					<option value="classic">Classic</option>
					<option value="elegant">Elegant</option>
					<option value="modern">Modern</option>
					<option value="creative">Creative</option>
				</select>
				<div ref={resumeRef} className="bg-white  p-4 rounded shadow">
					{template === "classic" && (
						<ClassicTemplate
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
						/>
					)}
					{template === "elegant" && (
						<ElegantTemplate
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
						/>
					)}
					{template === "modern" && (
						<ModernTemplate
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
						/>
					)}
					{template === "creative" && (
						<CreativeTemplate
							tabs={tabs}
							email={email}
							firstName={firstName}
							lastName={lastName}
							jobTitle={jobTitle}
							phone={phone}
							address={address}
							cityPostCode={cityPostCode}
							objective={objective}
							resume={generatedResume}
							skills={skills}
							certifications={certifications}
							educations={educations}
							references={references}
						/>
					)}
				</div>

				<button
					onClick={handleDownloadPDF}
					className="mt-4 bg-green-500 text-white p-2 rounded"
				>
					Download as PDF
				</button>
			</div>
		</div>
	)
}
