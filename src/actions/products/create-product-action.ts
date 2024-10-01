"use server";

import prisma from "@/lib/prisma";
import {  ProductForm } from "@/interfaces";

export const createProduct = async (product: ProductForm) => {
    try {
        const { id, variants, ...rest } = product;

        const productBySlug = await prisma.product.findFirst({
            where: { slug: product.slug }
        });
        if(productBySlug) throw new Error("The product with that slug already exists");
        

        const newProduct = await prisma.product.create({
            data: rest
        });

        return { id: newProduct.id, error: false, message: "Product successfully created, you will be redirected to the product page for manage variants" };
    } catch (error) {
        if(error instanceof Error) {
            return { id: null, error: true, message: error.message };
        }
        return { id: null, error: true, message: "An ocurred unxpected error, try again later" };
    }
}