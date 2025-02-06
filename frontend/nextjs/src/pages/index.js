import ResumeGenerator from "@/components/ResumeGenerator"

export default function Home() {
	return (
		<div>
			<div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
				<ResumeGenerator />
			</div>
		</div>
	)
}
