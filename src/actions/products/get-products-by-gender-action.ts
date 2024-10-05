import prisma from "@/lib/prisma";
import { Gender } from "@/interfaces";

export const getProductsByGender = async (gender: Gender) => {
    try {
        if(!gender) throw new Error("");
        const categoriesAndVariants = await prisma.category.findMany({
            where: { products: { some: { gender: gender } } },
            include: {
                products: {
                    include: {
                        variants: {
                            include: {
                                color: true, 
                                images: true
                            },
                        },
                    }
                }
            }
        });

        return { error: true, message: "", categoriesAndVariants };
    } catch (error) {
        return { error: true, message: "", productsByGender: null};
    }
}