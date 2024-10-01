import { Product } from "../interfaces";


export const products: Product[] = [
   {
    id: "1",
    name: "ALL SZN Fleece Hoodie",
    slug: "all-szn-fleece-hoodie",
    price: 2480,
    discount: 20,
    description: "",
    
    materials: [
        "Loose fit",
        "70% Cotton 30% Recycled Polyester Exterior",
        "Soft fleece lining for added comfort and warmth",
        "Double-layer hood for extra durability",
        "Front kangaroo pocket",
        "Ribbed cuffs and hem with elastic blend for a comfortable fit"
    ],
    tags: ["hoodie", "adidas", "Loose fit"],
    gender: ["men"],
    categoryId: {
        id: "1",
        image: null,
        gender: "men",
        label: "Hoodie",
        slug: "/hoodies",
        type: "Clothing"
        
    },
    brandId: {
        id: "1",
        image: null,
        label: "Adidas",
        slug: "/adidas",
    },
    variants: [
        {
            id: "1",
            label: "Black",
            color: "#27272a",
            sizes: [
                { label: "S", stock: 5 },
                { label: "M", stock: 2 },
                { label: "L", stock: 0 },
                { label: "XL", stock: 4 },
                { label: "XXL", stock: 7 },
            ],
            images: [
                "hoodie-black.avif",
                "hoodie-black-2.avif",
                "hoodie-black-3.avif",
                "hoodie-black-4.avif",

            ],
        },
        {
            id: "2",
            label: "White",
            color: "#fff",
            sizes: [
                { label: "S", stock: 4 },
                { label: "M", stock: 0 },
                { label: "L", stock: 0 },
                { label: "XL", stock: 2 },
                { label: "XXL", stock: 3 },
            ],
            images: [
                "hoodie-white-1.avif",
                "hoodie-white-2.avif",
                "hoodie-white-3.avif",
                "hoodie-white-4.avif",
            ],
        },
        {
            id: "3",
            label: "Dark blue",
            color: "#1e3a8a",
            sizes: [
                { label: "S", stock: 8 },
                { label: "M", stock: 9 },
                { label: "L", stock: 9 },
                { label: "XL", stock: 9 },
                { label: "XXL", stock: 10 },
            ],
            images: [
                "hoodie-blue-1.avif",
                "hoodie-blue-2.avif",
                "hoodie-blue-3.avif",
                "hoodie-blue-4.avif",
            ],
        },
    ]
   },

   {
    id: "2",
    name: "ALL SZN Fleece Loose Hoodie",
    slug: "all-szn-fleece-loose-hoodie",
    price: 2480,
    discount: 0,
    description: "Cozy comfort awaits in this adidas hoodie. Made with a brushed back cotton-fleece fabric that's indulgently soft, it keeps the chill at bay whether you're lounging at home or out running weekend errands. Drop shoulders and a roomy fit ensure maximum ease of movement. Ribbed cuffs elevate the look while sealing in warmth. A kangaroo pocket discreetly adds function so your keys and phone are always within reach. Embroidered details let your sporty style shine through. Flip up the generous hood for extra cosiness on grey days.",
    
    materials: [
        "Loose fit",
        "70% Cotton 30% Recycled Polyester Exterior",
        "Soft fleece lining for added comfort and warmth",
        "Double-layer hood for extra durability",
        "Front kangaroo pocket",
        "Ribbed cuffs and hem with elastic blend for a comfortable fit"
    ],
    tags: ["hoodie", "adidas", "Loose fit"],
    gender: ["women"],
    categoryId: {
        id: "1",
        image: null,
        gender: "men",
        label: "Hoodie",
        slug: "/hoodies",
        type: "Clothing"
    },
    brandId: {
        id: "1",
        image: null,
        label: "Adidas",
        slug: "/adidas",
    },
    variants: [
        {
            id: "4",
            label: "Gray",
            color: "#e5e7eb",
            sizes: [
                { label: "S", stock: 2 },
                { label: "M", stock: 1 },
                { label: "L", stock: 3 },
                { label: "XL", stock: 5 },
                { label: "XXL", stock: 7 },
            ],
            images: [
                "hoodie-women-1.avif",
                "hoodie-women-2.avif",
                "hoodie-women-3.avif",
                "hoodie-women-4.avif",

            ],
        },
        {
            id: "5",
            label: "Green",
            color: "#d9f99d",
            sizes: [
                { label: "S", stock: 4 },
                { label: "M", stock: 0 },
                { label: "L", stock: 0 },
                { label: "XL", stock: 2 },
                { label: "XXL", stock: 3 },
            ],
            images: [
                "hoodie-women-green-1.avif",
                "hoodie-women-green-2.avif",
                "hoodie-women-green-3.avif",
                "hoodie-women-green-4.avif",
            ],
        },
    ]
   },

   {
    id: "3",
    name: "Future Icons 3-Stripes Dress",
    slug: "future-icons-3-stripes-dress",
    price: 2200,
    discount: 0,
    description: "Slip into this adidas dress and soar into the future. A classic style reinvented for the modern woman, this soft, stretchy dress wraps you in the signature 3-Stripes of adidas. With side slits for easy movement, it transitions effortlessly from work to play. The cotton in this product has been sourced through Better Cotton. Better Cotton is sourced via a chain of custody model called mass balance.",
    
    materials: [
        "Regular fit",
        "Crewneck",
        "90% cotton, 10% elastane",
        "Double-layer hood for extra durability",
        "Side slits",
    ],
    tags: ["dress", "adidas", "Regular fit"],
    gender: ["women"],
    categoryId: {
        id: "2",
        image: null,
        gender: "men",
        label: "Dress",
        slug: "/dress",
        type: "Clothing"
    },
    brandId: {
        id: "1",
        image: null,
        label: "Adidas",
        slug: "/adidas",
    },
    variants: [
        {
            id: "5",
            label: "Black",
            color: "#27272a",
            sizes: [
                { label: "XS", stock: 2 },
                { label: "S", stock: 1 },
                { label: "M", stock: 0 },
                { label: "L", stock: 0 },
                { label: "XL", stock: 0 },
                { label: "XXL", stock: 2 },
            ],
            images: [
                "dress-black-1.avif",
                "dress-black-2.avif",
                "dress-black-3.avif",
                "dress-black-4.avif",

            ],
        },
        {
            id: "6",
            label: "Green",
            color: "#d9f99d",
            sizes: [
                { label: "S", stock: 4 },
                { label: "M", stock: 0 },
                { label: "L", stock: 0 },
                { label: "XL", stock: 2 },
                { label: "XXL", stock: 3 },
            ],
            images: [
                "dress-green-1.avif",
                "dress-green-2.avif",
                "dress-green-3.avif",
                "dress-green-4.avif",
            ],
        },
    ]
   },

   

   {
    id: "5",
    name: "Adicolor Oversized Crew Sweatshirt",
    slug: "adicolor-oversized-crew-sweatshirt",
    price: 2600,
    discount: 0,
    description: "Reinvent your everyday style in this adidas sweatshirt. The oversized fit and ribbed details give it a contemporary silhouette while soft fleece keeps you cozy in classic comfort. The contrast 3-Stripes and Trefoil logo connect you to decades of sporty heritage.",
    
    materials: [
        "Loose fit",
        "70% Cotton 30% Recycled Polyester Exterior",
        "Ribbed crewneck",
        "Double-layer hood for extra durability",
        "Front kangaroo pocket",
        "Ribbed cuffs and hem with elastic blend for a comfortable fit"
    ],
    tags: ["hoodie", "adidas", "Loose fit"],
    gender: ["men"],
    categoryId: {
        id: "1",
        image: null,
        gender: "men",
        label: "Sweatshirt",
        slug: "/sweatshirt",
        type: "Clothing"
    },
    brandId: {
        id: "1",
        image: null,
        label: "Adidas",
        slug: "/adidas",
    },
    variants: [
        {
            id: "9",
            label: "Black",
            color: "#27272a",
            sizes: [
                { label: "S", stock: 2 },
                { label: "M", stock: 1 },
                { label: "L", stock: 3 },
                { label: "XL", stock: 5 },
                { label: "XXL", stock: 7 },
            ],
            images: [
                "sweatshirt-black-1.avif",
                "sweatshirt-black-2.avif",
                "sweatshirt-black-3.avif",
                "sweatshirt-black-4.avif",

            ],
        },
        {
            id: "10",
            label: "Gray",
            color: "#e5e7eb",
            sizes: [
                { label: "S", stock: 4 },
                { label: "M", stock: 0 },
                { label: "L", stock: 0 },
                { label: "XL", stock: 2 },
                { label: "XXL", stock: 3 },
            ],
            images: [
                "sweatshirt-gray-1.avif",
                "sweatshirt-gray-2.avif",
                "sweatshirt-gray-3.avif",
                "sweatshirt-gray-4.avif",
            ],
        },
    ]
   },

   {
    id: "6",
    name: "Relaxed Graphic Crew Midtone Grey Htr",
    slug: "relaxed-graphic-crew-midtone-grey-htr",
    price: 3980,
    discount: 20,
    description: "Reinvent your everyday style in this adidas sweatshirt. The oversized fit and ribbed details give it a contemporary silhouette while soft fleece keeps you cozy in classic comfort. The contrast 3-Stripes and Trefoil logo connect you to decades of sporty heritage.",
    materials: [
        "Regular fit",
        "70% Cotton 30% Recycled Polyester Exterior",
        "Ribbed crewneck",
        "Double-layer hood for extra durability",
        "Front kangaroo pocket",
        "Ribbed cuffs and hem with elastic blend for a comfortable fit"
    ],
    tags: ["hoodie", "Levi's", "levis", "relaxed graphic", "Loose fit"],
    gender: ["men"],
    categoryId: {
        id: "1",
        image: null,
        gender: "men",
        label: "Hoodie",
        slug: "/hoodie",
        type: "Clothing"
    },
    brandId: {
        id: "1",
        image: null,
        label: "Levi's",
        slug: "/levi's",
    },
    variants: [
        {
            id: "9",
            label: "Gray",
            color: "#e5e7eb",
            sizes: [
                { label: "S", stock: 2 },
                { label: "M", stock: 1 },
                { label: "L", stock: 3 },
                { label: "XL", stock: 5 },
                { label: "XXL", stock: 7 },
            ],
            images: [
                "relaxed-gray-1.avif",
                "relaxed-gray-2.avif",

            ],
        },
    ]
   },

   {
    id: "6",
    name: "Graphic Standard Crew Batwing",
    slug: "graphic-standard-crew-batwing",
    price: 3980,
    discount: 0,
    description: "Reinvent your everyday style in this adidas sweatshirt. The oversized fit and ribbed details give it a contemporary silhouette while soft fleece keeps you cozy in classic comfort. The contrast 3-Stripes and Trefoil logo connect you to decades of sporty heritage.",
    materials: [
        "Regular fit",
        "70% Cotton 30% Recycled Polyester Exterior",
        "Ribbed crewneck",
        "Double-layer hood for extra durability",
        "Front kangaroo pocket",
        "Ribbed cuffs and hem with elastic blend for a comfortable fit"
    ],
    tags: ["hoodie", "Levi's", "levis", "relaxed graphic", "Loose fit"],
    gender: ["women"],
    categoryId: {
        id: "1",
        image: null,
        gender: "men",
        label: "Hoodie",
        slug: "/hoodie",
        type: "Clothing"
    },
    brandId: {
        id: "1",
        image: null,
        label: "Levi's",
        slug: "/levi's",
    },
    variants: [
        {
            id: "9",
            label: "Gray",
            color: "#e5e7eb",
            sizes: [
                { label: "XS", stock: 2 },
                { label: "S", stock: 2 },
                { label: "M", stock: 1 },
                { label: "L", stock: 3 },
            ],
            images: [
                "batwing-women-1.webp",
                "batwing-women-2.webp",
            ],
        },
    ]
   },
]