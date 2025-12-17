// app/resume-analyzer/page.tsx
"use client"

import { useState, useRef, ChangeEvent, FormEvent } from "react"
import {
	Upload,
	FileText,
	Loader,
	Star,
	CheckCircle,
	AlertCircle,
	Briefcase,
} from "lucide-react"
import { useResumeContext } from "@/contexts/useResumeContext"
import { useRouter } from "next/router"

interface AnalysisResult {
	score: number
	strengths: string[]
	suggestions: string[]
	summary: string
	aiFeedback: string
}

export default function ResumeAnalyzer() {
	const [file, setFile] = useState<File | null>(null)
	const [jobTitle, setJobTitle] = useState<string>("")
	const [isUploading, setIsUploading] = useState(false)
	const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
	const [error, setError] = useState<string>("")
	const fileInputRef = useRef<HTMLInputElement>(null)
	const { t, apiBaseUrl } = useResumeContext()
	const tAny = t as any
	const analyzer = tAny?.resume_builder?.pages.analyzer

	const router = useRouter()
	const { locale } = router

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0]
		if (selectedFile) {
			if (selectedFile.type !== "application/pdf") {
				setError("Please select a PDF file")
				return
			}
			if (selectedFile.size > 5 * 1024 * 1024) {
				setError("File size should not exceed 5MB")
				return
			}
			setFile(selectedFile)
			setError("")
			setAnalysis(null)
		}
	}

	const handleJobTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setJobTitle(e.target.value)
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		const token = localStorage.getItem("token")

		if (!file) {
			setError("Please select a PDF file first")
			return
		}

		setIsUploading(true)
		setError("")

		const formData = new FormData()
		formData.append("resume", file)

		// Add job title if provided
		if (jobTitle.trim()) {
			formData.append("jobTitle", jobTitle.trim())
		}

		formData.append("locale", locale)

		try {
			const response = await fetch(`${apiBaseUrl}/analyzer/analyze-resume`, {
				method: "POST",
				body: formData,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			if (!response.ok) {
				const errorText = await response.text()
				throw new Error(errorText)
			}

			const data = await response.json()
			setAnalysis(data.analysis)
		} catch (err: any) {
			setError(err.message || "Failed to analyze resume")
		} finally {
			setIsUploading(false)
		}
	}

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault()
		e.stopPropagation()
	}

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault()
		e.stopPropagation()

		const droppedFile = e.dataTransfer.files[0]
		if (droppedFile && droppedFile.type === "application/pdf") {
			setFile(droppedFile)
			setError("")
			setAnalysis(null)
		} else {
			setError("Please drag a valid PDF file")
		}
	}

	const renderScoreStars = (score: number) => {
		const stars = []
		const filledStars = Math.round(score / 20) // Convert 0-100 to 0-5 stars
		for (let i = 0; i < 5; i++) {
			stars.push(
				<Star
					key={i}
					className={`w-6 h-6 ${
						i < filledStars
							? "fill-yellow-400 text-yellow-400"
							: "text-gray-300"
					}`}
				/>
			)
		}
		return stars
	}

	const handleAnalyzeAnother = () => {
		setFile(null)
		setJobTitle("")
		setAnalysis(null)
		setError("")
		if (fileInputRef.current) fileInputRef.current.value = ""
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="text-center mb-12">
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
						{analyzer.header.title}
					</h1>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						{analyzer.header.description}
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Left Column - Upload and Form */}
					<div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
						<div className="flex items-center gap-3 mb-6">
							<FileText className="w-8 h-8 text-blue-600" />
							<h2 className="text-2xl font-bold text-gray-900">
								{analyzer.uploadSection.title}
							</h2>
						</div>

						<form onSubmit={handleSubmit} className="space-y-6">
							{/* Job Title Input */}
							<div className="space-y-2">
								<label className="flex items-center gap-2 text-sm font-medium text-gray-700">
									<Briefcase className="w-4 h-4" />
									{analyzer.uploadSection.form.jobTitle.label}
								</label>
								<input
									type="text"
									value={jobTitle}
									onChange={handleJobTitleChange}
									placeholder={analyzer.uploadSection.form.jobTitle.placeholder}
									className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
									disabled={isUploading}
								/>
								<p className="text-xs text-gray-500">
									{analyzer.uploadSection.form.jobTitle.helperText}
								</p>
							</div>

							{/* Drag & Drop Area */}
							<div
								className={`border-2 cursor-pointer border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
									file
										? "border-green-500 bg-green-50"
										: "border-gray-300 hover:border-blue-500 hover:bg-blue-50"
								}`}
								onDragOver={handleDragOver}
								onDrop={handleDrop}
								onClick={() => !isUploading && fileInputRef.current?.click()}
							>
								<input
									type="file"
									ref={fileInputRef}
									onChange={handleFileChange}
									accept=".pdf"
									className="hidden"
									disabled={isUploading}
								/>

								<div className="space-y-4">
									<div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
										<Upload className="w-8 h-8 text-blue-600" />
									</div>

									<div>
										<p className="font-medium text-gray-900">
											{file
												? file.name
												: analyzer.uploadSection.form.fileUpload.mainText}
										</p>
										<p className="text-sm text-gray-500 mt-2">
											{analyzer.uploadSection.form.fileUpload.secondaryText}
										</p>
									</div>

									<p className="text-xs text-gray-400">
										{analyzer.uploadSection.form.fileUpload.sizeRestriction}
									</p>
								</div>
							</div>

							{/* Error Message */}
							{error && (
								<div className="flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-lg">
									<AlertCircle className="w-5 h-5" />
									<span>{error}</span>
								</div>
							)}

							{/* Upload Button */}
							<button
								type="submit"
								disabled={!file || isUploading}
								className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3"
							>
								{isUploading ? (
									<>
										<Loader className="w-5 h-5 animate-spin" />
										{analyzer.uploadSection.form.submitButton.uploading.text}
									</>
								) : (
									<>
										<FileText className="w-5 h-5" />
										{analyzer.uploadSection.form.submitButton.default.text}
									</>
								)}
							</button>
						</form>

						{/* Instructions */}
						<div className="mt-8 p-4 bg-blue-50 rounded-xl">
							<h3 className="font-semibold text-blue-900 mb-2">
								{analyzer.uploadSection.instructions.title}
							</h3>
							<ul className="space-y-2 text-sm text-blue-800">
								{analyzer.uploadSection.instructions.items.map(
									(item, index) => (
										<li key={index} className="flex items-center gap-2">
											<CheckCircle className="w-4 h-4" />
											{item}
										</li>
									)
								)}
							</ul>
						</div>
					</div>

					{/* Right Column - Results */}
					<div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
						<div className="flex items-center gap-3 mb-6">
							<Star className="w-8 h-8 text-yellow-500" />
							<h2 className="text-2xl font-bold text-gray-900">
								{analyzer.resultsSection.title}
							</h2>
						</div>

						{analysis ? (
							<div className="space-y-8">
								{/* Score Section */}
								<div className="text-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
									<h3 className="text-lg font-semibold text-gray-700 mb-4">
										{analyzer.resultsSection.analysis.overallScore.title}
									</h3>
									<div className="flex items-center justify-center gap-4 mb-4">
										<div className="text-5xl font-bold text-gray-900">
											{analysis.score}
											{
												analyzer.resultsSection.analysis.overallScore
													.scoreSuffix
											}
										</div>
										<div className="flex">
											{renderScoreStars(analysis.score)}
										</div>
									</div>
									<p className="text-gray-600">{analysis.summary}</p>
									{jobTitle && (
										<div className="mt-4 capitalize inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm">
											<Briefcase className="w-4 h-4" />
											{jobTitle}
										</div>
									)}
								</div>

								{/* Feedback Section */}
								<div>
									<h3 className="text-xl font-bold text-gray-900 mb-4">
										{analyzer.resultsSection.analysis.aiFeedback.title}
									</h3>
									<div className="p-4 bg-gray-50 rounded-lg">
										<p className="text-gray-700 whitespace-pre-wrap">
											{analysis.aiFeedback}
										</p>
									</div>
								</div>

								{/* Strengths Section */}
								<div>
									<h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
										<CheckCircle className="w-5 h-5 text-green-500" />
										{analyzer.resultsSection.analysis.strengths.title}
									</h3>
									<ul className="space-y-3">
										{analysis.strengths.map((strength, index) => (
											<li
												key={index}
												className="flex items-start gap-3 p-3 bg-green-50 rounded-lg"
											>
												<CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
												<span className="text-gray-700">{strength}</span>
											</li>
										))}
									</ul>
								</div>

								{/* Suggestions Section */}
								<div>
									<h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
										<AlertCircle className="w-5 h-5 text-orange-500" />
										{analyzer.resultsSection.analysis.suggestions.title}
									</h3>
									<ul className="space-y-3">
										{analysis.suggestions.map((suggestion, index) => (
											<li
												key={index}
												className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg"
											>
												<AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
												<span className="text-gray-700">{suggestion}</span>
											</li>
										))}
									</ul>
								</div>

								{/* Action Buttons */}
								<div className="flex gap-4 pt-4">
									<button
										onClick={() => window.print()}
										className="flex-1 py-3 px-6 border border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
									>
										{analyzer.resultsSection.analysis.actionButtons.print}
									</button>
									<button
										onClick={handleAnalyzeAnother}
										className="flex-1 py-3 px-6 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
									>
										{
											analyzer.resultsSection.analysis.actionButtons
												.analyzeAnother
										}
									</button>
								</div>
							</div>
						) : (
							/* Empty State */
							<div className="text-center py-16">
								<div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
									<FileText className="w-10 h-10 text-gray-400" />
								</div>
								<h3 className="text-lg font-medium text-gray-900 mb-2">
									{analyzer.resultsSection.emptyState.title}
								</h3>
								<p className="text-gray-500 max-w-md mx-auto">
									{analyzer.resultsSection.emptyState.description}
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
