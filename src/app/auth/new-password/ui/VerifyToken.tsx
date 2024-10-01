"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { verifyToken } from "@/actions";
import { Alert } from "@/components";
import { NewPasswordForm } from "./NewPasswordForm";

export const VerifyToken = () => {

  const params = useSearchParams();
  const token = params.get("token");
  const [alert, setAlert] = useState({ message: "", error: true });

  useEffect(() => {
    onLoaded();
  }, [token]);

  const onLoaded = async () => {
    if(!token || token.length !== 21) {
      setAlert({ message: "Token not valid", error: true });
      return;
    }
    const resp = await verifyToken(token);
    setAlert({message: resp.message, error: !resp.ok});
  }

  return (
    <>
      {alert.message.length > 0 && (
          <div className="flex justify-center items-center flex-col gap-3">
              <Alert 
                  message={alert.message}
                  error={alert.error}
              />
              {alert.error && (
                <Link
                  href="/"
                  className="btn-secondary"
                >Go to home</Link>
              )}
          </div>
          
      )}
      {token && !alert.error && (
        <NewPasswordForm token={token} alertBd={alert} />
      )}
    </>
  )
}
