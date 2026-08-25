import { TrendingUp } from "lucide-react";
import { Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../ui/chart";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig;

export default function AppLineChart() {
  return (
    <div className="w-full">
      <div className="mb-2">
        <h2 className="text-2xl font-bold tracking-tight">Total Visitors</h2>
        <p className="text-muted-foreground text-sm">
          Monthly visitor data for 2024
        </p>
      </div>
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <LineChart accessibilityLayer data={chartData}>
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value: string) => value.slice(0, 3)}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                indicator="line"
              />
            }
          />
          <Line
            dataKey="desktop"
            type="natural"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={{ fill: "var(--color-desktop)" }}
            activeDot={{ r: 6 }}
          />
          <Line
            dataKey="mobile"
            type="natural"
            stroke="var(--color-mobile)"
            strokeWidth={2}
            dot={{ fill: "var(--color-mobile)" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ChartContainer>
      <div className="flex items-center gap-2 mt-2">
        <TrendingUp className="h-4 w-4 text-emerald-500" />
        <span className="text-sm text-muted-foreground">
          Trending up by 5.2% this month
        </span>
      </div>
    </div>
  );
}
