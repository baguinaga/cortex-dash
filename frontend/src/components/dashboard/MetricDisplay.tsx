import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricDisplayProps {
  title: string;
  value: string;
  unit?: string;
}

export default function MetricDisplay({
  title,
  value,
  unit,
}: MetricDisplayProps) {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>
          {value}
          {unit && (
            <span className='text-xs text-muted-foreground ml-1'>{unit}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
