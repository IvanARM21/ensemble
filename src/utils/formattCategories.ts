import { Category, CategoryType, Gender } from "@/interfaces";

interface Result {
    [key: string]: Category[];
}

interface GenderFormatted {
    men: Category[];
    women: Category[];
    unisex: Category[];
}

export const formattCategories = (categories : Category[] = []) => {
    const categoriesFormatted = categories.reduce((acc : Result, prev) => {
        acc[prev.type as CategoryType] = acc[prev.type as CategoryType] || [];
        acc[prev.type as CategoryType].push(prev);
        return acc;
    }, {} as Result);

    const clothingByGenders = formattGender(categoriesFormatted.clothing);
    const shoesByGenders = formattGender(categoriesFormatted.shoes);
    const accesoriesByGenders = formattGender(categoriesFormatted.accessories);

    return { accesories: accesoriesByGenders, clothing: clothingByGenders, shoes: shoesByGenders }
}

export const getCategoriesByOrder = (categories: Category[]) => {
    const categoriesSliderFormatted = categories.reduce((acc : Result, prev) => {
        acc[prev.gender ?? "unisex"] = acc[prev.gender ?? "unisex"] || [];
        acc[prev.gender ?? "unisex"].push(prev);
        return acc;
    }, {} as Result);
    const categoriesWomen = categoriesSliderFormatted.women;
    const categoriesMen = categoriesSliderFormatted.men;
    const categoriesUnisex = categoriesSliderFormatted.unisex;

    return { women: categoriesWomen || [], men: categoriesMen || [], unisex: categoriesUnisex || [] };
}

export const formattCategoriesByGender = (categories : Category[] = []) => {
    const { women, men, unisex } = getCategoriesByOrder(categories);
    return [...women, ...men, ...unisex];
}

export const formattCategoriesForGender = (categories: Category[], gender: Gender) => {
    const { women, men , unisex } = getCategoriesByOrder(categories);
    switch(gender) {
        case "women":
            return women;
        case "men": 
            return men;
        case "unisex":
            return unisex;
        default: 
            return unisex;
    }
}

const formattGender = (clothing : Category[]) => {
    if(!clothing) return { men: [], women: [] };

    const formattGender = clothing.reduce((acc : GenderFormatted, prev) => {
        acc[prev.gender ?? "unisex"] = acc[prev.gender ?? "unisex"] || {};
        acc[prev.gender ?? "unisex"].push(prev);
        return acc;
    }, { men: [], women: [], unisex: []});
    
    const { men, unisex, women } = formattGender;
    return {
        men: [...men, ...unisex],
        women: [...women, ...unisex]
    }
}