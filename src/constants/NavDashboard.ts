import { Squares2X2Icon, ShoppingBagIcon, ShoppingCartIcon, HomeIcon, UserGroupIcon, TagIcon, ChatBubbleBottomCenterTextIcon, SwatchIcon } from '@heroicons/react/24/outline';

export const NavDashbaordLinks = [
    {
        label: "Dashboard",
        icon: HomeIcon,
        link: "/dashboard"
    },
    {
        label: "Orders",
        icon: ShoppingCartIcon,
        link: "/dashboard/orders"
    },
    {
        label: "Products",
        icon: ShoppingBagIcon,
        link: "/dashboard/products"
    },
    {
        label: "Categories",
        icon: Squares2X2Icon,
        link: "/dashboard/categories"
    },
    {
        label: "Sizes",
        icon: TagIcon,
        link: "/dashboard/sizes"
    },
    {
        label: "Colors",
        icon: SwatchIcon,
        link: "/dashboard/colors"
    },
    {
        label: "Users",
        icon: UserGroupIcon,
        link: "/dashboard/users"
    },
    {
        label: "Messages",
        icon: ChatBubbleBottomCenterTextIcon,
        link: "/dashboard/messages"
    },
]