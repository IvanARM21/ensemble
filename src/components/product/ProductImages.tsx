"use client";

import React, { Fragment, useState } from "react";
import { Variant } from "@/interfaces";
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
          width={1000}
          height={1000}
          quality={85}
          sizes="(min-width: 1024px) 50vw (min-width: 1520px) 870px, 100vw"
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
                  sizes="(min-width: 1024px) 25vw (min-width: 1520px) 425px, 50vw"
                  quality={70}
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
