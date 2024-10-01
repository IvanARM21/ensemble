import clsx from "clsx";
import { Step, ContextType, Alert } from "@/interfaces";
import { handleBackStep, handleNextStep } from "@/utils";

interface Props {
    className?: string;
    setStep: (step: Step<ContextType>) => void;
    steps: Step<ContextType>[];
    currentStep: Step<ContextType>;
    alert: Alert;
    condition: boolean;
}

export const NavForm = ({className = "", currentStep, setStep, steps, condition} : Props) => {

  return (
    <div className={`flex justify-end gap-6 ${className} py-10 mt-10 border-t`}>
        <button
            type="button"
            onClick={() => setStep(steps[handleBackStep(currentStep.numStep)-1])}
            className={clsx("cursor-pointer py-2 px-4 border rounded-xl hover:bg-gray-100 transition-colors duration-300", {
                "hidden": currentStep.numStep-1 === 0,
            })}
        >
            Back step
        </button>
        <button
            type="button"
            onClick={() => setStep(steps[handleNextStep(currentStep.numStep, steps.length)-1])}
            className={clsx("cursor-pointer py-2 px-4 rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-no-drop disabled:opacity-30", {

            })}
            disabled={!condition}
        >
            Next step
        </button>
    </div>
  )
}
