"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Alert, AuthNav } from "@/components";
import { LoginWithCredentials } from "@/interfaces";
import { authenticateUser } from "@/actions";

export const LoginForm = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginWithCredentials>();
  const [alert, setAlert] = useState({ message: "", error: true });
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (data : LoginWithCredentials) => {
    startTransition(async () => {
        const response = await authenticateUser(data);
        if(response.ok) {
            router.replace("/");
            return;
        }
        setAlert({message: response.message, error: true});
        reset({password: ""});

        reset();
    });
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
        
        <div className="flex flex-col gap-2">
            <label 
                htmlFor="password"
                className="text-gray-900 text-lg"
            >Password</label>
            <input 
                type="password"
                id="password"
                placeholder="Your Password"
                className="rounded-xl py-3 px-4 bg-gray-50"
                {...register("password", { required: true })}
            />
            {errors.password && <Alert message="The password is required" />}
        </div>

        <AuthNav 
            page="login"
        />

        <input 
            type="submit" 
            value="Sign In"
            className="btn-primary"
            disabled={isPending}
        />
    </form>
  )
}
