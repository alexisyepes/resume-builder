export default function MainTemplateATS({
	resume,
	isPdf,
	pages,
	resumeRef,
	bg,
	template,
}) {
	const bgStyle = bg
		? {
				backgroundImage: `url(${bg})`,
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center center",
				backgroundSize: "cover",
				WebkitPrintColorAdjust: "exact",
				printColorAdjust: "exact",
		  }
		: {}

	if (!resume) return <p>Loading resume data...</p>

	return (
		<div ref={resumeRef}>
			{pages && pages.length > 0 ? (
				pages.map((pageContent, pageIndex) => (
					<div
						style={bgStyle}
						key={pageIndex}
						className={`element element3 resume-page p-10 bg-white mx-auto rounded-sm
						${
							isPdf
								? "  "
								: "shadow-[0_10px_30px_rgba(0,0,0,0.4)] ring-slate-200 ring-2"
						} ${template === "elegant" ? "elegant-template" : ""}`}
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
