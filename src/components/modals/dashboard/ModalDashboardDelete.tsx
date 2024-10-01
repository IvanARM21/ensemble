"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useModalDeleteStore } from "@/store";
import { Alert } from "@/components";
import { INITIAL_ALERT } from "@/constants";

export const ModalDashboardDelete = () => {

  const [modal, setModal] = useState(false);
  const [alert, setAlert] = useState(INITIAL_ALERT);
  const { modalState, closeModal, callback, id, title, message } = useModalDeleteStore();

  useEffect(() => {
    const handleKeyDown = (e : KeyboardEvent) => e.key === "Escape" && closeModal();
    if(modalState) {
        document.addEventListener("keydown", handleKeyDown);
        setModal(true);
    } else {
        setTimeout(() => {
            // Reset states
            setModal(false);
            setAlert(INITIAL_ALERT);
        }, 300);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [modalState]);

  const callFn = async () => {
    const result = await callback(id);
    if(result) {
        setAlert(result);
    }
    setTimeout(() => {
        if(!result?.error) closeModal();
    }, 1000);
  }

  return (
    <>
        {modal && (
            <div 
                className={clsx("bg-black bg-opacity-50 fixed inset-0 z-30 backdrop-blur-sm flex items-center justify-center px-2 cursor-pointer", {
                    "fade-in": modalState,
                    "fade-out": !modalState
                })}
                onClick={closeModal}
            >
                <div 
                    className={clsx("bg-white max-w-lg w-full rounded-xl p-6 relative cursor-default", {
                        "modal-in": modalState,
                        "modal-out": !modalState
                    })}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        type="button"
                        className="top-2 right-2 sm:top-3 sm:right-3 absolute text-red-600"
                        onClick={closeModal}
                    >
                        <XCircleIcon className="size-8" />
                    </button>
                    <h2 className="text-xl text-gray-800 font-semibold mb-2 capitalize">{title}</h2>
                    {alert.message.length ? (
                        <Alert {...alert} />
                    ) : (
                        <>
                            <p className="text-gray-500">{message}</p>
                            <p className="text-gray-500">#{id.split("-")[0]}</p>
                        </>
                    )}

                    <div className="flex justify-end items-center gap-5 mt-8">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="text-gray-500 font-medium hover:text-gray-800 transition-colors duration-300"
                        >
                            Cancel
                        </button>
                        <button 
                            type="button"
                            onClick={callFn}
                            className="bg-red-600 hover:bg-red-700 transition-colors duration-300 py-2 px-4 text-white font-medium cursor-pointer rounded-xl"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        )}
    </>
  )
}
