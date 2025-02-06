export default function PersonalInformation({
	firstName = "",
	setFirstName,
	lastName = "",
	setLastName,
	jobTitle = "",
	setJobTitle,
	nextTabHandler,
}) {
	return (
		<div className="w-full p-2">
			<input
				type="text"
				placeholder="First Name"
				className="w-full p-2 border rounded mb-2"
				value={firstName}
				onChange={(e) => setFirstName(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Last Name"
				className="w-full p-2 border rounded mb-2"
				value={lastName}
				onChange={(e) => setLastName(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Job Title"
				className="w-full p-2 border rounded mb-2"
				value={jobTitle}
				onChange={(e) => setJobTitle(e.target.value)}
			/>
			<button
				onClick={nextTabHandler}
				className="w-full bg-blue-500 text-white p-2 rounded"
			>
				Next
			</button>
		</div>
	)
}
