import prisma from "@/lib/prisma"

export const getAllProductAndNumVar = async () => {
    const products = await prisma.product.findMany({
        include: {
            category: true,
            variants: {
                take: 1,
                include: {
                    images: true,
                }
            },
            _count: {
                select: {
                    variants: true
                }
            }
        }
    });
    return products;
}