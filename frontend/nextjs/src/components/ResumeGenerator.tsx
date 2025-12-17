import { useRef, useEffect, useState } from "react"
import axios from "axios"
import { FaEye, FaKeyboard, FaLongArrowAltLeft, FaThList } from "react-icons/fa"
import { GiLaptop } from "react-icons/gi"
import { IoIosClose } from "react-icons/io"
import { FaRegHandPointUp } from "react-icons/fa"
import ResumePreview from "./ResumePreview"
import TabSelector from "./TabSelector"
import Inputs from "./Inputs"
import TemplateSelector from "./TemplateSelector"
import TemplateSlider from "./TemplateSlider"
import { useResumeContext } from "@/contexts/useResumeContext"
import useResumeStore from "@/store/useResumeStore"
import { useWindowSize } from "@/hooks/useWindowSize"
import { defaultResume } from "@/defaultResume"
import { AnimatePresence, motion } from "framer-motion"
import { useProfile } from "@/hooks/useProfile"
import { RESUME_VIEW_TAB } from "@/constants"
import ResumeAnalyzer from "./ResumeAnalyzer"

const ResumeGenerator = () => {
	const {
		user,
		apiBaseUrl,
		tabs,
		setTabs,
		photo,
		setPhoto,
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
		activeResumeViewTab,
		setActiveResumeViewTab,
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
	const { t, langPrefix, templateDesigns } = useResumeContext()
	const { width = 0 } = useWindowSize()
	const userId = (user?.id as string) || null
	const { openModal } = useProfile(userId, apiBaseUrl)
	const resumeRef = useRef<HTMLDivElement | null>(null)
	const inputRef = useRef<HTMLInputElement | null>(null)
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
				`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/ai/generate-skills`,
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
				`${apiBaseUrl}/ai/generate-objective`,
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

	return (
		<div className="w-full bg-white pt-12">
			{width > 768 && (
				<div className="flex justify-between border-b border-b-slate-300 pb-3 mt-2 pl-2 ">
					<div className="space-x-2">
						<button
							onClick={() =>
								setActiveResumeViewTab(RESUME_VIEW_TAB.build_resume)
							}
							className={`bg-slate-500 rounded-md hover:bg-slate-700 text-white px-4 py-2 ${
								activeResumeViewTab === RESUME_VIEW_TAB.build_resume
									? "bg-slate-700"
									: ""
							}`}
						>
							Build a resume
						</button>
						{user.planType === "premium" && (
							<button
								onClick={() =>
									setActiveResumeViewTab(RESUME_VIEW_TAB.analyze_resume)
								}
								className={`bg-slate-500 rounded-md hover:bg-slate-700 text-white px-4 py-2 ${
									activeResumeViewTab === RESUME_VIEW_TAB.analyze_resume
										? "bg-slate-700"
										: ""
								}`}
							>
								Analize a resume
							</button>
						)}
					</div>

					{activeResumeViewTab === RESUME_VIEW_TAB.build_resume && (
						<h2 className="flex mr-4 items-center justify-center">
							<span className="text-lg font-semibold uppercase text-center">
								{t.resume_builder.profile_modal.profile.downloads_remaining}
							</span>
							<span
								className={`${
									Number(user.downloadsRemaining) < 4
										? "text-red-500"
										: "text-cyan-700"
								}  ml-2`}
							>
								{user.downloadsRemaining}
							</span>
							{((user.downloadsRemaining &&
								Number(user.downloadsRemaining) < 4) ||
								user.planType === "free") && (
								<span
									onClick={openModal}
									className="bg-yellow-500 ml-4 text-sm py-1 px-2 rounded-md text-white cursor-pointer hover:bg-yellow-200 hover:text-black"
								>
									Upgrade plan
								</span>
							)}
						</h2>
					)}
				</div>
			)}

			{/* Analyze resume */}
			{activeResumeViewTab === RESUME_VIEW_TAB.analyze_resume && (
				<ResumeAnalyzer />
			)}

			{/* Build Resume */}
			{activeResumeViewTab === RESUME_VIEW_TAB.build_resume && (
				<div>
					<div className="mb-4">
						{width > 768 ? (
							<div>
								<TemplateSelector
									t={t}
									showSlider={showSlider}
									setShowSlider={setShowSlider}
								/>
							</div>
						) : (
							<div className="p-12 text-center">
								<p>{t.resume_builder.general.software_on_large_screens}</p>
								<GiLaptop color="purple" size={60} className="mx-auto mt-8" />
							</div>
						)}
					</div>
					{showSlider ? (
						<div className="w-full bg-gray-950 rounded-md mr-2 p-8 border">
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
												t={t}
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
											userPlan={user?.planType ? String(user.planType) : null}
											userId={user?.id ? String(user.id) : null}
											t={t}
											resumeRef={resumeRef}
											generatedResume={generatedResume.resume}
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
											languages={languages}
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
															t={t}
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
																	userPlan={
																		user?.planType
																			? String(user.planType)
																			: null
																	}
																	userId={user?.id ? String(user.id) : null}
																	t={t}
																	resumeRef={resumeRef}
																	generatedResume={generatedResume.resume}
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
																	languages={languages}
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
			)}
		</div>
	)
}

export default ResumeGenerator
