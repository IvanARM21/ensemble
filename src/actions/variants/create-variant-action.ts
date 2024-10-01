"use server";

import prisma from "@/lib/prisma";
import { CreateVariant } from "@/interfaces";
import { revalidatePath } from "next/cache";
import { compressedImage, uploadAndGetUrl } from "../images/images-action";

export const createVariant = async (formData : FormData, variant : CreateVariant) => {
    try {
        // Create variant
        const { name, slug, price, productId, colorId } = variant;
        const files: File[] = formData.getAll("files[]") as File[];

        const product = await prisma.product.findFirst({
            where: { id: productId }
        });

        if(!product) throw new Error("An ocurred a error to searching the product");

        const variantToSave = { name, slug, price, productId, colorId };
        const variantSaved = await prisma.variant.create({
            data: variantToSave
        });

        // Sizes Formatt
        const sizesOnVariantFormatt = variant.sizes.map((size) => ({
            variantId: variantSaved.id,
            sizeId: size.size.id,
            stock: size.stock
        }));

        // Upload images
        const filesSaved = await Promise.all(
            files.map(async file => {
                try {
                    if (file) {
                        const arrayBuffer = await file.arrayBuffer();
                        const buffer = Buffer.from(arrayBuffer);
                        const compressedBuffer = await compressedImage(buffer, 1000, 100);
                        const imageSaved = await uploadAndGetUrl(compressedBuffer);
                        return imageSaved;
                    }
                    throw new Error("An ocurred a error to processing image or upload in cloudinary server")
                } catch (error) {
                    if(error instanceof Error) {
                        throw error;
                    }
                    throw new Error("An unexpected error ocurred, try again later");
                }
            })
        );
        

        // Images formatt
        const imageToUpload = filesSaved.map(image => ({ url: image,  variantId: variantSaved.id }));
        
        // Execute queries
        await Promise.all([prisma.sizesOnVariant.createMany({ data: sizesOnVariantFormatt }), prisma.imagesVariant.createMany({ data: imageToUpload })]);

        revalidatePath(`/dashboard/products/show/${productId}`);

        return { error: false, message: "Product created succesufully, we redirect to show product"}
    } catch (error) {
        if(error instanceof Error) {
            return { error: true, message: error.message };
        }
        return { error: true, message: "An unexpected error ocurred, try again later" };
    }

}