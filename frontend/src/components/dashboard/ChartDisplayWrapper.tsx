"use client";

import { useState, useEffect } from "react";
import ChartDisplay from "./ChartDisplay";
import { LoadingCard } from "@/components/ui/LoadingCard";
import { ErrorCard } from "@/components/ui/ErrorCard";
import { getApiUrl } from "@/lib/api";
import { ChartConfig } from "@/lib/types";

interface ChartDisplayWrapperProps {
  chartId: string;
  endpoint: string;
  title: string;
  chartConfig: ChartConfig;
}

interface ChartDataPoint {
  [key: string]: string | number;
}

type ChartApiResponse = ChartDataPoint[];

export default function ChartDisplayWrapper({
  chartId,
  endpoint,
  title,
  chartConfig,
}: ChartDisplayWrapperProps) {
  const [data, setData] = useState<ChartDataPoint[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const fullUrl = getApiUrl(endpoint);
      const response = await fetch(fullUrl);

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      const json: ChartApiResponse = await response.json();

      if (!Array.isArray(json)) {
        throw new Error("Chart API response must be an array");
      }

      if (json.length === 0) {
        throw new Error("No data points available for chart");
      }

      const samplePoint = json[0];
      if (!samplePoint[chartConfig.xAxisKey]) {
        throw new Error(`Missing required X-axis key: ${chartConfig.xAxisKey}`);
      }
      if (!samplePoint[chartConfig.dataKey]) {
        throw new Error(`Missing required data key: ${chartConfig.dataKey}`);
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

  useEffect(() => {
    fetchData();
  }, [endpoint, chartId]);

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
    return <ChartDisplay title={title} data={data} chartConfig={chartConfig} />;
  }

  return null;
}
