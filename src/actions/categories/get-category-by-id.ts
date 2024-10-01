"use server";

import prisma from "@/lib/prisma";
import { Category } from "@/interfaces";

export const getCategoryById = async (id : Category["id"]) => {
    try {
        if(!id) return { category: null, error: true, message: "An ocurred a error, try again" };
        const category = await prisma.category.findFirst({
            where: { id: id }
        });
        return { category };
    } catch (error) {
        console.log(error);
        return { category: null, error: true, message: "An unexpected error occurred, try again later." }
    }
}