import { DashboardConfig, DashboardSection } from "@/lib/types";
import MetricDisplayWrapper from "./MetricDisplayWrapper";
import ConfigErrorCard from "./ConfigErrorCard";

const componentMap = {
  metricDisplay: MetricDisplayWrapper,
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
        const Component =
          componentMap[componentConfig.type as keyof typeof componentMap];

        if (!Component) {
          return (
            <ConfigErrorCard
              key={key}
              subject='Unknown Component'
              message={`The component type "${componentConfig.type}" is not registered in the component map.`}
            />
          );
        }

        const endpoint = componentConfig.endpoint || section.endpoint;
        if (!endpoint) {
          return (
            <ConfigErrorCard
              key={key}
              subject='Missing Endpoint'
              message={`The component of type "${componentConfig.type}" requires an endpoint, but none was provided.`}
            />
          );
        }

        if (componentConfig.type === "metricDisplay") {
          const metricMeta = config.metrics?.find(
            (m) => m.id === componentConfig.metricId
          );
          if (!metricMeta) {
            return (
              <ConfigErrorCard
                key={key}
                subject='Missing Metadata'
                message={`Metadata for metric with ID "${componentConfig.metricId}" could not be found in the config.`}
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

        return null;
      })}
    </div>
  );
}
