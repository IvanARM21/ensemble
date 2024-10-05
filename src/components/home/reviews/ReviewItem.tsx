import Image from "next/image"
import { StarIcon } from "@heroicons/react/20/solid"
import { Testimonial } from "@/interfaces"

interface Props {
    testimonial: Testimonial
}

export const ReviewItem = ({testimonial} : Props) => {

    return (
    <div className="flex-col gap-5 flex my-3">
        <div className="flex items-center gap-4">
        <Image 
            className="size-20 rounded-full object-cover"
            src={testimonial.image}
            alt="" 
            width={80}
            height={80}
            sizes="80px"
            quality={60}
        />
        <div className="flex flex-col">
            <h3 className="text-gray-700">- {testimonial.author}</h3>
            <div className="flex">
                <div className="flex">
                    {testimonial.qualification > 0 && Array(testimonial.qualification).fill(null).map((_, i) => (
                        <StarIcon className="size-5 text-amber-400" key={i} />
                    ))}
                </div>
                <div className="flex">
                    {5 - testimonial.qualification > 0 && Array(5 - testimonial.qualification).fill(null).map((_, i) => (
                        <StarIcon className="size-5 text-gray-200" key={i} />
                    ))}
                </div>
            </div>
        </div>
        </div>
        <p className="italic text-gray-500 text-sm">{testimonial.text}</p>
    </div>
  )
}
