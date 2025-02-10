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
import {
	Page,
	Text,
	View,
	Document,
	StyleSheet,
	Image,
} from "@react-pdf/renderer"

const styles = StyleSheet.create({
	page: { padding: 40, fontSize: 11, fontFamily: "Helvetica" },
	section: { marginBottom: 16 },
	header: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 6,
	},
	subHeader: { fontSize: 12, fontWeight: "bold", marginBottom: 4 },
	text: { fontSize: 11, marginBottom: 2 },
	bulletPoint: { fontSize: 11, marginLeft: 10, textAlign: "left" },
	divider: {
		marginBottom: 4,
		borderBottomWidth: 1,
		borderBottomColor: "#000",
	},
})

export const ClassicTemplateATS = ({ resumeData }) => {
	const sectionMap = {
		[EMPLOYMENT_HISTORY]: (
			<View style={styles.section}>
				<Text style={styles.subHeader}>Employment History</Text>
				<View style={styles.divider} />
				{resumeData.experience.map((exp, index) => (
					<View key={index} style={{ marginBottom: 8 }}>
						<Text style={[styles.text, { fontWeight: "bold" }]}>
							{exp.company} - {exp.role} ({exp.year})
						</Text>
						{exp.responsibilities && exp.responsibilities.length > 0 && (
							<View>
								{exp.responsibilities.map((task, i) => (
									<Text key={i} style={styles.bulletPoint}>
										• {task}
									</Text>
								))}
							</View>
						)}
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
		[CERTIFICATIONS]: (
			<View style={styles.section}>
				<Text style={styles.subHeader}>Certifications</Text>
				<View style={styles.divider} />
				{resumeData.certifications.map((cert, index) => (
					<Text key={index} style={styles.text}>
						{cert.institution} ({cert.year})
					</Text>
				))}
			</View>
		),
		[REFERENCES]: (
			<View style={styles.section}>
				<Text style={styles.subHeader}>References</Text>
				<View style={styles.divider} />
				{resumeData.references.map((reference, index) => (
					<Text key={index} style={styles.text}>
						{reference.name}, {reference.company} - {reference.email_phone}
					</Text>
				))}
			</View>
		),
		[LINKS]: (
			<View style={styles.section}>
				<Text style={styles.subHeader}>Links</Text>
				<View style={styles.divider} />
				{resumeData.links.map((link, index) => (
					<Text key={index} style={styles.text}>
						{link.name}: {link.link}
					</Text>
				))}
			</View>
		),
		[HOBBIES]: (
			<View style={styles.section}>
				<Text style={styles.subHeader}>Hobbies</Text>
				<Text style={styles.text}>
					{resumeData.hobbies.map((hobby) => hobby.hobbies).join(", ")}
				</Text>
			</View>
		),
		[CUSTOM_SECTION]: (
			<View style={styles.section}>
				{resumeData.customSections.map((section, index) => (
					<View key={index}>
						<Text style={styles.subHeader}>{section.header}</Text>
						{section.subHeader && (
							<Text style={styles.text}>{section.subHeader}</Text>
						)}
						{section.content && (
							<Text style={styles.text}>{section.content}</Text>
						)}
					</View>
				))}
			</View>
		),
	}

	return (
		<Document>
			<Page size="LETTER" style={styles.page}>
				{/* Header */}
				<View style={{ textAlign: "center", marginBottom: 20 }}>
					<Text style={styles.header}>
						{resumeData.firstName} {resumeData.lastName}
					</Text>
					<Text style={styles.text}>{resumeData.jobTitle}</Text>
					<Text style={styles.text}>
						{resumeData.contact.email} | {resumeData.contact.phone}
					</Text>
					<Text style={styles.text}>
						{resumeData.contact.address}, {resumeData.contact.cityPostCode}
					</Text>
				</View>

				{/* Objective */}
				{resumeData.objective && (
					<View style={styles.section}>
						<Text style={styles.subHeader}>Summary</Text>
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
