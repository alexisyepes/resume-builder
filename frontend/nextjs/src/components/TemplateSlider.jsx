import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import { Navigation } from "swiper/modules"
import { useContext } from "react"
import { RESUME_CONTEXT } from "@/contexts/resumeContext"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

export default function TemplateSlider({
	setTemplate,
	template,
	templateDesigns,
}) {
	const { setShowSlider } = useContext(RESUME_CONTEXT)

	return (
		<div className="relative w-full mt-4 pb-10">
			{/* Custom Left Arrow */}
			<button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg swiper-button-prev">
				<FaChevronLeft className="text-gray-600 text-2xl" />
			</button>

			{/* Custom Right Arrow */}
			<button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg swiper-button-next">
				<FaChevronRight className="text-gray-600 text-2xl" />
			</button>

			<Swiper
				slidesPerView={"auto"}
				spaceBetween={10}
				modules={[Navigation]}
				navigation={{
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
				}}
				loop
			>
				{templateDesigns.map((section) => (
					<SwiperSlide key={section.name} className="!w-[18rem]">
						<div
							className="flex h-[26rem] w-full flex-col items-center cursor-pointer"
							onClick={() => {
								setTemplate(section.value)
								setShowSlider(false)
							}}
						>
							<div className="w-full h-[22rem] overflow-hidden rounded-lg">
								<img
									src={section.image}
									alt={section.name}
									className={`${
										template === section.value
											? "shadow-lg shadow-green-400 border-4 border-green-400"
											: ""
									} w-full h-full shadow-slate-500 shadow-lg object-cover`}
								/>
							</div>

							<h2
								className={`${
									template === section.value
										? "rounded-md p-2 border-4 border-green-400"
										: "border-slate-600"
								} mt-4 font-bold capitalize p-2 rounded-md border text-black text-center text-lg`}
							>
								{section.name}
							</h2>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}
