"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { confirmAccount } from "@/actions";
import { Alert } from "@/components";

export const ConfirmState = () => {

  const params = useSearchParams();
  const token = params.get("token");
  const [alert, setAlert] = useState({ message: "", error: true });
  
  useEffect(() => {
    verifyAccount();
  }, []);

  const verifyAccount = async () => {
    if(!token || token.length !== 21) {
      setAlert({ message: "Token not valid", error: true });
      return;
    }

    const res = await confirmAccount(token);
    setAlert({ message: res.message, error: !res.ok });
  }

  if(alert.message === "") return <></>

  return (
    <div className="flex justify-center items-center gap-3 flex-col">
      <Alert 
        message={alert.message}
        error={alert.error}
      />
      {!alert.error && (
        <Link
          href="/auth/login"
          className="btn-secondary"
        >Sign In</Link>
      )}
    </div>
  )
}
