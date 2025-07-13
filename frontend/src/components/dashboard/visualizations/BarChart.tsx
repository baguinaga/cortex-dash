import {
  BarChart as RechartsBarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartConfig, CustomTooltipProps } from "@/lib/types";

interface BarChartProps {
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

export const BarChart: React.FC<BarChartProps> = ({ data, config }) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <RechartsBarChart
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
        <Bar dataKey={config.dataKey} radius={[4, 4, 0, 0]} strokeWidth={0}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={CHART_COLORS[index % CHART_COLORS.length]}
              stroke={CHART_COLORS[index % CHART_COLORS.length]}
            />
          ))}
        </Bar>
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};
