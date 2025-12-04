export const uploadPdfDirectToCloudinary = async (
	pdfBuffer,
	userId,
	fileName
) => {
	try {
		const cloudName = process.env.CLOUDINARY_CLOUD_NAME
		const uploadPreset =
			process.env.CLOUDINARY_UPLOAD_FILES_PRESET || "ml_default"

		if (!cloudName) {
			console.warn("Cloudinary cloud name not set")
			return null
		}

		console.log("Direct upload to Cloudinary...")

		// Crear FormData
		const formData = new FormData()

		// Crear Blob desde buffer
		const blob = new Blob([pdfBuffer], { type: "application/pdf" })

		formData.append("file", blob, fileName)
		formData.append("upload_preset", uploadPreset)
		formData.append("resource_type", "raw")
		formData.append("folder", "resume-pdfs")
		formData.append("public_id", `resume_${userId}_${Date.now()}`)
		formData.append("tags", `resume,pdf,user_${userId}`)

		// Upload
		const response = await fetch(
			`https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
			{
				method: "POST",
				body: formData,
			}
		)

		const data = await response.json()

		if (data.error) {
			console.error("Cloudinary API error:", data.error.message)
			return null
		}

		console.log("✅ Direct upload successful:", data.secure_url)
		return data.secure_url
	} catch (error) {
		console.error("❌ Direct upload error:", error)
		return null
	}
}
