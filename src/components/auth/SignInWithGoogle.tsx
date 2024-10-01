"use server";

import Image from "next/image";
import { signIn } from "@/auth";

export const SignInWithGoogle = () => {
  return (
    <>
      <div className="flex items-center">
        <div className="h-[1px] w-full bg-gray-200"/> 
        <p className="text-center text-gray-700 my-2 px-8">or</p>
        <div className="h-[1px] w-full bg-gray-200"/> 
      </div>
      <form
        action={async () => {
          "use server";
          await signIn("google", {
            redirectTo: "/"
          });
        }}
      >
        <button 
          type="submit"
          className="btn-secondary flex items-center justify-center border w-full rounded-xl"
          >
          <Image 
              src={"/google.webp"}
              alt=""
              width={42}
              height={42}
          /> 
          Sign in with Google
        </button>
      </form>
    </> 
   
  )
 
}
