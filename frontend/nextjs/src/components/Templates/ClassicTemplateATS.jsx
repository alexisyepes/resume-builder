export default function ClassicTemaplateATS({
	resume,
	isPdf,
	pages,
	resumeRef,
}) {
	if (!resume) return <p>Loading resume data...</p>

	return (
		<div ref={resumeRef}>
			{pages.length > 0 ? (
				pages.map((pageContent, pageIndex) => (
					<div
						key={pageIndex}
						className={`element element3 resume-page p-10 bg-white mx-auto rounded-md
						${isPdf ? "  " : "shadow-[0_10px_30px_rgba(0,0,0,0.4)] ring-slate-200 ring-2"}`}
					>
						{pageContent.map((section, index) => (
							<div key={index}>{section}</div>
						))}
					</div>
				))
			) : (
				<p style={{ color: "red" }} className="text-red-500">
					Loading resume...
				</p>
			)}
		</div>
	)
}
