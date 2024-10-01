import { useRef, useState } from 'react';
import clsx from 'clsx';
import { InformationCircleIcon } from '@heroicons/react/20/solid';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { useCategoryStore } from '@/store'
import { convertToBase64Str, createSlug } from '@/utils';
import { types, genders } from '@/constants';
import { Alert, Select, SelectValue, Tooltip, SelectTrigger, SelectContent, SelectItem, ImageSource } from '@/components';
import { CategoryType, Gender } from '@/interfaces';
import { StepHeader } from '../StepHeader';

export const CategoryForm = () => {

  const { setCategory, category, alert, onChange, type } = useCategoryStore();   
  const [dragEnter, setDragEnter] = useState(false);
  const inputSlug = useRef<HTMLInputElement>(null);

  const generateSlug = (e : React.ChangeEvent<HTMLInputElement>) => {
    const categoryName = e.currentTarget.value;
    const slug = createSlug(categoryName);
    setCategory({
        ...category,
        slug: slug
    });

    onChange(e);
  }
  const onDropImage = async (event: React.DragEvent<HTMLInputElement>) => {
    const image = event.dataTransfer.files[0];
    if(!image) return;
    setCategory({ ...category, image: image });
  }
  const onChangeImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if(!files?.length) return;
    setCategory({ ...category, image: files[0] });
  }

  const link = category.gender !== "unisex" ? `/collections/${category.gender}/` : "/collections/"

  return (
    <>
        <StepHeader title="Form category" description={type === "new" ? "You can create a category by filling in the following fields." : "You can edit a modifying the following fields."}/>

        <form className="grid lg:grid-cols-12 gap-5">
            {alert.message && (
                <Alert {...alert} />
            )}
            <div className="flex flex-col gap-2 lg:col-span-5">
                <label htmlFor="category-name" className="text-gray-800 leading-6 font-medium">Name</label>
                <input 
                    type="text"
                    id="category-name"
                    name="label"
                    onChange={generateSlug}
                    value={category.label}
                    placeholder="The name of category"
                    className="rounded-xl py-3 px-4 bg-gray-50 placeholder:text-gray-400 text-sm text-gray-900"
                />
            </div>

            <div className="flex flex-col gap-2 lg:col-span-7">
                <div className="flex gap-3 items-center justify-between">
                    <label htmlFor="category-slug" className="text-gray-800 leading-6 font-medium">Slug</label>
                    <Tooltip side="left" content="The slug is generated with the name, although you can modify it.">
                        <InformationCircleIcon className="size-6 text-gray-700"/>
                    </Tooltip>
                </div>
                <div
                    tabIndex={0}
                    onClick={() => {
                        if(inputSlug) inputSlug?.current?.focus();
                    }}
                    className="rounded-xl bg-gray-50 flex focus:border-blue-200 focus-within:border-blue-200 border-transparent border-2 outline-none transition-all duration-300"
                >
                    <span className="py-3 pl-4 text-gray-600 select-none cursor-default">
                        <span className="hidden sm:inline">https://ensemble.com</span>{link}
                    </span>
                    <input 
                        type="text"
                        id="category-slug"
                        name="slug"
                        onChange={onChange}
                        value={category.slug}
                        placeholder="slug-of-product"
                        className="transition-all duration-300 rounded-xl pl-1 bg-gray-50 placeholder:text-gray-400 text-gray-950 outline-none flex-1" 
                        ref={inputSlug}
                    />
                </div>
            </div>

           

                <div className="flex flex-col gap-2 lg:col-span-7">
                    <label htmlFor="category-type" className="text-gray-800 leading-6 font-medium">Category Type</label>
                    <Select onValueChange={(value) => setCategory({...category, type: value as CategoryType})} value={category.type}>
                        <SelectTrigger  id="category-gender" className=" bg-gray-50 py-2 px-2 rounded-xl border-none capitalize ">
                            <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                            {types.map(type => (
                                <SelectItem key={type.value} value={type.value} className="capitalize">
                                        <div className="flex gap-2 items-center">
                                            <ImageSource 
                                                alt={`Image of gender :  ${type.label}`}
                                                src={type.image ?? ""}
                                                height={48}
                                                width={48}
                                                quality={80}
                                                className="rounded-lg size-10 sm:size-12 object-cover"
                                            />
                                            
                                            <p className=" text-sm text-gray-900">
                                                {type.label}
                                            </p>
                                        </div>
                                    </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

            <div className="flex flex-col gap-2 lg:col-span-5">
                <div className="flex gap-3">
                    <label htmlFor="category-gender" className="text-gray-800 leading-6 font-medium">Gender</label>
                </div>
                <Select onValueChange={(value) => setCategory({...category, gender: value as Gender})} value={category.gender ?? "unisex"}>
                    <SelectTrigger  id="category-gender" className=" bg-gray-50 py-2 px-2 rounded-xl border-none capitalize ">
                        <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                        {genders.map(gender => (
                            <SelectItem key={gender.value} value={gender.value} className="capitalize">
                                    <div className="flex gap-2 items-center">
                                        <ImageSource 
                                            alt={`Image of gender :  ${gender.label}`}
                                            src={gender.image ?? ""}
                                            height={48}
                                            width={48}
                                            quality={80}
                                            className="rounded-lg size-10 sm:size-12 object-cover"
                                        />
                                        
                                        <p className="text-gray-700">
                                            {gender.label}
                                        </p>
                                    </div>
                                </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col gap-2 lg:col-span-12">
                <div className="flex justify-between flex-col sm:flex-row">
                    <label htmlFor="image-category" className="text-gray-800 leading-6 font-medium">Image category</label>
                    {category.image ? <p className="text-blue-600">You have selected an image</p> : <p className="text-gray-500 text-sm">You have not yet selected image</p>}
                </div>
                <div className={clsx("w-full h-40 md:h-60 border border-dashed border-gray-900/25 rounded-xl px-6 py-10 flex justify-center items-center relative transition-colors duration-300", {
                    "border-blue-500": dragEnter
                })}>
                    <div className="text-center flex justify-center flex-col items-center gap-2">
                        <PhotoIcon className="size-12 text-gray-300" />
                        <p className="flex justify-center items-center gap-2">
                            <span className="text-blue-600 font-medium">Upload a file</span>
                            <span className="text-gray-500 ">or drag and drop</span>
                        </p>
                        <p className="text-gray-500 text-sm">PNG, JPG, up to 10MB</p>
                    </div>
                    <input 
                        type="file" 
                        id="image-category"
                        className=" absolute inset-0  opacity-0"
                        onDragEnter={() => setDragEnter(true)}
                        onDragLeave={() => setDragEnter(false)}
                        onChange={onChangeImage}
                        onDrop={onDropImage}
                    />
                </div>
            </div>
        </form>
    </>
  )
}
