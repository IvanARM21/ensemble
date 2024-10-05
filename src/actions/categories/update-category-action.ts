"use server";

import prisma from "@/lib/prisma";
import { Gender } from "@/interfaces";
import { getPublicIdCloudinary } from "@/utils";
import { deleteImages, compressedImage, uploadAndGetUrl } from '@/actions';
import { revalidatePath } from "next/cache";
import { CategoryType } from "@prisma/client";

export const updateCategory = async (formData : FormData) => {
    const category = {
        "id": formData.get("id") as string,
        "label": formData.get("label") as string,
        "slug": formData.get("slug") as string,
        "type": formData.get("type") as CategoryType,
        "gender": formData.get("gender") as Gender
    }

    const file = formData.get("image") as File;

    try {
        const categoryExists = await prisma.category.findFirst({
            where: { gender: category.gender, label: category.label }
        });
    
        if(categoryExists && categoryExists.id !== category.id) return { error: true, message: "This category already exists" };
    
        const categoryToUpdate = await prisma.category.findFirst({
            where: { id: category.id }
        });
    
        if(!categoryToUpdate) return { error: true, message: "Category not found" };
    
        const isNewImage = file instanceof File;

        let image = isNewImage ? null : categoryToUpdate.image as string;
        if(isNewImage) {
            // Verify if is necessary delete to image
            const imagePublicId = getPublicIdCloudinary(categoryToUpdate.image);
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const compressedBuffer = await compressedImage(buffer, 600, 80);
            if(categoryToUpdate?.image && imagePublicId) {
                const [ urlFile ] = await Promise.all([uploadAndGetUrl(compressedBuffer), deleteImages(imagePublicId)]);
                image = urlFile;
            } else {
                const imageSaved = await uploadAndGetUrl(compressedBuffer);
                image = imageSaved;
            }
        }

        const { id: _, ...rest } = category;

        // Update the category
        await prisma.category.update({
            where: { id: category.id },
            data: { ...rest, image: image ?? null }
        });

        revalidatePath("/dashboard/categories");
        return { error: false, message: "The category has been updated successfully" };
    } catch (error) {
        if(error instanceof Error) {
            return { error: true, message: error.message };
        }
        return { error: true, message: "An unexpected error has ocurred" };
    }
}