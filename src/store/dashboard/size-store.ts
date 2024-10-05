
import { create } from 'zustand';
import { SizeContext, Step, Size, Alert, SizeType } from '@/interfaces';
import { INITIAL_ALERT, INITIAL_SIZE } from '@/constants';

const INITIAL_STEPS: Step<SizeContext>[] = [
    {
        numStep: 1,
        labelStep: "Form size",
        context: {
            size: INITIAL_SIZE,
            alert: INITIAL_ALERT
        },
        condition: ({ size, alert }) => {
            const conditionOne = (size.label.length === 0 || size.type.length === 0);
            const conditionTwo =(alert.message.length > 0 && alert.error);
            if(!(conditionOne || conditionTwo)) {
               return true;
            }
            return false;
        }
    },
    {
        numStep: 2,
        labelStep: "Order size",
        context: {
            size: INITIAL_SIZE,
            alert: INITIAL_ALERT
        },
        condition: () => true
    },
    {
        numStep: 3,
        labelStep: "Save size",
        context: {
            size: INITIAL_SIZE,
            alert: INITIAL_ALERT
        },
        condition: () => true
    }
];

const initialState = {
    currentStep: INITIAL_STEPS[0],
    sizesByType: [] as Size[],
    size: INITIAL_SIZE,
    alert: INITIAL_ALERT,
    steps: INITIAL_STEPS,
    modalState: false,
};

interface SizeStore {
    currentStep: Step<SizeContext>;
    size: Size;
    sizesByType: Size[];
    steps: Step<SizeContext>[];
    alert: Alert;

    modalState: boolean;
    showModalDelete: () => void;
    hiddenModalDelete: () => void;

    setSize: (size : Size) => void;
    setAlert: (alert: Alert) => void;
    setSizesByType: (sizes: Size[]) => void;
    setLabel: (value: string) => void;
    setType: (value: SizeType) => void;
    setStep: (step: Step<SizeContext>) => void;
    reset: () => void;
}

const useSizeStore = create<SizeStore>((set) => ({
    ...initialState,

    showModalDelete: () => set({modalState: true}),
    hiddenModalDelete: () => set({modalState: false}),

    reset: () => set(() => ({ ...initialState })),

    setSize: (size) => set({size: size}),
    setAlert: (alert: Alert) => set((state) => ({ ...state, alert })),

    setSizesByType: (sizes: Size[]) => set((state) => ({
        sizesByType: sizes,
        size: {
            ...state.size,
            order: sizes.length + 1
        }
    })),

    setLabel: (value: string) => set((state) => ({
        size: { ...state.size, label: value }
    })),

    setType: (value: SizeType) => set((state) => ({
        size: { ...state.size, type: value }
    })),

    setStep: (step: Step<SizeContext>) => set({ currentStep: step }),
}));

export { useSizeStore };
