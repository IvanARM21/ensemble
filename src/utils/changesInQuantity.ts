import { ProductCart, SizeClothing } from "@/interfaces";

interface Args {
    callback: (productId : string, variantId : string, size: SizeClothing) => void;
    callbackTwo: (productId : string, variantId : string, size: SizeClothing, newQuantity : number) => void;
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