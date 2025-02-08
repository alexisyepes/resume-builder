export default function PersonalInformation({
	firstName = "",
	setFirstName,
	lastName = "",
	setLastName,
	jobTitle = "",
	setJobTitle,
	nextTabHandler,
	handleImageUpload,
	photo,
}) {
	return (
		<div className="w-full p-2">
			<div className="border w-full p-4">
				{photo && (
					<img
						src={photo}
						alt="Uploaded preview"
						className="mt-4 mx-auto h-32 w-32 rounded-lg object-cover"
					/>
				)}
				<label className="block text-sm font-medium text-gray-700">
					Upload Photo
				</label>
				<input
					type="file"
					accept="image/*"
					onChange={handleImageUpload}
					className="mt-1 block w-full text-sm text-gray-500
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-md file:border-0
                           file:text-sm file:font-semibold
                           file:bg-blue-50 file:text-cyan-700
                           hover:file:bg-blue-100"
				/>
			</div>
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
				className="w-full bg-cyan-500 text-white p-2 rounded"
			>
				Next
			</button>
		</div>
	)
}
