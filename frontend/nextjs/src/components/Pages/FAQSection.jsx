import { useContext, useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { RESUME_CONTEXT } from "@/contexts/resumeContext"

const FAQSection = () => {
	const [openIndex, setOpenIndex] = useState(null)
	const { t } = useContext(RESUME_CONTEXT)

	const toggleFAQ = (index) => {
		setOpenIndex(openIndex === index ? null : index)
	}

	return (
		<div className="mt-20 w-1/2 mx-auto text-center">
			<h2 className="text-3xl font-bold text-gray-800">
				{t.resume_builder.pages.home.faq.title}
			</h2>
			<div className="mt-6 text-left space-y-4">
				{t.resume_builder.pages.home.faq.questions.map((q, index) => (
					<div key={index} className="border-b border-gray-300 pb-2">
						<button
							onClick={() => toggleFAQ(index)}
							className="flex justify-between items-center w-full py-3 text-lg font-semibold text-gray-800 focus:outline-none"
						>
							{q.question}
							{openIndex === index ? (
								<ChevronUp className="w-5 h-5 text-gray-600" />
							) : (
								<ChevronDown className="w-5 h-5 text-gray-600" />
							)}
						</button>
						{openIndex === index && (
							<p className="text-gray-600 mt-2 transition-opacity duration-300">
								{q.answer}
							</p>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

export default FAQSection
