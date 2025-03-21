import DOMPurify from "dompurify"
import {
	PERSONAL_DETAILS,
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

export default function ElegantSectionMap({
	sectionRefs,
	t,
	customTitles,
	resumeData,
	generatedResume,
}) {
	const {
		photo,
		firstName,
		lastName,
		jobTitle,
		email,
		phone,
		address,
		cityPostCode,
		objective,
		skills,
		experience,
		certifications,
		educations,
		references,
		links,
		hobbies,
		customSections,
		languages,
	} = resumeData

	const cleanHTML = DOMPurify.sanitize(objective, { ALLOWED_ATTR: ["style"] })

	const mt_sections = "mt-4"

	return {
		[PERSONAL_DETAILS]: (
			<section ref={sectionRefs[PERSONAL_DETAILS]} className="mb-4">
				<div className="relative pb-4 mb-4">
					<h1 className="text-2xl capitalize font-bold">
						{firstName || generatedResume.firstName}{" "}
						{lastName || generatedResume.lastName}
					</h1>
					<p className="text-sm font-bold text-black capitalize">
						{jobTitle || generatedResume.jobTitle}
					</p>
					<p className="text-sm">
						{email} {email && phone && "|"} {phone}
					</p>
					<p className="text-sm">
						{address}
						{address && cityPostCode && ","} {cityPostCode}
					</p>
				</div>
			</section>
		),
		[PROFESSIONAL_SUMMARY]: (
			<section ref={sectionRefs[PROFESSIONAL_SUMMARY]} className="mb-4">
				<h2 className="text-lg font-semibold relative pb-1">
					{customTitles[PROFESSIONAL_SUMMARY] ||
						t.resume_builder.labels.professional_summary.title}
					<div className="w-full border-b border-gray-900 mt-[-2px]"></div>
				</h2>
				<span
					className="text-sm text-gray-700"
					dangerouslySetInnerHTML={{
						__html: cleanHTML,
					}}
				/>
			</section>
		),
		[EMPLOYMENT_HISTORY]: (
			<section ref={sectionRefs[EMPLOYMENT_HISTORY]} className={mt_sections}>
				{experience.length ? (
					<>
						<h2 className="text-lg font-semibold relative pb-1">
							{customTitles[t.resume_builder.labels.employment_history.title] ||
								t.resume_builder.labels.employment_history.title}
							<div className="w-full border-b border-gray-900 mt-[-1px]"></div>
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
			<section ref={sectionRefs[EDUCATION]} className={mt_sections}>
				{educations.length ? (
					<>
						<h2 className="text-lg font-semibold relative pb-1">
							{customTitles[t.resume_builder.labels.education.title] ||
								t.resume_builder.labels.education.title}
							<div className="w-full border-b border-gray-900 mt-[-2px]"></div>
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
			<section ref={sectionRefs[SKILLS]} className={mt_sections}>
				{skills.length ? (
					<>
						<h2 className="text-lg font-semibold relative pb-1">
							{customTitles[SKILLS] || t.resume_builder.labels.skills.title}
							<div className="w-full border-b border-gray-900 mt-[-2px]"></div>
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
			<section ref={sectionRefs[CERTIFICATIONS]} className={mt_sections}>
				<h2 className="text-lg font-semibold relative pb-1">
					{customTitles[t.resume_builder.labels.certifications.title] ||
						t.resume_builder.labels.certifications.title}
					<div className="w-full border-b border-gray-900 mt-[-1px]"></div>
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
			<section ref={sectionRefs[REFERENCES]} className={mt_sections}>
				<h2 className="text-lg font-semibold relative pb-1">
					{customTitles[REFERENCES] || t.resume_builder.labels.references.title}
					<div className="w-full border-b border-gray-900 mt-[-2px]"></div>
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
			<section ref={sectionRefs[LINKS]} className={mt_sections}>
				<h2 className="text-lg font-semibold relative pb-1">
					{customTitles[t.resume_builder.labels.links.title] ||
						t.resume_builder.labels.links.title}
					<div className="w-full border-b border-gray-900 mt-[-1px]"></div>
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
			<section ref={sectionRefs[LANGUAGES]} className={mt_sections}>
				<h2 className="text-lg font-semibold relative pb-1">
					{customTitles[LANGUAGES] || t.resume_builder.labels.languages.title}
					<div className="w-full border-b border-gray-900 mt-[-1px]"></div>
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
			<section ref={sectionRefs[HOBBIES]} className={mt_sections}>
				<h2 className="text-lg font-semibold relative pb-1">
					{customTitles[t.resume_builder.labels.hobbies.title] ||
						t.resume_builder.labels.hobbies.title}
					<div className="w-full border-b border-gray-900 mt-[-2px]"></div>
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
			<section ref={sectionRefs[CUSTOM_SECTION]} className={mt_sections}>
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
}
