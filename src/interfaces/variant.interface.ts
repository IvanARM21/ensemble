import { Size, SizeType } from "./sizes.interface";

export interface CreateVariant {
    name: string;
    productId: string;
    slug: string;
    price: number;
    colorId: string;
    sizes: {
        size: {
            id: string;
        };
        stock: number;
    }[],
    images: File[];
}

export interface Variant {
    id: string;
    name: string;
    productId?: string;
    slug: string;
    price: number;
    colorId?: string;
    color: {
        id: string;
        label: string;
        code: string;
    }
    sizes?: SizeWithStock[],
    images: {
        id: string;
        url: string;
        variantId: string;
    }[];
}

export type SizeWithStock = {
    size: {
        id: string;
        label: string;
        type: SizeType;
        order: number;
    };
    sizeId: string;
    stock: number;
    variantId: string;
}