
import { create } from "zustand";
import { Step, Alert, ProductContext, Category, ProductForm, Gender, Color } from '@/interfaces';
import { INITIAL_ALERT, INITIAL_PRODUCT } from "@/constants";

const INITIAL_STEPS : Step<ProductContext>[] = [
    {
        numStep: 1,
        labelStep: "Form product",
        context: {
            alert: INITIAL_ALERT,
            product: INITIAL_PRODUCT
        },
        condition: ({product, alert}) => {
            const { materials, tags, variants, id, ...required } = product;
            if(!Object.values(required).includes("")) {
                return true;
            }
            return false;
        }
    },
    {
        numStep: 2,
        labelStep: "Materials and tags",
        context: {
            alert: INITIAL_ALERT,
            product: INITIAL_PRODUCT
        },
        condition: () => true
    },
    {
        numStep: 3,
        labelStep: "Save product",
        context: {
            alert: INITIAL_ALERT,
            product: INITIAL_PRODUCT
        },
        condition: () => true
    }
]

type TypeOfQuery = "new" | "edit";

const intialState = {
    currentStep: INITIAL_STEPS[0],
    product: INITIAL_PRODUCT,
    alert: INITIAL_ALERT,
    steps: INITIAL_STEPS,
    type: "new" as TypeOfQuery
}

interface ProductStore {
    currentStep: Step<ProductContext>;
    product: ProductForm;
    alert: Alert;
    steps: Step<ProductContext>[];
    type: TypeOfQuery;


    categories: Category[];
    setCategories: (categories: Category[]) => void;
    setCategoryDefaultByGender: (categories: Category[], gender : Gender) => void;

    colors: Color[];
    setColors: (colors: Color[]) => void;

    setAlert: (alert : Alert) => void;

    setType: (type : TypeOfQuery) => void;
    setProduct: (product : ProductForm) => void;
    onChange: (event : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    setStep: (step : Step<ProductContext>) => void;
    reset: () => void;
}

const useProductStore = create<ProductStore>((set) => ({
    ...intialState,

    categories: [],
    colors: [],

    setColors: (colors) => set(() => ({colors})),

    setCategories: (categories) => set(() => ({ categories })),

    setCategoryDefaultByGender: (categories, gender) => set((state) => ({ product: {
        ...state.product,
        gender: gender,
        categoryId: categories[0].id,
    }})),
    
    setAlert: (alert) => set(() => ({ alert })),

    setType: (type) => set(() => ({ type })),
    setProduct: (product) => set(() => ({ product })),
    onChange: (event) => {
        const { name, value } = event.currentTarget;
        set((state) => ({
            product: {
                ...state.product,
                [name]: +value ? +value : value,
            },
        }));
    },
    setStep: (step) => set(() => ({ currentStep: step })),
    reset: () => set(() => (intialState)),
}));

export { useProductStore };