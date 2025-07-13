import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartConfig, CustomTooltipProps } from "@/lib/types";

interface AreaChartProps {
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

export const AreaChart: React.FC<AreaChartProps> = ({ data, config }) => {
  const areaColor = CHART_COLORS[2];

  return (
    <ResponsiveContainer width='100%' height={300}>
      <RechartsAreaChart
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
        <Area
          type='monotone'
          dataKey={config.dataKey}
          stroke={areaColor}
          fill={areaColor}
          fillOpacity={0.3}
          strokeWidth={2}
        />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
};
