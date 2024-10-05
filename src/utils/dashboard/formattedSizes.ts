import { Size, SizeWithStock } from "@/interfaces";

interface Result {
    [key: string]: Size[]; // Agrupa los tamaños por tipo como un array
}

export const formattedSizes = (sizes: Size[]) => {
    const sizesOrder = sizes.sort((a, b) => a.order - b.order);
    const sizesByType = sizesOrder.reduce((acc: Result, prev: Size) => {
        acc[prev.type] = acc[prev.type] || [];
        acc[prev.type].push(prev);
        return acc;
    }, {} as Result);

    // Devuelve simplemente los valores del objeto agrupado
    const sizesFormatt = Object.values(sizesByType).flat();
    return sizesFormatt;
};

export const formattedSizesWithStock = (sizes : SizeWithStock[]) => sizes.sort((a,b) => a.size.order - b.size.order);