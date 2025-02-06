import { MdOutlineDeleteOutline } from "react-icons/md"

export default function TabSelector({
	activeTab,
	onTabChange,
	tabs,
	removeTabHandler,
}) {
	return (
		<div className="w-full sm:w-1/5 bg-white p-4 border rounded-lg shadow-md">
			<ul className="space-y-2">
				{tabs.map((tab, index) => (
					<li
						className={`${
							activeTab === tab
								? "bg-blue-500 text-white"
								: "bg-blue-100 text-gray-700 hover:bg-blue-100"
						} flex justify-between items-center rounded-lg`}
						key={index}
					>
						<button
							className={`w-full text-left px-4 py-2  `}
							onClick={() => onTabChange(tab)}
						>
							{tab}
						</button>
						<MdOutlineDeleteOutline
							onClick={() => removeTabHandler(index)}
							size={20}
							className="mr-2"
						/>
					</li>
				))}
			</ul>
		</div>
	)
}
