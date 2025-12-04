export interface CloudinaryUploadResult {
	url: string
	publicId: string
	width: number
	height: number
	bytes: number
	format: string
	originalFilename: string
	signature?: string
	version?: number
}

export interface CloudinaryUploadOptions {
	folder?: string
	publicId?: string
	transformation?: string
	tags?: string[]
}
