import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../ui/chart";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: { label: "Visitors" },
  chrome: { label: "Chrome", color: "var(--chart-1)" },
  safari: { label: "Safari", color: "var(--chart-2)" },
  firefox: { label: "Firefox", color: "var(--chart-3)" },
  edge: { label: "Edge", color: "var(--chart-4)" },
  other: { label: "Other", color: "var(--chart-5)" },
} satisfies ChartConfig;

export default function AppPieChart() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <div className="w-full">
      <div className="mb-2">
        <h2 className="text-2xl font-bold tracking-tight">Browser Usage</h2>
        <p className="text-muted-foreground text-sm">
          Distribution of visitors by browser
        </p>
      </div>
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <PieChart>
          <ChartTooltip
            content={
              <ChartTooltipContent
                nameKey="browser"
                labelKey="browser"
                formatter={(value) =>
                  `${value.toLocaleString()} visitors`
                }
              />
            }
          />
          <Pie
            data={chartData}
            dataKey="visitors"
            nameKey="browser"
            innerRadius={60}
            strokeWidth={5}
          />
        </PieChart>
      </ChartContainer>
      <div className="flex flex-col items-center mt-2">
        <div className="text-3xl font-bold">{totalVisitors.toLocaleString()}</div>
        <div className="text-muted-foreground text-sm">Total Visitors</div>
        <div className="flex items-center gap-2 mt-1">
          <TrendingUp className="h-4 w-4 text-emerald-500" />
          <span className="text-sm text-muted-foreground">
            Trending up by 5.2% this month
          </span>
        </div>
      </div>
    </div>
  );
}
