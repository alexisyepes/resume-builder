import type { CSSProperties } from "react"

import type { TemplateCommonProps } from "@/types/templates"

type MainTemplateATSProps = Pick<
	TemplateCommonProps,
	"resume" | "pages" | "resumeRef" | "template"
> & {
	isPdf?: boolean
	bg?: string
}

export default function MainTemplateATS({
	resume,
	isPdf,
	pages,
	resumeRef,
	bg,
	template,
}: MainTemplateATSProps) {
	const bgStyle: CSSProperties = bg
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
			{pages &&
				pages.length > 0 &&
				pages.map((pageContent, pageIndex) => (
					<div
						style={bgStyle}
						key={pageIndex}
						className={`element element3 resume-page p-10 mx-auto rounded-sm
						${
							isPdf
								? "bg-white"
								: "bg-white shadow-[0_10px_30px_rgba(0,0,0,0.4)] ring-slate-200 ring-2"
						} ${template === "elegant" ? "elegant-template" : ""}`}
					>
						{pageContent.map((section, index) => (
							<div key={index}>{section}</div>
						))}
					</div>
				))}
		</div>
	)
}
