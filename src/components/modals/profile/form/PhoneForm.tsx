
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { updatePhone, updateUserWithPass } from "@/actions";
import { ChangePhone, User } from "@/interfaces";
import { useModalStore } from "@/store";
import { INITIAL_ALERT } from "@/constants";
import { Alert } from "@/components";
import { ButtonCancel } from "./ButtonCancel"

interface Props {
    title: string;
    defaultValues: ChangePhone
    user: Omit<User, "password">;
    setUser: React.Dispatch<React.SetStateAction<Omit<User, "password">>>;
}

export const PhoneForm = ({title, defaultValues, user, setUser} : Props) => {

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: defaultValues
  });
  const hiddenModalProfile = useModalStore(state => state.hiddenModalProfile);
  const [alert, setAlert] = useState(INITIAL_ALERT);
  const [isPending, transitionStart] = useTransition();

  const onSubmit = (data: ChangePhone) => {
    transitionStart(async () => {
        const { error, message, userSaved } = await updateUserWithPass({id: user.id, password: data.password, field: "phone", value: data.phone, callback: updatePhone}) 
        setAlert({error, message});
        if(userSaved && !error) {
            setUser({ ...user, phone: userSaved.phone });
            setTimeout(() => {
                setAlert(INITIAL_ALERT);
                hiddenModalProfile();
            }, 2000);
        }
    });
  }

  return (
    <>
        <h2 className="text-2xl font-medium text-gray-800 text-center mb-6 capitalize">{title}</h2>
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
