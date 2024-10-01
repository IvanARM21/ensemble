import { Product, Variant } from "@/interfaces";
import { create } from "zustand";

interface ProductPageStore {
    variant: Variant | null;
    product: Product | null;

    setVariant: (variant: Variant) => void;
    setProduct: (product: Product) => void;

    reset: () => void;
}

export const useProductPageStore = create<ProductPageStore>((set) => ({
    variant: null,
    product: null,

    setVariant: (variant) => set({variant}),
    setProduct: (product) => set({product}),

    reset: () => set({variant: null, product: null})
}));