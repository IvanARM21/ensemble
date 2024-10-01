import { create } from "zustand";
import { Alert, Color, Size, CreateVariant } from "@/interfaces";
import { INITIAL_ALERT, INITIAL_VARIANT } from "@/constants";

interface VariantStore {
    alert: Alert;
    variant: CreateVariant;
    colors: Color[];
    sizes: Size[];

    setVariant: (variant: Partial<CreateVariant>) => void;
    setColors: (colors: Color[]) => void;
    setSizes: (sizes: Size[]) => void;

    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

    reset: () => void;
}

const useVariantStore = create<VariantStore>((set) => ({
    alert: INITIAL_ALERT,
    variant: INITIAL_VARIANT,
    colors: [],
    sizes: [],

    setVariant: (variant) => set((prevState) => ({
        variant: {
            ...prevState.variant, 
            ...variant,          
        },
    })),
    
    setColors: (colors) => set({colors: colors}),
    setSizes: (sizes) => set({sizes: sizes}),
    onChange: (e) => set((prevState) => ({ variant: { ...prevState.variant, [e.currentTarget.name]:  +e.currentTarget.value || e.currentTarget.value } })),

    reset: () => set({ alert: INITIAL_ALERT, variant: INITIAL_VARIANT })
}));

export { useVariantStore };