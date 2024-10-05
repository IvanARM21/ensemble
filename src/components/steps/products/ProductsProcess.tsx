"use client";

import React from "react";
import { useProductStore } from "@/store"
import { useProducts } from "@/hooks";
import { Category, Color, ContextType, Step } from "@/interfaces";
import { StepNav } from "../StepNav";
import { ProductForm } from "./ProductForm";
import { MaterialsAndTags } from "./MaterialsAndTags";
import { NavForm } from "../NavButtonSteps";
import { ProductSave } from "./ProductSave";

interface Props {
  colorsDB: Color[];
  categoriesDB: Category[];
}

export const ProductsProcess = ({colorsDB, categoriesDB} : Props) => {


  useProducts({ colorsDB, categoriesDB });
  const { currentStep, steps, alert, product, setStep } = useProductStore();

  return (
    <>
        <StepNav 
            steps={steps as Step<ContextType>[]}
            currentStep={currentStep as Step<ContextType>}
            setStep={setStep as (step: Step<ContextType>) => void}
            context={{ product, alert }}
        />

        {currentStep.numStep === 1 && 
          <ProductForm />
        }
        {currentStep.numStep === 2 && 
          <MaterialsAndTags />
        }
        {currentStep.numStep === 3 &&
          <ProductSave />
        }

        <NavForm 
            className={currentStep.numStep === steps.length ? "hidden" : ""}
            steps={steps as Step<ContextType>[]}
            currentStep={currentStep as Step<ContextType>}
            setStep={setStep as (step: Step<ContextType>) => void}
            alert={alert}
            condition={currentStep.condition({product, alert})}
        />
    </>
  )
}
