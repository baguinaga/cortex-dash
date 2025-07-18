interface TooltipPayloadItem {
  name: string;
  value: string | number;
  color: string;
  dataKey: string;
  payload: Record<string, unknown>;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string | number;
}

export default function ChartTooltip({
  active,
  payload,
  label,
}: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div className='bg-popover border border-border rounded-lg shadow-lg p-3'>
      <p className='text-popover-foreground font-medium mb-1'>{label}</p>
      {payload.map((entry, index) => (
        <p
          key={index}
          className='text-sm'
          style={{ color: "var(--color-black)" }}
        >
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}
