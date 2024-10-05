"use client";

import { ChartBarSquareIcon, ClipboardDocumentCheckIcon, ShoppingBagIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { OrdersChart, SalesChart, OrdersTable, CardDescription, CardHeader, CardTitle, OverviewCard } from "@/components";

export default function DashboardPage() {

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate()-1);

  return (
      <div className="grid grid-cols-12 gap-4">
        
        <div className="col-span-12 rounded-xl">
          <CardHeader className="col-span-2  rounded-xl">
            <CardTitle className="text-3xl font-medium text-gray-800">Today&rsquo;s Overview</CardTitle>
            <CardDescription>Monitor your key metrics and compare today with yesterday.</CardDescription>
          </CardHeader>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 mt-5 gap-4">
            <OverviewCard 
              discount={10}
              icon={ChartBarSquareIcon}
              title="Total sales"
              quantity="$5K"
              textColor="text-orange-500"
              bgColor="bg-orange-100"
            />
            <OverviewCard 
              discount={-10}
              icon={ClipboardDocumentCheckIcon}
              title="Total order"
              quantity="500"
              textColor="text-teal-500"
              bgColor="bg-teal-100"
            />
            <OverviewCard 
              discount={2}
              icon={ShoppingBagIcon}
              title="Product sold"
              quantity="9"
              textColor="text-pink-500"
              bgColor="bg-pink-100"
            />
            <OverviewCard 
              discount={-5}
              icon={UserPlusIcon}
              title="New Customer"
              quantity="9"
              textColor="text-sky-500"
              bgColor="bg-sky-100"
            />
            
          </div>
        </div>

        <div className="  rounded-xl col-span-12 lg:col-span-8">
          <OrdersTable />
        </div>

        <div className=" rounded-xl col-span-12 lg:col-span-4 flex flex-col">
          <SalesChart />
        </div>

        <div className="  rounded-xl col-span-12 lg:col-span-8">
          <OrdersTable />
        </div>
        <div className="  rounded-xl col-span-12 lg:col-span-4 flex flex-col">
          <OrdersChart />
        </div>
      </div>
  );
}