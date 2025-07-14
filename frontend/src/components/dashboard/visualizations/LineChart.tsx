import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ChartTooltip from "./shared/ChartTooltip";
import { getChartColorByType } from "./shared/ChartColors";
import { CHART_STYLES } from "./shared/ChartStyles";
import { CommonChartProps } from "@/lib/types";

export default function LineChart({
  data,
  xAxisKey,
  dataKey,
}: CommonChartProps) {
  const lineColor = getChartColorByType("line");

  return (
    <ResponsiveContainer width='100%' height={CHART_STYLES.height}>
      <RechartsLineChart data={data} margin={CHART_STYLES.margin}>
        <CartesianGrid {...CHART_STYLES.grid} />
        <XAxis dataKey={xAxisKey} {...CHART_STYLES.axis} />
        <YAxis {...CHART_STYLES.axis} />
        <Tooltip content={<ChartTooltip />} />
        <Line
          type='monotone'
          dataKey={dataKey}
          stroke={lineColor}
          strokeWidth={3}
          dot={{
            fill: lineColor,
            strokeWidth: 2,
            r: 4,
          }}
          activeDot={{
            r: 8,
            strokeWidth: 2,
          }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
