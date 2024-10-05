
import React from "react";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { useColorStore } from "@/store";
import { Spinner, Alert } from "@/components";
import { createColor, updateColor } from "@/actions";
import { StepHeader } from "../StepHeader";

interface Props {
  type: "new" | "edit";
}


export const SaveColor = ({type} : Props) => {
  
  const router = useRouter();
  const { reset, color, setStep, steps } = useColorStore();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({message: "We are saving the color that you have created", error: false});
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    if(!hasMounted) {
        saveColor();
    }
  }, [hasMounted]);

  const saveColor = async () => {
    setLoading(true);

    // Execute the action according to the type
    const result =  type === "new" 
      ? await createColor(color) 
      : await updateColor(color);

    setLoading(false);
    setAlert(result);

    // Handle redirections and update state according to the result
    setTimeout(() => {
      if(!result.error) {
        router.replace("/dashboard/colors");
        setTimeout(() => {
          reset();
        }, 200);
      }
      if(result.error) setStep(steps[0]);
    }, 3000);
  }

  return (
    <>
        <StepHeader title="Save color" description="Here we save the sizes you have created."/>

        <div className="pt-6 flex flex-col gap-4 ">
          {loading && (
            <Spinner />
          )}
          <Alert {...alert} />
        </div>
    </>
  )
}
