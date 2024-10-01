"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form';
import { registerAction } from "@/actions";
import { Alert, AuthNav } from "@/components";
import { Register } from "@/interfaces";


interface RegisterForm extends Register {
    password2: string;
}

export const RegisterForm = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, watch, reset  } = useForm<RegisterForm>();
  const [alert, setAlert] = useState({ message: "", error: true });
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (data : RegisterForm) => {
    startTransition(async () => {
      try {
        const { password2: _, ...rest } = data;
    
        // Server Action for Register User
        const res = await registerAction(rest);
        
        // Set alert if response is succesfully or incorrectly
        setAlert({ message: res.message ?? "", error: !res.ok });
        if(res.ok) {
          setTimeout(() => {
            router.replace("/auth/login");
          }, 3000);
          reset();
        }
      } catch (error) {
        if(error instanceof Error) {
            setAlert({ message: error.message ?? "", error: true });
        } else {
            setAlert({ message: "Error Unknown, try again later", error: true });
        }
      }
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
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-2">
            <label 
              htmlFor="name"
              className="text-gray-900 text-lg"
            >Name</label>
            <input 
              type="text"
              id="name"
              placeholder="Your Name"
              className="rounded-xl py-3 px-4 bg-gray-50"
              {...register("name", { required: true })}
            />
            {errors.name && <Alert message="The name is required" />}
          </div>
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
        </div>

        <div className="flex flex-col gap-2">
          <label 
          htmlFor="phone"
          className="text-gray-900 text-lg"
          >Phone</label>
          <input 
          type="text"
          id="phone"
          placeholder="Your Phone"
          className="rounded-xl py-3 px-4 bg-gray-50"
          {...register("phone", { required: true })}
          />
          {errors.phone && <Alert message="The phone is required" />}
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

        <div className="flex flex-col gap-2">
            <label 
                htmlFor="password2"
                className="text-gray-900 text-lg"
            >Repeat Password</label>
            <input 
                type="password"
                id="password2"
                placeholder="Repeat Your Password"
                className="rounded-xl py-3 px-4 bg-gray-50"
                {...register("password2", { 
                    required: true,
                    validate: value => value === watch().password || "The passwords don't match"
                })}
                />
            {errors.password2 && <Alert message={errors.password2.message || "The repeat password is required"} />}
        </div>
        <AuthNav 
            page="register"
        />
        <input 
          type="submit" 
          value="Sign Up"
          className="btn-primary"
          disabled={isPending}
        />
        
      </form>
  )
}
