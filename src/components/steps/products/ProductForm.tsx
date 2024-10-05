import React, { useMemo, useRef } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { Gender } from '@/interfaces';
import { createSlug, formattCategoriesForGender } from '@/utils';
import { genders } from '@/constants';
import { useProductStore } from '@/store'
import { Select, SelectValue, SelectTrigger, SelectContent, Tooltip, SelectItem, ImageSource } from '@/components';
import { StepHeader } from '../StepHeader'

export const ProductForm = () => {

  const inputSlug = useRef<HTMLInputElement>(null);
  const { product, setProduct, onChange, categories } = useProductStore();

  const categoriesOrder = useMemo(() => formattCategoriesForGender(categories, product.gender), [categories, product.gender]);

  const generateSlug = (e : React.ChangeEvent<HTMLInputElement>) => {
    const categoryName = e.currentTarget.value;
    const slug = createSlug(categoryName)
    setProduct({
        ...product,
        slug: slug
    });

    onChange(e);
  }

  return (
    <>
        <StepHeader title="Form product" description="You can create a product by filling in the following fields." />
       
        <form className="flex flex-col gap-5 w-full">
            <div className="grid lg:grid-cols-12 gap-5">
                <div className="flex flex-col gap-2 lg:col-span-5">
                    <label htmlFor="product-name" className="text-gray-900 font-medium">Name</label>
                    <input 
                        type="text"
                        id="product-name"
                        name="name"
                        onChange={generateSlug}
                        value={product.name}
                        placeholder="The name of product"
                        className="transition-all duration-300 rounded-xl py-3 px-4 bg-gray-50 placeholder:text-gray-500 text-gray-900 border-2 border-transparent ring-transparent focus:border-blue-200 outline-none" 
                    />
                </div>

                <div className="flex flex-col gap-2 lg:col-span-7">
                        <div className="flex gap-1 items-center justify-between">
                            <label htmlFor="category-slug" className="text-gray-900 font-medium">Slug</label>

                            <Tooltip side="left" content="The slug is generated with the name, although you can modify it.">
                                <InformationCircleIcon className="size-6 text-gray-900" />
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
                                <span className="hidden sm:inline">https://ensemble.com</span>/products/
                            </span>
                            <input 
                                type="text"
                                id="category-slug"
                                name="slug"
                                onChange={onChange}
                                value={product.slug}
                                placeholder="slug-of-product"
                                className="transition-all duration-300 rounded-xl pl-1 bg-gray-50 placeholder:text-gray-400 text-gray-950 outline-none flex-1" 
                                ref={inputSlug}
                            />
                        </div>
                </div>

                {/* */}

            </div>

           <div className="grid lg:grid-cols-12 gap-5">
                <div className="flex flex-col gap-2 lg:col-span-7">
                    <div className="flex gap-3">
                        <label htmlFor="gender" className="text-gray-900 font-medium">Gender</label>
                    </div>
                    <Select onValueChange={(value) => setProduct({...product, gender: value as Gender})} value={product.gender}>
                        <SelectTrigger  id="gender" className=" bg-gray-50 p-1.5 rounded-xl border-none capitalize ">
                            <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                            {genders.map(gender => (
                                <SelectItem key={gender.value} value={gender.value} className="capitalize">
                                        <div className="flex gap-2 items-center">
                                            <ImageSource 
                                                alt={`Image of gender :  ${gender.label}`}
                                                src={gender.image ?? ""}
                                                height={56}
                                                width={48}
                                                quality={80}
                                                className="rounded-lg h-14 object-cover"
                                            />
                                            
                                            <p className="text-gray-900 text-base">
                                                {gender.label}
                                            </p>
                                        </div>
                                    </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col gap-2 lg:col-span-5">
                    <label htmlFor="category" className="text-gray-900 font-medium">Category</label>
                    {categoriesOrder.length ? (
                        <Select onValueChange={(value) => setProduct({...product, categoryId: value === "" ? categoriesOrder[0].id : value})} value={product.categoryId} >
                             <SelectTrigger  id="category" className=" bg-gray-50 p-1.5 rounded-xl border-none capitalize ">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categoriesOrder?.map(category => (
                                    <SelectItem key={category.id} value={category.id} className="capitalize">
                                        <div className="flex gap-2 items-center">
                                            {category.image ? (
                                                <>
                                                    <ImageSource 
                                                        alt={`Image category ${category.label}`}
                                                        src={category.image as string}
                                                        height={56}
                                                        width={48}
                                                        quality={100}
                                                        className="rounded-lg h-14 object-cover"
                                                    />
                                                </>
                                            ) : (
                                                <div className="size-20 bg-gray-900 font-medium text-white flex justify-center items-center rounded-xl shadow-md">
                                                    No image
                                                </div>
                                            )}
                                            <p className="text-gray-900 text-base">
                                                {category.label}
                                            </p>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    ) : (
                        <p className=" text-gray-500">No categories yet, 
                            <span className="text-blue-500 hover:underline underline-offset-4 decoration-blue-500">
                                start creating one
                            </span>
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-2 lg:col-span-6">
                    <label htmlFor="price" className="text-gray-900 font-medium">Price</label>
                    <input 
                        type="number"
                        id="price"
                        name="price"
                        onChange={onChange}
                        value={product.price}
                        placeholder="The price of product"
                        className="transition-all duration-300 rounded-xl py-3 px-4 bg-gray-50 placeholder:text-gray-500 text-gray-900  border-2 border-transparent focus:border-blue-200 outline-none" 
                    />
                </div> 

                
            </div>
            
            <div className="grid lg:grid-cols-12">
                <div className="flex flex-col gap-2 lg:col-span-8">
                    <label htmlFor="description" className="text-gray-900 font-medium">Description</label>
                    <textarea 
                        name="description" 
                        id="description"
                        rows={3}
                        onChange={onChange}
                        value={product.description}
                        placeholder="The description of product"
                        className="transition-all duration-300 rounded-xl py-3 px-4 bg-gray-50 placeholder:text-gray-500 text-gray-900 border-2 border-transparent ring-transparent focus:border-blue-200 outline-none" 
                    ></textarea>

                    
                    <p className="mt-2 text-gray-500">
                        Tell us a little about the product that you are creating
                    </p>
                </div>
            </div>
        </form>
    </>
  )
}
