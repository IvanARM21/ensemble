"use client";

import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import clsx from "clsx";
import { User } from "@/interfaces";
import { XCircle } from "@/icons";
import { useModalStore } from "@/store";
import { NameForm } from "./form/NameForm";
import { EmailForm } from "./form/EmailForm";
import { PhoneForm } from "./form/PhoneForm";
import { ChangePasswordForm } from "./form/ChangePasswordForm";

interface Props {
    user: Omit<User, 'password'>
    setUser: Dispatch<SetStateAction<Omit<User, "password">>>;
    setHasPass: Dispatch<SetStateAction<boolean>>
}

export const ModalProfile = ({user, setUser, setHasPass} : Props) => {

  const { profileField, hiddenModalProfile, modalProfileState, profileAction } = useModalStore();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e : KeyboardEvent) => e.key === "Escape" && hiddenModalProfile();
    if(modalProfileState) {
        document.addEventListener("keydown", handleKeyDown)
        setModal(true);
    } else {
        setTimeout(() => {
            setModal(false);
        }, 300);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [modalProfileState]);

  const renderForm = () => {
    const title = profileAction === "add" ? `Enter Your ${profileField}` : `Update Your ${profileField}`;

    if(profileField === "name") return <NameForm title={title} defaultValues={{name: user.name}} user={user} setUser={setUser} />
    if(profileField === "email") return <EmailForm title={title} defaultValues={{email: user.email, password: ""}} user={user} setUser={setUser} />
    if(profileField === "phone") return <PhoneForm title={title} defaultValues={{phone: user.phone ?? "", password: ""}} user={user} setUser={setUser} />
    if(profileField === "changePassword") return <ChangePasswordForm user={user} />

    hiddenModalProfile();
  }

  return (
    <>
        {modal && (
            <div 
                className={clsx("bg-black bg-opacity-50 fixed inset-0 z-30 backdrop-blur-sm flex items-center justify-center px-2 cursor-pointer", {
                    "fade-in": modalProfileState,
                    "fade-out": !modalProfileState
                })}
                onClick={hiddenModalProfile}
            >
                <div 
                    className={clsx("bg-white max-w-3xl w-full rounded-3xl px-4 py-8 sm:p-10 relative cursor-default", {
                        "modal-in": modalProfileState,
                        "modal-out": !modalProfileState
                    })}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        type="button"
                        className="top-2 right-2 sm:top-3 sm:right-3 absolute text-red-600"
                        onClick={hiddenModalProfile}
                    >
                        <XCircle />
                    </button>

                    {renderForm()}
                </div>
            </div>
        )}
    </>
  )
}
