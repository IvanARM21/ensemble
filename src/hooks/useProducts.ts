
import { useEffect } from 'react';
import { useProductStore } from '@/store'
import { Category, Color } from '@/interfaces';
import { formattCategoriesForGender } from '@/utils';

interface Props {
    colorsDB: Color[];
    categoriesDB: Category[];
}

export const useProducts = ({ colorsDB, categoriesDB } : Props) => {
  
    const { 
        setCategories, 
        setColors,
        colors,
        categories, 
        setCategoryDefaultByGender, 
        product 
    } = useProductStore();

    useEffect(() => {
        setCategories(categoriesDB);
    }, [categoriesDB, categories]);

    useEffect(() => {
        setColors(colorsDB);
    }, [colorsDB, colors]);

    useEffect(() => {
        if(categories.length && product.gender) {
            setCategoryDefaultByGender(formattCategoriesForGender(categories, product.gender), product.gender);
        }
    }, [product.gender, categories]);

    return {};
}
