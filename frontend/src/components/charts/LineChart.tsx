import React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartConfig, CustomTooltipProps } from "@/lib/types";

interface LineChartProps {
  data: Array<{ [key: string]: string | number }>;
  config: ChartConfig;
}

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-popover border border-border rounded-lg shadow-lg p-3'>
        <p className='text-popover-foreground font-medium mb-1'>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className='text-sm' style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const LineChart: React.FC<LineChartProps> = ({ data, config }) => {
  const lineColor = CHART_COLORS[1];

  return (
    <ResponsiveContainer width='100%' height={300}>
      <RechartsLineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid
          strokeDasharray='3 3'
          stroke='hsl(var(--muted-foreground))'
          opacity={0.2}
        />
        <XAxis
          dataKey={config.xAxisKey}
          tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
          axisLine={{ stroke: "hsl(var(--border))" }}
          tickLine={{ stroke: "hsl(var(--border))" }}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
          axisLine={{ stroke: "hsl(var(--border))" }}
          tickLine={{ stroke: "hsl(var(--border))" }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type='monotone'
          dataKey={config.dataKey}
          stroke={lineColor}
          strokeWidth={3}
          dot={{
            fill: lineColor,
            strokeWidth: 2,
            stroke: "hsl(var(--background))",
            r: 4,
          }}
          activeDot={{
            r: 6,
            fill: lineColor,
            stroke: "hsl(var(--background))",
            strokeWidth: 2,
          }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};
