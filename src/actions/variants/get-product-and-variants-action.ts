"use server";

import prisma from "@/lib/prisma";
import { Variant } from "@/interfaces";

export const getProductAndVariants = async (slug: Variant["slug"]) => {
    // Get variant
    const variant = await prisma.variant.findFirst({
        where: { slug: slug },
        include: {
            product: {
                include: {
                    variants: {
                        include: { 
                            color: true, 
                            images: true, 
                            sizes: {
                                include: {
                                    size: true,
                                }
                            },
                        }
                    },
                    category: true
                }
            },
            images: true,
            sizes: {
                include: {
                    size: true,
                }
            },
            color: true,
        },
    });
    return variant;
}