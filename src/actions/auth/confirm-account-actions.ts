"use server";

import prisma from "@/lib/prisma";

export const confirmAccount = async (token: string | null) => {
    try {
        if(!token) return { ok: false, message: "Token not valid"};

        // Search token
        const tokenExists = await prisma.verificationToken.findFirst({
            where: { token: token }
        });

        // Check if token exists
        if(!tokenExists) return { ok: false, message: "Token not valid"};

        // Prepare for delete Token
        const tokenDeleteToDelete = await prisma.verificationToken.findFirst({
            where: { token: token }
        });
        const email = tokenDeleteToDelete?.identifier;
        const tokenDelete = prisma.verificationToken.delete({
            where: { identifier: email }
        });
        // Prepare for verify user
        const userUpdated = prisma.user.update({
            where: { email: tokenExists.identifier },
            data: {
                emailVerified: new Date()
            }
        });

        // Execute in paralel
        await Promise.all([tokenDelete, userUpdated]);
        
        return { ok: true, message: "Account verify succesfully"};
    } catch (error) {
        return { ok: false, message: "An unexpected error"};
    }
}