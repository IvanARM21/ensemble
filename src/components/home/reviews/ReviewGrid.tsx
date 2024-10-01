"use client";

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';


import { FreeMode } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { ReviewItem } from './ReviewItem';
import { testiomonials } from '@/seed';


export const ReviewGrid = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true)
    }, [loaded]);

    if(!loaded) return <></>

    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={16}
            slidesPerGroup={1}
            freeMode={true}
            breakpoints={{
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 16
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 16
                },
                480: {
                    slidesPerView: 2,
                    spaceBetween: 16
                }

            }}
            modules={[FreeMode]}
            className="swiper cursor-pointer mt-10"
        >
            {testiomonials.map(testimonal => (
                <SwiperSlide key={testimonal.author}>
                    <ReviewItem testimonial={testimonal} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
  