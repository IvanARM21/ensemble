"use server";

import { Size } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createSize = async (sizes : Size[]) => {
    try {
        const existingSizes = sizes.filter(size => size.id !== "temporal-id");
        const size = sizes.filter(size => size.id === "temporal-id")[0];
    
        const sizeExists = await prisma.size.findFirst({
            where: { label: size.label, type: size.type }
        });
        if(sizeExists) {
            return { message: "The size with that name and type already exists", error: true }
        }
        // Prepare queries
        const sizesSave = existingSizes.map(size => {
            return prisma.size.update({
                data: { order: size.order },
                where: { id: size.id }
            });
        });
    
        const { id: _, ...rest } = size; 
        const newSize = prisma.size.create({
            data: rest
        });
    
        // Execute the queries
        await Promise.all([...sizesSave, newSize]);
    
        revalidatePath("/dashboard/sizes");
    
        return { message: "Sizes saved correctly we redirecting", error: false };
    } catch (error) {
        return { message: "An unexpected error occurred, try again later.", error: true };
    }
}