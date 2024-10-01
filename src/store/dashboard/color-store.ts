import { create } from 'zustand';
import { Step, ColorContext, Alert, Color } from '@/interfaces';
import { INITIAL_ALERT, INITIAL_COLOR } from '@/constants';

const INITIAL_STEPS: Step<ColorContext>[] = [
    {
        numStep: 1,
        labelStep: "Form color",
        context: {
            color: INITIAL_COLOR,
            alert: INITIAL_ALERT
        },
        condition: ({}) => true,
    },
    {
        numStep: 2,
        labelStep: "Save color",
        context: {
            color: INITIAL_COLOR,
            alert: INITIAL_ALERT
        },
        condition: () => true
    }
]

const initialState = {
    currentStep: INITIAL_STEPS[0],
    color: INITIAL_COLOR,
    alert: INITIAL_ALERT,
    steps: INITIAL_STEPS,
}

interface ColorStore {
    currentStep: Step<ColorContext>;
    color: Color;
    steps: Step<ColorContext>[];
    alert: Alert;

    setColor: (color: Color) => void;
    onChange: (event : React.ChangeEvent<HTMLInputElement>) => void;
    setStep: (step: Step<ColorContext>) => void;
    reset: () => void;
}

const useColorStore = create<ColorStore>((set) => ({
    ...initialState,
    setColor: (color) => set({color}),
    onChange: (event) => set((state) => ({
        color: {
            ...state.color,
            [event.currentTarget.id]: event.currentTarget.id === "code" ? event.currentTarget.value.toUpperCase() : event.currentTarget.value
        }
    })),
    setStep: (step) => set(() => ({currentStep: step})),
    reset: () => set(() => ({...initialState}))
}));

export { useColorStore };