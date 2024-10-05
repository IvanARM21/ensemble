import { Category } from "@/interfaces";
import { Variant } from "./variant.interface";

type Gender = "women" | "men" | "unisex";

// type SizeWithStock = {
//     size: Size;
//     stock: number
// }

export type Product = {
    id?: string;
    name: string;
    slug: string;
    price: number;
    description: string;
    
    gender: Gender;

    materials: string[];
    tags: string[];

    categoryId: Category["id"];
    category?: Category;
    variants: Variant[];
}

export type ProductForm = {
    id?: string;
    name: string;
    slug: string;
    price: number;
    description: string;
    
    gender: Gender;

    materials: string[];
    tags: string[];

    categoryId: Category["id"];
    variants: Variant[];
}

// export type Variant = {
//     id?: string;
//     label: string;
//     price?: number;

//     // images: string[];
    
//     colorId: Color;
//     productId?: string;
// }

export type ProductCart = {
    productId: string;
    variantId: string;
    slug: string;
    name: string;
    price: number;
    color: string;
    image: string;
    size: {
        id: string
        label: string
    };
    quantity: number;
    stock: number;
}






