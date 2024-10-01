import React from 'react'
import { FooterItem } from './FooterItem'

const productsLinks = [
    {
        label: "T-Shirts",
        url: "/collections/men/t-shirts"
    },
    {
        label: "Jeans & Pants",
        url: "/collections/men/jeans-and-pants"
    },
    {
        label: "Dresses",
        url: "/collections/women/dresses"
    },
    {
        label: "Leggiengs & Tights",
        url: "/collections/women/leggiengs-and-tights"
    },
    {
        label: "Belts",
        url: "/collections/belts"
    },
    {
        label: "Watches & Rings",
        url: "/collections/watches-and-rings"
    }
]

const companyLinks = [
    {
        label: "About us",
        url: "/about-us"
    },
    {
        label: "Terms & Conditions",
        url: "/terms-and-conditions"
    },
    {
        label: "Partners",
        url: "/partners"
    },
    {
        label: "Privacy Policy",
        url: "/privacy-policy"
    },
]

const customerLinks = [
    {
        label: "Contact",
        url: "/contact"
    },
    {
        label: "Shipping",
        url: "/shipping"
    },
    {
        label: "Returns",
        url: "/returns"
    },
    {
        label: "FAQ",
        url: "/frequently-asked-questions"
    },
    {
        label: "Find a store",
        url: "/find-store"
    },
    {
        label: "Payment Options",
        url: "/payment-options"
    },
]

export const FooterGrid = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-2 gap-y-14 sm:gap-10 lg:grid-cols-5 py-10">
        <FooterItem 
            title="Products"
            links={productsLinks}
        />
        <FooterItem 
            title="Company"
            links={companyLinks}
        />
        <FooterItem 
            title="Customer Service"
            links={customerLinks}
        />

        <div className="flex flex-col gap-3 col-span-2 sm:col-span-3 lg:col-span-2 w-full sm:w-2/3 mx-auto lg:w-full">
            <h3 className="text-gray-900 font-medium text-xl">Sign up for our newsletter</h3>
            <p className="text-gray-600">The latest deals and savings, sent to your inbox weekly.</p>
            <form className="flex gap-5">
                <input type="text" className="w-full rounded-xl px-4 border placeholder:text-gray-400 placeholder:font-normal" placeholder="Enter your email" />
                <input type="submit" value="Subscribe" className="bg-gray-900 hover:bg-gray-700 transition-all duration-300 cursor-pointer text-white px-4 py-2 rounded-xl font-medium shadow-sm" />
            </form>
        </div>
    </div>
  )
}
