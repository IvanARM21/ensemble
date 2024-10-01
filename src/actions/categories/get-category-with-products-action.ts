import { Gender } from "@/interfaces";
import prisma from "@/lib/prisma";

export const getCategoryWithProducts = async (gender: Gender, slug: string) => {
    try {
        // if(!gender || !slug) throw new Error("");
        const categoryWithProducts = await prisma.category.findFirst({
            where: {  gender: gender, slug: slug },
            include: {
                products: {
                    include: {
                        variants: {
                            select: { id: true, name: true, slug: true, price: true, images: true, color: true },
                        }
                    }
                }
            }
        });
        return { error: false, message: "", categoryWithProducts: categoryWithProducts};
    } catch (error) {
        console.log(error);
        return { error: true, message: "", categoryWithProducts: null};
    }
}