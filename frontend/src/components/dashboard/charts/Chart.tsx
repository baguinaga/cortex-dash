import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ErrorCard } from "@/components/ui/ErrorCard";
import {
  LineChart,
  BarChart,
  AreaChart,
} from "@/components/dashboard/visualizations";
import { CommonChartProps } from "@/lib/types";

interface ChartProps {
  data: Array<{ [key: string]: string | number }>;
  title: string;
  xAxisKey: string;
  dataKey: string;
  type: "bar" | "line" | "area";
}

export default function Chart({
  data,
  title,
  xAxisKey,
  dataKey,
  type,
}: ChartProps) {
  const renderChart = () => {
    const commonProps: CommonChartProps = { data, xAxisKey, dataKey };

    switch (type) {
      case "line":
        return <LineChart {...commonProps} />;
      case "bar":
        return <BarChart {...commonProps} />;
      case "area":
        return <AreaChart {...commonProps} />;
      default:
        return (
          <ErrorCard
            title='Unsupported Chart Type'
            message={`Chart type "${type}" is not supported`}
            severity='error'
          />
        );
    }
  };

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-xl font-medium uppercase'>{title}</CardTitle>
      </CardHeader>
      <CardContent>{renderChart()}</CardContent>
    </Card>
  );
}
