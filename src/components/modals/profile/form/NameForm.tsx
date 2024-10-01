
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useModalStore } from "@/store";
import { updateUserWithOutPass } from "@/actions";
import { ChangeName, User } from "@/interfaces";
import { Alert } from '@/components';
import { INITIAL_ALERT } from "@/constants";
import { ButtonCancel } from "./ButtonCancel";

interface Props {
    title: string;
    defaultValues: ChangeName;
    user: Omit<User, "password">;
    setUser: React.Dispatch<React.SetStateAction<Omit<User, "password">>>;
}

export const NameForm = ({title, defaultValues, user, setUser} : Props) => {

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: defaultValues
  });
  const hiddenModalProfile = useModalStore(state => state.hiddenModalProfile)
  const [alert, setAlert] = useState(INITIAL_ALERT);
  const [isPending, transitionStart] = useTransition();

  const onSubmit = async (data: ChangeName) => {
    transitionStart(async () => {
        const { error, message, userSaved } = await updateUserWithOutPass({ id: user.id, field: "name", value: data.name});
        setAlert({error, message});
        if(userSaved) {
            setUser({ ...user, name: userSaved.name });
            setTimeout(() => {
                setAlert(INITIAL_ALERT);
                hiddenModalProfile();
            }, 3000);
        }
    });
  }

  return (
    <>
        <h2 className="text-2xl text-gray-800 font-medium text-center mb-6 capitalize">{title}</h2>
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
                    htmlFor="name"
                    className="text-gray-900 text-lg"
                >Name</label>
                <input 
                    type="name"
                    id="name"
                    placeholder="Your Name"
                    className="rounded-xl py-3 px-4 bg-gray-50"
                    {...register("name", { required: true })}
                />
                {errors.name && <Alert message="The name is required" />}
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
