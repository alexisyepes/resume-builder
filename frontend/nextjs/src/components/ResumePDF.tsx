import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer"

import type { ResumeSnapshot } from "@/types/resume"

const styles = StyleSheet.create({
	page: { padding: 30, fontSize: 12 },
	section: { marginBottom: 10 },
	header: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
	text: { marginBottom: 3 },
})

type ResumePDFProps = {
	resumeData: ResumeSnapshot
}

const ResumePDF = ({ resumeData }: ResumePDFProps) => (
	<Document>
		<Page size="A4" style={styles.page}>
			<View style={styles.section}>
				<Text>Section #1</Text>
			</View>
			<View style={styles.section}>
				<Text>Section #2</Text>
			</View>
		</Page>
	</Document>
	// <Document>
	// 	<Page size="A4" style={styles.page}>
	// 		<View style={styles.section}>
	// 			<Text style={styles.header}>
	// 				{resumeData.firstName} {resumeData.lastName}
	// 			</Text>
	// 			<Text style={styles.text}>Email: {resumeData.email}</Text>
	// 			<Text style={styles.text}>Phone: {resumeData.phone}</Text>
	// 			<Text style={styles.text}>Job Title: {resumeData.jobTitle}</Text>
	// 		</View>

	// 		<View style={styles.section}>
	// 			<Text style={styles.header}>Experience</Text>
	// 			{resumeData.experience?.map((exp, index) => (
	// 				<View key={index}>
	// 					<Text style={styles.text}>
	// 						{exp.company} - {exp.role} ({exp.year})
	// 					</Text>
	// 				</View>
	// 			))}
	// 		</View>
	// 	</Page>
	// </Document>
)

export default ResumePDF
