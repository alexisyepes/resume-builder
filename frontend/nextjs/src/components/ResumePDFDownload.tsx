import { PDFDownloadLink } from "@react-pdf/renderer"

import type { ResumeSnapshot } from "@/types/resume"
import ResumePDF from "./ResumePDF"

type ResumePDFDownloadProps = {
	resumeData: ResumeSnapshot
}

const ResumePDFDownload = ({ resumeData }: ResumePDFDownloadProps) => (
	<PDFDownloadLink
		document={<ResumePDF resumeData={resumeData} />}
		fileName={`resume.pdf`}
		className="bg-green-500 text-white p-2 rounded"
	>
		{({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
	</PDFDownloadLink>
)

export default ResumePDFDownload
