

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { ProductCart, Size,  } from '@/interfaces';
import { toast } from 'react-toastify';
import { calculateDiscount } from '@/utils';

interface SizeClothing { };

interface CartStore {
    cart: ProductCart[];
    isVisible: boolean;

    showCart: () => void;
    hiddenCart: () => void;

    getQuantityProducts: () => number;
    getCalculateTax: () => number;
    getSubtotalPrice: () => number;
    getTotalPrice: () => number;

    addProduct: (product: ProductCart) => void;
    removeProduct: (productId: string, variantId: string, size: SizeClothing) => void;
    increaseQuantity: (productId: string, variantId: string, size: SizeClothing) => void
    decreaseQuantity: (productId: string, variantId: string, size: SizeClothing) => void
    changeQuantity: (productId: string, variantId: string, size: SizeClothing, quantity: number) => void
}

const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            cart: [],
            isVisible: false,

            showCart: () => set(() => ({isVisible: true})),
            hiddenCart: () => set(() => ({isVisible: false})),

            getQuantityProducts: () => get().cart.reduce((acc, value) => value.quantity + acc, 0),

            getSubtotalPrice: () => {
                return get().cart.reduce((acc, value) => 
                    (value.quantity * (value.price - calculateDiscount(value.price, 0))) + acc, 0 // Modify
                );
            },

            getCalculateTax: () => {
                const subtotal = get().getSubtotalPrice();
                return subtotal * 0.15;
            },

            getTotalPrice: () => {
                const subtotal = get().getSubtotalPrice();
                const tax = get().getCalculateTax();
                return subtotal + tax;
            },

            addProduct: (product) => {
                set((state) => {
                    const productExists = state.cart.findIndex(productCart =>
                        productCart.productId === product.productId &&
                        productCart.variantId === product.variantId &&
                        productCart.size === product.size
                    );

                    if (productExists === -1) {
                        toast.success("Product successfully added");
                        return ({ cart: [...state.cart, product] });
                    }

                    toast.success("Product successfully updated");
                    const updatedCart = [...state.cart];
                    updatedCart[productExists] = product;
                    return ({ cart: [...updatedCart] });
                });
            },

            removeProduct: (productId, variantId, size) => {
                set((state) => ({
                    cart: state.cart.filter(product => 
                        product.productId !== productId ||
                        product.variantId !== variantId ||
                        product.size !== size
                    )
                }));
                toast.error("Product successfully disposed of");
            },

            increaseQuantity: (productId, variantId, size) => set((state) => ({
                cart: state.cart.map(product => 
                    product.productId === productId &&
                    product.variantId === variantId &&
                    product.size === size 
                    ? { ...product, quantity: product.quantity + 1 } : product)
            })),

            decreaseQuantity: (productId, variantId, size) => set((state) => ({
                cart: state.cart.map(product => 
                    product.productId === productId &&
                    product.variantId === variantId &&
                    product.size === size 
                    ? { ...product, quantity: product.quantity - 1 } : product)
            })),

            changeQuantity: (productId, variantId, size, quantity) => set((state) => ({
                cart: state.cart.map(product => 
                    product.productId === productId &&
                    product.variantId === variantId &&
                    product.size === size 
                    ? { ...product, quantity } : product)
            }))
        }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage)
        }
    )
);
export { useCartStore };
