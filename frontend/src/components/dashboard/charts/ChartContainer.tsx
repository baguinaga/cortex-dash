"use client";

import { useState, useEffect } from "react";
import Chart from "./Chart";
import { LoadingCard } from "@/components/ui/LoadingCard";
import { ErrorCard } from "@/components/ui/ErrorCard";
import { getApiUrl } from "@/lib/api";
import { ChartConfiguration } from "@/lib/types";

interface ChartContainerProps {
  chartId: string;
  endpoint: string;
  chartConfig: ChartConfiguration;
}

interface ChartDataPoint {
  [key: string]: string | number;
}

type ChartApiResponse = ChartDataPoint[];

export default function ChartContainer({
  chartId,
  endpoint,
  chartConfig,
}: ChartContainerProps) {
  const { title, xAxisKey, dataKey, type } = chartConfig;
  const [data, setData] = useState<ChartDataPoint[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const fullUrl = getApiUrl(endpoint);
        const response = await fetch(fullUrl);

        if (!response.ok) {
          throw new Error(
            `API error: ${response.status} ${response.statusText}`
          );
        }
        const json: ChartApiResponse = await response.json();

        if (!Array.isArray(json)) {
          throw new Error("Chart API response must be an array");
        }

        if (json.length === 0) {
          throw new Error("No data points available for chart");
        }

        const samplePoint = json[0];
        if (!samplePoint[xAxisKey]) {
          throw new Error(`Missing required X-axis key: ${xAxisKey}`);
        }
        if (!samplePoint[dataKey]) {
          throw new Error(`Missing required data key: ${dataKey}`);
        }

        setData(json);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingCard />;
  }

  if (error) {
    return (
      <ErrorCard
        title={`Failed to load ${title}`}
        message={error}
        severity='error'
      />
    );
  }

  if (data) {
    return (
      <Chart
        data={data}
        title={title}
        xAxisKey={xAxisKey}
        dataKey={dataKey}
        type={type}
      />
    );
  }

  return null;
}
