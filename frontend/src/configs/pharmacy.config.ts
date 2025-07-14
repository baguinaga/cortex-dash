import { DashboardConfig } from "@/lib/types";
import { generateDashboardTheme } from "@/lib/theme-generator";

interface PharmacyApiEndpoints extends Record<string, string> {
  kpis: string;
  revenue: string;
  drugsRevenue: string;
  recentScripts: string;
  notifications: string;
  monthlyTrends: string;
}

const apiEndpoints: PharmacyApiEndpoints = {
  kpis: "/api/pharmacy/kpis",
  revenue: "/api/pharmacy/revenue_trends",
  drugsRevenue: "/api/pharmacy/drugs_by_revenue",
  recentScripts: "/api/pharmacy/recent_scripts",
  notifications: "/api/pharmacy/notifications",
  monthlyTrends: "/api/pharmacy/monthly_trends",
};

export const dashboardConfig: DashboardConfig<PharmacyApiEndpoints> = {
  id: "pharmacy",
  title: "Pharmacy Operations Dashboard",
  description: "Metrics in Generic Pharmacy App",
  apiEndpoints,
  layout: [
    {
      id: "overview",
      gridCols: 2,
      endpoint: apiEndpoints.kpis,
      components: [
        { type: "metric", metricId: "total-revenue" },
        { type: "metric", metricId: "avg-turnaround-time" },
        { type: "metric", metricId: "scripts-filled" },
        { type: "metric", metricId: "patient-adherence-pdc" },
        {
          type: "chart",
          chartId: "monthly-trends",
          endpoint: apiEndpoints.monthlyTrends,
        },
      ],
    },
    {
      id: "operations",
      title: "Script Management",
      gridCols: 1,
      components: [
        {
          type: "table",
          tableId: "recent-scripts",
          endpoint: apiEndpoints.recentScripts,
        },
        {
          type: "alertPanel",
          alertId: "new-notifications",
          endpoint: apiEndpoints.notifications,
        },
      ],
    },
    {
      id: "analytics",
      title: "Revenue Analytics",
      gridCols: 2,
      components: [
        {
          type: "chart",
          chartId: "revenue-trends",
          endpoint: apiEndpoints.revenue,
        },
        {
          type: "chart",
          chartId: "monthly-trends",
          endpoint: apiEndpoints.monthlyTrends,
        },
        {
          type: "chart",
          chartId: "top-drugs",
          endpoint: apiEndpoints.drugsRevenue,
        },
      ],
    },
  ],
  metricsConfiguration: [
    { id: "total-revenue", title: "Total Revenue" },
    {
      id: "avg-turnaround-time",
      title: "Avg. Turnaround",
    },
    { id: "scripts-filled", title: "Scripts Filled" },
    {
      id: "patient-adherence-pdc",
      title: "Patient Adherence (PDC)",
    },
  ],
  chartsConfiguration: [
    {
      id: "revenue-trends",
      title: "Weekly Revenue",
      type: "line",
      dataKey: "revenue",
      xAxisKey: "date",
    },
    {
      id: "top-drugs",
      title: "Top Drugs by Revenue",
      type: "bar",
      dataKey: "revenue",
      xAxisKey: "drugName",
    },
    {
      id: "monthly-trends",
      title: "Monthly Revenue Trends",
      type: "area",
      dataKey: "revenue",
      xAxisKey: "month",
    },
  ],
  mainTable: {
    id: "recent-scripts",
    columns: [
      { accessorKey: "scriptId", header: "Script ID" },
      { accessorKey: "patientName", header: "Patient" },
      { accessorKey: "drugName", header: "Drug" },
      { accessorKey: "status", header: "Status" },
      { accessorKey: "revenue", header: "Revenue" },
      { accessorKey: "fillDate", header: "Fill Date" },
    ],
  },
  colors: generateDashboardTheme({
    navbar: {
      background: { hue: 200, chroma: 0.5 },
      foreground: { hue: 220, chroma: 0.01 },
    },
    sidebar: {
      background: { hue: 200, chroma: 0.1 },
      brand: { hue: 200, chroma: 0.15 },
    },
    main: {
      background: { hue: 0, chroma: 0 },
      accent: { hue: 210, chroma: 0.12 },
    },
  }),
};
