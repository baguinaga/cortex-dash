import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricProps {
  title: string;
  value: string;
  unit?: string;
}

export default function Metric({ title, value, unit }: MetricProps) {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-xl font-medium uppercase'>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>
          {value}
          {unit && (
            <span className='text-lg text-muted-foreground ml-1'>{unit}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
