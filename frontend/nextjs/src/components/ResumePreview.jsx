import { useState, useRef, useEffect } from "react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import ClassicTemplate from "../components/Templates/ClassicTemplate"
import ModernTemplate from "./Templates/ModernTemplate"
import CreativeTemplate from "./Templates/CreativeTemplate"
import ElegantTemplate from "./Templates/ElegantTemplate"

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
}) {
	const resumeRef = useRef(null)
	const [template, setTemplate] = useState("classic")
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

		const canvas = await html2canvas(resumeRef.current, { scale: 2 })
		const imgData = canvas.toDataURL("image/png")
		const pdf = new jsPDF("p", "mm", "a4")

		const pdfWidth = pdf.internal.pageSize.getWidth()
		const pdfHeight = (canvas.height * pdfWidth) / canvas.width

		pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
		pdf.save(`${firstName || "resume"}.pdf`)
	}

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
				<div
					ref={resumeRef}
					className="bg-white shadow-lg resume-template w-[8.5in] mx-auto overflow-auto origin-top h-[11in] p-4 rounded"
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
					{template === "elegant" && (
						<ElegantTemplate
							{...{
								tabs,
								email,
								firstName,
								lastName,
								jobTitle,
								phone,
								address,
								cityPostCode,
								objective,
								experience,
								generatedResume,
								skills,
								certifications,
								educations,
								references,
								links,
								hobbies,
								customSections,
								photo,
							}}
						/>
					)}
					{template === "modern" && (
						<ModernTemplate
							{...{
								tabs,
								email,
								firstName,
								lastName,
								jobTitle,
								phone,
								address,
								cityPostCode,
								objective,
								experience,
								generatedResume,
								skills,
								certifications,
								educations,
								references,
								links,
								hobbies,
								customSections,
								photo,
							}}
						/>
					)}
					{template === "creative" && (
						<CreativeTemplate
							{...{
								tabs,
								email,
								firstName,
								lastName,
								jobTitle,
								phone,
								address,
								cityPostCode,
								objective,
								experience,
								generatedResume,
								skills,
								certifications,
								educations,
								references,
								links,
								hobbies,
								customSections,
								photo,
							}}
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
