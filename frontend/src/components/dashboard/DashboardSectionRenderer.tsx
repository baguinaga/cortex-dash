import { DashboardConfig, DashboardSection } from "@/lib/types";
import MetricDisplayWrapper from "./MetricDisplayWrapper";
import ChartDisplayWrapper from "./ChartDisplayWrapper";
import { ErrorCard } from "@/components/ui/ErrorCard";

const componentMap = {
  metricDisplay: MetricDisplayWrapper,
  chartDisplay: ChartDisplayWrapper,
};

const gridColsMap: { [key: number]: string } = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
};

interface DashboardSectionRendererProps<TEndpoints> {
  section: DashboardSection;
  config: DashboardConfig<TEndpoints>;
}

export default function DashboardSectionRenderer<TEndpoints>({
  section,
  config,
}: DashboardSectionRendererProps<TEndpoints>) {
  return (
    <div className={`grid gap-4 mt-6 ${gridColsMap[section.gridCols ?? 1]}`}>
      {section.components.map((componentConfig, index) => {
        const key = `${section.id}-${componentConfig.type}-${index}`;

        // Displays an warning if component of type does not have a corresponding wrapper component in componentMap
        const Component =
          componentMap[componentConfig.type as keyof typeof componentMap];
        if (!Component) {
          return (
            <ErrorCard
              key={key}
              title='Unknown Component'
              message={`The component type "${componentConfig.type}" is not registered in the component map.`}
              severity='warning'
            />
          );
        }
        // Displays an warning if component of type does not have an endpoint defined in the config
        const endpoint = componentConfig.endpoint || section.endpoint;
        if (!endpoint) {
          return (
            <ErrorCard
              key={key}
              title='Missing Endpoint'
              message={`The component of type "${componentConfig.type}" requires an endpoint.`}
              severity='warning'
            />
          );
        }
        // Displays an warning if component of type does not have metadata (title, value, units) defined in the config
        if (componentConfig.type === "metricDisplay") {
          const metricMeta = config.metricsMetadata?.find(
            (m) => m.id === componentConfig.metricId
          );
          if (!metricMeta) {
            return (
              <ErrorCard
                key={key}
                title='Missing Metadata'
                message={`Metadata for metric with ID "${componentConfig.metricId}" could not be found in the config.`}
                severity='warning'
              />
            );
          }
          return (
            <MetricDisplayWrapper
              key={key}
              endpoint={endpoint}
              metricId={componentConfig.metricId}
              title={metricMeta.title}
            />
          );
        }

        if (componentConfig.type === "chartDisplay") {
          const chartMeta = config.chartsMetadata?.find(
            (c) => c.id === componentConfig.chartId
          );
          if (!chartMeta) {
            return (
              <ErrorCard
                key={key}
                title='Missing Chart Metadata'
                message={`Metadata for chart with ID "${componentConfig.chartId}" could not be found in the config.`}
                severity='warning'
              />
            );
          }
          return (
            <ChartDisplayWrapper
              key={key}
              endpoint={endpoint}
              chartId={componentConfig.chartId}
              title={chartMeta.title}
              chartConfig={chartMeta}
            />
          );
        }

        return null;
      })}
    </div>
  );
}
