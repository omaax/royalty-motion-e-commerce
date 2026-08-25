import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../ui/chart";

const chartData = [
  { month: "January", total: 186, successful: 80 },
  { month: "February", total: 305, successful: 200 },
  { month: "March", total: 237, successful: 120 },
  { month: "April", total: 73, successful: 190 },
  { month: "May", total: 209, successful: 130 },
  { month: "June", total: 214, successful: 140 },
];

const chartConfig = {
  total: { label: "Total", color: "var(--chart-1)" },
  successful: { label: "Successful", color: "var(--chart-4)" },
} satisfies ChartConfig;

export default function AppBarChart() {
  return (
    <div className="w-full">
      <div className="mb-2">
        <h2 className="text-2xl font-bold tracking-tight">Total Revenue</h2>
        <p className="text-muted-foreground text-sm">
          Monthly revenue breakdown for 2024
        </p>
      </div>
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value: number) => `$${value}`}
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
                labelFormatter={(value) => `${value}, 2024`}
                formatter={(value) => `$${value}`}
              />
            }
          />
          <Bar dataKey="total" fill="var(--color-total)" radius={4} />
          <Bar dataKey="successful" fill="var(--color-successful)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
