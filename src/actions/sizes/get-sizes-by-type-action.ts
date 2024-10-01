"use server";

import prisma from "@/lib/prisma";
import { SizeType } from "@/interfaces";

export const getSizesByType = async (type: SizeType) => {
    try {
        const sizes = await prisma.size.findMany({
            where: { type: type, }
        });
        return {
            sizes,
            message: "Sizes are successfully obtained",
            error: false
        };
    } catch (error) {
        return { message: "An unexpected error occurred, try again later.", error: true };
    }
}