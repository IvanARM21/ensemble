import { ProductCart, Size, } from "@/interfaces";
import { SizeType } from "@prisma/client";

interface Args {
    callback: (productId : string, variantId : string, size: {
        id: string;
        label: string;
    }) => void;
    callbackTwo: (productId : string, variantId : string, size: {
        id: string;
        label: string;
    }, newQuantity : number) => void;
}

export const handleClickIncrease = (item : ProductCart, callback : Args["callback"]) => {
    if((item.quantity + 1) <= item.stock) {
        callback(item.productId, item.variantId, item.size);
    }
}

export const handleChangeQuantity = (e : React.FormEvent<HTMLInputElement>, item : ProductCart, callback : Args["callbackTwo"]) => {
const newQuantity = +e.currentTarget.value;
    if(newQuantity <= item.stock) {
        callback(item.productId, item.variantId, item.size, newQuantity);
    }
}

export const handleClickDecrease = (item : ProductCart, callback : Args["callback"]) => {
    if((item.quantity - 1) >= 1) {
        callback(item.productId, item.variantId, item.size);
    }
}