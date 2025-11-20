import { useResumeContext } from "@/contexts/useResumeContext"
import useResumeStore from "@/store/useResumeStore"
import { GrLinkNext } from "react-icons/gr"

interface PersonalInformationProps {
	firstName?: string
	setFirstName?: (value: string) => void
	lastName?: string
	setLastName?: (value: string) => void
	jobTitle?: string
	setJobTitle?: (value: string) => void
	nextTabHandler: () => void
	removeTabHandler?: (index: string) => void
}

export default function PersonalInformation({
	nextTabHandler,
}: PersonalInformationProps) {
	const {
		firstName = "",
		lastName = "",
		jobTitle = "",
		setFirstName,
		setLastName,
		setJobTitle,
		setPhoto,
		photo,
	} = useResumeStore()
	const { t, handleImageUpload } = useResumeContext()

	return (
		<div className="w-full p-2">
			<div className="flex justify-between border-b-2 mb-2">
				<h2 className="text-xl mb-2 font-bold">
					{t.resume_builder.labels.personal_information.title}
				</h2>
			</div>

			<label
				htmlFor="file-upload"
				className="block text-sm font-medium text-gray-700 mb-1 capitalize"
			>
				{t.resume_builder.labels.personal_information.add_photo}
			</label>
			<div className="border rounded-md w-full mb-2 p-4">
				<div className="flex flex-col">
					{photo && (
						<button
							className="bg-red-200 capitalize w-1/2 mx-auto rounded-md px-2 inline-block text-sm"
							onClick={() => setPhoto("")}
						>
							{t.resume_builder.labels.personal_information.remove_photo}
						</button>
					)}
					{photo && (
						<img
							src={photo}
							alt="Uploaded preview"
							className="my-4 mx-auto h-32 w-32 rounded-full object-cover"
						/>
					)}
				</div>

				<label className="block w-full text-sm text-gray-500">
					<input
						type="file"
						accept="image/*"
						onChange={handleImageUpload}
						className="hidden"
						id="file-upload"
					/>
					<div className="flex items-center justify-center space-x-2">
						<label
							htmlFor="file-upload"
							className="cursor-pointer file:mr-4 file:py-2 file:px-4
                       file:rounded-md file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-cyan-700
                       hover:file:bg-blue-100 bg-blue-50 text-cyan-700 px-4 py-2 rounded-md"
						>
							{t.resume_builder.labels.personal_information.choose_file}
						</label>
					</div>
				</label>
			</div>

			<label
				htmlFor="firstName"
				className="block text-sm font-medium text-gray-700 mb-1 capitalize"
			>
				{t.resume_builder.labels.personal_information.first_name}
			</label>
			<input
				id="firstName"
				type="text"
				placeholder="Sarah"
				className="w-full p-2 border rounded mb-2"
				value={firstName || ""}
				onChange={(e) => setFirstName(e.target.value)}
			/>

			<label
				htmlFor="lastName"
				className="block text-sm font-medium text-gray-700 mb-1 capitalize"
			>
				{t.resume_builder.labels.personal_information.last_name}
			</label>
			<input
				id="lastName"
				type="text"
				placeholder="Connor"
				className="w-full p-2 border rounded mb-2"
				value={lastName || ""}
				onChange={(e) => setLastName(e.target.value)}
			/>

			<label
				htmlFor="jobTitle"
				className="block text-sm font-medium text-gray-700 mb-1 capitalize"
			>
				{t.resume_builder.labels.personal_information.job_title}
			</label>
			<input
				id="jobTitle"
				type="text"
				placeholder={
					t.resume_builder.labels.personal_information.job_title_placeholder
				}
				className="w-full p-2 border rounded mb-2"
				value={jobTitle || ""}
				onChange={(e) => setJobTitle(e.target.value)}
			/>

			<button
				onClick={nextTabHandler}
				className="w-full capitalize bg-cyan-500 text-white p-2 rounded"
			>
				{t.resume_builder.labels.general.next}
				<GrLinkNext className="inline ml-2" />
			</button>
		</div>
	)
}
