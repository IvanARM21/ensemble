import Image from "next/image";
import clsx from "clsx";
import { useCategoryStore } from "@/store"
import { StepHeader } from "../StepHeader"
import { ImageSource } from "@/components";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { convertToBase64Str } from "@/utils";

export const CategoryPreview = () => {

  const { category, setStep, currentStep, steps } = useCategoryStore();

  const [image, setImage] = useState("");

  useEffect(() => {
    convertImage();
  }, [image]);

  const convertImage = async () => {
    if(!image.length) {
        const base64Str = await convertToBase64Str(category.image);
        if(base64Str) setImage(base64Str);
    }
  }

  return (
    <>
        <StepHeader title="Preview category" description="Here we show the category information, including its title and image."/>
        <div className={clsx("relative overflow-hidden rounded-lg h-[400px] lg:h-[500px] max-w-[400px] shadow-md", {
            "hover:opacity-80 transition-opacity group": category.image,
        })}>
            {category.image ? (
                <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30" />
                    <ImageSource 
                        width={400}
                        height={600}
                        quality={90}
                        src={image}
                        alt="Imagen preview"
                        className="w-full h-full object-cover"
                    />
                </>
            ) : 
                <div className="w-full h-full bg-black flex flex-col gap-2 justify-center items-center z-20">
                    <p className="text-gray-300">You did not select image</p>
                    <button 
                        type="button"
                        onClick={() => setStep(steps[currentStep.numStep-2])}
                        className="text-blue-500"
                    >add one here</button>
                </div>
            }
            <p className="absolute top-2 right-5 text-lg capitalize text-white px-1">{category.gender}</p>
            <div className="absolute bottom-2 left-5 text-white z-20">
                <p className="flex gap-2 items-center text-gray-100">Shop the collection <ArrowRightIcon className="size-5 rounded-full transition-all duration-500 group-hover:scale-110 group-hover:translate-x-3" /></p>
                <h3 className="font-medium">{category.label}</h3>
            </div>
        </div>
    </>
  )
}
