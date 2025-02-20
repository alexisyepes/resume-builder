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
								title="Employment History"
								fields={[
									{
										name: "company",
										placeholder: "Company",
										label: "Company",
										type: "text",
										required: true,
									},
									{
										name: "role",
										label: "Role",
										placeholder: "Role",
										type: "text",
										required: true,
									},
									{
										label: "Year (e.g., 2020 - Present)",
										name: "year",
										placeholder: "Year (e.g., 2020 - Present)",
										type: "text",
										required: true,
									},
									{
										name: "responsibilities",
										label: "Responsibilities (each on a new line)",
										placeholder: "Responsibilities (each on a new line)",
										type: "textarea",
									},
								]}
								data={experience}
								setData={setExperience}
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
								title={LINKS}
								fields={[
									{
										name: "name",
										label: "Name (e.g., Portfolio)",
										placeholder: "Name (e.g., Portfolio)",
										type: "text",
										required: true,
									},
									{
										name: "link",
										placeholder: "Url (e.g., https://www.yourwebsite.com)",
										label: "Url (e.g., https://www.yourwebsite.com)",
										type: "text",
										required: true,
									},
								]}
								data={links}
								setData={setLinks}
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
								title={HOBBIES}
								fields={[
									{
										name: "hobbies",
										label: "Hobbies",
										placeholder: "Hobbies",
										type: "text",
										required: true,
									},
								]}
								data={hobbies}
								setData={setHobbies}
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
								title={CERTIFICATIONS}
								fields={[
									{
										name: "institution",
										placeholder: "Institution",
										label: "Institution",
										type: "text",
										required: true,
									},
									{
										name: "certificationName",
										placeholder: "Certification Name",
										label: "Certification Name",
										type: "text",
										required: true,
									},
									{
										name: "year",
										placeholder: "Year / Date",
										label: "Year / Date",
										type: "text",
									},
								]}
								data={certifications}
								setData={setCertifications}
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
								title={EDUCATION}
								fields={[
									{
										name: "institution",
										placeholder: "Institution",
										label: "Institution",
										type: "text",
										required: true,
									},
									{
										name: "degree",
										placeholder: "Degree",
										label: "Degree",
										type: "text",
										required: true,
									},
									{
										name: "year",
										placeholder: "Year / Date",
										label: "Year / Date",
										type: "text",
									},
								]}
								data={educations}
								setData={setEducations}
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
								title={REFERENCES}
								fields={[
									{
										name: "name",
										placeholder: "Reference Full Name",
										label: "Reference Full Name",
										type: "text",
										required: true,
									},
									{
										name: "company",
										placeholder: "Company Name",
										label: "Company Name",
										type: "text",
										required: true,
									},
									{
										name: "email_phone",
										placeholder: "Email / Phone-number",
										label: "Email / Phone-number",
										type: "email",
									},
								]}
								data={references}
								setData={setReferences}
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
								title={LANGUAGES}
								fields={[
									{
										name: "language",
										placeholder: "E.g., Spanish, Portuguese...",
										label: LANGUAGES,
										type: "text",
										required: true,
									},
								]}
								data={languages}
								setData={setLanguages}
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
								title={CUSTOM_SECTION}
								fields={[
									{
										name: "header",
										label: "Header",
										placeholder: "Header",
										type: "text",
										required: true,
									},
									{
										name: "subHeader",
										label: "Sub Header",
										placeholder: "Sub Header",
										type: "text",
										required: false,
									},
									{
										name: "content",
										label: "Content",
										placeholder: "Content",
										type: "richtextarea",
										required: false,
									},
								]}
								data={customSections}
								setData={setCustomSections}
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
