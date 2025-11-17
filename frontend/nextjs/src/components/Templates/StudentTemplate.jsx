import DOMPurify from "dompurify"
import {
	PROFESSIONAL_SUMMARY,
	EMPLOYMENT_HISTORY,
	EDUCATION,
	SKILLS,
	CERTIFICATIONS,
	REFERENCES,
	LINKS,
	LANGUAGES,
	HOBBIES,
	CUSTOM_SECTION,
} from "@/constants"
import { TfiEmail } from "react-icons/tfi"
import { FiPhone } from "react-icons/fi"
import { CiLocationOn } from "react-icons/ci"
import { PiCityLight } from "react-icons/pi"

const StudentTemplate = ({
	resumeRef,
	resume,
	firstName,
	lastName,
	jobTitle,
	email,
	phone,
	address,
	cityPostCode,
	experience,
	orderedTabs,
	certifications,
	educations,
	references,
	links,
	hobbies,
	customSections,
	languages,
	customTitles,
	t,
	objective,
	skills,
}) => {
	const cleanHTML = DOMPurify.sanitize(objective, { ALLOWED_ATTR: ["style"] })

	if (!resume || !resume.experience) {
		return <p>Loading resume data...</p>
	}

	const sectionMap = {
		[EMPLOYMENT_HISTORY]: (
			<section className="mt-4 border-b border-gray-300 pb-4">
				{experience.length ? (
					<>
						<h2 className="text-lg font-semibold relative pb-1">
							{customTitles[t.resume_builder.labels.employment_history.title] ||
								t.resume_builder.labels.employment_history.title}
						</h2>

						{experience &&
							experience.map((exp, index) => (
								<div key={index} className="mb-3 mt-2">
									<h3 className="capitalize flex justify-between text-sm font-semibold">
										<span>
											{exp.company} - {exp.role}
										</span>
										<span>{exp.year}</span>
									</h3>
									{exp.responsibilities && (
										<ul className="list-disc pl-5 text-sm text-gray-700">
											{exp.responsibilities.map((task, i) => (
												<li className="capitalize" key={`${exp.company}-${i}`}>
													{task}
												</li>
											))}
										</ul>
									)}
								</div>
							))}
					</>
				) : null}
			</section>
		),
		[EDUCATION]: (
			<section className="mt-4 border-b border-gray-300 pb-4">
				{educations.length ? (
					<>
						<h2 className="text-lg font-semibold relative pb-1">
							{customTitles[t.resume_builder.labels.education.title] ||
								t.resume_builder.labels.education.title}
						</h2>
						{educations.map((edu, index) => (
							<h3
								key={`${edu.institution}-${edu.degree}`}
								className="mb-2 flex text-sm font-semibold justify-between items-center capitalize"
							>
								<span>
									{edu.degree} - {edu.institution}
								</span>
								<span>{edu.year}</span>
							</h3>
						))}
					</>
				) : null}
			</section>
		),
		[CERTIFICATIONS]: (
			<section className="mt-4 border-b border-gray-300 pb-4">
				<h2 className="text-lg font-semibold relative pb-1">
					{customTitles[t.resume_builder.labels.certifications.title] ||
						t.resume_builder.labels.certifications.title}
				</h2>
				{certifications &&
					certifications.map((cert, index) => (
						<h3
							key={`${cert.institution}-${cert.year}`}
							className="mb-2 flex text-sm font-semibold justify-between items-center capitalize"
						>
							<span>
								{cert.institution} - {cert.certificationName}
							</span>
							<span>{cert.year}</span>
						</h3>
					))}
			</section>
		),
		[REFERENCES]: (
			<section className="mt-4 border-b border-gray-300 pb-4">
				<h2 className="text-lg font-semibold relative pb-1">
					{customTitles[REFERENCES] || t.resume_builder.labels.references.title}
				</h2>
				{references &&
					references.map((reference, index) => (
						<ul key={index} className="list-disc pl-5 text-sm text-gray-700">
							<li className="capitalize">
								{reference.name} {reference.company} {reference.email_phone}
							</li>
						</ul>
					))}
			</section>
		),
		[LINKS]: (
			<section className="mt-4 border-b border-gray-300 pb-4">
				<h2 className="text-lg font-semibold relative pb-1">
					{customTitles[t.resume_builder.labels.links.title] ||
						t.resume_builder.labels.links.title}
				</h2>
				{links &&
					links.map((link, index) => (
						<ul key={index} className="list-disc pl-5 text-sm text-gray-700">
							<li>
								<span className="capitalize">{link.name}</span>: {link.link}
							</li>
						</ul>
					))}
			</section>
		),
		[LANGUAGES]: (
			<section className="mt-4 border-b border-gray-300 pb-4">
				<h2 className="text-lg font-semibold relative pb-1">
					{customTitles[LANGUAGES] || t.resume_builder.labels.languages.title}
				</h2>
				{languages &&
					languages.map((language, index) => (
						<span key={index} className="text-sm mr-1 capitalize text-gray-700">
							{language.language}
							{index === languages.length - 1 ? "." : ","}
						</span>
					))}
			</section>
		),
		[HOBBIES]: (
			<section className="mt-4 border-b border-gray-300 pb-4">
				<h2 className="text-lg font-semibold relative pb-1">
					{customTitles[t.resume_builder.labels.hobbies.title] ||
						t.resume_builder.labels.hobbies.title}
				</h2>
				{hobbies &&
					hobbies.map((hobby, index) => (
						<span
							className="capitalize text-sm mr-1"
							key={`${hobby.hobbies}-${index}`}
						>
							{hobby.hobbies}
							{index === hobbies.length - 1 ? "." : ","}
						</span>
					))}
			</section>
		),
		[CUSTOM_SECTION]: (
			<section className="mt-4 border-b border-gray-300 pb-4">
				{customSections &&
					customSections.map((section, index) => {
						return (
							<div className="text-sm" key={`${section.header}-${index}`}>
								{section.header && (
									<h2 className="text-lg font-semibold relative pb-1">
										{section.header}
										<div className="w-full border-b border-gray-900 mt-[1px]"></div>
									</h2>
								)}
								{section.subHeader && (
									<h3 className="text-md font-semibold relative">
										{section.subHeader}
									</h3>
								)}
								{section.content && (
									<div
										className="ql-editor ql-editor-custom-section text-gray-700 cursor-pointer"
										dangerouslySetInnerHTML={{ __html: section.content }}
									/>
								)}
							</div>
						)
					})}
			</section>
		),
	}

	return (
		<div ref={resumeRef} className="element student-template bg-white element3">
			<div className="w-full header h-[180px] border-b-8 border-black justify-center text-black flex items-center px-8">
				<div className="flex text-center flex-col">
					<h2 className="text-5xl header_top font-bold uppercase whitespace-normal">
						{firstName || resume.firstName} {lastName || resume.lastName}
					</h2>
					<h3 className="text-xl header_bottom mt-2 uppercase break-words whitespace-normal">
						{jobTitle || resume.jobTitle}
					</h3>
				</div>
			</div>

			<div className="grid grid-cols-3 ">
				{/* Left Column */}
				<div className="col-span-1 text-black p-8 border-r border-gray-300">
					<div className="-mt-4 border-b border-gray-300 pb-4">
						<h2 className="text-lg capitalize font-extrabold relative pb-1">
							{t.resume_builder.navigation.contact}
						</h2>

						<p className="w-[220px] mt-2 text-sm break-words break-all whitespace-normal">
							<TfiEmail className="inline mr-1" />{" "}
							{email || resume.contact?.email}
						</p>
						<p className="w-[220px] text-sm mt-2 break-words break-all whitespace-normal">
							<FiPhone className="inline mr-1" />{" "}
							{phone || resume.contact?.phone}
						</p>
						<p className="w-[220px] text-sm mt-2 break-words break-all whitespace-normal">
							<CiLocationOn className="inline mr-1" /> {address}
						</p>
						<p className="w-[220px] text-sm mt-2 break-words break-all whitespace-normal">
							<PiCityLight className="inline mr-1" /> {cityPostCode}
						</p>
					</div>
					<h2 className="text-lg mt-4 font-extrabold relative">
						{customTitles[PROFESSIONAL_SUMMARY] ||
							t.resume_builder.labels.professional_summary.title}
					</h2>
					<div className="w-full border-b border-white mb-2 mt-[-2px]"></div>
					<div className="max-h-[440px] overflow-y-auto pr-2 border-b border-gray-300 pb-4">
						<span
							className="text-sm text-justify hyphens-auto whitespace-normal"
							dangerouslySetInnerHTML={{
								__html: cleanHTML,
							}}
						/>
					</div>

					<h2 className="text-lg mt-4 font-extrabold relative pb-1">
						{customTitles[SKILLS] || t.resume_builder.labels.skills.title}
					</h2>
					<div className="w-full border-b border-white mb-2 mt-[-2px]"></div>

					<ul className="border-b border-gray-300 pb-4">
						{skills.length > 0 ? (
							skills.map((skill, index) => (
								<li className="text-sm capitalize" key={index}>
									• {skill}
								</li>
							))
						) : (
							<li>No skills listed</li>
						)}
					</ul>
				</div>

				{/* Right Column */}
				<div className="col-span-2 bg-white text-slate-800">
					{/* Rest of the sections */}
					<div className="px-6">
						{orderedTabs.map((tab, i) => (
							<div key={i}>{sectionMap[tab]}</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default StudentTemplate
