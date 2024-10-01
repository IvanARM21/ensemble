"use server";

import prisma from "@/lib/prisma";
import { CategoryType, Gender } from '@/interfaces';
import { revalidatePath } from "next/cache";
import { compressedImage, uploadAndGetUrl } from "../images/images-action";

export const createCategory = async (formData : FormData) => {  
    try {
        
        const category = {
            "label": formData.get("label") as string,
            "slug": formData.get("slug") as string,
            "type": formData.get("type") as CategoryType,
            "gender": formData.get("gender") as Gender
        }

        const file = formData.get("image") as File;

        if(Object.values(category).includes("")) throw new Error("An ocurred an error, try again");

        const categoryExists = await prisma.category.findFirst({
            where: { gender: category.gender, label: category.label }
        });
        if(categoryExists) return { error: true, message: "Already exits a category with this label"}

        // Create image if exists
        let image = "";
        if(file) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const compressedBuffer = await compressedImage(buffer, 450, 75);
            image = await uploadAndGetUrl(compressedBuffer);
        }

        // Create the category
        await prisma.category.create({
            data: { ...category, image }
        });

        revalidatePath("/dashboard/categories");
    
        return { error: false, message: "The category has been created successfully" };
    } catch (error) {
        if(error instanceof Error) {
           return { error: true, message: error.message };
        }
        return { error: true, message: "An unexpected error ocurred, try again later1"}
    }
}