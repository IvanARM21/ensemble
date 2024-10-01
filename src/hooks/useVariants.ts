"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { INITIAL_ALERT, INITIAL_VARIANT } from "@/constants";
import { CreateVariant, Size } from "@/interfaces";
import { createVariant, getColors, getSizes, getSizesByType } from "@/actions";
import { createSlug, formattedSizes } from "@/utils";
import { useVariantStore } from "@/store";

interface Props {
    product: {
        id: string;
        price: number;
        name: string;
    }
}

export const useVariants = ({product} : Props) => {

    const router = useRouter();

    const { colors, sizes, variant, setColors, setSizes, setVariant, reset } = useVariantStore();

    const [modal, setModal] = useState(false);
    const [state, setState] = useState(false);
    const [alert, setAlert] = useState(INITIAL_ALERT);

    const [loading, setLoading] = useState(false);

    const [loaded, setLoaded] = useState(false);
    const params = useSearchParams();

    useEffect(() => setVariant({ productId: product.id, name: product.name, price: product.price }), [modal]);

    useEffect(() => setLoaded(true), [loaded]);

    useEffect(() => setState(params.get("addVariant") === "true"), [params.get("addVariant")]);
    
    useEffect(() => {
        getData();
    }, [sizes, colors, modal]);

    useEffect(() => {
        if(!loaded) return
        const handleKeyDown = (e : KeyboardEvent) => e.key === "Escape" && closeModal();
        if(state) {
            document.addEventListener("keydown", handleKeyDown);
            setModal(true);
        } else {
            setTimeout(() => {
                setModal(false);
                setAlert(INITIAL_ALERT)
            }, 300);
            return () => document.removeEventListener("keydown", handleKeyDown);
        }
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [state, loaded]);


    const getData = async () => {
        const callFns = {
            colors: !colors?.length ? () => getColors() : () => Promise.resolve(colors),
            sizes: !sizes?.length ? () => getSizes() : () => Promise.resolve(sizes) 
        }
        const [fetchedColors, fetchedSizes] = await Promise.all([callFns.colors(), callFns.sizes()]);

        if(fetchedColors) setColors(fetchedColors);
        if(fetchedSizes) setSizes(fetchedSizes);

        if(fetchedColors && fetchedColors[0]?.id) setVariant({colorId: fetchedColors[0].id });
    }

    
    const handleClickSize = (size : Size) => {
        // Verify if exists the size
        const sizesVariant = [...variant.sizes];
        const sizeExists = sizesVariant.some(sizeVariant => sizeVariant.size.id === size.id);

        if(sizeExists) {
            // Delete size
            const sizesUpdated = sizesVariant.filter(sizeVariant => sizeVariant.size.id !== size.id);
            setVariant({ ...variant, sizes: sizesUpdated });
        } else {
            // Add size
            const onlySizes = sizesVariant.map(size => size.size);
            const sizesUpdated = formattedSizes([...onlySizes, size]).map(size => ({ size: size, stock: 0 }));
            
            setVariant({ ...variant, sizes: sizesUpdated });
        }
    }


    const closeModal = () => {
        router.replace(`/dashboard/products/show/${product.id}`, {
            scroll: false
        });
        setTimeout(() => {
            reset();
        }, 400);
    };

    const variantNameWithColor = useMemo(() => {
        const color = colors.find(color => color.id === variant.colorId);
        return `${variant.name} ${color?.label ?? ""}`;
    }, [variant.colorId, variant.name]);

    const handleStockChange = (size: string, stock: number) => {
        const sizeModify = variant.sizes.findIndex(sizeVariant => sizeVariant.size.label === size);
        if(sizeModify !== -1) {
            const variantSizes = [...variant.sizes];
            variantSizes[sizeModify].stock = stock;
            setVariant({...variant, sizes: variantSizes});
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const color = colors.find(c => c.id === variant.colorId);
        const name = `${variant.name} ${color?.label}`;
        const slug = createSlug(name);

        const variantToSave : CreateVariant = { ...variant, name: name, slug: slug, productId: product.id, images: [] };

        const formData = new FormData();
        variant.images.forEach(image => {
            formData.append("files[]", image);
        });

        setLoading(true);
        const res = await createVariant(formData, variantToSave);
        setLoading(false);
        setAlert(res);
        
        if(!res.error) {
            setTimeout(() => {
                closeModal();
            }, 500);
        }
    }

    return { 
        colors, 
        sizes, 
        modal, 
        loaded, 
        closeModal, 
        state, 
        alert,
        handleClickSize,
        variant,
        setVariant,
        variantNameWithColor,
        handleStockChange,
        handleSubmit,
        loading
    };
}