import useResumeStore from "@/store/useResumeStore"
import { CiEdit } from "react-icons/ci"
import { GrLinkNext } from "react-icons/gr"

interface ContactInputProps {
	t: any
	nextTabHandler: () => void
}

export default function ContactInput({ t, nextTabHandler }: ContactInputProps) {
	const {
		email,
		phone,
		address,
		cityPostCode,
		setEmail,
		setPhone,
		setAddress,
		setCityPostCode,
	} = useResumeStore()

	return (
		<div className="w-full p-2">
			<div className="flex justify-between border-b-2 mb-2">
				<h2 className="text-xl mb-2 font-bold">
					{t.resume_builder.labels.contact_information.title}
				</h2>
				<CiEdit size={24} />
			</div>
			<label
				htmlFor="email"
				className="block text-sm font-medium text-gray-700 mb-1 capitalize"
			>
				{t.resume_builder.labels.contact_information.email}
			</label>
			<input
				type="email"
				placeholder={t.resume_builder.labels.contact_information.email}
				className="w-full p-2 border rounded mb-2"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<label
				htmlFor="phone"
				className="block text-sm font-medium text-gray-700 mb-1 capitalize"
			>
				{t.resume_builder.labels.contact_information.phone}
			</label>
			<input
				type="text"
				placeholder={t.resume_builder.labels.contact_information.phone}
				className="w-full p-2 border rounded mb-2"
				value={phone}
				onChange={(e) => setPhone(e.target.value)}
			/>
			<label
				htmlFor="address"
				className="block text-sm font-medium text-gray-700 mb-1 capitalize"
			>
				{t.resume_builder.labels.contact_information.address}
			</label>
			<input
				type="text"
				placeholder={t.resume_builder.labels.contact_information.address}
				className="w-full p-2 border rounded mb-2"
				value={address}
				onChange={(e) => setAddress(e.target.value)}
			/>
			<label
				htmlFor="cityPostCode"
				className="block text-sm font-medium text-gray-700 mb-1 capitalize"
			>
				{t.resume_builder.labels.contact_information.city_post_code}
			</label>
			<input
				type="text"
				placeholder={t.resume_builder.labels.contact_information.city_post_code}
				className="w-full p-2 border rounded mb-2"
				value={cityPostCode}
				onChange={(e) => setCityPostCode(e.target.value)}
			/>
			<button
				onClick={nextTabHandler}
				className="w-full bg-cyan-500 text-white p-2 rounded"
			>
				{t.resume_builder.labels.general.next}
				<GrLinkNext className="inline ml-2" />
			</button>
		</div>
	)
}
