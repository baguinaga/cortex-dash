export interface MetricConfiguration {
  id: string;
  title: string;
}

export interface ChartConfiguration {
  id: string;
  title: string;
  description?: string;
  type: "bar" | "line" | "area";
  dataKey: string;
  xAxisKey: string;
}

export interface CommonChartProps {
  data: Array<{ [key: string]: string | number }>;
  xAxisKey: string;
  dataKey: string;
}

export interface TableColumnDefinition<TData, TValue = unknown> {
  accessorKey: keyof TData | string;
  header:
    | string
    | (({
        column,
      }: {
        column: {
          id: string;
          accessorKey: keyof TData | string;
        };
      }) => React.ReactNode);
  cell?: (props: {
    row: { original: TData };
    getValue: () => TValue;
  }) => React.ReactNode;
}

export interface DashboardSection<TEndpoints = Record<string, string>> {
  id: string;
  title?: string;
  gridCols?: number;
  endpoint?: TEndpoints[keyof TEndpoints];
  components: Array<
    | {
        type: "metric";
        metricId: string;
        endpoint?: TEndpoints[keyof TEndpoints];
      }
    | {
        type: "chart";
        chartId: string;
        endpoint?: TEndpoints[keyof TEndpoints];
      }
    | {
        type: "table";
        tableId: string;
        endpoint?: TEndpoints[keyof TEndpoints];
      }
    | {
        type: "alertPanel";
        alertId: string;
        endpoint?: TEndpoints[keyof TEndpoints];
      }
  >;
}

export interface ThemeColors {
  // Navbar
  "--background"?: string;
  "--foreground"?: string;
  "--border"?: string;
  "--muted-foreground"?: string; // For flavor text

  // Sidebar
  "--sidebar"?: string;
  "--sidebar-foreground"?: string;
  "--sidebar-primary-foreground"?: string;
  "--sidebar-accent"?: string;
  "--sidebar-accent-foreground"?: string;
  "--sidebar-border"?: string;

  // Main content area
  "--card"?: string;
  "--card-foreground"?: string;
  "--primary"?: string;
  "--primary-foreground"?: string;
  "--secondary"?: string;
  "--secondary-foreground"?: string;
}

export interface DashboardConfig<TEndpoints extends Record<string, string>> {
  id: string;
  title: string;
  description?: string;
  apiBaseUrl?: string;

  apiEndpoints: TEndpoints;

  layout: DashboardSection<TEndpoints>[];

  metricsConfiguration?: MetricConfiguration[];
  chartsConfiguration?: ChartConfiguration[];
  mainTable?: {
    id: string;
    columns: TableColumnDefinition<unknown>[];
  };
  colors?: ThemeColors;
}
