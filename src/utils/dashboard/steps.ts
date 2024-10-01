import { CategoryContext, ColorContext, ContextType, SizeContext, Step } from "@/interfaces";

export const handleNextStep = (currentStep : number, max : number) => currentStep+1 > max ? currentStep : currentStep+1;

export const handleBackStep = (currentStep : number) => currentStep-1 < 1 ? currentStep : currentStep-1;

export const getContextSpecificValue = (context: ContextType): SizeContext | ColorContext | CategoryContext | null => {
  if ('size' in context && 'alert' in context) {
    return context as SizeContext;
  }
  if('color' in context && 'alert' in context) {
    return context as ColorContext;
  }
  if('category' in context && 'alert' in context) {
    return context as CategoryContext;
  }
  return null;
};

export const setStepAndValidate = <T extends ContextType>(
  currentStep: Step<T>,
  step: Step<T>,
  args: T
): Step<T> => {
  const context = getContextSpecificValue(args);
  
  if (context) {
    return currentStep.condition(context as T) ? step : currentStep;
  }

  navigator.vibrate(100);

  return currentStep;
};

export const convertToBase64Str = (file: string | File | null): null | Promise<string | null> | undefined => {
  if (!file || file instanceof String) return null;
  if (!(file instanceof Blob)) return null;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file as File);
  });
};
        