import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorCardProps {
  title?: string;
  message: string;
  severity?: "error" | "warning" | "info";
  className?: string;
}

const ERROR_CONFIG = {
  error: {
    icon: AlertCircle,
    style: "border-destructive bg-destructive/5 text-destructive",
  },
  warning: {
    icon: AlertTriangle,
    style: "border-yellow-500 bg-yellow-50 text-yellow-800",
  },
  info: {
    icon: Info,
    style: "border-blue-500 bg-blue-50 text-blue-800",
  },
} as const;

export function ErrorCard({
  title,
  message,
  severity = "error",
  className,
}: ErrorCardProps) {
  const { style, icon: Icon } = ERROR_CONFIG[severity];

  return (
    <Card className={cn(style, className)}>
      {title && (
        <CardHeader>
          <CardTitle className='flex items-center gap-2 text-lg font-medium uppercase'>
            {Icon && <Icon className='h-8 w-8' />}
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <p className='text-md text-destructive-foreground'>{message}</p>
      </CardContent>
    </Card>
  );
}
