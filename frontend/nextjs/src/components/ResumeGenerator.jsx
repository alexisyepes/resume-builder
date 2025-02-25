import { useState, useRef, useEffect } from "react"
import axios from "axios"
import { FaLongArrowAltLeft } from "react-icons/fa"
import { IoIosClose } from "react-icons/io"
import ResumePreview from "./ResumePreview"
import TabSelector from "./TabSelector"
import { defaultResume } from "@/utils"
import Inputs from "./Inputs"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import {
	CERTIFICATIONS,
	CONTACT_INFORMATION,
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
import TemplateSelector from "./TemplateSelector"
import TemplateSlider from "./TemplateSlider"
import { useRouter } from "next/router"
import { loadTranslations } from "@/utils"

const ResumeGenerator = () => {
	const router = useRouter()
	const t = loadTranslations(router)
	const { locale } = router
	const langPrefix = locale
	const [tabs, setTabs] = useState([
		PERSONAL_DETAILS,
		CONTACT_INFORMATION,
		PROFESSIONAL_SUMMARY,
		SKILLS,
		EMPLOYMENT_HISTORY,
		EDUCATION,
	])
	const [fileName, setFileName] = useState(
		t.resume_builder.labels.personal_information.no_file_chosen
	)
	const [photo, setPhoto] = useState("")
	const [email, setEmail] = useState("")
	const [phone, setPhone] = useState("")
	const [address, setAddress] = useState("")
	const [cityPostCode, setCityPostCode] = useState("")
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [jobTitle, setJobTitle] = useState("")
	const [skills, setSkills] = useState([])
	const [languages, setLanguages] = useState([])
	const [suggestedSkills, setSuggestedSkills] = useState([])
	const [experience, setExperience] = useState([])
	const [certifications, setCertifications] = useState([])
	const [references, setReferences] = useState([])
	const [educations, setEducations] = useState([])
	const [links, setLinks] = useState([])
	const [hobbies, setHobbies] = useState([])
	const [customSections, setCustomSections] = useState([])
	const [objective, setObjective] = useState("")
	const [generatedResume, setGeneratedResume] = useState(defaultResume)
	const [activeTab, setActiveTab] = useState(tabs[0])
	const [isLoading, setIsLoading] = useState(false)
	const [template, setTemplate] = useState("classic-ats")
	const [showSlider, setShowSlider] = useState(false)
	const [customTitles, setCustomTitles] = useState({
		[PROFESSIONAL_SUMMARY]: "",
		[EDUCATION]: "",
		[SKILLS]: "",
		[EMPLOYMENT_HISTORY]: "",
		[HOBBIES]: "",
		[LINKS]: "",
		[CERTIFICATIONS]: "",
		[REFERENCES]: "",
		[LANGUAGES]: "",
	})
	const [editing, setEditing] = useState(null)
	const resumeRef = useRef()
	const inputRef = useRef(null)

	useEffect(() => {
		setFileName((prev) =>
			prev === fileName || !prev
				? t.resume_builder.labels.personal_information.no_file_chosen
				: prev
		)
	}, [t])

	useEffect(() => {
		if (defaultResume) {
			setFirstName(generatedResume.name)
			setJobTitle(generatedResume.jobTitle)
			setJobTitle(generatedResume.jobTitle)
		}
		setGeneratedResume(defaultResume)
	}, [])

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (inputRef.current && !inputRef.current.contains(event.target)) {
				setEditing(null)
			}
		}

		if (editing) {
			document.addEventListener("mousedown", handleClickOutside)
		} else {
			document.removeEventListener("mousedown", handleClickOutside)
		}

		return () => document.removeEventListener("mousedown", handleClickOutside)
	}, [editing])

	const handleCustomTitleOnChange = (e) => {
		const { name, value } = e.target
		setCustomTitles((prevTitles) => ({
			...prevTitles,
			[name]: value,
		}))
	}

	const handleImageUpload = (event) => {
		const file = event.target.files[0]
		if (!file) return

		setFileName(file.name)

		const reader = new FileReader()
		reader.onloadend = () => {
			setPhoto(reader.result)
		}
		reader.readAsDataURL(file)
		event.target.value = null
	}

	const handleTabChange = (tab) => {
		setActiveTab(tab)
	}

	const nextTab = () => {
		const currentIndex = tabs.indexOf(activeTab)
		if (currentIndex < tabs.length - 1) {
			setActiveTab(tabs[currentIndex + 1])
		}
	}

	const moveTabHandler = (fromIndex, toIndex) => {
		setTabs((prevTabs) => {
			const updatedTabs = [...prevTabs]
			const [movedTab] = updatedTabs.splice(fromIndex, 1)
			updatedTabs.splice(toIndex, 0, movedTab)
			return updatedTabs
		})
	}

	const regenerateSkillsSuggestions = async () => {
		try {
			setIsLoading(true)
			const response = await axios.post(
				"http://localhost:4000/generate-skills",
				{
					jobTitle,
					langPrefix,
				}
			)
			setIsLoading(false)
			setSuggestedSkills(response.data.resume.skills)
		} catch (error) {
			setIsLoading(false)
			console.error("Error generating skills:", error)
		}
	}

	const handleGenerateResume = async () => {
		try {
			setIsLoading(true)
			const response = await axios.post(
				"http://localhost:4000/generate-objective",
				{
					jobTitle,
					objective,
					skills,
					langPrefix,
				}
			)
			setIsLoading(false)
			setSuggestedSkills(response.data.resume.skills)
			setObjective(response.data.resume.objective)
		} catch (error) {
			setIsLoading(false)
			console.error("Error generating objective:", error)
		}
	}

	const removeTabHandler = (index) => {
		const newTabs = tabs.filter((_, i) => i !== index)
		setTabs(newTabs)
	}

	const addTabHandler = (newTab) => {
		setTabs((prevTabs) => [...prevTabs, newTab])
	}

	// Function to download PDF
	const handleDownloadPDF = async () => {
		if (!resumeRef.current) return

		if (!firstName || !lastName || !jobTitle) {
			return alert("Add the missing fields!")
		}

		let base64Photo = null
		if (photo) {
			const response = await fetch(photo)
			const blob = await response.blob()
			const reader = new FileReader()

			base64Photo = await new Promise((resolve) => {
				reader.onloadend = () => resolve(reader.result)
				reader.readAsDataURL(blob)
			})
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
				languages,
				photo: base64Photo,
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
		<div className="w-full bg-white">
			{/* <div className="container">
				<div className="wrapper">
					<div className="element1 element">Element 1</div>
					<div className="element2 element">Element 2</div>
				</div>
				<div className="element3 element">
					Element 3
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
						facilis tenetur! Amet non molestiae et quam veritatis inventore
						sapiente asperiores voluptatum hic, adipisci expedita minima autem
						repellendus fugiat! Deleniti, blanditiis.
					</p>
				</div>
			</div> */}
			<div className="mb-4">
				<TemplateSelector
					t={t}
					handleDownloadPDF={handleDownloadPDF}
					setTemplate={setTemplate}
					showSlider={showSlider}
					setShowSlider={setShowSlider}
				/>
			</div>
			<div className="flex flex-wrap">
				{showSlider ? (
					<div className="w-full bg-cyan-100 sm:w-[49%] rounded-md mr-2 p-8 border">
						<div className="text-black flex justify-between text-center font-bold mb-2 text-xl relative">
							<span
								onClick={() => setShowSlider(false)}
								className="cursor-pointer hover:text-teal-500"
							>
								<FaLongArrowAltLeft className="inline mr-2" /> Write
							</span>
							<span>Choose a Layout</span>
							<span
								onClick={() => setShowSlider(false)}
								className="hover:bg-cyan-400 hover:scale-110 cursor-pointer rounded-full bg-cyan-500"
							>
								<IoIosClose color="white" size={40} />
							</span>
						</div>
						<hr />
						<TemplateSlider template={template} setTemplate={setTemplate} />
					</div>
				) : (
					<>
						<TabSelector
							t={t}
							tabs={tabs}
							suggestedSkills={suggestedSkills}
							activeTab={activeTab}
							onTabChange={handleTabChange}
							removeTabHandler={removeTabHandler}
							addTabHandler={addTabHandler}
							moveTabHandler={moveTabHandler}
							setActiveTab={setActiveTab}
						/>

						<Inputs
							langPrefix={langPrefix}
							t={t}
							fileName={fileName}
							setFileName={setFileName}
							inputRef={inputRef}
							editing={editing}
							setEditing={setEditing}
							customTitles={customTitles}
							handleCustomTitleOnChange={handleCustomTitleOnChange}
							nextTabHandler={nextTab}
							email={email}
							phone={phone}
							address={address}
							cityPostCode={cityPostCode}
							setEmail={setEmail}
							setPhone={setPhone}
							setAddress={setAddress}
							setCityPostCode={setCityPostCode}
							firstName={firstName}
							setFirstName={setFirstName}
							lastName={lastName}
							setLastName={setLastName}
							setJobTitle={setJobTitle}
							setSkills={setSkills}
							setExperience={setExperience}
							certifications={certifications}
							setCertifications={setCertifications}
							jobTitle={jobTitle}
							skills={skills}
							suggestedSkills={suggestedSkills}
							setSuggestedSkills={setSuggestedSkills}
							experience={experience}
							handleGenerateResume={handleGenerateResume}
							selectedTab={activeTab}
							setObjective={setObjective}
							objective={objective}
							isLoading={isLoading}
							regenerateSkillsSuggestions={regenerateSkillsSuggestions}
							educations={educations}
							setEducations={setEducations}
							references={references}
							setReferences={setReferences}
							links={links}
							setLinks={setLinks}
							hobbies={hobbies}
							setHobbies={setHobbies}
							customSections={customSections}
							setCustomSections={setCustomSections}
							handleImageUpload={handleImageUpload}
							photo={photo}
							removeTabHandler={removeTabHandler}
							activeTab={activeTab}
							setActiveTab={setActiveTab}
							tabs={tabs}
							setTabs={setTabs}
							setPhoto={setPhoto}
							template={template}
							languages={languages}
							setLanguages={setLanguages}
						/>
					</>
				)}

				<ResumePreview
					resumeRef={resumeRef}
					generatedResume={generatedResume.resume}
					handleDownloadPDF={handleDownloadPDF}
					email={email}
					phone={phone}
					address={address}
					cityPostCode={cityPostCode}
					firstName={firstName}
					lastName={lastName}
					skills={skills}
					experience={experience}
					objective={objective}
					jobTitle={jobTitle}
					tabs={tabs}
					certifications={certifications}
					educations={educations}
					references={references}
					links={links}
					hobbies={hobbies}
					customSections={customSections}
					photo={photo}
					template={template}
					setTemplate={setTemplate}
					languages={languages}
					customTitles={customTitles}
				/>
			</div>
		</div>
	)
}

export default ResumeGenerator
