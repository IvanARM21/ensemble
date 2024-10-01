"use server";

import prisma from "@/lib/prisma"
import { deleteImages } from "../images/images-action";
import { revalidatePath } from "next/cache";

export const deleteVariant = async (id: string) => {
    try {
        if(!id) throw new Error("An error has ocurred, please try again.");
        const variant = await prisma.variant.findFirst({
            where: { id: id },
            include: { favorite: true, sizes: true, images: true }
        });
        if(!variant) throw new Error("Variant to delete not found.");

        await Promise.all([
            // Delete sizes of variant
            prisma.sizesOnVariant.deleteMany({
                where: { variantId: variant.id }
            }),
            // Delete images of cloudinary
            Promise.all(
                variant.images.map(async image => {
                    await deleteImages(image.url)
                }),
            ),
            // Delete iamges of database
            prisma.imagesVariant.deleteMany({
                where: { variantId: variant.id }
            }),
            // Delete favorites
            prisma.favorite.deleteMany({
                where: { variantId: variant.id }
            }),
        ]);

        // Delete variant
        await prisma.variant.delete({
            where: { id: variant.id }
        });

        revalidatePath(`/dashboard/products/show/${variant.productId}`);
        return { error: false, message: "The variant has been removed."}
    } catch (error) {
        if(error instanceof Error) {
            return { error: true, message: error.message };
        }
        return { error: true, message: "An unexpected error ocurred, try again later" };
    }
} 