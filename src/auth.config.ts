import Credentials from "next-auth/providers/credentials";
import { User as NextAuthUser } from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs';
import { type NextAuthConfig } from "next-auth";
import { type Role } from "@/interfaces";
import { nanoid } from "nanoid";
import { sendEmailVerification } from "./utils";
import { EXPIRE } from "./constants";

interface CustomUser extends NextAuthUser {
    role: Role;
}

export default ({
    providers: [
        Google,
        Credentials({
            authorize: async (credentials: Partial<Record<"email" | "password", unknown>>): Promise<CustomUser | null> => {
                const { email, password } = credentials;
                if (!email || !password) throw new Error("Invalid credentials");
        
                // Check if exists the user
                const user = await prisma.user.findUnique({
                    where: { email: email as string }
                });
                if (!user || !user.password) throw new Error("User not found.");

                // Check if the password is valid
                const isPasswordMatch = bcrypt.compareSync(password as string, user.password);
                if (!isPasswordMatch) throw new Error("Incorrect password.");
                
                if(!user.emailVerified) {
                    const verifyTokenExists = await prisma.verificationToken.findFirst({
                        where: { identifier: user.email }
                    });

                    // if exists a token, we delete it
                    if(verifyTokenExists?.identifier) {
                        await prisma.verificationToken.delete({
                            where: { identifier: user.email }
                        });
                    }
                    const token = nanoid();
                    await prisma.verificationToken.create({
                        data: {
                            identifier: user.email,
                            token: token,
                            expires: EXPIRE
                        }
                    });
                    // Send mail of verification
                    const response = await sendEmailVerification({
                        name: user.name ?? "",
                        token: token,
                        email: user.email
                    });
                    // Mail isn't sent
                    if(response.error) {
                        throw new Error("An error has ocurred, try again later");
                    }
                    throw new Error("Your email isn't verified, we have sent you a verification email");
                }
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                };
            },
        }),
    ],
    pages: {
        "signIn": "/auth/login",
        "error": "/auth/login",
    }
    ,
}) satisfies NextAuthConfig;