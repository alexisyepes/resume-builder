import { useRef, useEffect, useContext } from "react"
import axios from "axios"
import { FaLongArrowAltLeft } from "react-icons/fa"
import { IoIosClose } from "react-icons/io"
import ResumePreview from "./ResumePreview"
import TabSelector from "./TabSelector"
import Inputs from "./Inputs"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import TemplateSelector from "./TemplateSelector"
import TemplateSlider from "./TemplateSlider"
import { RESUME_CONTEXT } from "@/contexts/resumeContext"
import useResumeStore from "@/store/useResumeStore"
import {
	CERTIFICATIONS,
	EDUCATION,
	EMPLOYMENT_HISTORY,
	HOBBIES,
	LANGUAGES,
	LINKS,
	PROFESSIONAL_SUMMARY,
	REFERENCES,
	SKILLS,
} from "@/constants"
import { defaultResume } from "@/defaultResume"

const ResumeGenerator = () => {
	const {
		apiBaseUrl,
		tabs,
		setTabs,
		photo,
		setPhoto,
		fileName,
		setFileName,
		email,
		setEmail,
		phone,
		setPhone,
		address,
		setAddress,
		cityPostCode,
		setCityPostCode,
		firstName,
		setFirstName,
		lastName,
		setLastName,
		jobTitle,
		setJobTitle,
		skills,
		setSkills,
		languages,
		setLanguages,
		suggestedSkills,
		setSuggestedSkills,
		experience,
		setExperience,
		certifications,
		setCertifications,
		references,
		setReferences,
		educations,
		setEducations,
		links,
		setLinks,
		hobbies,
		setHobbies,
		customSections,
		setCustomSections,
		objective,
		setObjective,
		generatedResume,
		setGeneratedResume,
		activeTab,
		setActiveTab,
		isLoading,
		setIsLoading,
		template,
		setTemplate,
		showSlider,
		setShowSlider,
		customTitles,
		setCustomTitles,
		editing,
		setEditing,
		resetOrderedTabs,
	} = useResumeStore()
	const { t, langPrefix, templateDesigns } = useContext(RESUME_CONTEXT)

	const resumeRef = useRef()
	const inputRef = useRef(null)

	useEffect(() => {
		if (template === "modern") {
			// Resets the tabs order so skills section becomes unmutable for the moder design
			resetOrderedTabs()
		}
	}, [template])

	useEffect(() => {
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
		setCustomTitles({ [name]: value })
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
		useResumeStore.setState((state) => {
			const updatedTabs = [...state.tabs]
			const [movedTab] = updatedTabs.splice(fromIndex, 1)
			updatedTabs.splice(toIndex, 0, movedTab)
			return { tabs: updatedTabs }
		})
	}

	const regenerateSkillsSuggestions = async () => {
		try {
			setIsLoading(true)
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/generate-skills`,
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
			const response = await axios.post(`${apiBaseUrl}/generate-objective`, {
				jobTitle,
				objective,
				skills,
				langPrefix,
			})
			setIsLoading(false)
			setSuggestedSkills(response.data.resume.skills)
			setObjective(response.data.resume.objective)
		} catch (error) {
			setIsLoading(false)
			console.error("Error generating objective:", error)
		}
	}

	const removeTabHandler = (index) => {
		setTabs((prevTabs) => prevTabs.filter((_, i) => i !== index))
	}

	const addTabHandler = (newTab) => {
		setTabs((prevTabs) => [...prevTabs, newTab])
	}

	const handleDownload = async (format) => {
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
				professional_summary_title:
					customTitles[PROFESSIONAL_SUMMARY] ||
					t.resume_builder.labels.professional_summary.title,
				employment_history_title:
					customTitles[EMPLOYMENT_HISTORY] ||
					t.resume_builder.labels.employment_history.title,
				certifications_title:
					customTitles[CERTIFICATIONS] ||
					t.resume_builder.labels.certifications.title,
				links_title: customTitles[LINKS] || t.resume_builder.labels.links.title,
				skills_title:
					customTitles[SKILLS] || t.resume_builder.labels.skills.title,
				education_title:
					customTitles[EDUCATION] || t.resume_builder.labels.education.title,
				hobbies_title:
					customTitles[HOBBIES] || t.resume_builder.labels.hobbies.title,
				references_title:
					customTitles[REFERENCES] || t.resume_builder.labels.references.title,
				languages_title:
					customTitles[LANGUAGES] || t.resume_builder.labels.languages.title,
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
				template,
			},
		}

		if (template === "classic-ats") {
			try {
				const response = await axios.post(
					`/api/download?format=${format}`,
					resumeObj,
					{ responseType: "blob" }
				)

				const blob = new Blob([response.data], {
					type:
						format === "pdf"
							? "application/pdf"
							: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
				})

				const link = document.createElement("a")
				link.href = URL.createObjectURL(blob)
				link.download = `resume.${format}`
				document.body.appendChild(link)
				link.click()
				document.body.removeChild(link)
			} catch (error) {
				console.error(`Error generating ${format} file:`, error)
			}
			return // Stop further execution
		}

		// Generate a simple screenshot-based PDF if API fails (fallback)
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
		<div className="w-full bg-white pt-12">
			<div className="mb-4">
				<TemplateSelector
					t={t}
					handleDownloadPDF={handleDownload}
					setTemplate={setTemplate}
					showSlider={showSlider}
					setShowSlider={setShowSlider}
				/>
			</div>
			<div className="">
				<div className="flex flex-wrap">
					{showSlider ? (
						<div className="w-full bg-cyan-50 sm:w-[49%] rounded-md mr-2 p-8 border">
							<div className="text-black flex justify-between text-center font-bold mb-2 text-xl relative">
								<span
									onClick={() => setShowSlider(false)}
									className="cursor-pointer hover:text-teal-500"
								>
									<FaLongArrowAltLeft className="inline mr-2" />{" "}
									{t.resume_builder.labels.general.template_selector.write}
								</span>
								<span>
									{
										t.resume_builder.labels.general.template_selector
											.choose_layout
									}
								</span>
								<span
									onClick={() => setShowSlider(false)}
									className="hover:bg-cyan-400 hover:scale-110 cursor-pointer rounded-full bg-cyan-500"
								>
									<IoIosClose color="white" size={40} />
								</span>
							</div>
							<hr />
							<TemplateSlider
								templateDesigns={templateDesigns}
								template={template}
								setTemplate={setTemplate}
							/>
						</div>
					) : (
						<div className="wrapper">
							<div className="element1 element">
								<TabSelector
									t={t}
									suggestedSkills={suggestedSkills}
									activeTab={activeTab}
									onTabChange={handleTabChange}
									removeTabHandler={removeTabHandler}
									addTabHandler={addTabHandler}
									moveTabHandler={moveTabHandler}
									setActiveTab={setActiveTab}
									template={template}
								/>
							</div>
							<div className="element2 element">
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
									// handleImageUpload={handleImageUpload}
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
							</div>
						</div>
					)}

					<div className="element3_wrapper">
						<ResumePreview
							t={t}
							resumeRef={resumeRef}
							generatedResume={generatedResume.resume}
							handleDownloadPDF={handleDownload}
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
			</div>
		</div>
	)
}

export default ResumeGenerator
