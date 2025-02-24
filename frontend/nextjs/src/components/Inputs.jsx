import { useState, useEffect } from "react"
import PersonalInformation from "./InputSections/PersonalInformation"
import ContactInput from "./InputSections/ContactInput"
import ProfessionalSummaryInput from "./InputSections/ProfessionalSummaryInput"
import SkillsInput from "./InputSections/SkillsInput"
import {
	CERTIFICATIONS,
	CONTACT_INFORMATION,
	CUSTOM_SECTION,
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
import UniversalInput from "./InputSections/UniverslaInputs"
import { motion, AnimatePresence } from "framer-motion"

export default function Inputs({
	t,
	langPrefix,
	firstName,
	setFirstName,
	lastName,
	setLastName,
	jobTitle,
	email = "",
	phone = "",
	address = "",
	cityPostCode = "",
	objective = "",
	objectiveSummary = "",
	experience = [],
	suggestedSkills = [],
	skills = [],
	links = [],
	handleGenerateResume,
	selectedTab,
	setJobTitle,
	setSkills,
	setLinks,
	setExperience,
	setEmail,
	setPhone,
	setAddress,
	setCityPostCode,
	setObjective,
	nextTabHandler,
	isLoading,
	regenerateSkillsSuggestions,
	certifications,
	setCertifications,
	educations,
	setEducations,
	references,
	setReferences,
	hobbies,
	setHobbies,
	customSections,
	setCustomSections,
	handleImageUpload,
	photo,
	removeTabHandler,
	activeTab,
	tabs,
	setTabs,
	languages,
	setLanguages,
	setActiveTab,
	setPhoto,
	template,
	customTitles,
	handleCustomTitleOnChange,
	editing,
	setEditing,
	inputRef,
	fileName,
	setFileName,
}) {
	const [counter, setCounter] = useState(0)
	const [countdown, setCountdown] = useState(300000) // 5 minutes
	const [running, setRunning] = useState(false)
	const [editingId, setEditingId] = useState(null)

	const commonProps = {
		inputRef,
		editing,
		setEditing,
		customTitles,
		handleCustomTitleOnChange,
		removeTabHandler,
		activeTab,
		tabs,
		setTabs,
		nextTabHandler,
		setActiveTab,
		t,
	}

	useEffect(() => {
		if (counter === 5) {
			startCountdown()
		}
	}, [counter])

	useEffect(() => {
		if (!running || countdown <= 0) return resetCountdown()

		const interval = setInterval(() => {
			setCountdown((prevCountdown) => prevCountdown - 1000)
		}, 1000)

		return () => clearInterval(interval)
	}, [running, countdown])

	const startCountdown = () => setRunning(true)
	const resetCountdown = () => {
		setCounter(0)
		setRunning(false)
		setCountdown(300000)
	}

	const minutes = Math.floor(countdown / 60000)
	const seconds = Math.floor((countdown % 60000) / 1000)

	const handleChange = (e, index) => {
		const { value } = e.target
		setSkills((prevSkills) =>
			prevSkills.map((skill, i) => (i === index ? value : skill))
		)
	}

	const handleEditClick = (id) => {
		setEditingId(id)
	}

	const renderInputs = () => {
		switch (selectedTab) {
			case PERSONAL_DETAILS:
				return (
					<AnimatePresence mode="wait">
						<motion.div
							key={activeTab}
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 10 }}
							transition={{ duration: 0.5 }}
						>
							<PersonalInformation
								t={t}
								firstName={firstName}
								setFirstName={setFirstName}
								lastName={lastName}
								setLastName={setLastName}
								setJobTitle={setJobTitle}
								jobTitle={jobTitle}
								nextTabHandler={nextTabHandler}
								handleImageUpload={handleImageUpload}
								photo={photo}
								setPhoto={setPhoto}
								template={template}
								fileName={fileName}
								setFileName={setFileName}
							/>
						</motion.div>{" "}
					</AnimatePresence>
				)
			case CONTACT_INFORMATION:
				return (
					<AnimatePresence mode="wait">
						<motion.div
							key={activeTab}
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 10 }}
							transition={{ duration: 0.5 }}
						>
							<ContactInput
								t={t}
								email={email}
								phone={phone}
								address={address}
								cityPostCode={cityPostCode}
								setEmail={setEmail}
								setPhone={setPhone}
								setAddress={setAddress}
								setCityPostCode={setCityPostCode}
								nextTabHandler={nextTabHandler}
							/>
						</motion.div>
					</AnimatePresence>
				)
			case PROFESSIONAL_SUMMARY:
				return (
					<AnimatePresence mode="wait">
						<motion.div
							key={activeTab}
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 10 }}
							transition={{ duration: 0.5 }}
						>
							<ProfessionalSummaryInput
								langPrefix={langPrefix}
								t={t}
								inputRef={inputRef}
								editing={editing}
								setEditing={setEditing}
								customTitles={customTitles}
								handleCustomTitleOnChange={handleCustomTitleOnChange}
								setCounter={setCounter}
								counter={counter}
								experience={experience}
								setExperience={setExperience}
								handleGenerateResume={handleGenerateResume}
								isLoading={isLoading}
								minutes={minutes}
								seconds={seconds}
								objective={objective}
								setObjective={setObjective}
								objectiveSummary={objectiveSummary}
								nextTabHandler={nextTabHandler}
								handleImageUpload={handleImageUpload}
								photo={photo}
								removeTabHandler={removeTabHandler}
								activeTab={activeTab}
								tabs={tabs}
							/>
						</motion.div>
					</AnimatePresence>
				)
			case EMPLOYMENT_HISTORY:
				return (
					<AnimatePresence mode="wait">
						<motion.div
							key={activeTab}
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 10 }}
							transition={{ duration: 0.5 }}
						>
							<UniversalInput
								{...commonProps}
								title={`${t.resume_builder.labels.employment_history.title}`}
								fields={[
									{
										name: "company",
										placeholder: `${t.resume_builder.labels.employment_history.company}`,
										label: `${t.resume_builder.labels.employment_history.company}`,
										type: "text",
										required: true,
									},
									{
										name: "role",
										label: `${t.resume_builder.labels.employment_history.role}`,
										placeholder: `${t.resume_builder.labels.employment_history.role}`,
										type: "text",
										required: true,
									},
									{
										name: "year",
										label: `${t.resume_builder.labels.employment_history.year}`,
										placeholder: `${t.resume_builder.labels.employment_history.year}`,
										type: "text",
										required: true,
									},
									{
										name: "responsibilities",
										label: `${t.resume_builder.labels.employment_history.responsibilities}`,
										placeholder: `${t.resume_builder.labels.employment_history.responsibilities}`,
										type: "textarea",
									},
								]}
								data={experience}
								setData={setExperience}
								cta_label={`${t.resume_builder.labels.employment_history.title}`}
							/>
						</motion.div>
					</AnimatePresence>
				)
			case LINKS:
				return (
					<AnimatePresence mode="wait">
						<motion.div
							key={activeTab}
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 10 }}
							transition={{ duration: 0.5 }}
						>
							<UniversalInput
								{...commonProps}
								title={`${t.resume_builder.labels.links.title}`}
								fields={[
									{
										name: "name",
										label: `${t.resume_builder.labels.links.name}`,
										placeholder: `${t.resume_builder.labels.links.name}`,
										type: "text",
										required: true,
									},
									{
										name: "link",
										placeholder: `${t.resume_builder.labels.links.url}`,
										label: `${t.resume_builder.labels.links.url}`,
										type: "text",
										required: true,
									},
								]}
								data={links}
								setData={setLinks}
								cta_label={`${t.resume_builder.labels.links.title}`}
							/>
						</motion.div>
					</AnimatePresence>
				)
			case HOBBIES:
				return (
					<AnimatePresence mode="wait">
						<motion.div
							key={activeTab}
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 10 }}
							transition={{ duration: 0.5 }}
						>
							<UniversalInput
								{...commonProps}
								title={`${t.resume_builder.labels.hobbies.title}`}
								fields={[
									{
										name: "hobbies",
										label: `${t.resume_builder.labels.hobbies.title}`,
										placeholder: `${t.resume_builder.labels.hobbies.title}`,
										type: "text",
										required: true,
									},
								]}
								data={hobbies}
								setData={setHobbies}
								cta_label={`${t.resume_builder.labels.hobbies.title}`}
							/>
						</motion.div>
					</AnimatePresence>
				)
			case CERTIFICATIONS:
				return (
					<AnimatePresence mode="wait">
						<motion.div
							key={activeTab}
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 10 }}
							transition={{ duration: 0.5 }}
						>
							<UniversalInput
								{...commonProps}
								title={`${t.resume_builder.labels.certifications.title}`}
								fields={[
									{
										name: "institution",
										placeholder: `${t.resume_builder.labels.certifications.institution}`,
										label: `${t.resume_builder.labels.certifications.institution}`,
										type: "text",
										required: true,
									},
									{
										name: "certificationName",
										placeholder: `${t.resume_builder.labels.certifications.name}`,
										label: `${t.resume_builder.labels.certifications.name}`,
										type: "text",
										required: true,
									},
									{
										name: "year",
										placeholder: `${t.resume_builder.labels.certifications.year}`,
										label: `${t.resume_builder.labels.certifications.year}`,
										type: "text",
									},
								]}
								data={certifications}
								setData={setCertifications}
								cta_label={`${t.resume_builder.labels.certifications.title}`}
							/>
						</motion.div>
					</AnimatePresence>
				)
			case SKILLS:
				return (
					<AnimatePresence mode="wait">
						<motion.div
							key={activeTab}
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 10 }}
							transition={{ duration: 0.5 }}
						>
							<SkillsInput
								t={t}
								inputRef={inputRef}
								editing={editing}
								setEditing={setEditing}
								customTitles={customTitles}
								handleCustomTitleOnChange={handleCustomTitleOnChange}
								regenerateSkillsSuggestions={regenerateSkillsSuggestions}
								suggestedSkills={suggestedSkills}
								isLoading={isLoading}
								skills={skills}
								setSkills={setSkills}
								editingId={editingId}
								setEditingId={setEditingId}
								handleChange={handleChange}
								handleEditClick={handleEditClick}
								nextTabHandler={nextTabHandler}
								removeTabHandler={removeTabHandler}
								activeTab={activeTab}
								tabs={tabs}
								setTabs={setTabs}
								setActiveTab={setActiveTab}
							/>
						</motion.div>
					</AnimatePresence>
				)
			case EDUCATION:
				return (
					<AnimatePresence mode="wait">
						<motion.div
							key={activeTab}
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 10 }}
							transition={{ duration: 0.5 }}
						>
							<UniversalInput
								{...commonProps}
								title={`${t.resume_builder.labels.education.title}`}
								fields={[
									{
										name: "institution",
										placeholder: `${t.resume_builder.labels.education.institution}`,
										label: `${t.resume_builder.labels.education.institution}`,
										type: "text",
										required: true,
									},
									{
										name: "degree",
										placeholder: `${t.resume_builder.labels.education.degree}`,
										label: `${t.resume_builder.labels.education.degree}`,
										type: "text",
										required: true,
									},
									{
										name: "year",
										placeholder: `${t.resume_builder.labels.education.year}`,
										label: `${t.resume_builder.labels.education.year}`,
										type: "text",
									},
								]}
								data={educations}
								setData={setEducations}
								cta_label={`${t.resume_builder.labels.education.title}`}
							/>
						</motion.div>{" "}
					</AnimatePresence>
				)
			case REFERENCES:
				return (
					<AnimatePresence mode="wait">
						<motion.div
							key={activeTab}
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 10 }}
							transition={{ duration: 0.5 }}
						>
							<UniversalInput
								{...commonProps}
								title={`${t.resume_builder.labels.references.title}`}
								fields={[
									{
										name: "name",
										placeholder: `${t.resume_builder.labels.references.name}`,
										label: `${t.resume_builder.labels.references.name}`,
										type: "text",
										required: true,
									},
									{
										name: "company",
										placeholder: `${t.resume_builder.labels.references.company_name}`,
										label: `${t.resume_builder.labels.references.company_name}`,
										type: "text",
										required: true,
									},
									{
										name: "email_phone",
										placeholder: `${t.resume_builder.labels.references.email_phone}`,
										label: `${t.resume_builder.labels.references.email_phone}`,
										type: "email",
									},
								]}
								data={references}
								setData={setReferences}
								cta_label={`${t.resume_builder.labels.references.title}`}
							/>
						</motion.div>
					</AnimatePresence>
				)
			case LANGUAGES:
				return (
					<AnimatePresence mode="wait">
						<motion.div
							key={activeTab}
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 10 }}
							transition={{ duration: 0.5 }}
						>
							<UniversalInput
								{...commonProps}
								title={`${t.resume_builder.labels.languages.title}`}
								fields={[
									{
										name: "language",
										placeholder: `${t.resume_builder.labels.languages.placeholder}`,
										label: `${t.resume_builder.labels.languages.title}`,
										type: "text",
										required: true,
									},
								]}
								data={languages}
								setData={setLanguages}
								cta_label={`${t.resume_builder.labels.languages.title}`}
							/>
						</motion.div>
					</AnimatePresence>
				)
			case CUSTOM_SECTION:
				return (
					<AnimatePresence mode="wait">
						<motion.div
							key={activeTab}
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 10 }}
							transition={{ duration: 0.5 }}
						>
							<UniversalInput
								{...commonProps}
								title={`${t.resume_builder.labels.custom_section.title}`}
								fields={[
									{
										name: "header",
										label: `${t.resume_builder.labels.custom_section.header}`,
										placeholder: `${t.resume_builder.labels.custom_section.header}`,
										type: "text",
										required: true,
									},
									{
										name: "subHeader",
										label: `${t.resume_builder.labels.custom_section.subheader}`,
										placeholder: `${t.resume_builder.labels.custom_section.subheader}`,
										type: "text",
										required: false,
									},
									{
										name: "content",
										label: `${t.resume_builder.labels.custom_section.content}`,
										placeholder: `${t.resume_builder.labels.custom_section.content}`,
										type: "richtextarea",
										required: false,
									},
								]}
								data={customSections}
								setData={setCustomSections}
								cta_label={`${t.resume_builder.labels.custom_section.title}`}
							/>
						</motion.div>
					</AnimatePresence>
				)

			default:
				return (
					<PersonalInformation
						firstName={firstName}
						setFirstName={setFirstName}
						lastName={lastName}
						setLastName={setLastName}
						setJobTitle={setJobTitle}
						jobTitle={jobTitle}
						nextTabHandler={nextTabHandler}
						removeTabHandler={removeTabHandler}
					/>
				)
		}
	}

	return <div className="flex-1 px-4">{renderInputs()}</div>
}
