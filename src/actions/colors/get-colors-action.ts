"use server";

import prisma from "@/lib/prisma"

export const getColors = async () => {
    try {
        const colors = await prisma.color.findMany({});
        return colors;
    } catch (error) {
        console.log(error);
    }
}