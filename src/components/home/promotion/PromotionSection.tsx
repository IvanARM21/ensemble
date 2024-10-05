import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const PromotionSection = () => {
  return (
    <div className="bg-slate-700 h-[550px] rounded-lg overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-gray-900/10" />
        <div className="flex flex-col gap-8 h-full justify-center items-center text-center relative z-10">
          <div>
              <h2 className="text-white text-4xl font-semibold mb-2">
              Discounts here
              </h2>
              <p className="sm:text-xl lg:text-2xl text-white w-full px-2 max-w-4xl">
              Make your desk beautiful and organized. Post a picture to social media and watch it get more likes than life-changing announcements. Reflect on the shallow nature of existence. At least you have a really nice desk setup.
              </p>
          </div>
          <Link 
              href={"/all-discounts"} 
              className="bg-white text-gray-800 text-xl py-3 px-8 rounded-xl font-medium shadow-sm shadow-white hover:bg-gray-100 duration-300 transition-colors"
          >
              Browse discounts
          </Link>
        </div>
        <Image
          className="h-full object-cover w-full absolute inset-0 opacity-30"
          src="https://images.pexels.com/photos/5625112/pexels-photo-5625112.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"
          alt="Discount Background"
          width={1000}
          height={1000}
          sizes="(min-width: 1536px) 1400px, 80vw"
          quality={70}
        />
    </div>
  )
}
