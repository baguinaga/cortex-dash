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
  const config = ERROR_CONFIG[severity];
  const Icon = config.icon;

  return (
    <Card className={cn(config.style, className)}>
      {title && (
        <CardHeader>
          <CardTitle className='flex items-center gap-2 text-sm font-medium'>
            {Icon && <Icon className='h-4 w-4' />}
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <p className='text-xs text-destructive-foreground'>{message}</p>
      </CardContent>
    </Card>
  );
}
