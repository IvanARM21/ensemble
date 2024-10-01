import { Category, CreateVariant, ProductForm, SizeType } from "@/interfaces";

export const INITIAL_SIZE = { 
    id: "temporal-id", label: "", 
    order: 0, 
    type: "clothing" as SizeType 
};

export const INITIAL_COLOR = {
    id: "", 
    label: "",
    code: "#000000" 
};

export const INITIAL_ALERT = { 
    error: true, 
    message: "" 
};

export const INITIAL_CATEGORY : Category = { 
    id: "", 
    label: "", 
    image: "", 
    slug: "", 
    gender: "men", 
    type: "clothing" 
};

export const INITIAL_PRODUCT : ProductForm = {
    id: "",
    name: "",
    slug: "",
    price: 0,
    description: "",

    gender: "women",

    materials: [],
    tags: [],

    categoryId: "",
    variants: []
}

export const INITIAL_VARIANT : CreateVariant = {
    productId: "",
    name: "",
    slug: "",
    colorId: "",
    price: 0,
    sizes: [],
    images: [],
}
