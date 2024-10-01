"use server";

import prisma from "@/lib/prisma";
import { Color } from "@/interfaces";
import { revalidatePath } from "next/cache";

export const createColor = async (color: Color) => {
    const { id: _, ...rest} = color;

    try {
        const colorsLabelExists = await prisma.color.findFirst({
            where: { label: color.label }
        });
        if(colorsLabelExists) return { message: "There is already a color with this name, try another one", error: true };
        const colorCodeExists = await prisma.color.findFirst({
            where: { code: color.code }
        });
        if(colorCodeExists) return { message: "There is already a color with this code, try another one", error: true };
        
        await prisma.color.create({ data: rest });

        revalidatePath("/dashboard/colors");
        return { message: "Color created correctly, we redirect you.", error: false};
    } catch (error) {
        return { message: "An unexpected error ocurred, try again later.", error: true};
    }
}