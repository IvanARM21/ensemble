"use server";

import { UpdateUserWithOutPass } from "@/interfaces";
import prisma from "@/lib/prisma";
import { searchUserById } from "../middleware";



export const updateUserWithOutPass = async ({id, field, value} : UpdateUserWithOutPass) => {
    try {
        const { user: userExists, message } = await searchUserById(id);
        if(!userExists) {
            return { userSaved: null, error: true, message: message };
        }
        // Update user
        const userSaved = await prisma.user.update({
            where: { id: id },
            data: { [field]: value }
        });
        const { password: _, ...rest } = userSaved;

        return { userSaved: rest, error: false, message: "Saved correctly"};
        
    } catch (error) {
        return { userSaved: null, error: true, message: "Unexpected error in the parent"};
    }
}