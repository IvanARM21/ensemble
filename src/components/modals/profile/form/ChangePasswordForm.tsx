"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { ChangePassword, User } from "@/interfaces";
import { useModalStore } from "@/store";
import { INITIAL_ALERT } from "@/constants";
import { Alert } from '@/components';
import { ButtonCancel } from "./ButtonCancel";
import { updatePass, updateUserWithPass } from "@/actions";

interface Props {
    user: Omit<User, "password">;
}

export const ChangePasswordForm = ({user} : Props) => {
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<ChangePassword>();
  const hiddenModalProfile = useModalStore(state => state.hiddenModalProfile);
  const [alert, setAlert] = useState(INITIAL_ALERT);
  const [, transitionStart] = useTransition();

  const onSubmit = (data: ChangePassword) => {
    transitionStart(async () => {
        const { error, message } = await updateUserWithPass({id: user.id, password: data.currentPass, field: "password", value: data.newPass, callback: updatePass})
        setAlert({error, message});
        setTimeout(() => {
            if(!error) {
                hiddenModalProfile();
            }
        }, 2000);
    });
  }

  return (
    <>
        <h2 className="text-2xl font-medium text-gray-800 text-center mb-6 capitalize">Change Your Password</h2>
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
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
                    htmlFor="currentPass"
                    className="text-gray-900 text-lg"
                >Current Password</label>
                <input 
                    type="password"
                    id="currentPass"
                    placeholder="Your Current Password"
                    className="rounded-xl py-3 px-4 bg-gray-50"
                    {...register("currentPass", { required: true })}
                />
                {errors.currentPass && <Alert message="The current password is required" />}
            </div>

            <div className="flex flex-col gap-2">
                <label 
                    htmlFor="newPass"
                    className="text-gray-900 text-lg"
                >New Password</label>
                <input 
                    type="password"
                    id="newPass"
                    placeholder="Your New Password"
                    className="rounded-xl py-3 px-4 bg-gray-50"
                    {...register("newPass", { required: true })}
                />
                {errors.newPass && <Alert message="The new password is required" />}
            </div>

            <div className="flex flex-col gap-2">
                <label 
                    htmlFor="repeatPass"
                    className="text-gray-900 text-lg"
                >Repeat Password</label>
                <input 
                    type="password"
                    id="repeatPass"
                    placeholder="Repeat Your New Password"
                    className="rounded-xl py-3 px-4 bg-gray-50"
                    {...register("repeatPass", {
                        required: true,
                        validate: value => value === watch().newPass || "The passwords don't match"
                    })}
                />
                {errors.repeatPass && <Alert message={errors.repeatPass.message || "The repeat password is required"} />}
            </div>
            <div className="flex  justify-end items-center mt-5 gap-5">
                <ButtonCancel />
                <input 
                    type="submit" 
                    value="Save"
                    className="bg-blue-600 px-4 py-2 rounded-xl text-white"
                />
            </div>
        </form>
    </>
  )
}
