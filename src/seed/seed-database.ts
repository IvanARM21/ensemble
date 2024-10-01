import prisma from '../lib/prisma';
import { categories } from "./categories-seed";
import { colors } from './colors-seed';
import { sizes } from "./sizes-seed";

async function main() {

    await prisma.category.deleteMany({});
    await prisma.size.deleteMany({});
    await prisma.color.deleteMany({});
    

    const categoriesWithOutId = categories.map(category => ({ label: category.label, slug: category.slug, type: category.type, gender: category.gender, image: category.image}))
    await prisma.category.createMany({
        data: categoriesWithOutId
    });

    const sizesWithOutId = sizes.map(size => ({ label: size.label, order: size.order, type: size.type}));
    await prisma.size.createMany({
        data: sizesWithOutId
    });

    const colorsWithOutId = colors.map(color => ({ label: color.label, code: color.code }));
    await prisma.color.createMany({
        data: colorsWithOutId
    });

    console.log("Seed executed correctly");
}
(() => {
    main();
})();