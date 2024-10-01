import { useVariantStore } from "@/store";
import { PhotoIcon } from "@heroicons/react/24/outline";
import clsx from "clsx"
import { useState } from "react";

export const ModalVariantImages = () => {

    const { variant, setVariant } = useVariantStore();
    const [dragEnter, setDragEnter] = useState(false);

    const onDropImage = async (event: React.DragEvent<HTMLInputElement>) => {
        const files = event.dataTransfer.files;
        if(!files.length) return;
        setVariant({...variant, images: [...variant.images, ...files]});
    }
    const onChangeImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.currentTarget.files;
        if(!files?.length) return;
        setVariant({...variant, images: [...variant.images, ...files]});
    }

  return (
    <div className="flex flex-col gap-2 ">
        <div className="flex justify-between flex-col sm:flex-row">
            <label htmlFor="image-variant" className="text-gray-800 leading-6 font-medium">Images variant</label>
            {variant.images.length ? <p className="text-blue-600">You have selected an image</p> : <p className="text-gray-500 text-sm">You have not yet selected image</p>}
        </div>
        <div className={clsx("w-full h-40 border border-dashed border-gray-900/25 rounded-xl px-6 py-10 flex justify-center items-center relative transition-colors duration-300", {
            "border-blue-500": dragEnter
        })}>
            <div className="text-center flex justify-center flex-col items-center gap-2">
                <PhotoIcon className="size-12 text-gray-300" />
                <p className="flex justify-center items-center gap-2">
                    <span className="text-blue-600 font-medium">Upload a files</span>
                    <span className="text-gray-500 ">or drag and drop</span>
                </p>
                <p className="text-gray-500 text-sm">PNG, JPG, up to 10MB</p>
            </div>
            <input 
                type="file" 
                id="image-variant"
                className=" absolute inset-0  opacity-0"
                onDragEnter={() => setDragEnter(true)}
                onDragLeave={() => setDragEnter(false)}
                onChange={onChangeImage}
                onDrop={onDropImage}
                multiple={true}
            />
        </div>
    </div>
  )
}
