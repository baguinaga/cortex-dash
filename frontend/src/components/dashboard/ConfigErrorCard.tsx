import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface ConfigErrorCardProps {
  subject: string;
  message: string;
}

/**
 * A standardized component for displaying dashboard configuration errors.
 */
export default function ConfigErrorCard({
  subject,
  message,
}: ConfigErrorCardProps) {
  return (
    <Card className='border-destructive bg-destructive/5 text-destructive'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-sm font-medium'>
          <AlertTriangle className='h-4 w-4' />
          {subject}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-xs text-destructive-foreground'>{message}</p>
      </CardContent>
    </Card>
  );
}
