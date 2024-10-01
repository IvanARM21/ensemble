"use client";

import { useModalStore } from "@/store";

interface Props {
    hasPass: boolean;
}

export const SecurityForm = ({hasPass} : Props) => {

  const showModalProfile = useModalStore(state => state.showModalProfile);


  return (
    <div className="flex items-center justify-between h-full">
        {hasPass ? (
            <button
                type="button"
                className="btn-secondary"
                onClick={() => showModalProfile("edit", "changePassword")}
            >Change password</button>
        ) : (
            <button
                type="button"
                className="btn-secondary"
            >Create password</button>
        )}

        <button
            type="button"
            className="bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-xl font-bold transition-colors duration-300"
        >Delete account</button>
    </div>
  )
}
