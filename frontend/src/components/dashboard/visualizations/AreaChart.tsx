import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartConfig } from "@/lib/types";
import { ChartTooltip } from "./shared/ChartTooltip";
import { getChartColorByType } from "./shared/ChartColors";
import { CHART_STYLES } from "./shared/ChartStyles";

interface AreaChartProps {
  data: Array<{ [key: string]: string | number }>;
  config: ChartConfig;
}

export const AreaChart: React.FC<AreaChartProps> = ({ data, config }) => {
  const areaColor = getChartColorByType("area");

  return (
    <ResponsiveContainer width='100%' height={CHART_STYLES.height}>
      <RechartsAreaChart data={data} margin={CHART_STYLES.margin}>
        <CartesianGrid {...CHART_STYLES.grid} />
        <XAxis dataKey={config.xAxisKey} {...CHART_STYLES.axis} />
        <YAxis {...CHART_STYLES.axis} />
        <Tooltip content={<ChartTooltip />} />
        <Area
          type='monotone'
          dataKey={config.dataKey}
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
};
