
export const genders = [
    {
        label: "Women",
        image: "women-beautiful.jpg",
        value: "women"
    },
    {   
        label: "Men",
        image: "men-beautiful.jpg",
        value: "men"
    },
    {   
        label: "Unisex",
        image: "unisex.jpg",
        value: "unisex"
    },
];

export const gendersObj = Object.fromEntries(
    genders.map(gender => [gender.value, { label: gender.label, image: gender.image }])
);

export const types = [
    {
        label: "Clothing",
        image: "clothing.jpg",
        value: "clothing"
    },
    {
        label: "Shoes",
        image: "shoes.jpg",
        value: "shoes"
    },
    {
        label: "Accessories",
        image: "accesories-section.jpg",
        value: "accessories"
    },
]