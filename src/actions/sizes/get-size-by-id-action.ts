import prisma from "@/lib/prisma";
import { Size } from "@/interfaces";

export const getSizeById = async (id: Size["id"]) => {
    try {
        if(!id) return { 
            size: null,
            error: true, 
            message: "An error has ocurred, please try again",
        };
        const size = await prisma.size.findFirst({
            where: { id: id }
        });
        return { size };
    } catch (error) {
        console.log(error);
        return { 
            size: null,
            error: true, 
            message: "An unexpected error occurred, try again later."
        };
    }
}