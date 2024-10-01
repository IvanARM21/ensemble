import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

export const searchUserById = async (id: User["id"]) => {
    try {
        const userExists = await prisma.user.findFirst({
            where: { id: id }
        });
        // Check if the user exists
        if(!userExists) {
            return { user: null, message: "User not found"};
        }
        return { user: userExists, message: "",  };
    } catch (error) {
        return { user: null, message: "Unexpected error"};
    }
}