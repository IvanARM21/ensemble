"use server";
import prisma from "@/lib/prisma";
import { Category } from "@/interfaces";
import { revalidatePath } from "next/cache";
import { deleteImages } from "../images/images-action";
import { getPublicIdCloudinary } from "@/utils";

export const deleteCategory = async (id: Category["id"]) => {
    try {
        if(!id) return { error: true, message: "An ocurred has error" };

        // Get category to delete
        const categoryToDelete = await prisma.category.findFirst({
            where: { id: id }
        });

        // Check if this category exists
        if(!categoryToDelete) return { error: true, message: "Category not found" };

        // Delete image of category if you have
        const imagePublicId = getPublicIdCloudinary(categoryToDelete.image);
        if(imagePublicId) await deleteImages(imagePublicId);

        // Delete category
        await prisma.category.delete({
            where: { id: id }
        });

        revalidatePath("/dashboard/categories");

        return { error: false, message: "The category has been removed successfully" };
      
    } catch (error) {
        return { error: true, message: "An unexpected error ocurred, try again later", images: [] };
    }
}