"use client";

import React, { Suspense } from "react";
import clsx from "clsx";
import {  XCircleIcon } from "@heroicons/react/24/outline";
import { useVariantStore } from "@/store";
import { Alert, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SpinnerWithBg } from "@/components";
import { ModalVariantImages } from "./ModalVariantImages";
import { Product } from "@/interfaces";
import { useVariants } from "@/hooks";
import { createSlug } from "@/utils";

interface Props {
    productId: Product["id"];
    productName: Product["name"];
    productPrice: Product["price"];
}

export const ModalAddVariant = ({ productPrice, productId, productName }: Props) => {

    const product = { id: productId ?? "", price: productPrice, name: productName };
    const { colors, sizes, variant, setVariant, onChange } = useVariantStore();
    const { loaded, modal, closeModal, state, alert, handleClickSize, variantNameWithColor, handleStockChange, handleSubmit, loading } = useVariants({product});

    if(!loaded) return <></>

    return (
        <>
            {modal && (
                <>
                    <div 
                        className={clsx("bg-black bg-opacity-50 fixed inset-0 z-30 backdrop-blur-sm flex items-center justify-center px-2 cursor-pointer ", {
                            "fade-in": state,
                            "fade-out": !state
                        })}
                        onClick={closeModal}
                    >
                        <div 
                            className={clsx("bg-white max-w-3xl w-full rounded-xl relative cursor-default p-3 sm:p-6 h-[85vh] overflow-auto flex justify-between flex-col", {
                                "modal-in": state,
                                "modal-out": !state
                            })}
                            onClick={(e) => e.stopPropagation()}
                        >   
                            <button
                                type="button"
                                className="top-2 right-2 sm:top-3 sm:right-3 absolute text-red-600"
                                onClick={closeModal}
                            >
                                <XCircleIcon className="size-8" />
                            </button>

                            <h2 className="text-xl text-gray-800 font-semibold mb-5 flex-1">New variant</h2>

                            {alert.message.length ? (
                                <Alert {...alert} />
                            ) : <></>}

                            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-2">
                                    <label className="text-gray-900 font-medium">Name</label>
                                    <input 
                                        type="text" 
                                        value={variantNameWithColor}
                                        disabled={true}
                                        placeholder="The name of variant"
                                        className=" select-none transition-all duration-300 rounded-xl py-3 px-4 bg-gray-900/10 border-red-200 placeholder:text-gray-500 text-gray-900 border-2 cursor-no-drop outline-none" 
                                    />
                                </div>

                                <div className="flex flex-col gap-2 lg:col-span-7">
                                    <div className="flex gap-1 items-center justify-between">
                                        <label htmlFor="category-slug" className="text-gray-900 font-medium">Slug</label>
                                    </div>
                                    <div
                                        className="rounded-xl bg-gray-900/10 flex border-red-200 border-2 outline-none transition-all duration-300"
                                    >
                                        <span className="py-3 pl-4 text-gray-600 select-none cursor-default">
                                            <span className="hidden sm:inline">https://ensemble.com</span>/products/
                                        </span>
                                        <input 
                                            type="text"
                                            id="category-slug"
                                            disabled={true}
                                            value={createSlug(variantNameWithColor)}
                                            placeholder="slug-of-product"
                                            className="transition-all duration-300 pl-1 bg-transparent placeholder:text-gray-400 text-gray-950 outline-none flex-1" 
                                        />
                                    </div>
                            </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="price" className="text-gray-900 font-medium">Price</label>
                                    <input 
                                        type="number" 
                                        value={variant.price}
                                        id="price"
                                        name="price"
                                        onChange={onChange}
                                        placeholder="The price of variant"
                                        className="transition-all duration-300 rounded-xl py-3 px-4 bg-gray-50 placeholder:text-gray-500 text-gray-900 border-2 border-transparent ring-transparent focus:border-blue-200 outline-none" 
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="color" className="text-gray-800 leading-6 font-medium">Color</label>
                                    <Select value={variant.colorId} onValueChange={(value) => setVariant({...variant, colorId: value})}>
                                        <SelectTrigger id="color" className=" bg-gray-50 py-2 px-4 rounded-xl border-none capitalize ">
                                            <SelectValue placeholder="Select color" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {colors.map(color => (
                                                <SelectItem key={color.id} value={color.id ?? ""} className="capitalize">
                                                    <div className="flex gap-2 items-center">
                                                        
                                                        <div
                                                            className="size-8 rounded-full border"
                                                            style={{ backgroundColor: color.code }}
                                                        />
                                                        
                                                        <p className=" text-sm text-gray-900">
                                                            {color.label}
                                                        </p>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-gray-900 font-medium">Select the sizes</label>
                                    <div className="flex flex-wrap gap-2">
                                        {sizes.map(size => (
                                            <div 
                                                onClick={() => handleClickSize(size)}
                                                className={clsx("cursor-pointer bg-white h-12 w-16 flex text-lg justify-center items-center border rounded-full text-gray-700 hover:border-gray-400 transition-colors duration-300", {
                                                    "border-gray-800": variant.sizes.some(sizeVariant => sizeVariant.size.id === size.id)
                                                })}
                                                key={size.id}
                                            >
                                                {size.label}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                {variant.sizes.length ? (
                                    <>
                                        <div className="flex flex-col gap-2">
                                            <p className="font-medium text-gray-900">Manage of stock</p>
                                            <div className="flex flex-wrap gap-3">
                                                {variant.sizes.map(size => (
                                                    <div key={size.size.id} className="flex justify-center items-center gap-2 text-gray-500">
                                                        <label htmlFor={size.size.id} className="w-5">{size.size.label}</label>
                                                        <input 
                                                            type="number"
                                                            id={size.size.id}
                                                            name={size.size.id}
                                                            onChange={(e) => handleStockChange(size.size.label, parseInt(e.currentTarget.value))}
                                                            placeholder={`Stock ${size.size.label}`}
                                                            value={size.stock}
                                                            className="cursor-pointer bg-white h-12 px-4 w-32 flex text-lg justify-center items-center border rounded-full text-gray-700 hover:border-gray-400 transition-colors duration-300"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                ) : <></>}

                                <ModalVariantImages />
                                <div className="flex justify-end items-center gap-5 mt-8">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="text-gray-500 hover:text-gray-800 transition-colors duration-300"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300 py-2 px-4 text-white cursor-pointer rounded-xl"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                            

                    <div className="fixed left-1/2 top-1/2 translate-x-1/2 translate-y-1/2">
                        <Alert {...alert}/>
                    </div>
                    {loading && (
                        <SpinnerWithBg className="z-30" />
                    )}
                </>
            )}
        </>
    )
}

export const ModalAddVariantSuspense = ({productId, productPrice, productName} : Props) => {
    return (
        <Suspense>
            <ModalAddVariant productId={productId} productPrice={productPrice} productName={productName} />
        </Suspense>
    )
}