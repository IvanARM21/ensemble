"use client";

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Keyboard, Pagination, Navigation } from 'swiper/modules';
import { ImageClick } from "../ui/image/ImageClick";
import { ImageSource } from '../ui/image/ImageSource';

// Import required modules

interface Props {
    imagesUrl: string[];
    name: string;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    initialSlide: number;
}

export const ImageModal = ({ imagesUrl, name, setModal, initialSlide}: Props) => {
    return (
        <div className="fixed inset-0 z-30 fade-in flex justify-center items-center bg-white" onClick={(e) => {
            if(e.target === e.currentTarget) {
                setModal(false);
            }
        }}>
            <Swiper
                initialSlide={initialSlide}
                slidesPerView={1}
                spaceBetween={30}
                keyboard={{
                    enabled: true,
                }}
                pagination={{
                    type: 'bullets',
                    clickable: true,
                }}
                navigation={true}
                modules={[Keyboard, Pagination, Navigation]}
                className= "mySwiper w-full h-full"
                onClick={() => setModal(false)}
            >
                {imagesUrl.map(url => (
                    <SwiperSlide 
                        key={url} 
                        >
                        <ImageSource
                            src={url}
                            width={1000}
                            height={1000}
                            alt={`Image of variant ${name}`}
                            sizes="(min-width: 1024px) 100vh, 100vw"
                            quality={100}
                            className="rounded-lg w-auto mx-auto h-full object-contain"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
           
        </div>
    );
};
