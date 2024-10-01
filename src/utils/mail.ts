"use server";
import { Resend } from "resend";
import { ConfirmAccount, ForgotPasswordMail } from "@/interfaces";

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export const sendEmailVerification = async (mail: ConfirmAccount) => {
    const { email, token, name } = mail;
    try {
        await resend.emails.send({
            from: "Ensemble-Shop <onboarding@resend.dev>",
            to: "ivanrms371@gmail.com",
            subject: "Verify your email",
            html: `
                <p>Hi ${name},</p>
                <p>Click the link below to verify your email</p>
                <a href="${process.env.NEXTAUTH_URL}/auth/confirm-account?token=${token}">Verify email</a>
            `
        });

        return { error: false }
    } catch (error) {
        return { error: true }
    }
}

export const sendEmailForNewPassword = async (mail: ForgotPasswordMail) => {
    const { email, token, name } = mail;
    try {
        await resend.emails.send({
            from: "Ensemble-Shop <onboarding@resend.dev>",
            to: "ivanrms371@gmail.com",
            subject: "Change your password",
            html: `
                <p>Hi ${name},</p>
                <p>You requested a password change, you can change it by clicking on the following link</p>
                <a href="${process.env.NEXTAUTH_URL}/auth/new-password?token=${token}">Change Password</a>
            `
        });

        return { error: false };
    } catch (error) {
        return { error: true }
    }
}