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
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 2,
		width: "100%", // Ensures full row width
	},

	leftText: {
		width: "70%", // Adjust this based on your needs
		textAlign: "left",
	},

	rightText: {
		width: "30%", // Ensures it stays on the right
		textAlign: "right",
	},
})

export const CreativeTemplateATS = ({ resumeData }) => {
	const sectionMap = {
		[EMPLOYMENT_HISTORY]:
			resumeData.experience && resumeData.experience.length > 0 ? (
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
			) : null,

		[EDUCATION]:
			resumeData.educations && resumeData.educations.length > 0 ? (
				<View style={styles.section}>
					<Text style={styles.subHeader}>Education</Text>
					<View style={styles.divider} />
					{resumeData.educations.map((edu, index) => (
						<View key={index} style={styles.row}>
							<Text style={[styles.text, styles.leftText]}>
								{edu.institution}
							</Text>
							<Text style={[styles.text, styles.rightText]}>{edu.year}</Text>
						</View>
					))}
				</View>
			) : null,

		[SKILLS]:
			resumeData.skills && resumeData.skills.length > 0 ? (
				<View style={styles.section}>
					<Text style={styles.subHeader}>Skills</Text>
					<View style={styles.divider} />
					<Text style={styles.text}>{resumeData.skills.join(", ")}</Text>
				</View>
			) : null,
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
					{resumeData.email && (
						<Text>
							{resumeData.contact?.email || ""} |{" "}
							{resumeData.contact?.phone || ""}
						</Text>
					)}
					<Text>
						{resumeData.contact?.email || ""} |{" "}
						{resumeData.contact?.phone || ""}
					</Text>
					<Text>
						{resumeData.contact?.address || ""},{" "}
						{resumeData.contact?.cityPostCode || ""}
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

				{/* Ordered Sections - Render only if section exists */}
				{resumeData.orderedTabs.map((tab, index) =>
					sectionMap[tab] ? <View key={index}>{sectionMap[tab]}</View> : null
				)}
			</Page>
		</Document>
	)
}
