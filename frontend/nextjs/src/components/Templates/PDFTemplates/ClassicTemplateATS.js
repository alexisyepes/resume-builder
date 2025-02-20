import {
	EMPLOYMENT_HISTORY,
	EDUCATION,
	SKILLS,
	CERTIFICATIONS,
	REFERENCES,
	LINKS,
	HOBBIES,
	CUSTOM_SECTION,
	LANGUAGES,
} from "@/constants"
import { capitalizeEachWord } from "@/utils"
import {
	Page,
	Text,
	View,
	Image,
	Document,
	StyleSheet,
	Font,
} from "@react-pdf/renderer"
import Html from "react-pdf-html"

Font.register({
	family: "Helvetica-Bold",
	src: "https://fonts.gstatic.com/s/helveticaneue/v15/PPMyr4jALZV4TPOZ6lIYDp9QGJmSaD8W.ttf",
})

const renderRichText = (htmlContent, customFontSize) => (
	<Html style={{ fontSize: customFontSize, marginLeft: 0, paddingLeft: 0 }}>
		{htmlContent}
	</Html>
)

const styles = StyleSheet.create({
	page: { padding: 30, fontSize: 11, fontFamily: "Helvetica" },
	section: { marginBottom: 16 },
	header: {
		fontSize: 18,
		fontFamily: "Helvetica-Bold",
		textAlign: "center",
		marginBottom: 4,
	},
	subHeader: { fontSize: 14, fontFamily: "Helvetica-Bold", marginBottom: 4 },
	text: { fontSize: 11, marginTop: 2, color: "#717782", lineHeight: 1.2 },
	bulletPoint: {
		fontSize: 11,
		marginTop: 4,
		marginLeft: 1,
		textAlign: "left",
		color: "#717782",
	},
	divider: { marginBottom: 4, borderBottomWidth: 1, borderBottomColor: "#000" },
	paragraph: {
		fontSize: 11,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		marginBottom: 2,
	},
	leftText: { textAlign: "left" },
	rightText: { textAlign: "right" },
	ul: { marginLeft: 1 },
	li: { fontSize: 10 },
})

export const ClassicTemplateATS = ({ resumeData, photo }) => {
	console.log(resumeData)
	const sectionMap = {
		[EMPLOYMENT_HISTORY]: (
			<View style={styles.section}>
				{resumeData.experience.length && (
					<View>
						<Text style={styles.subHeader}>Employment History</Text>
						<View style={styles.divider} />
						{resumeData.experience.map((exp, index) => (
							<View key={index}>
								<View style={[styles.row]}>
									<Text
										style={[styles.text, styles.leftText, { color: "black" }]}
									>
										{capitalizeEachWord(exp.company)} -{" "}
										{capitalizeEachWord(exp.role)}
									</Text>
									<Text
										style={[styles.text, styles.rightText, { color: "black" }]}
									>
										{exp.year}
									</Text>
								</View>
								{exp.responsibilities?.length > 0 && (
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
				)}
			</View>
		),
		[EDUCATION]: (
			<View style={styles.section}>
				{resumeData.educations.length && (
					<View>
						<Text style={styles.subHeader}>Education</Text>
						<View style={styles.divider} />
						{resumeData.educations.map((edu, index) => (
							<View key={index} style={styles.row}>
								<Text
									style={[styles.text, styles.leftText, { color: "black" }]}
								>
									{capitalizeEachWord(edu.degree)}{" "}
									{edu.degree && edu.institution && "-"}{" "}
									{capitalizeEachWord(edu.institution)}
								</Text>
								<Text
									style={[styles.text, styles.rightText, { color: "black" }]}
								>
									{edu.year}
								</Text>
							</View>
						))}
					</View>
				)}
			</View>
		),
		[SKILLS]: (
			<View style={styles.section}>
				{resumeData.skills.length && (
					<View>
						<Text style={styles.subHeader}>Skills</Text>
						<View style={styles.divider} />
						<Text style={{ color: "#717782" }}>
							{resumeData.skills.map(capitalizeEachWord).join(", ")}
						</Text>
					</View>
				)}
			</View>
		),
		[CERTIFICATIONS]: (
			<View style={styles.section}>
				<Text style={styles.subHeader}>Certifications</Text>
				<View style={styles.divider} />
				{resumeData.certifications.map((cert, index) => (
					<View key={index} style={styles.row}>
						<Text style={[styles.text, styles.leftText]}>
							{cert.institution}
						</Text>
						<Text style={[styles.text, styles.rightText]}>{cert.year}</Text>
					</View>
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
						• {capitalizeEachWord(link.name)}: {link.link}
					</Text>
				))}
			</View>
		),
		[LANGUAGES]: (
			<View style={styles.section}>
				<Text style={styles.subHeader}>Languages</Text>
				<View style={styles.divider} />
				<Text style={styles.text}>
					{resumeData.languages.map((language) => language.language).join(", ")}
				</Text>
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
		[CUSTOM_SECTION]: resumeData.customSections.map((section, index) => (
			<View key={index} style={styles.section}>
				<Text style={styles.subHeader}>{section.header}</Text>
				{section.subHeader && (
					<Text style={[styles.text, { marginTop: 5, color: "black" }]}>
						{section.subHeader}
					</Text>
				)}
				{console.log(section.content)}
				{section.content && (
					<Text style={[{ marginTop: 5, marginLeft: 0, color: "#717782" }]}>
						{renderRichText(section.content, 10)}
					</Text>
				)}
			</View>
		)),
	}

	return (
		<Document>
			<Page size="LETTER" style={styles.page}>
				<View style={{ textAlign: "center", marginBottom: 20 }}>
					{photo && (
						<View style={{ alignItems: "center", marginBottom: 10 }}>
							<Image
								src={photo}
								style={{ width: 80, height: 80, borderRadius: 40 }}
							/>
						</View>
					)}
					<Text style={styles.header}>
						{capitalizeEachWord(resumeData.firstName)}{" "}
						{capitalizeEachWord(resumeData.lastName)}
					</Text>
					<Text style={styles.subHeader}>
						{capitalizeEachWord(resumeData.jobTitle)}
					</Text>
					{(resumeData.email || resumeData.phone) && (
						<Text style={{ color: "#717782" }}>
							{resumeData.email || ""}{" "}
							{resumeData.email && resumeData.phone && "|"}{" "}
							{resumeData.phone || ""}
						</Text>
					)}

					{(resumeData.address || resumeData.cityPostCode) && (
						<Text style={{ marginTop: 3, color: "#717782" }}>
							{resumeData.address || ""}
							{resumeData.address && resumeData.cityPostCode && ","}{" "}
							{resumeData.cityPostCode || ""}
						</Text>
					)}
				</View>
				{/* Objective */}
				{resumeData.objective && (
					<View style={styles.section}>
						<Text style={styles.subHeader}>Summary</Text>
						<View style={styles.divider} />
						<Text style={styles.text}>
							{renderRichText(resumeData.objective, 11)}
						</Text>
					</View>
				)}
				{resumeData.orderedTabs.map((tab, index) => (
					<View key={index}>{sectionMap[tab]}</View>
				))}
			</Page>
		</Document>
	)
}
