import prisma from "@/lib/prisma";
import { Product } from "@/interfaces";
import { truncateByDomain } from "recharts/types/util/ChartUtils";

export const getProductById = async (id: Product["id"]) => {
    if(!id) throw new Error("An ocurred a error, try again");
    try {
        const product = await prisma.product.findFirst({
            where: { id: id },
            include: {
                variants: {
                    include: {
                        images: true,
                        color: true,
                        sizes: {
                            include: {
                                size: true
                            }
                        }
                    },
                },
                category: true,
            }
        });

        if(!product) throw new Error("Product not found.");

        return { error: false, product: product, message: "" };
    } catch (error) {
        if(error instanceof Error) {
            return { product: null, error: true, message: error.message };
        }
        return { product: null, error: true, message: "An unexpected error occurred, try again later." }
    }

}