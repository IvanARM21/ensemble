"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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
import clsx from "clsx"
import { compareToPreviousMonth, getCurrentMonth, getCurrentYear, getLastSixMonthsData, getStartMonth, getStartYear } from "@/utils"

const allChartData = [
    { month: "January", value: 186},
    { month: "February", value: 305 },
    { month: "March", value: 237 },
    { month: "April", value: 173 },
    { month: "May", value: 209 },
    { month: "June", value: 314 },
    { month: "July", value: 287 },
    { month: "August", value: 264 },
    { month: "September", value: 310 },
    { month: "October", value: 275 },
    { month: "November", value: 300 },
    { month: "December", value: 345 },
  ];


const chartData = getLastSixMonthsData(allChartData);
  
const chartConfig = {
  value: {
    label: "Profit",
    color: "#ea580c",
  },
} satisfies ChartConfig

export function SalesChart() {
  return (
      <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Monthly sales</CardTitle>
        <CardDescription>
          Showing total sales for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillvalue" x1="0" y1="0" x2="0" y2="1" fill="#ea580c">
                <stop
                  offset="5%"
                  stopColor="#ea580c"
                  stopOpacity={.5}
                />
                <stop
                  offset="95%"
                  stopColor="#ea580c"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="value"
              type="natural"
              fill="url(#fillvalue)"
              fillOpacity={0.4}
              stackId="a"
              stroke="#f97316" 
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className={clsx("flex items-center gap-2 font-medium leading-none", {
                "text-red-600": +compareToPreviousMonth(264,310) < 0,
                "text-teal-500": +compareToPreviousMonth(264,310) >= 0,
            })}>
              Trending up by {compareToPreviousMonth(264,310)}% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {allChartData[getStartMonth()].month} {getStartYear() && getStartYear()} - {allChartData[getCurrentMonth()].month} {getCurrentYear()}
            </div>
          </div>
        </div>
      </CardFooter>
      </>
  )
}
