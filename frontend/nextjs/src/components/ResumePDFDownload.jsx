import { PDFDownloadLink } from "@react-pdf/renderer"
import ResumePDF from "./ResumePDF"

const ResumePDFDownload = ({ resumeData }) => (
	<PDFDownloadLink
		document={<ResumePDF resumeData={resumeData} />}
		fileName={`resume.pdf`}
		className="bg-green-500 text-white p-2 rounded"
	>
		{({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
	</PDFDownloadLink>
)

export default ResumePDFDownload
