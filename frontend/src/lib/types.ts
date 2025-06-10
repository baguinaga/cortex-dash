export interface Metric {
  id: string;
  title: string;
  value: string;
  unit?: string;
  description?: string;
  icon?: React.ElementType;
}

export interface ChartConfig {
  id: string;
  title: string;
  description?: string;
  type: "bar" | "line" | "area";
  endpoint: string;
  dataKey: string;
  xAxisKey: string;
}

interface ColumnRenderProps<TData> {
  id: string;
  accessorKey: keyof TData | string;
}

export interface TableColumnDefinition<TData, TValue = unknown> {
  accessorKey: keyof TData | string;
  header:
    | string
    | (({ column }: { column: ColumnRenderProps<TData> }) => React.ReactNode);
  cell?: (props: {
    row: { original: TData };
    getValue: () => TValue;
  }) => React.ReactNode;
}

export interface DashboardSection {
  id: string;
  title?: string;
  gridCols?: number;
  components: Array<
    | { type: "metricDisplay"; metricId: string }
    | { type: "chartDisplay"; chartId: string }
    | { type: "tableDisplay"; tableId: string }
    | { type: "alertPanel"; alertId: string }
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

export interface HealthcareApiEndpoints {
  metrics: string;
  dailyTrends: string;
  patientTable: string;
  atRiskAlerts: string;
}
export interface PharmacyApiEndpoints {
  kpis: string;
  revenue: string;
  drugsRevenue: string;
  recentScripts: string;
  notifications: string;
}

export interface DashboardConfig<TEndpoints> {
  id: string;
  title: string;
  description?: string;
  apiBaseUrl?: string;

  apiEndpoints: TEndpoints;

  layout: DashboardSection[];

  metrics?: Metric[];
  charts?: ChartConfig[];
  mainTable?: {
    id: string;
    columns: TableColumnDefinition<unknown>[];
  };
  colors?: ThemeColors;
}
