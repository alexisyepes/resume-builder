import { PROFESSIONAL_SUMMARY } from "@/constants"
import useResumeStore from "@/store/useResumeStore"
import DOMPurify from "dompurify"

const ElegantTemplate = ({
	resume,
	email,
	firstName,
	lastName,
	jobTitle,
	phone,
	address,
	cityPostCode,
	objective,
	achievements,
	bg,
	resumeRef,
}) => {
	const { customTitles } = useResumeStore()

	return (
		<div ref={resumeRef}>
			<div
				style={{
					backgroundImage: `url(${bg})`,
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center center",
					backgroundSize: "cover",
					WebkitPrintColorAdjust: "exact",
					printColorAdjust: "exact",
				}}
				className="element element3 elegant-template   p-10 ring-slate-200 bg-white mx-auto rounded-sm ring-2"
			>
				{/* Header Section */}
				<div className="relative z-10 p-1 pt-4 rounded-md">
					<h1 className="text-4xl font-bold capitalize">
						{firstName || resume.firstName} {lastName || resume.lastName}
					</h1>
					<p className="text-lg font-semibold">{jobTitle || resume.jobTitle}</p>
					<p className="text-sm">{email || resume.contact.email}</p>
					<p className="text-sm">
						{phone || resume.contact.phone} <br />
						{address || resume.contact.address} <br />
						{cityPostCode || resume.contact.cityPostCode}
					</p>
				</div>

				{/* Summary Section */}
				{objective && (
					<section className="mb-4">
						<h2 className="text-xl font-bold text-slate-800 mt-4">
							{customTitles[PROFESSIONAL_SUMMARY] || PROFESSIONAL_SUMMARY}
						</h2>

						<p className="text-sm text-gray-700">
							<span
								dangerouslySetInnerHTML={{
									__html: DOMPurify.sanitize(objective),
								}}
							/>
						</p>
					</section>
				)}

				{/* Experience Section */}
				<section className="mt-6">
					<h2 className="text-xl font-bold text-slate-800">Experience</h2>
					{resume.experience.map((exp, index) => (
						<div key={index} className="mt-3">
							<h3 className="font-semibold text-lg">
								{exp.role} - {exp.company}
							</h3>
							<ul className="list-disc pl-5 text-sm text-gray-700">
								{exp.responsibilities.map((task, i) => (
									<li key={i}>{task}</li>
								))}
							</ul>
						</div>
					))}
				</section>

				{/* Education Section */}
				<section className="mt-6">
					<h2 className="text-xl font-bold text-slate-800">Education</h2>
					{resume.education.map((edu, index) => (
						<div key={index} className="mt-3">
							<h3 className="font-semibold">
								{edu.degree} - {edu.institution}
							</h3>
							<p className="text-xs text-gray-500">{edu.period}</p>
						</div>
					))}
				</section>

				{/* Skills Section */}
				<section className="mt-6">
					<h2 className="text-xl font-bold text-slate-800">Skills</h2>
					<p className="text-sm text-gray-700">{resume.skills.join(", ")}</p>
				</section>

				{/* Key Achievements */}
				{achievements && (
					<section className="mt-6">
						<h2 className="text-xl font-bold text-slate-800">
							Key Achievements
						</h2>
						{achievements.map((achieve, index) => (
							<div key={index} className="mt-2 flex items-center gap-2">
								<span className="text-green-500">⭐</span>
								<p className="text-sm text-gray-700 font-medium">{achieve}</p>
							</div>
						))}
					</section>
				)}
			</div>
		</div>
	)
}

export default ElegantTemplate
