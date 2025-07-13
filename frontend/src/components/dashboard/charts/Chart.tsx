import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ErrorCard } from "@/components/ui/ErrorCard";
import {
  LineChart,
  BarChart,
  AreaChart,
} from "@/components/dashboard/visualizations";
import { ChartConfig } from "@/lib/types";

interface ChartDisplayProps {
  title: string;
  data: Array<{ [key: string]: string | number }>;
  chartConfig: ChartConfig;
}

export default function ChartDisplay({
  title,
  data,
  chartConfig,
}: ChartDisplayProps) {
  if (!data || data.length === 0) {
    return (
      <ErrorCard
        title='No Data Available'
        message={`No data available for ${title}`}
        severity='info'
      />
    );
  }

  const samplePoint = data[0];
  if (!samplePoint[chartConfig.xAxisKey] || !samplePoint[chartConfig.dataKey]) {
    return (
      <ErrorCard
        title='Invalid Data Format'
        message={`Chart data is missing required keys: ${chartConfig.xAxisKey} or ${chartConfig.dataKey}`}
        severity='error'
      />
    );
  }

  const renderChart = () => {
    const commonProps = { data, config: chartConfig };

    switch (chartConfig.type) {
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
            message={`Chart type "${chartConfig.type}" is not supported`}
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
