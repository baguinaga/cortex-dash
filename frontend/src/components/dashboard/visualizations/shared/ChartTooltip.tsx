import { CustomTooltipProps } from "@/lib/types";

export const ChartTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div className='bg-popover border border-border rounded-lg shadow-lg p-3'>
      <p className='text-popover-foreground font-medium mb-1'>{label}</p>
      {payload.map((entry, index) => (
        <p key={index} className='text-sm' style={{ color: "black" }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
};
