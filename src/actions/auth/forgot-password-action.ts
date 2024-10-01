"use server";

import prisma from "@/lib/prisma";
import { nanoid } from "nanoid";
import { ForgotPassword } from "@/interfaces";
import { EXPIRE } from "@/constants";
import { sendEmailForNewPassword } from "@/utils";

export const forgotPassword = async ({email}: ForgotPassword) => {
    if(!email) return { ok: false, message: "Email not valid" };

    // Check if user exists
    const userExists = await prisma.user.findFirst({
        where: { email: email }
    });
    
    if(!userExists)  return { ok: false, message: "Email not valid" };

    // Verify if token with this email exists
    const tokenExists = await prisma.verificationToken.findFirst({
        where: { identifier: email }
    });
    if(tokenExists) {
        await prisma.verificationToken.delete({
            where: { identifier: email }
        });
    }

    // Create token
    const token = nanoid();

    // Save new token in database
    await prisma.verificationToken.create({
        data: {
            identifier: userExists.email,
            token: token,
            expires: EXPIRE
        }
    });

    // Send mail
    const response = await sendEmailForNewPassword({ name: userExists.name ?? "", email: userExists.email, token: token });
    if(response.error) {
        return { ok: false, message: "An error has ocurred, try again later" };
    }

    return { ok: true, message: "We have sent an mail with the instructions to continue" };
}