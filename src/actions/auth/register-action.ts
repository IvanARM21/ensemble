"use server";
import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs'
import { Register } from "@/interfaces";
import { sendEmailVerification } from "@/utils";
import { nanoid } from "nanoid";
import { EXPIRE } from "@/constants";

export const registerAction = async (user :  Register) => {
    try {
        if(Object.values(user).includes("")) return { message: "Invalid credentials", ok: false, user: {}}

        const { email, phone } = user;
        // Search for Email
        const userFoundForEmail = await prisma.user.findUnique({
            where: { email: email }
        });
        if(userFoundForEmail) return { message: "Email already registered", ok: false, user: {}}
    
        // Search for phone
        const userFoundForPhone = await prisma.user.findUnique({
            where: { phone: phone }
        });
        if(userFoundForPhone) return { message: "Phone already registered", ok: false, user: {}}
    
        // Hash Password
        const hashPass = bcrypt.hashSync(user.password!, 12);
        
        // Create a Token
        const token = nanoid();
    
        // Finally We can Insert the User
        const newUser =  prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                password: hashPass,
            }
        });
        const createToken = prisma.verificationToken.create({
            data: {
                identifier: user.email,
                token: token,
                expires: EXPIRE
            }
        });
        const [userDB] = await Promise.all([newUser, createToken]);
        const { password: pass,...rest  } = userDB;

        const isSuccess = await sendEmailVerification({
            name: userDB.name ?? "",
            email: userDB.email,
            token: token ?? ""
        });
        if(!isSuccess) {
            return { ok: false, message: "There was an error sending the email to confirm your account. But you can log in to our application.", user: rest };
        }

        return { ok: true, message: "You need to confirm your account, we will send you an e-mail", user: rest };
    } catch (error) {
        if(error instanceof Error) {
            return { ok: false, message: error.message }
        } else {
            return { ok: false, message: "An unexpected error occurred" }
        }
    }
}