"use server";

import prisma from "@/lib/prisma"

export const getCategoriesWithImage = async () => {

    // Prepare queries
    const categoriesWithImage = await prisma.category.findMany({
        where: { image: { not: null } },
        orderBy: { label: "asc" }
    });

    return categoriesWithImage;
}