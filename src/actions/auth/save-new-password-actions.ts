"use server";

import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs';
import { NewPassword } from "@/interfaces";

export const saveNewPassword = async (data : NewPassword) => {
    try {
        if(!data.password || !data.token) return { ok: false, message: "Both token and password are required." };

        // Search token
        const tokenExists = await prisma.verificationToken.findFirst({
            where: { token: data.token }
        });
        if(!tokenExists) return { ok: false, message: "Token not valid" };

        // Search user
        const user = await prisma.user.findFirst({
            where: { email: tokenExists.identifier }
        });
        if(!user) return { ok: false, message: "Token not valid" };

        // Prepare for delete Token
        const tokenDeleteToDelete = await prisma.verificationToken.findFirst({
            where: { token: data.token }
        });
        const email = tokenDeleteToDelete?.identifier;
        const tokenDelete = prisma.verificationToken.delete({
            where: { identifier: email }
        });

        const passwordHash = bcrypt.hashSync(data.password, 10);

        // Prepare update password
        const passwordUpdate = prisma.user.update({
            where: { email: tokenExists.identifier },
            data: { password: passwordHash}
        })

        // Execute in parallel
        Promise.all([tokenDelete, passwordUpdate]);
        return { ok: true, message: "Password update succesufully"};
        
    } catch (error) {
        return { ok: false, message: "An occurred a error, try again later"};
    }

}