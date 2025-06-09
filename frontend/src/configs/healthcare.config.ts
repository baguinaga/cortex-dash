import { DashboardConfig } from "@/lib/types";

export const dashboardConfig: DashboardConfig = {
  id: "healthcare",
  title: "Healthcare Operations Dashboard",
  description: "Metrics in Generic Healthcare App",
  apiEndpoints: {
    metrics: "/api/healthcare/metrics",
    dailyTrends: "/api/healthcare/daily_trends",
    patientTable: "/api/healthcare/patients",
    atRiskAlerts: "/api/healthcare/at_risk_alerts",
  },
  layout: [
    {
      id: "metrics-section",
      gridCols: 4,
      components: [
        { type: "metricDisplay", metricId: "total-patients" },
        { type: "metricDisplay", metricId: "avg-wait-time" },
        { type: "metricDisplay", metricId: "er-visits" },
        { type: "metricDisplay", metricId: "patient-satisfaction" },
      ],
    },
    {
      id: "daily-trends-section",
      title: "Daily Trends",
      gridCols: 1,
      components: [{ type: "chartDisplay", chartId: "daily-visits" }],
    },
    {
      id: "patient-table-section",
      title: "Patient Data",
      gridCols: 1,
      components: [{ type: "tableDisplay", tableId: "patient-details" }],
    },
    {
      id: "alerts-section",
      title: "At-Risk Patient Alerts",
      gridCols: 1,
      components: [{ type: "alertPanel", alertId: "at-risk-patients" }],
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
      endpoint: "/api/healthcare/daily_trends",
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
  colors: {
    // Navbar - Deep professional blue
    "--background": "hsl(210, 40%, 20%)", // Dark blue-grey
    "--foreground": "hsl(0, 0%, 98%)", // Almost white
    "--border": "hsl(210, 30%, 25%)", // Slightly lighter blue-grey
    "--muted-foreground": "hsl(210, 10%, 75%)", // Light grey for flavor text

    // Sidebar - Soft blue-grey with good contrast
    "--sidebar": "hsl(210, 20%, 95%)", // Very light blue-grey background
    "--sidebar-foreground": "hsl(210, 40%, 25%)", // Dark blue-grey text
    "--sidebar-primary-foreground": "hsl(210, 50%, 20%)", // Darker blue for headers
    "--sidebar-accent": "hsl(210, 30%, 85%)", // Light blue for active items
    "--sidebar-accent-foreground": "hsl(210, 50%, 20%)", // Dark blue for active text
    "--sidebar-border": "hsl(210, 20%, 85%)", // Subtle border

    // Main content area - Clean whites and soft blues
    "--card": "hsl(0, 0%, 100%)", // Pure white cards
    "--card-foreground": "hsl(210, 20%, 15%)", // Dark text for readability
    "--primary": "hsl(195, 75%, 45%)", // Healthcare teal
    "--primary-foreground": "hsl(0, 0%, 98%)", // White text on primary
    "--secondary": "hsl(210, 15%, 90%)", // Light grey secondary
    "--secondary-foreground": "hsl(210, 30%, 20%)", // Dark text on secondary
  },
};
