"use server";

import prisma from "@/lib/prisma";
import { Size } from "@/interfaces";
import { revalidatePath } from "next/cache";

export const updateSize = async (sizes : Size[], sizeId : Size["id"]) => {
    try {
        const sizeNotUpdated = sizes.filter(size => size.id !== sizeId);
        const sizeUpdated = sizes.filter(size => size.id === sizeId)[0];

        // Verify if exists with the new label
        const sizeExists = await prisma.size.findFirst({
            where: { label: sizeUpdated.label, type: sizeUpdated.type }
        });
        if(sizeExists && sizeExists?.id !== sizeId) {
            return { message: "The size with that name and type already exists", error: true }
        }

        // Prepare queries
        const sizesToSave = sizeNotUpdated.map(size => {
            return prisma.size.update({
                data: { order: size.order },
                where: { id: size.id }
            });
        });

        const updatedSize = prisma.size.update({
            data: sizeUpdated,
            where: { id: sizeId }
        });

        // Execute the queries
        await Promise.all([...sizesToSave, updatedSize]);
        
        revalidatePath("/dashboard/sizes");

        return { message: "Sizes saved correctly we redirecting", error: false };
    } catch (error) {
        return { message: "An unexpected error occurred, try again later.", error: true };
    }
}