import { CONTACT_INFORMATION } from "@/constants"
import { CiEdit } from "react-icons/ci"

export default function ContactInput({
	email = "",
	phone = "",
	address = "",
	cityPostCode = "",
	setEmail,
	setPhone,
	setAddress,
	setCityPostCode,
	nextTabHandler,
}) {
	return (
		<div className="w-full p-2">
			<div className="flex justify-between border-b-2 mb-2">
				<h2 className="text-xl mb-2 font-bold">{CONTACT_INFORMATION}</h2>
				<CiEdit size={24} />
			</div>
			<input
				type="email"
				placeholder="Email"
				className="w-full p-2 border rounded mb-2"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Phone"
				className="w-full p-2 border rounded mb-2"
				value={phone}
				onChange={(e) => setPhone(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Address"
				className="w-full p-2 border rounded mb-2"
				value={address}
				onChange={(e) => setAddress(e.target.value)}
			/>
			<input
				type="text"
				placeholder="City, State/Province and Postal Code"
				className="w-full p-2 border rounded mb-2"
				value={cityPostCode}
				onChange={(e) => setCityPostCode(e.target.value)}
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
