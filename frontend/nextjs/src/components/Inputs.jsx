import { useState, useEffect } from "react"
import PersonalInformation from "./InputSections/PersonalInformation"
import ContactInput from "./InputSections/ContactInput"
import ProfessionalSummaryInput from "./InputSections/ProfessionalSummaryInput"
import SkillsInput from "./InputSections/SkillsInput"
import {
	CONTACT_INFORMATION,
	EDUCATION,
	EMPLOYMENT_HISTORY,
	PERSONAL_DETAILS,
	PROFESSIONAL_SUMMARY,
	REFERENCES,
	SKILLS,
} from "@/constants"
import EmploymentHistory from "./InputSections/EmploymentHistoryInput"

export default function Inputs({
	firstName = "",
	setFirstName,
	lastName = "",
	setLastName,
	jobTitle = "",
	email = "",
	phone = "",
	address = "",
	cityPostCode = "",
	objective = "",
	objectiveSummary = "",
	experience = [],
	suggestedSkills = [],
	skills = [],
	handleGenerateResume,
	selectedTab,
	setJobTitle,
	setSkills,
	setExperience,
	setEmail,
	setPhone,
	setAddress,
	setCityPostCode,
	setObjective,
	nextTabHandler,
	isLoading,
	regenerateSkillsSuggestions,
}) {
	const [counter, setCounter] = useState(0)
	const [countdown, setCountdown] = useState(300000) // 5 minutes
	const [running, setRunning] = useState(false)
	const [editingId, setEditingId] = useState(null)

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
					<PersonalInformation
						firstName={firstName}
						setFirstName={setFirstName}
						lastName={lastName}
						setLastName={setLastName}
						setJobTitle={setJobTitle}
						jobTitle={jobTitle}
						nextTabHandler={nextTabHandler}
					/>
				)
			case CONTACT_INFORMATION:
				return (
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
				)
			case PROFESSIONAL_SUMMARY:
				return (
					<ProfessionalSummaryInput
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
					/>
				)
			case EMPLOYMENT_HISTORY:
				return (
					<EmploymentHistory
						experience={experience}
						setExperience={setExperience}
					/>
				)
			case SKILLS:
				return (
					<SkillsInput
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
					/>
				)
			case EDUCATION:
				return (
					<div className="w-full p-2">
						Education
						<button
							onClick={nextTabHandler}
							className="w-full bg-blue-500 text-white p-2 rounded"
						>
							Next
						</button>
					</div>
				)
			case REFERENCES:
				return (
					<div className="w-full p-2">
						References
						<button
							onClick={nextTabHandler}
							className="w-full bg-green-500 mt-2 text-white p-2 rounded"
						>
							Finish
						</button>
					</div>
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
					/>
				)
		}
	}

	return <div className="flex-1 px-4">{renderInputs()}</div>
}
