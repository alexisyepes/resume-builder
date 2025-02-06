const CreativeTemplate = ({
	resume,
	email,
	firstName,
	lastName,
	jobTitle,
	phone,
	address,
	cityPostCode,
	objective,
}) => {
	if (!resume) return <p>Loading resume data...</p>

	return (
		<div
			className="w-full max-w-[8.5in] aspect-[8.5/11] bg-white shadow-lg rounded-md p-6 mx-auto border overflow-auto"
			style={{
				transform: `scale(${Math.min(1, window.innerWidth / 1200)})`, // Dynamic scaling
				transformOrigin: "top", // Keep scaling from top
			}}
		>
			<div className="p-6 bg-gradient-to-r aspect-[8.5/11] from-purple-500 to-blue-500 text-white rounded-md shadow-lg">
				<h1 className="text-3xl capitalize font-extrabold whitespace-nowrap">
					{firstName || resume.firstName} {lastName || resume.lastName}
				</h1>
				<p className="whitespace-nowrap">{jobTitle || resume.jobTitle} </p>
				<p className="whitespace-nowrap">{email || resume.contact.email}</p>
				<p className="whitespace-nowrap">{phone || resume.contact.phone}</p>
				<p className="whitespace-nowrap">
					{address || resume.contact.address}{" "}
				</p>
				<p className="whitespace-nowrap">
					{cityPostCode || resume.contact.cityPostCode}
				</p>

				<h2 className="text-xl font-semibold mt-4">Objective</h2>
				<p>{objective || resume.objective}</p>

				<h2 className="text-xl font-semibold mt-4">Skills</h2>
				<ul>
					{resume.skills?.length > 0 ? (
						resume.skills.map((skill, index) => <li key={index}>• {skill}</li>)
					) : (
						<li>No skills listed</li>
					)}
				</ul>

				<h2 className="text-xl font-semibold mt-4">Experience</h2>
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
	)
}

export default CreativeTemplate
