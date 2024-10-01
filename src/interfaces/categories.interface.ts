
export type CategoryType = "clothing" | "accessories" | "shoes";
export type Gender = "men" | "women" | "unisex";

export interface Category {
    id: string;
    label: string;
    slug: string;
    gender: Gender | null;
    type: CategoryType | null;
    image: string | File | null;
}
