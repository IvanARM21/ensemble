
export interface Size {
    id: string;
    label: string;
    type: SizeType;
    order: number
}

export type SizeType = "clothing" | "pants" | "shoes";
