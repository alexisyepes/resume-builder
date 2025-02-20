import { PERSONAL_DETAILS } from "@/constants"
import { CiEdit } from "react-icons/ci"

export default function PersonalInformation({
	firstName,
	setFirstName,
	lastName,
	setLastName,
	jobTitle,
	setJobTitle,
	nextTabHandler,
	handleImageUpload,
	photo,
	setPhoto,
	template,
}) {
	console.log(template)
	return (
		<div className="w-full p-2">
			<div className="flex justify-between border-b-2 mb-2">
				<h2 className="text-xl mb-2 font-bold">{PERSONAL_DETAILS}</h2>
				<CiEdit size={24} />
			</div>

			<div className="border rounded-md w-full mb-2 p-4">
				{photo && (
					<img
						src={photo}
						alt="Uploaded preview"
						className="my-4 mx-auto h-32 w-32 rounded-full object-cover"
					/>
				)}

				<div className="flex mb-2 justify-between items-center">
					<label className="block text-sm font-medium text-gray-700">
						Upload Photo
					</label>
					{photo && (
						<button
							className="bg-red-200 rounded-md px-2 inline-block text-sm"
							onClick={() => setPhoto("")}
						>
							Remove Photo
						</button>
					)}
				</div>
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
				placeholder="Sarah"
				className="w-full p-2 border rounded mb-2"
				value={firstName}
				onChange={(e) => setFirstName(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Connor"
				className="w-full p-2 border rounded mb-2"
				value={lastName}
				onChange={(e) => setLastName(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Project Manager"
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
