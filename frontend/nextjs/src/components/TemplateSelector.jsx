import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Pagination } from "swiper/modules"

const sections = [
	{
		name: "Classic",
		value: "classic",
		image: "/images/templateDesigns/classic.png",
	},
	{
		name: "Classic - ATS",
		value: "classic-ats",
		image: "/images/templateDesigns/classic-ats.png",
	},
	{
		name: "Elegant",
		value: "elegant",
		image: "/images/templateDesigns/elegant.png",
	},
	{
		name: "Modern",
		value: "modern",
		image: "/images/templateDesigns/modern.png",
	},
	{
		name: "Creative - ATS",
		value: "creative-ats",
		image: "/images/creative-ats.png",
	},
]

export default function TemplateSelector({ setTemplate, handleDownloadPDF }) {
	return (
		<div className="fixed text-white z-50 bottom-4 left-[30%] transform -translate-x-1/2 bg-slate-700 shadow-lg p-4 rounded-xl w-11/12 max-w-4xl">
			<div className="flex justify-between items-center mb-2">
				<button
					onClick={handleDownloadPDF}
					className="bg-slate-800 text-white p-2 rounded"
				>
					Download File
				</button>
			</div>
			<Swiper
				slidesPerView={3}
				spaceBetween={10}
				pagination={{ clickable: true }}
				modules={[Pagination]}
				style={{
					"--swiper-pagination-color": "#FFBA08",
					"--swiper-pagination-bullet-inactive-color": "#999999",
					"--swiper-pagination-bullet-inactive-opacity": "1",
					"--swiper-pagination-bullet-size": "16px",
					"--swiper-pagination-bullet-horizontal-gap": "6px",
				}}
			>
				{sections.map((section) => (
					<SwiperSlide key={section.name}>
						<div
							className="flex h-[30rem] flex-col items-center cursor-pointer"
							onClick={() => setTemplate(section.value)}
						>
							<img
								src={section.image}
								alt={section.name}
								className="w-full h-auto object-cover rounded-lg"
							/>

							<h2 className="mt-2 text-center text-lg font-medium">
								{section.name}
							</h2>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}
