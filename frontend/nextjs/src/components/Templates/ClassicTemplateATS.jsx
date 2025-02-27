import {
	CERTIFICATIONS,
	CUSTOM_SECTION,
	EDUCATION,
	EMPLOYMENT_HISTORY,
	HOBBIES,
	LANGUAGES,
	LINKS,
	PROFESSIONAL_SUMMARY,
	REFERENCES,
	SKILLS,
} from "@/constants"
import DOMPurify from "dompurify"

export default function ClassicTemaplateATS({
	resume,
	email,
	firstName,
	lastName,
	jobTitle,
	phone,
	address,
	cityPostCode,
	objective,
	experience,
	skills,
	orderedTabs,
	certifications,
	educations,
	references,
	links,
	hobbies,
	customSections,
	photo,
	languages,
	customTitles,
}) {
	const mt_sections = "mt-4"
	const sectionMap = {
		[EMPLOYMENT_HISTORY]: (
			<section className={mt_sections}>
				{experience.length ? (
					<>
						<h2
							style={{ letterSpacing: "0.01px" }}
							className="text-lg font-semibold border-b-2 border-black"
						>
							{customTitles[EMPLOYMENT_HISTORY] || EMPLOYMENT_HISTORY}
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
			<section className={mt_sections}>
				{educations.length ? (
					<>
						<h2 className="text-lg border-b-2 border-black font-semibold relative pb-1 mb-2">
							{EDUCATION}
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
		[SKILLS]: (
			<section className={mt_sections}>
				{skills.length ? (
					<>
						<h2 className="text-lg border-b-2 border-black font-semibold relative pb-1 mt-2">
							{customTitles[SKILLS] || SKILLS}
						</h2>
						{skills.map((skill, index) => {
							return (
								<span
									key={index}
									className="text-sm mr-1 capitalize text-gray-700"
								>
									{skill}
									{index === skills.length - 1 ? "." : ","}
								</span>
							)
						})}
					</>
				) : null}
			</section>
		),
		[CERTIFICATIONS]: (
			<section className={mt_sections}>
				<h2 className="text-lg border-b-2 border-black font-semibold relative pb-1">
					{CERTIFICATIONS}
				</h2>
				{certifications &&
					certifications.map((cert, index) => (
						<h3
							key={`${cert.institution}-${cert.year}`}
							className="mb-2 flex text-sm font-semibold justify-between items-center capitalize"
						>
							<span>{cert.institution}</span>
							<span>{cert.year}</span>
						</h3>
					))}
			</section>
		),
		[REFERENCES]: (
			<section className={mt_sections}>
				<h2 className="text-lg border-b-2 border-black font-semibold relative pb-1">
					{REFERENCES}
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
			<section className={mt_sections}>
				<h2 className="text-lg border-b-2 border-black font-semibold relative pb-1">
					{customTitles[LINKS] || LINKS}
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
			<section className={mt_sections}>
				<h2 className="text-lg border-b-2 border-black font-semibold relative pb-1">
					{LANGUAGES}
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
			<section className={mt_sections}>
				<h2 className="text-lg border-b-2 border-black font-semibold relative pb-1">
					{HOBBIES}
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
			<section className={mt_sections}>
				{customSections &&
					customSections.map((section, index) => {
						return (
							<div className="text-sm" key={`${section.header}-${index}`}>
								{section.header && (
									<h2 className="text-lg font-semibold relative">
										{section.header}
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

	if (!resume) return <p>Loading resume data...</p>

	return (
		<div className="element element3 resume-template shadow-[0_10px_30px_rgba(0,0,0,0.4)] p-10 ring-slate-200 bg-white mx-auto rounded-md ring-2">
			{/* Header Section */}
			<div className="relative text-center pb-4 mb-4">
				{photo && (
					<div className="w-24 h-auto mx-auto my-4 overflow-hidden rounded-lg">
						<img
							src={photo}
							alt="Uploaded preview"
							className="w-full h-auto rounded-full object-cover"
						/>
					</div>
				)}
				<h1 className="text-2xl capitalize font-bold">
					{firstName || resume.firstName} {lastName || resume.lastName}
				</h1>
				<p className="text-sm font-bold text-black capitalize">
					{jobTitle || resume.jobTitle}
				</p>
				<p className="text-sm">
					{email} {email && phone && "|"} {phone}
				</p>
				<p className="text-sm">
					{address}
					{address && cityPostCode && ","} {cityPostCode}
				</p>
			</div>

			{/* Summary Section */}
			{objective && (
				<section className="mb-4">
					<h2 className="text-lg relative border-b-2 border-black font-semibold mb-2">
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

			{orderedTabs.map((tab, i) => (
				<div key={i}>{sectionMap[tab]}</div>
			))}
		</div>
	)
}
