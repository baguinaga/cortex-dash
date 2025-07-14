import {
  AreaChart as RechartsAreaChart,
  Area,
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

export default function AreaChart({
  data,
  xAxisKey,
  dataKey,
}: CommonChartProps) {
  const areaColor = getChartColorByType("area");

  return (
    <ResponsiveContainer width='100%' height={CHART_STYLES.height}>
      <RechartsAreaChart data={data} margin={CHART_STYLES.margin}>
        <CartesianGrid {...CHART_STYLES.grid} />
        <XAxis dataKey={xAxisKey} {...CHART_STYLES.axis} />
        <YAxis {...CHART_STYLES.axis} />
        <Tooltip content={<ChartTooltip />} />
        <Area
          type='monotone'
          dataKey={dataKey}
          stroke={areaColor}
          fill={areaColor}
          fillOpacity={0.3}
          strokeWidth={2}
          activeDot={{
            r: 8,
            strokeWidth: 2,
          }}
        />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}
