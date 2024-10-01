"use server";

import prisma from "@/lib/prisma";
import { Product } from "@/interfaces";
import { revalidatePath } from "next/cache";
import { deleteImages } from "../images/images-action";

export const deleteProduct = async (productId: Product["id"]) => {
    try {
        // Get product
        const product = await prisma.product.findFirst({
            where: { id: productId },
            include: {
                variants: {
                    include: { favorite: true, sizes: true, images: true }
                }
            }
        });

        if(!product) throw new Error("An error ocurred, try again.");

        if(product.variants.length) {
            await Promise.all(
                product?.variants.map(async variant => {
                    // Delete sizez of each variant
                    await prisma.sizesOnVariant.deleteMany({
                        where: { variantId: variant.id }
                    });
                    // Delete images of cloudinary
                    await Promise.all(
                        variant.images.map(async image => {
                            await deleteImages(image.url);
                        })
                    );
                    // Delete images of database
                    await prisma.imagesVariant.deleteMany({
                        where: { variantId: variant.id }
                    });
                    // Delete favorites
                    await prisma.favorite.deleteMany({
                        where: { variantId: variant.id }
                    });
                }),
            );

            // Delete Images of Cloudinary

            // Delete Variant
            await Promise.all(
                product?.variants.map(async variant => {
                    prisma.variant.delete({
                        where: { id: variant.id }
                    });
                })
            );
        }
        // Delete Product
        await prisma.product.delete({
            where: { id: productId }
        });

        revalidatePath("/dashboard/products");

        return { error: false, message: "The Product has been removed and its variant." };
    } catch (error) {
        if(error instanceof Error) {
            return { error: true, message: error.message };
        }
        return { error: true, message: "An unexpected error occurred, try again later." };
    }
}