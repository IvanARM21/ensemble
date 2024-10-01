"use client"

import { TrendingDown, TrendingUp } from "lucide-react"
import { CartesianGrid,  XAxis, BarChart, Bar } from 'recharts';

import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/tremor/Card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/tremor/Chart"
import { compareToPreviousMonth, getCurrentMonth, getCurrentYear, getLastSixMonthsData, getStartMonth, getStartYear } from "@/utils"
import clsx from "clsx"

export const description = "A radar chart with a grid and circle fill "

const allChartData = [
    { month: "January", value: 186 },
    { month: "February", value: 285 },
    { month: "March", value: 237 },
    { month: "April", value: 203 },
    { month: "May", value: 209 },
    { month: "June", value: 234 },
    { month: "July", value: 200 },
    { month: "August", value: 250 },
    { month: "September", value: 212 },
    { month: "October", value: 275 },
    { month: "November", value: 300 },
    { month: "December", value: 345 },
];

const chartData = getLastSixMonthsData(allChartData);

const chartConfig = {
  value: {
    label: "Orders",
    color: "#14b8a6",
  },
} satisfies ChartConfig

export function OrdersChart() {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Monthly orders</CardTitle>
        <CardDescription>
          Showing total orders for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig} className=" h-full w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="value" fill="#14b8a6" radius={20} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className={clsx("flex gap-2 font-medium leading-none", {
                "text-red-600": +compareToPreviousMonth(250,212) < 0,
                "text-teal-500": +compareToPreviousMonth(250,212) >= 0,
            })}>
            Trending up by {compareToPreviousMonth(250,212)}% this month 
            {+compareToPreviousMonth(250,212) < 0 ? (
                <TrendingDown className="size-4"/>
            ) : (
                <TrendingUp className="size-4" />
            )}
        </div>
        <div className="flex gap-2 leading-none text-muted-foreground">
            {allChartData[getStartMonth()].month} {getStartYear() && getStartYear()} - {allChartData[getCurrentMonth()].month} {getCurrentYear()}
        </div>
      </CardFooter>
    </>
  )
}

