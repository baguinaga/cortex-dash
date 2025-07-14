"use client";

import { useState, useEffect } from "react";
import Metric from "./Metric";
import { LoadingCard } from "@/components/ui/LoadingCard";
import { ErrorCard } from "@/components/ui/ErrorCard";
import { getApiUrl } from "@/lib/api";
import { MetricConfiguration } from "@/lib/types";

interface MetricContainerProps {
  metricId: string;
  endpoint: string;
  metricConfig: MetricConfiguration;
}

interface MetricData {
  value: string;
  unit?: string;
}

interface ApiResponse {
  [key: string]: MetricData;
}

export default function MetricContainer({
  metricId,
  endpoint,
  metricConfig,
}: MetricContainerProps) {
  const { title } = metricConfig;
  const [data, setData] = useState<MetricData | null>(null);
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
        const json: ApiResponse = await response.json();

        if (json[metricId]) {
          setData(json[metricId]);
        } else {
          throw new Error(`Metric "${metricId}" not found in response`);
        }
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
  });

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
    return <Metric title={title} value={data.value} unit={data.unit} />;
  }

  return null;
}
