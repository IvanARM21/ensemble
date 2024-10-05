import { create } from "zustand";
import { Step, CategoryContext, Category, Alert } from "@/interfaces";
import { INITIAL_ALERT, INITIAL_CATEGORY } from "@/constants";

const INITIAL_STEPS: Step<CategoryContext>[] = [
    {
        numStep: 1,
        labelStep: "Form category",
        context: {
            category: INITIAL_CATEGORY,
            alert: INITIAL_ALERT
        },
        condition: ({category}) => {
            const required = {
                label: category.label,
                slug: category.slug,
                type: category.type
            }
            if(!Object.values(required).includes("")) {
                return true;
            }
            return false;
        },
    },
    {
        numStep: 2,
        labelStep: "Preview category",
        context: {
            category: INITIAL_CATEGORY,
            alert: INITIAL_ALERT
        },
        condition: () => true
    },
    {
        numStep: 3,
        labelStep: "Save category",
        context: {
            category: INITIAL_CATEGORY,
            alert: INITIAL_ALERT
        },
        condition: () => true,
    }
]

type TypeOfQuery = "new" | "edit";

const initialState = {
    currentStep: INITIAL_STEPS[0],
    category: INITIAL_CATEGORY,
    alert: INITIAL_ALERT,
    steps: INITIAL_STEPS,
    type: "new" as  TypeOfQuery
}

interface CategoryStore {
    currentStep: Step<CategoryContext>;
    category: Category;
    steps: Step<CategoryContext>[];
    alert: Alert;
    type: TypeOfQuery;

    setType: (type : TypeOfQuery) => void;
    setCategory: (category: Category) => void;
    onChange: (event : React.ChangeEvent<HTMLInputElement>) => void;
    setStep: (step: Step<CategoryContext>) => void;
    reset: () => void;
}

const useCategoryStore = create<CategoryStore>((set) => ({
    ...initialState,

    setType: (type) => set(() => ({ type })),
    setCategory: (category) => set(() => ({ category })),
    onChange: (event) => {
        const { name, value } = event.currentTarget;
        set((state) => ({
            category: {
                ...state.category,
                [name]: +value ? value : value,
            },
        }));
    },
    setStep: (step) => set(() => ({ currentStep: step })),
    reset: () => set(() => ({ ...initialState })),
}));

export { useCategoryStore };
  