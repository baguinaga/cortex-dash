import { ChartConfig } from "@/lib/types";

interface ChartDataPoint {
  [key: string]: string | number;
}

interface ChartDisplayProps {
  title: string;
  data: ChartDataPoint[];
  chartConfig: ChartConfig;
}

export default function ChartDisplay({
  title,
  data,
  chartConfig,
}: ChartDisplayProps) {
  return (
    <div className='p-4 border rounded'>
      <h3 className='text-lg text-card-foreground font-semibold'>{title}</h3>
      <p className='text-sm text-gray-600'>
        Chart Type: {chartConfig.type} | Data Points: {data.length}
      </p>
      <p className='text-xs text-gray-500'>
        X-Axis: {chartConfig.xAxisKey} | Y-Axis: {chartConfig.dataKey}
      </p>
    </div>
  );
}
