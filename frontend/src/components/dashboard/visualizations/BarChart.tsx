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
import ChartTooltip from "./shared/ChartTooltip";
import { getChartColor } from "./shared/ChartColors";
import { CHART_STYLES } from "./shared/ChartStyles";
import { CommonChartProps } from "@/lib/types";

export default function BarChart({
  data,
  xAxisKey,
  dataKey,
}: CommonChartProps) {
  return (
    <ResponsiveContainer width='100%' height={CHART_STYLES.height}>
      <RechartsBarChart data={data} margin={CHART_STYLES.margin}>
        <CartesianGrid {...CHART_STYLES.grid} />
        <XAxis dataKey={xAxisKey} {...CHART_STYLES.axis} />
        <YAxis {...CHART_STYLES.axis} />
        <Tooltip content={<ChartTooltip />} />
        <Bar dataKey={dataKey} radius={[4, 4, 0, 0]} strokeWidth={0}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={getChartColor(index)}
              stroke={getChartColor(index)}
            />
          ))}
        </Bar>
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
