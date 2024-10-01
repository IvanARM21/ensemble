"use server";

import prisma from "@/lib/prisma";
import { UpdateUserWithPass, User } from "@/interfaces";
import { comparePass, searchUserById } from "../middleware";
import { sendEmailVerification } from "@/utils";
import { nanoid } from "nanoid";
import { EXPIRE } from "@/constants";
import bcrypt from 'bcryptjs';

const message = {
    password: "Password saved correctly",
    email: "We have sent an email to your account, we need you to confirm your account and sign in again.",
    phone: "We have sent a message to your new phone, we need you to confirm it."
}

export const updateUserWithPass = async ({ id, password, field, value, callback } : UpdateUserWithPass) => {
    try {
        // Check if the user exists
        const { user, message: messageUser } = await searchUserById(id);
        if(!user) {
            return { user: null, error: true, message: messageUser };
        }
        const { error, message: messagePass } = comparePass(password!, user.password);
        if(error) {
            return { user: null, error: true, message: messagePass}
        }
        const prev = field === "password" ? "" : user[field];
        // Update user
        const { error: errorCallback, user: userCallback, message: messageCallback } = await callback(id, value, prev);
        const { password: _, ...rest } = userCallback as User & { password: string };
        if(errorCallback) {
            return { user: null, error: true, message: messageCallback}
        }
        return { userSaved: rest, error: false, message: message[field]};
    } catch (error) {
        return { user: null, error: true, message: "Unexpected error"};
    }
}

export const updateEmail = async (id : string, email : string, prev?: string | null): Promise<{user: User | null, message: string, error: boolean}> => {
    try {
        if(prev) {
            await prisma.verificationToken.delete({
                where: { identifier: prev },
            });
        }
        // Prepare User
        const updateUser =  prisma.user.update({
            where: { id: id },
            data: {
                email: email,
                emailVerified: null
            }
        });
    
        // Prepare new token
        const token = nanoid();
        const createToken = prisma.verificationToken.create({
            data: {
                identifier: email,
                token: token,
                expires: EXPIRE
            }
        });
        // Execute 
        const [ userSaved ] = await  Promise.all([updateUser, createToken]);
        // Send email
        const isSuccess = sendEmailVerification({email: userSaved.email, token: token, name: userSaved.name});
        // Verify if is success
        if(!isSuccess) {
            return { user: null, error: true, message: "There was an error sending the email to confirm your account." };
        }
        return { user: userSaved, error: false, message: "" };
    } catch (error) {
        return { user: null, error: true, message: "Unexpected error"};
    }
}   
export const updatePhone = async (id : string, phone: string) => {
    try {
        const userSaved = await prisma.user.update({
            where: { id: id },
            data: {
                phone: phone,
            }
        });
        return { user: userSaved, error: false, message: "" };
    } catch (error) {
        return { user: null, error: true, message: "Unexpected error"}
    }
}
export const updatePass = async (id: string, pass: string) => {
    try {
        // Hash pass
        const hash = bcrypt.hashSync(pass, 10);
        const userSaved = await prisma.user.update({
            where: { id: id },
            data: {
                password: hash,
            }
        });
        return { user: userSaved, error: false, message: "" };
    } catch (error) {
        return { user: null, error: true, message: "Unexpected error"};
    }
}