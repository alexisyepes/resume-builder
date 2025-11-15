import { useRef, useEffect, useContext, useState } from "react"
import axios from "axios"
import { FaEye, FaKeyboard, FaLongArrowAltLeft, FaThList } from "react-icons/fa"
import { GiLaptop } from "react-icons/gi"
import { IoIosClose } from "react-icons/io"
import { FaRegHandPointUp } from "react-icons/fa"
import ResumePreview from "./ResumePreview"
import TabSelector from "./TabSelector"
import Inputs from "./Inputs"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import TemplateSelector from "./TemplateSelector"
import TemplateSlider from "./TemplateSlider"
import { RESUME_CONTEXT } from "@/contexts/resumeContext"
import useResumeStore from "@/store/useResumeStore"
import { useWindowSize } from "@/hooks/useWindowSize"
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
import { AnimatePresence, motion } from "framer-motion"

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
	const { width } = useWindowSize()
	const resumeRef = useRef()
	const inputRef = useRef(null)
	const [activeMobileView, setActiveMobileView] = useState("")

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
		const token = localStorage.getItem("token")
		try {
			setIsLoading(true)
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/generate-skills`,
				{
					jobTitle,
					langPrefix,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
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
		const token = localStorage.getItem("token")
		try {
			setIsLoading(true)
			const response = await axios.post(
				`${apiBaseUrl}/generate-objective`,
				{
					jobTitle,
					objective,
					skills,
					langPrefix,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
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
				{width > 768 ? (
					<TemplateSelector
						t={t}
						handleDownloadPDF={handleDownload}
						setTemplate={setTemplate}
						showSlider={showSlider}
						setShowSlider={setShowSlider}
					/>
				) : (
					<div className="p-12 text-center">
						<p>{t.resume_builder.general.software_on_large_screens}</p>
						<GiLaptop color="purple" size={60} className="mx-auto mt-8" />
					</div>
				)}
			</div>
			<div className="">
				<div className="">
					{showSlider ? (
						<div className="w-full bg-gray-900 rounded-md mr-2 p-8 border">
							<div className="text-white flex justify-between text-center font-bold mb-2 text-xl relative">
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
						<div className="">
							{width > 1200 ? (
								<div className="flex flex-wrap">
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
												regenerateSkillsSuggestions={
													regenerateSkillsSuggestions
												}
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
							) : (
								width > 768 && (
									<div>
										<>
											{/* Blurry backdrop */}
											{!activeMobileView && (
												<div
													className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
													style={{ top: "var(--navbar-height, 63px)" }}
												/>
											)}

											{/* Buttons Container */}
											<div className="flex justify-center flex-row gap-4 border-t-2 pt-2 my-2 relative z-40">
												{/* Tab Selector Button with Icon */}
												<div className="flex border p-2 flex-col items-center">
													<div className="relative group mb-2">
														<FaThList
															size={20}
															className={`${
																activeMobileView
																	? "text-gray-600"
																	: "text-white"
															}`}
														/>
														<div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
															{t.resume_builder.general.organize_sections}
														</div>
													</div>
													<button
														onClick={() => setActiveMobileView("tab")}
														className={`rounded-md border p-2 transition-colors duration-200 hover:bg-blue-500 hover:text-white ${
															activeMobileView === "tab" ? "bg-cyan-200" : ""
														} ${!activeMobileView ? "animate-blue-flash" : ""}`}
													>
														{t.resume_builder.general.tab_selector}
													</button>
												</div>
												{/* Input Selector Button with Icon */}
												<div className="flex border p-2 flex-col items-center">
													<div className="relative group mb-2">
														<FaKeyboard
															size={20}
															className={`${
																activeMobileView
																	? "text-gray-600"
																	: "text-white"
															}`}
														/>
														<div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
															{t.resume_builder.general.fill_in_information}
														</div>
													</div>
													<button
														onClick={() => setActiveMobileView("inputs")}
														className={`rounded-md border p-2 transition-colors duration-200 hover:bg-blue-500 hover:text-white ${
															activeMobileView === "inputs" ? "bg-cyan-200" : ""
														} ${!activeMobileView ? "animate-blue-flash" : ""}`}
													>
														{t.resume_builder.general.input_selector}
													</button>
												</div>
												{/* Preview Selector Button with Icon */}
												<div className="flex border p-2  flex-col items-center">
													<div className="relative group mb-2">
														<FaEye
															size={20}
															className={`${
																activeMobileView
																	? "text-gray-600"
																	: "text-white"
															}`}
														/>
														<div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
															{t.resume_builder.general.preview_selector}
														</div>
													</div>
													<button
														onClick={() => setActiveMobileView("preview")}
														className={`rounded-md border p-2 transition-colors duration-200 hover:bg-blue-500 hover:text-white ${
															activeMobileView === "preview"
																? "bg-cyan-200"
																: ""
														} ${!activeMobileView ? "animate-blue-flash" : ""}`}
													>
														{t.resume_builder.general.preview_selector}
													</button>
												</div>
											</div>

											{/* Instructional message - only shows before selection */}
											{!activeMobileView && (
												<div className="border-t-2 text-white font-bold my-8 p-12 flex flex-col items-center text-center relative z-40">
													<FaRegHandPointUp className="mb-3" size={30} />
													<p className="text-lg">
														{t.resume_builder.general.instructional_message}
													</p>
												</div>
											)}
										</>
										{activeMobileView && (
											<div className="">
												{/* <div className="wrapper"> */}
												<div className="w-full px-12 mt-4">
													{activeMobileView === "tab" && (
														<AnimatePresence mode="wait">
															<motion.div
																key="tab"
																initial={{ opacity: 0, y: -10 }}
																animate={{ opacity: 1, y: 0 }}
																exit={{ opacity: 0, y: 10 }}
																transition={{ duration: 0.5 }}
																onClick={() => setActiveMobileView("inputs")}
															>
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
															</motion.div>
														</AnimatePresence>
													)}
													{activeMobileView === "inputs" && (
														<Inputs
															langPrefix={langPrefix}
															t={t}
															fileName={fileName}
															setFileName={setFileName}
															inputRef={inputRef}
															editing={editing}
															setEditing={setEditing}
															customTitles={customTitles}
															handleCustomTitleOnChange={
																handleCustomTitleOnChange
															}
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
															regenerateSkillsSuggestions={
																regenerateSkillsSuggestions
															}
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
													)}
													{activeMobileView === "preview" && (
														<AnimatePresence mode="wait">
															<motion.div
																key="tab"
																initial={{ opacity: 0, y: -10 }}
																animate={{ opacity: 1, y: 0 }}
																exit={{ opacity: 0, y: 10 }}
																transition={{ duration: 0.5 }}
															>
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
															</motion.div>
														</AnimatePresence>
													)}
												</div>
											</div>
										)}
									</div>
								)
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default ResumeGenerator
