"use server";

import { signIn } from "@/auth";
import { LoginWithCredentials } from "@/interfaces";
import { AuthError } from "next-auth";

export const authenticateUser = async ({email, password} : LoginWithCredentials) => {
    try {
        await signIn("credentials", {
            email: email,
            password: password,
            redirect: false,
        });
        
        return { ok: true, message: "Authentication is Success" };
    } catch (error) {
        if(error instanceof AuthError) {
            return { ok: false, message: error.cause?.err?.message ?? ""};
        }
        return { ok: false, message: "Unexpected Error, try again later." };
    }
}