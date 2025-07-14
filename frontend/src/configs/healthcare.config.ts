import { DashboardConfig } from "@/lib/types";
import { generateDashboardTheme } from "@/lib/theme-generator";

interface HealthcareApiEndpoints extends Record<string, string> {
  metrics: string;
  dailyTrends: string;
  patientTable: string;
  atRiskAlerts: string;
}

const apiEndpoints: HealthcareApiEndpoints = {
  metrics: "/api/healthcare/metrics",
  dailyTrends: "/api/healthcare/daily_trends",
  patientTable: "/api/healthcare/patients",
  atRiskAlerts: "/api/healthcare/at_risk_alerts",
};

export const dashboardConfig: DashboardConfig<HealthcareApiEndpoints> = {
  id: "healthcare",
  title: "Healthcare Operations Dashboard",
  description: "Metrics in Generic Healthcare App",
  apiEndpoints,
  layout: [
    {
      id: "metrics-section",
      gridCols: 4,
      endpoint: apiEndpoints.metrics,
      components: [
        { type: "metric", metricId: "total-patients" },
        { type: "metric", metricId: "avg-wait-time" },
        { type: "metric", metricId: "er-visits" },
        { type: "metric", metricId: "patient-satisfaction" },
      ],
    },
    {
      id: "daily-trends-section",
      title: "Daily Trends",
      gridCols: 1,
      components: [
        {
          type: "chart",
          chartId: "daily-visits",
          endpoint: apiEndpoints.dailyTrends,
        },
      ],
    },
    {
      id: "patient-table-section",
      title: "Patient Data",
      gridCols: 1,
      components: [
        {
          type: "table",
          tableId: "patient-details",
          endpoint: apiEndpoints.patientTable,
        },
      ],
    },
    {
      id: "alerts-section",
      title: "At-Risk Patient Alerts",
      gridCols: 1,
      components: [
        {
          type: "alertPanel",
          alertId: "at-risk-patients",
          endpoint: apiEndpoints.atRiskAlerts,
        },
      ],
    },
  ],
  metricsConfiguration: [
    { id: "total-patients", title: "Total Patients" },
    { id: "avg-wait-time", title: "Avg. Wait Time" },
    { id: "er-visits", title: "ER Visits Today" },
    {
      id: "patient-satisfaction",
      title: "Patient Satisfaction",
    },
  ],
  chartsConfiguration: [
    {
      id: "daily-visits",
      title: "Daily Patient Visits",
      type: "line",
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
      background: { hue: 220, chroma: 0.05 }, // Dark, cool blue-gray
      foreground: { hue: 220, chroma: 0.01 }, // Off-white
    },
    sidebar: {
      background: { hue: 220, chroma: 0.02 }, // Lighter gray
      brand: { hue: 210, chroma: 0.12 }, // Professional Blue
    },
    main: {
      background: { hue: 0, chroma: 0 }, // Pure White
      accent: { hue: 210, chroma: 0.12 }, // Professional Blue
    },
  }),
};
