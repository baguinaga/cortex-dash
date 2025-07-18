export const CHART_STYLES = {
  margin: { top: 5, right: 30, left: 20, bottom: 5 },
  height: 300,
  grid: {
    strokeDasharray: "3 3",
    stroke: "var(--secondary-foreground)",
    opacity: 0.2,
  },
  axis: {
    tick: { fontSize: 12, fill: "var(--color-black)" },
    axisLine: { stroke: "var(--color-black)" },
    tickLine: { stroke: "var(--color-black)" },
  },
} as const;
