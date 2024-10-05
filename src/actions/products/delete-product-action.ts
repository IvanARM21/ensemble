"use server";

import prisma from "@/lib/prisma";
import { Product } from "@/interfaces";
import { revalidatePath } from "next/cache";
import { deleteImages } from "../images/images-action";

export const deleteProduct = async (productId: Product["id"]) => {
    try {
        // Get product with variants and related data
        const product = await prisma.product.findFirst({
            where: { id: productId },
            include: {
                variants: {
                    include: { favorite: true, sizes: true, images: true }
                }
            }
        });

        if (!product) throw new Error("An error occurred, try again.");

        // Check if there are variants to delete
        if (product.variants.length) {
            // First, delete related data for each variant
            await Promise.all(
                product.variants.map(async variant => {
                    // Delete sizes of each variant
                    await prisma.sizesOnVariant.deleteMany({
                        where: { variantId: variant.id }
                    });

                    // Delete images from Cloudinary
                    await Promise.all(
                        variant.images.map(async image => {
                            await deleteImages(image.url);
                        })
                    );

                    // Delete images from database
                    await prisma.imagesVariant.deleteMany({
                        where: { variantId: variant.id }
                    });

                    // Delete favorites
                    await prisma.favorite.deleteMany({
                        where: { variantId: variant.id }
                    });

                    // Delete the variant itself
                    await prisma.variant.delete({
                        where: { id: variant.id }
                    });
                }),
            );
        }

        // Finally, delete the product
        await prisma.product.delete({
            where: { id: productId }
        });

        revalidatePath("/dashboard/products");

        return { error: false, message: "The Product has been removed and its variants." };
    } catch (error) {
        if (error instanceof Error) {
            return { error: true, message: error.message };
        }
        return { error: true, message: "An unexpected error occurred, try again later." };
    }
}
