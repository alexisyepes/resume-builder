import { useState, useRef, useEffect } from "react"
import axios from "axios"
import { useReactToPrint } from "react-to-print"
import ResumePreview from "./ResumePreview"
import TabSelector from "./TabSelector"
import { defaultResume } from "@/utils"
import Inputs from "./Inputs"
import {
	CERTIFICATIONS,
	CONTACT_INFORMATION,
	EDUCATION,
	EMPLOYMENT_HISTORY,
	PERSONAL_DETAILS,
	PROFESSIONAL_SUMMARY,
	REFERENCES,
	SKILLS,
} from "@/constants"

const ResumeGenerator = () => {
	const [tabs, setTabs] = useState([
		PERSONAL_DETAILS,
		CONTACT_INFORMATION,
		PROFESSIONAL_SUMMARY,
		SKILLS,
		EMPLOYMENT_HISTORY,
		EDUCATION,
	])
	const [photo, setPhoto] = useState("")
	const [email, setEmail] = useState("")
	const [phone, setPhone] = useState("")
	const [address, setAddress] = useState("")
	const [cityPostCode, setCityPostCode] = useState("")
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [jobTitle, setJobTitle] = useState("")
	const [skills, setSkills] = useState([])
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
	const resumeRef = useRef()

	useEffect(() => {
		if (defaultResume) {
			setFirstName(generatedResume.name)
			setJobTitle(generatedResume.jobTitle)
			setJobTitle(generatedResume.jobTitle)
		}
		setGeneratedResume(defaultResume)
	}, [])

	const handleImageUpload = (event) => {
		console.log(event.target.files[0])
		const file = event.target.files[0]
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				setPhoto(reader.result)
			}
			reader.readAsDataURL(file)
		}
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

	// Print or Save as PDF
	const handleDownloadPDF = useReactToPrint({
		content: () => resumeRef.current,
		documentTitle: "Resume",
	})

	const removeTabHandler = (index) => {
		const newTabs = tabs.filter((_, i) => i !== index)
		setTabs(newTabs)
	}

	const addTabHandler = (newTab) => {
		setTabs((prevTabs) => [...prevTabs, newTab])
	}

	return (
		<div className="w-full p-2 mx-auto bg-white shadow-md rounded-md">
			<h2 className="text-2xl font-bold mb-4">Resume Builder</h2>
			<div className="flex flex-wrap">
				<TabSelector
					tabs={tabs}
					suggestedSkills={suggestedSkills}
					activeTab={activeTab}
					onTabChange={handleTabChange}
					removeTabHandler={removeTabHandler}
					addTabHandler={addTabHandler}
					moveTabHandler={moveTabHandler}
				/>
				<Inputs
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
				/>
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
				/>
			</div>
		</div>
	)
}

export default ResumeGenerator
