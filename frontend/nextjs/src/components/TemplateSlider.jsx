import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Pagination } from "swiper/modules"

const sections = [
	// {
	// 	name: "Classic",
	// 	value: "classic",
	// 	image: "/images/templateDesigns/classic.png",
	// },
	{
		name: "Classic - ATS",
		value: "classic-ats",
		image: "/images/templateDesigns/classic.png",
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

export default function TemplateSlider({ setTemplate, template }) {
	return (
		<Swiper
			slidesPerView={3.5}
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
			className="w-full mt-4"
		>
			{sections.map((section) => (
				<SwiperSlide key={section.name}>
					<div
						className={`flex h-[30rem] flex-col items-center cursor-pointer`}
						onClick={() => setTemplate(section.value)}
					>
						<img
							src={section.image}
							alt={section.name}
							className={`${
								template === section.value
									? "shadow-lg shadow-green-400 border-4 border-green-400"
									: ""
							} w-full shadow-slate-500 shadow-lg h-auto object-cover rounded-lg`}
						/>
						<h2
							className={`${
								template === section.value
									? "ring-2 rounded-sm p-2 ring-green-400"
									: ""
							} mt-4 font-bold text-white text-center text-lg`}
						>
							{section.name}
						</h2>
					</div>
				</SwiperSlide>
			))}
		</Swiper>
	)
}
