"use server";

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export const deleteSize = async (id: string) => {
    try {
        if(!id) return { message: "An error has ocurred, please try again", error: true };
        await prisma.size.delete({
            where: { id: id }
        });
        revalidatePath("/dashboard/sizes");
        return { error: false, message: "The size has been removed correctly" };
    } catch (error) {
        return { error: true, message: "An error has ocurred, check that the size isn't assigned to any product"};
    }
}