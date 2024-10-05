"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Category } from "@/interfaces";
import { CategorySlideItem } from './CategorySlideItem';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


import { FreeMode, Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
interface Props {
    categories: Category[];
}

export  const CategoriesSlide = ({categories} : Props) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, [loaded]);

    if(!loaded) return <></>

    return (
        <Swiper
            slidesPerView={1.2}
            spaceBetween={8}
            freeMode={true}
            navigation={true}
            breakpoints={{
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 8
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 8
                },
                380: {
                    slidesPerView: 2,
                    spaceBetween: 8
                },
                300: {
                    slidesPerView: 1.5,
                    spaceBetween: 8
                }

            }}
            modules={[FreeMode, Navigation]}
            className="swiper cursor-pointer mt-10"
        >
            {categories.map(category => (
                <SwiperSlide key={category.id}>
                    <CategorySlideItem category={category}/>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
  