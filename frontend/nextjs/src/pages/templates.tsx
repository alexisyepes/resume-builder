import { useResumeContext } from "@/contexts/useResumeContext"

const ResumeTemplates = () => {
	const { t, templateDesigns } = useResumeContext()

	return (
		<div className="mx-auto p-4 pt-16">
			<h2 className="text-2xl font-semibold mb-4 text-center">
				{t.resume_builder.pages.templates.choose_from_many}
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{templateDesigns.map((section) => (
					<div
						key={section.value}
						className="flex h-[26rem] w-full flex-col items-center"
					>
						<div className="h-[22rem] overflow-hidden rounded-lg">
							<img
								src={section.image}
								alt={section.name}
								className={` w-full h-full shadow-slate-500 shadow-lg object-cover`}
							/>
						</div>

						<h2
							className={` mt-4 font-bold capitalize p-2 rounded-md border text-black text-center text-lg`}
						>
							{section.name}
						</h2>
					</div>
				))}
			</div>
		</div>
	)
}

export default ResumeTemplates
