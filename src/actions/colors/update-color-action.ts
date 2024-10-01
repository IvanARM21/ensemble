"use server";

import prisma from "@/lib/prisma";
import { Color } from "@/interfaces";
import { revalidatePath } from "next/cache";

export const updateColor = async (color: Color) => {
    if(!color.id) return { message: "An error has ocurred, try again", error: true };
    try {
        const { id, ...rest}  = color;
        await prisma.color.update({
            data: rest,
            where: { id: color.id }
        });

        revalidatePath("/dashboard/colors");
        return { message: "Color saved correctly we redirecting", error: false };
    
    } catch (error) {
        console.log(error);
        return { message: "An unexpected error ocurred, try again later", error: true };
    }
}