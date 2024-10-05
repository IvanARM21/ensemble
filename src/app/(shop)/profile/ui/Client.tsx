"use client";

import React, { useState } from "react"
import { ModalProfile, Title } from "@/components"
import { ProfileSidebar } from "./ProfileSidebar"
import { AccountItems } from "./account/AccountItems"
import { SecurityForm } from "./security/SecurityForm"
import { User } from "@/interfaces";

interface Props {
    userServer: Omit<User, "password">;
    params: {
        show: string;
    }
}

export const Client = ({userServer, params} : Props) => {
  const [user, setUser] = useState(userServer);
  // const [hasPass, setHasPass] = useState(hasPassServer);
  
  const show = params.show ?? "account";
  return (
    <>
        <section className="mt-6">
            <Title>Your Profile</Title>

            <div className="flex flex-col md:flex-row gap-6 lg:gap-16 items-start">
              <ProfileSidebar 
                user={user}
                show={show}
              />
              <div className="w-full h-full">
                {show === "account" && (
                  <>
                    <h2 className="text-2xl mb-8 text-gray-700 px-1 border-b w-fit">Account</h2>
                    <AccountItems 
                      user={user}
                    />
                  </>
                )}
                {show === "security" && (
                  <>
                    <h2 className="text-2xl mb-8 text-zinc-800 px-1 border-b w-fit">Security</h2>
                    <SecurityForm 
                      hasPass={true}
                    />
                  </>
                )}
                {show === "favorites" && (
                  <>
                    <h2 className="text-2xl mb-8 text-zinc-800 px-1 border-b w-fit">Favorites</h2>
                  </>
                )}
                {show === "orders" && (
                  <>
                    <h2 className="text-2xl mb-8 text-zinc-800 px-1 border-b w-fit">Orders</h2>
                  </>
                )}
              </div>
            </div>
          </section>

          <ModalProfile 
            user={user}
            setUser={setUser}
          />
    </>
  )
}
