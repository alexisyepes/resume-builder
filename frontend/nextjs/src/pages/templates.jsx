import { templateDesigns } from "@/constants"
import Image from "next/image"

const ResumeTemplates = () => {
	return (
		<div className="container mx-auto p-4">
			<h2 className="text-2xl font-semibold mb-4 text-center">
				Choose from hundreds of templates
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{templateDesigns.map((template) => (
					<div
						key={template.value}
						className="flex flex-col items-center border rounded-lg bg-white p-4"
					>
						<Image
							width={210}
							height={270}
							src={template.image}
							alt={template.name}
							className="w-full h-full object-contain"
						/>
						<div className="p-3 text-center">
							<h3 className="text-lg font-medium">{template.name}</h3>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default ResumeTemplates
