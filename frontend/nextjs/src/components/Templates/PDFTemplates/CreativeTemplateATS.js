import {
	EMPLOYMENT_HISTORY,
	EDUCATION,
	SKILLS,
	CERTIFICATIONS,
	REFERENCES,
	LINKS,
	HOBBIES,
	CUSTOM_SECTION,
} from "@/constants"
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer"

const styles = StyleSheet.create({
	page: { padding: 40, fontSize: 11, fontFamily: "Helvetica" },
	headerContainer: {
		backgroundColor: "#4F46E5",
		padding: 15,
		borderRadius: 5,
		textAlign: "center",
		color: "#fff",
		marginBottom: 10,
	},
	headerText: { fontSize: 20, fontWeight: "bold" },
	text: { fontSize: 11, marginBottom: 2 },
	section: { marginBottom: 16 },
	subHeader: { fontSize: 12, fontWeight: "bold", marginBottom: 4 },
	divider: {
		marginBottom: 4,
		borderBottomWidth: 1,
		borderBottomColor: "#000",
	},
})

export const CreativeTemplateATS = ({ resumeData }) => {
	const sectionMap = {
		[EMPLOYMENT_HISTORY]: (
			<View style={styles.section}>
				<Text style={styles.subHeader}>Work Experience</Text>
				<View style={styles.divider} />
				{resumeData.experience.map((exp, index) => (
					<View key={index}>
						<Text style={[styles.text, { fontWeight: "bold" }]}>
							{exp.role} - {exp.project} ({exp.year})
						</Text>
						{exp.responsibilities?.map((task, i) => (
							<Text key={i} style={styles.text}>
								• {task}
							</Text>
						))}
					</View>
				))}
			</View>
		),
		[EDUCATION]: (
			<View style={styles.section}>
				<Text style={styles.subHeader}>Education</Text>
				<View style={styles.divider} />
				{resumeData.educations.map((edu, index) => (
					<Text key={index} style={styles.text}>
						{edu.degree} - {edu.institution} ({edu.year})
					</Text>
				))}
			</View>
		),
		[SKILLS]: (
			<View style={styles.section}>
				<Text style={styles.subHeader}>Skills</Text>
				<View style={styles.divider} />
				<Text style={styles.text}>{resumeData.skills.join(", ")}</Text>
			</View>
		),
	}

	return (
		<Document>
			<Page size="LETTER" style={styles.page}>
				{/* Header */}
				<View style={styles.headerContainer}>
					<Text style={styles.headerText}>
						{resumeData.firstName} {resumeData.lastName}
					</Text>
					<Text>{resumeData.jobTitle}</Text>
					<Text>
						{resumeData.contact.email} | {resumeData.contact.phone}
					</Text>
					<Text>
						{resumeData.contact.address}, {resumeData.contact.cityPostCode}
					</Text>
				</View>

				{/* Objective */}
				{resumeData.objective && (
					<View style={styles.section}>
						<Text style={styles.subHeader}>Objective</Text>
						<View style={styles.divider} />
						<Text style={styles.text}>{resumeData.objective}</Text>
					</View>
				)}

				{/* Ordered Sections */}
				{resumeData.orderedTabs.map((tab, index) => (
					<View key={index}>{sectionMap[tab]}</View>
				))}
			</Page>
		</Document>
	)
}
