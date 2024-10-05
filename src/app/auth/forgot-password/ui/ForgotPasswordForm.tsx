"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form"
import { Alert, AuthNav } from "@/components";
import { forgotPassword } from "@/actions";
import { ForgotPassword } from "@/interfaces";

export const ForgotPasswordForm = () => {

  const [alert, setAlert] = useState({message: "", error: true});
  const { handleSubmit, register, formState: { errors } } = useForm<ForgotPassword>();
  const [isPending] = useTransition();

  const onSubmit = async (data: ForgotPassword) => {
    const response = await forgotPassword(data);
    setAlert({message: response.message, error: !response.ok});
  }

  return (
    <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}
    >
        {alert.message.length > 0 && (
            <div className="flex justify-center items-center">
                <Alert 
                    message={alert.message}
                    error={alert.error}
                />
            </div>
        )}

        <div className="flex flex-col gap-2">
            <label 
                htmlFor="email"
                className="text-gray-900 text-lg"
            >Email</label>
            <input 
                type="email"
                id="email"
                placeholder="Your Email"
                className="rounded-xl py-3 px-4 bg-gray-50"
                {...register("email", { required: true })}
            />
            {errors.email && <Alert message="The email is required" />}
        </div>

        <AuthNav 
            page="forgotPassword"
        />

        <input
            type="submit"
            value="Send Instructions"
            className="btn-primary"
            disabled={isPending}
        />
    </form>
  )
}
