const ModernTemplate = ({
	resume,
	email,
	firstName,
	lastName,
	jobTitle,
	phone,
	address,
	cityPostCode,
	objective,
	photo,
}) => {
	if (!resume || !resume.experience) {
		return <p>Loading resume data...</p>
	}

	return (
		<div className="resume-template rounded-bl-md rounded-br-md rounded-tr-md rounded-tl-md ring-slate-200 bg-white h-[1056px] w-[816px] mx-auto">
			<div className="grid grid-cols-3 aspect-[8.5/11]">
				<div className="col-span-1 rounded-bl-md bg-[#133853] text-white p-8 rounded-tl-md">
					{photo && (
						<div className="w-40 mx-auto ring-4 ring-white h-auto my-4 overflow-hidden rounded-full">
							<img
								src={photo}
								alt="Uploaded preview"
								className="w-full h-auto object-cover"
							/>
						</div>
					)}
					<h2 className="text-xl w-[220px] break-words capitalize font-bold whitespace-normal">
						{firstName || resume.firstName} {lastName || resume.lastName}
					</h2>
					<p className="font-bold w-[220px] break-words whitespace-normal">
						{jobTitle || resume.jobTitle}
					</p>
					<p className="w-[220px] break-words whitespace-nowrap">
						{email || resume.contact?.email}
					</p>
					<p className="w-[220px] break-words whitespace-nowrap">
						{phone || resume.contact?.phone}
					</p>
					<p className="whitespace-nowrap w-[220px] break-words">
						{address || resume.contact?.address}
					</p>
					<p className="whitespace-nowrap w-[220px] break-words">
						{cityPostCode || resume.contact?.cityPostCode}
					</p>

					<h3 className="text-lg font-semibold mt-2">Skills</h3>
					<ul>
						{resume.skills?.length > 0 ? (
							resume.skills.map((skill, index) => (
								<li key={index}>• {skill}</li>
							))
						) : (
							<li>No skills listed</li>
						)}
					</ul>
				</div>

				<div className="col-span-2 text-slate-800 p-4">
					<h3 className="text-lg font-semibold">Objective</h3>
					<p className="text-justify whitespace-normal">
						{objective || resume.objective}
					</p>

					<h3 className="text-lg mt-2 font-semibold">Experience</h3>
					{resume.experience?.length > 0 ? (
						resume.experience.map((exp, index) => (
							<div key={index} className="mt-2">
								<strong>{exp.role || "No Role"}</strong> -{" "}
								{exp.project || "No Project"} ({exp.year || "N/A"})
								<ul>
									{exp.responsibilities?.length > 0 ? (
										exp.responsibilities.map((task, i) => (
											<li key={i}>• {task}</li>
										))
									) : (
										<li>No details provided</li>
									)}
								</ul>
							</div>
						))
					) : (
						<p>No experience listed</p>
					)}
				</div>
			</div>
		</div>
	)
}

export default ModernTemplate
