"use server";

import prisma from "@/lib/prisma";
import { User } from "@/interfaces";

export const getUser = async (id: User["email"] | undefined) => {
    if(!id) return  { user: null };
    const user = await prisma.user.findFirst({
        where: { id: id }
    });
    if(!user) return { user: null };

    const { password, ...rest} = user;
    
    const hasPass = password !== null;
    return { user: rest, hasPass };
}