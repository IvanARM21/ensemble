"use client";

import { useEffect } from "react";
import { useSizeStore } from "@/store";
import { useSizes } from "@/hooks";
import { ContextType, Size, Step } from "@/interfaces";
import { StepNav } from "../StepNav";
import { SizeForm } from "./SizeForm";
import { SizesOrder } from "./SizesOrder";
import { SaveSize } from "./SaveSize";
import { NavForm } from "../NavButtonSteps";

interface Props {
  type: "new" | "edit";
  size: Size | null
}

export const SizeProcess = ({type, size : sizeEdit} : Props) => {

  const { sizes, setSizes } = useSizes();
  const { currentStep, alert, size, setStep, steps, setSize } = useSizeStore();

  useEffect(() => {
    if(sizeEdit?.id) {
      setSize(sizeEdit);
    }
  }, []);

  return (
    <>
        <StepNav
          steps={steps as Step<ContextType>[]}
          currentStep={currentStep as Step<ContextType>}
          setStep={setStep as (step: Step<ContextType>) => void}
          context={{ size, alert }}
        />
        {currentStep.numStep === 1 && (
          <SizeForm />
        )}
        {currentStep.numStep === 2 && (
          <SizesOrder sizes={sizes} setSizes={setSizes}/>
        )}
        {currentStep.numStep === 3 && (
          <SaveSize sizes={sizes} type={type}/>
        )}
        <NavForm 
          className={currentStep.numStep === steps.length ? "hidden" : ""}
          steps={steps as Step<ContextType>[]}
          currentStep={currentStep as Step<ContextType>}
          setStep={setStep as (step: Step<ContextType>) => void}
          alert={alert}
          condition={currentStep.condition({size, alert})}
        />
    </>
  )
}
