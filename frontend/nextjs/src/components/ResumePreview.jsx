import { useState, useRef, useEffect } from "react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import ClassicTemplate from "../components/Templates/ClassicTemplate"
import ModernTemplate from "./Templates/ModernTemplate"
import CreativeTemplate from "./Templates/CreativeTemplate"
import ElegantTemplate from "./Templates/ElegantTemplate"
import axios from "axios"
import ClassicTemaplateATS from "./Templates/ClassicTemplateATS"
import TemplateSelector from "./TemplateSelector"

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
	setTemplate,
}) {
	const resumeRef = useRef(null)
	const [scale, setScale] = useState(1)

	useEffect(() => {
		const updateScale = () => {
			setScale(Math.min(1, window.innerWidth / 1200))
		}

		updateScale()
		window.addEventListener("resize", updateScale)

		return () => window.removeEventListener("resize", updateScale)
	}, [])

	// Function to download PDF
	const handleDownloadPDF = async () => {
		if (!resumeRef.current) return

		if (!firstName || !lastName || !jobTitle) {
			return alert("Add the missing fields!")
		}

		const resumeObj = {
			resume: {
				email,
				phone,
				address,
				cityPostCode,
				firstName,
				lastName,
				skills,
				experience,
				objective: objective ? objective : generatedResume.objective,
				jobTitle,
				tabs,
				certifications,
				educations,
				references,
				links,
				hobbies,
				customSections: customSections.map((section) => ({
					...section,
					content: section.content,
				})),
				orderedTabs: tabs,
			},
		}

		if (template === "classic-ats") {
			try {
				resumeObj.resume.template = "1"
				const response = await axios.post("/api/pdf", resumeObj, {
					responseType: "blob",
				})

				const url = window.URL.createObjectURL(new Blob([response.data]))
				const a = document.createElement("a")
				a.href = url
				a.download = `${firstName || "resume"}.pdf`
				document.body.appendChild(a)
				a.click()
				window.URL.revokeObjectURL(url)
			} catch (error) {
				console.error("Error generating ATS PDF:", error)
			}
			return
		}

		const pdf = new jsPDF({
			orientation: "portrait",
			unit: "pt",
			format: [612, 792], // 8.5 x 11 inches in points
		})

		const canvas = await html2canvas(resumeRef.current, { scale: 2 })
		const imgData = canvas.toDataURL("image/png")

		const pdfWidth = 612 // 8.5 inches * 72 dpi
		const pdfHeight = 792 // 11 inches * 72 dpi

		pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
		pdf.save(`${firstName || "resume"}.pdf`)
	}

	return (
		<div className="w-full sm:w-1/2 border p-2 bg-cyan-700 rounded-md">
			<div className="relative">
				<TemplateSelector
					handleDownloadPDF={handleDownloadPDF}
					setTemplate={setTemplate}
				/>
			</div>
			<h3 className="text-lg mt-4 font-semibold text-white text-center">
				Current Layout
			</h3>
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
						/>
					)}
					{template === "classic-ats" && (
						<ClassicTemaplateATS
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
						/>
					)}
				</div>
			</div>
		</div>
	)
}
