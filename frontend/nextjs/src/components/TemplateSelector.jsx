import Link from "next/link"
import { CiEdit } from "react-icons/ci"
import { IoHammerOutline } from "react-icons/io5"
import { IoHomeSharp } from "react-icons/io5"

export default function TemplateSelector({ setShowSlider, showSlider }) {
	return (
		<div className="text-white rounded-2xl ml-2 mt-2 w-11/12 max-w-4xl">
			<div className="flex items-center justify-between gap-4">
				<Link href={"/"}>
					<IoHomeSharp className="mx-4 cursor-pointer" color="teal" size={35} />
				</Link>

				<button
					onClick={() => setShowSlider(false)}
					className={`bg-gray-900 text-white text-lg font-medium w-1/2 p-3 rounded-sm transition-all duration-200 hover:bg-gray-800 ${
						!showSlider ? "ring-cyan-500 ring-8" : ""
					}`}
				>
					<CiEdit className="inline mr-2" /> Edit
				</button>
				<button
					onClick={() => setShowSlider(true)}
					className={`bg-amber-500 text-white text-lg font-medium w-1/2 p-3 rounded-sm transition-all duration-200 hover:bg-amber-600 ${
						showSlider ? "ring-cyan-500 ring-8" : ""
					}`}
				>
					<IoHammerOutline className="inline mr-2" /> Layout
				</button>
			</div>
		</div>
	)
}
