import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface LoadingCardProps {
  titleWidth?: string;
  contentHeight?: string;
  contentWidth?: string;
  hasHeader?: boolean;
  className?: string;
}

export function LoadingCard({
  titleWidth = "w-3/4",
  contentHeight = "h-8",
  contentWidth = "w-1/2",
  hasHeader = true,
  className,
}: LoadingCardProps) {
  return (
    <Card className={className}>
      {hasHeader && (
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <Skeleton className={cn("h-4", titleWidth)} />
        </CardHeader>
      )}
      <CardContent>
        <Skeleton className={cn(contentHeight, contentWidth)} />
      </CardContent>
    </Card>
  );
}
