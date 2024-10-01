"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteColor = async (id: string) => {
    try {
        if(!id) return { message: "An error has ocurred, please try again", error: true };
        await prisma.color.delete({
            where: { id: id }
        });
        revalidatePath("/dashboard/colors");
        return { message: "The color has been removed correctly", error: false };
    } catch (error) {
        return { error: true, message: "An error has ocurred, check that size isn't assigned to any product"};
    }
}