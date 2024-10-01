
import { useState, useTransition } from "react";
import { signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import { updateUserWithPass, updateEmail } from "@/actions";
import { ChangeEmail, User } from "@/interfaces";
import { useModalStore } from "@/store";
import { INITIAL_ALERT } from "@/constants";
import { Alert } from "@/components";
import { ButtonCancel } from "./ButtonCancel";

interface Props {
    title: string;
    defaultValues: ChangeEmail;
    user: Omit<User, "password">;
    setUser: React.Dispatch<React.SetStateAction<Omit<User, "password">>>;
}

export const EmailForm = ({title, defaultValues, user, setUser} : Props) => {

  const { register, handleSubmit, formState: { errors } } = useForm<ChangeEmail>({
    defaultValues: defaultValues
  });
  const hiddenModalProfile = useModalStore(state => state.hiddenModalProfile);
  const [alert, setAlert] = useState(INITIAL_ALERT);
  const [isPending, transitionStart] = useTransition();

  const onSubmit = (data : ChangeEmail) => {
    transitionStart(async () => {
        const { error, message, userSaved } = await updateUserWithPass({id: user.id, password: data.password, field: "email", value: data.email, callback: updateEmail})
        setAlert({error, message});
        if(userSaved && !error) {
            setUser({ ...user, email: userSaved.email });
            setTimeout(() => {
                setAlert(INITIAL_ALERT);
                hiddenModalProfile();
                signOut();
            }, 5000);
        }
    });
  }
    
  return (
    <>
        <h2 className="text-2xl font-medium text-gray-800 text-center mb-6 capitalize">{title}</h2>
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
                {errors.email && <Alert message="The email is required"/>}
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
                {errors.password && <Alert message="The password is required"/>}
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
