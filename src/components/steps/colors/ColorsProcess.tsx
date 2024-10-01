"use client";

import { useEffect } from "react";
import { useColorStore } from "@/store";
import { Color, ContextType, Step } from "@/interfaces";
import { StepNav } from "../StepNav";
import { ColorForm } from "./ColorForm";
import { SaveColor } from "./SaveColor";
import { NavForm } from "../NavButtonSteps";

interface Props {
  type: "new" | "edit";
  color: Color | null;
}

export const ColorsProcess = ({type, color : colorEdit } : Props) => {

  const { currentStep, alert, color, setColor, setStep, steps } = useColorStore();

  useEffect(() => {
    if(colorEdit?.id) {
      setColor(colorEdit);
    }
  }, []);

  return (
    <>
        <StepNav 
            steps={steps as Step<ContextType>[]}
            currentStep={currentStep as Step<ContextType>}
            setStep={setStep as (step: Step<ContextType>) => void}
            context={{ color, alert }}
        />

        {currentStep.numStep === 1 && (
          <ColorForm />
        )}
        {currentStep.numStep === 2 && (
          <SaveColor type={type} />
        )}

        <NavForm 
            className={currentStep.numStep === steps.length ? "hidden" : ""}
            steps={steps as Step<ContextType>[]}
            currentStep={currentStep as Step<ContextType>}
            setStep={setStep as (step: Step<ContextType>) => void}
            alert={alert}
            condition={currentStep.condition({color, alert})}
        />
    </>
  )
}
