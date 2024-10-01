import clsx from 'clsx';
import { CheckIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Step, ContextType } from '@/interfaces';
import { setStepAndValidate } from '@/utils';

interface Props {
  setStep: (step: Step<ContextType>) => void;
  steps: Step<ContextType>[];
  currentStep: Step<ContextType>;
  context: ContextType;
}

export const StepNav = ({ setStep, steps, currentStep, context }: Props) => {
  return (
    <nav className="my-10">
      <ol className="flex flex-col md:flex-row gap-5 w-full">
        {steps.map(step => (
          <li
            key={step.labelStep}
            onClick={() => setStep(setStepAndValidate(currentStep, step, context))}
            className={clsx("py-4 first:ml-0 flex-1 flex items-center rounded-lg px-4 cursor-pointer", {
              "bg-blue-50 border border-blue-600/10 text-blue-700": step.numStep <= currentStep.numStep,
              "py-4 first:ml-0 flex-1 flex items-center rounded-lg px-4 border": !(step.numStep <= currentStep.numStep)
            })}
          >
            <div className="flex justify-between items-center w-full">
              <p className="flex flex-col">
                <span className=" font-medium">Step {step.numStep}</span>
                <span className={"text-sm text-gray-600"}

                >{step.labelStep}</span>
              </p>
              {step.numStep < currentStep.numStep && (
                <CheckIcon className="size-8 p-1 text-blue-700 border border-blue-600/20 rounded-full" />
              )}
              {step.numStep === currentStep.numStep && step.numStep < steps.length && (
                <ChevronRightIcon className={clsx("size-8 p-1 rounded-full text-blue-700 border-blue-600/20 border", {
                  "border": step.numStep > currentStep.numStep,
                })} />
              )}
              {step.numStep > currentStep.numStep && step.numStep < steps.length && (
                <ChevronRightIcon className={clsx("size-8 p-1 rounded-full border")} />
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};
