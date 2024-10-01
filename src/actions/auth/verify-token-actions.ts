"use server";

import prisma from "@/lib/prisma";

export const verifyToken = async (token: string | null) => {
    if(!token) return { ok: false, message: "Token not valid"};

    // Check if user and token exists
    const tokenExists = await prisma.verificationToken.findFirst({
        where: { token: token }
    });
    if(!tokenExists) return { ok: false, message: "Token not valid"};

    // Search email associated with this token
    const user = await prisma.user.findFirst({
        where: { email: tokenExists.identifier }
    });
    if(!user) return { ok: false, message: "Token not valid"};

    return { ok: true, message: "You can change your password" };

}