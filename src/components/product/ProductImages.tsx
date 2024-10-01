"use client";

import { Fragment, useState } from "react";
import { Variant } from "@/interfaces";
import { ImageSource } from "../ui/image/ImageSource";
import { ImageModal } from "./ImageModal";
import { ImageClick } from "../ui/image/ImageClick";

interface Props {
    variantUi: Variant;
}

export const ProductImages = ({  variantUi }: Props) => {

  const [modal, setModal] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);

  return (
    <>
      <div className="lg:col-span-7">
        <ImageClick 
          src={variantUi.images[0].url}
          width={900}
          height={900}
          quality={100}
          sizes="(min-width: 1024px) 66.6vw (min-width: 1520px) 1000px, 100vw"
          alt={`Image of variant ${variantUi.name} num 1`}
          className="rounded-lg w-full shadow-md"
          onClick={() => {
            setModal(true);
            setInitialSlide(0);
          }}
        />
        
        <div className="grid grid-cols-2 mt-2 lg:mt-5 gap-2 lg:gap-5">
          {variantUi.images.map((image, i) => (
            <Fragment key={`${image}-${i}`}>
              {i > 0 && (
                <ImageClick 
                  src={image.url}
                  width={500}
                  height={500}
                  alt={`Image of variant ${variantUi.name} num ${i}`}
                  sizes="100vw"
                  quality={80}
                  className="rounded-lg w-full shadow-md"
                  onClick={() => {
                    setModal(true);
                    setInitialSlide(i);
                  }}
                />
              )}
            </Fragment>
          ))}
        </div>
      </div>
      {modal && (
        <ImageModal imagesUrl={variantUi.images.map((image) => image.url)} name={variantUi.name} setModal={setModal} initialSlide={initialSlide}/>
      )}
    </>
  );
};
