export const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const;

export const getChartColor = (index: number): string => {
  return CHART_COLORS[index % CHART_COLORS.length];
};

export const getChartColorByType = (type: "line" | "bar" | "area"): string => {
  const typeColorMap = {
    line: CHART_COLORS[0],
    bar: CHART_COLORS[1],
    area: CHART_COLORS[2],
  };
  return typeColorMap[type];
};

export const getChartColorByIndex = (index: number): string => {
  return CHART_COLORS[index] || CHART_COLORS[0];
};
