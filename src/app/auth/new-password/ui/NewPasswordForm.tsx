"use client";

import { saveNewPassword } from "@/actions";
import { Alert, AuthNav } from "@/components";
import { NewPassword } from "@/interfaces";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

interface Props {
    token: string;
    alertBd: {
        message: string;
        error: boolean;
    }
}

interface NewPasswordForm extends NewPassword {
    password2: string;
}


export const NewPasswordForm = ({token, alertBd} : Props) => {

  const router = useRouter();
  const { handleSubmit, register, formState: { errors }, watch } = useForm<NewPasswordForm>();
  const [isPending, startTransition] = useTransition();
  const [alert, setAlert] = useState(alertBd);
  
  const onSubmit = async (formData: NewPasswordForm) => {
    startTransition(async () => {
        const data = { token: token, password: formData.password };
        const response = await saveNewPassword(data);
        setAlert({message: response.message, error: !response.ok});
        if(response.ok) {
            setTimeout(() => {
                router.replace("/auth/login");
            }, 3000)
        }
    });
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl shadow  px-5 py-7 sm:p-10 max-w-screen-md mx-auto">
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
                    htmlFor="password"
                    className="text-gray-900 text-lg"
                >New Password</label>
                <input 
                    type="password"
                    id="password"
                    placeholder="Your New Password"
                    className="rounded-xl py-3 px-4 bg-gray-50"
                    {...register("password", { required: true })}
                />
                {errors.password && <Alert message="The password is required" />}
            </div>

            <div className="flex flex-col gap-2">
                <label 
                    htmlFor="password2"
                    className="text-gray-900 text-lg"
                >Repeat New Password</label>
                <input 
                    type="password"
                    id="password2"
                    placeholder="Repeat Your New Password"
                    className="rounded-xl py-3 px-4 bg-gray-50"
                    {...register("password2", { 
                        required: "Repeat password is required",
                        validate: value => value === watch().password || "The passwords don't match"
                    })}
                    />
                {errors.password2 && <Alert message={errors.password2.message ?? ""} />}
            </div>

            <AuthNav 
                page="forgotPassword"
            />

            <input 
                type="submit" 
                value="Save New Password"
                className="btn-primary"
                disabled={isPending}
            />
        </form>
    </div>
  )
}
