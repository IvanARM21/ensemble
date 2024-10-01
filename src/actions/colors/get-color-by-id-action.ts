import prisma from "@/lib/prisma"
import { Color } from "@/interfaces";

export const getColorById = async (id: Color["id"]) => {
    try {
        if(!id) return { 
            color: null,
            error: true, 
            message: "An error has ocurred, please try again",
        };
        const color = await prisma.color.findFirst({
            where: { id: id }
        });
        return { color };
    } catch (error) {
        console.log(error);
        return { 
            color: null,
            error: true, 
            message: "An unexpected error occurred, try again later."
        };
    }
}