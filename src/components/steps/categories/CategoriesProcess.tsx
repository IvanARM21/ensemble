"use client";

import { useCategoryStore } from "@/store";
import { Category, ContextType, Step } from "@/interfaces";
import { StepNav } from "../StepNav"
import { NavForm } from "../NavButtonSteps";
import { CategoryForm } from "./CategoryForm";
import { CategoryPreview } from "./CategoryPreview";
import { CategorySave } from "./CategorySave";
import { useEffect, useState } from "react";

interface Props {
  type: "new" | "edit";
  categoryEdit?: Category;
}

export const CategoriesProcess = ({type : typeProp, categoryEdit} : Props) => {

  const { currentStep, alert, category, setCategory, setStep, steps, setType, reset, type } = useCategoryStore();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    return () => reset();
  }, []);

  useEffect(() => {
    setType(typeProp);
  }, [type]);

  useEffect(() => {
    setLoaded(true);
    if(categoryEdit) {
      setCategory(categoryEdit);
    }
  }, [categoryEdit, loaded]);

  return (
    <>
      <StepNav 
        steps={steps as Step<ContextType>[]}
        currentStep={currentStep as Step<ContextType>}
        setStep={setStep as (step: Step<ContextType>) => void}
        context={{ category, alert }}
      />

      {currentStep.numStep === 1 &&
        <CategoryForm />
      }
      {currentStep.numStep === 2 && 
        <CategoryPreview />
      }
      {currentStep.numStep === 3 && 
        <CategorySave />
      }

      <NavForm 
        className={currentStep.numStep === steps.length ? "hidden" : ""}
        steps={steps as Step<ContextType>[]}
        currentStep={currentStep as Step<ContextType>}
        setStep={setStep as (step: Step<ContextType>) => void}
        alert={alert}
        condition={currentStep.condition({category, alert})}
      />
    </>
  )
}
