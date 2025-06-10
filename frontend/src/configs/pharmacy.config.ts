import { DashboardConfig, PharmacyApiEndpoints } from "@/lib/types";
import { generateDashboardTheme } from "@/lib/theme-generator";

export const dashboardConfig: DashboardConfig<PharmacyApiEndpoints> = {
  id: "pharmacy",
  title: "Pharmacy Operations Dashboard",
  description: "Metrics in Generic Pharmacy App",
  apiEndpoints: {
    kpis: "/api/pharmacy/kpis",
    revenue: "/api/pharmacy/revenue_trends",
    drugsRevenue: "/api/pharmacy/drugs_by_revenue",
    recentScripts: "/api/pharmacy/recent_scripts",
    notifications: "/api/pharmacy/notifications",
  },
  layout: [
    {
      id: "metrics-section",
      title: "Metrics",
      gridCols: 4,
      components: [
        { type: "metricDisplay", metricId: "total-patients" },
        { type: "metricDisplay", metricId: "avg-wait-time" },
        { type: "metricDisplay", metricId: "er-visits" },
        { type: "metricDisplay", metricId: "patient-satisfaction" },
      ],
    },
    {
      id: "Operational-section",
      title: "Operations",
      gridCols: 1,
      components: [{ type: "chartDisplay", chartId: "daily-visits" }],
    },
  ],
  metrics: [
    { id: "total-patients", title: "Total Patients", value: "1,234", unit: "" },
    { id: "avg-wait-time", title: "Avg. Wait Time", value: "25", unit: "min" },
    { id: "er-visits", title: "ER Visits Today", value: "320", unit: "" },
    {
      id: "patient-satisfaction",
      title: "Patient Satisfaction",
      value: "92",
      unit: "%",
    },
  ],
  charts: [
    {
      id: "daily-visits",
      title: "Daily Patient Visits",
      type: "line",
      endpoint: "/api/pharmacy/daily_trends",
      dataKey: "visits",
      xAxisKey: "date",
    },
  ],
  mainTable: {
    id: "patient-details",
    columns: [
      { accessorKey: "patientId", header: "Patient ID" },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "age", header: "Age" },
      { accessorKey: "condition", header: "Condition" },
      { accessorKey: "lastVisit", header: "Last Visit" },
    ],
  },
  colors: generateDashboardTheme({
    navbar: {
      background: { hue: 200, chroma: 0.5 },
      foreground: { hue: 220, chroma: 0.01 },
    },
    sidebar: {
      background: { hue: 220, chroma: 0.1 },
      brand: { hue: 210, chroma: 0.12 },
    },
    main: {
      background: { hue: 0, chroma: 0 },
      accent: { hue: 210, chroma: 0.12 },
    },
  }),
};
