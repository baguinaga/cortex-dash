"use client";

import { useState, useEffect } from "react";
import MetricDisplay from "./MetricDisplay";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getApiUrl } from "@/lib/api";

interface MetricDisplayWrapperProps {
  metricId: string;
  endpoint: string;
  title: string;
}

interface MetricData {
  value: string;
  unit?: string;
}

interface ApiResponse {
  [key: string]: MetricData;
}

export default function MetricDisplayWrapper({
  metricId,
  endpoint,
  title,
}: MetricDisplayWrapperProps) {
  const [data, setData] = useState<MetricData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
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
          throw new Error(`MetricId "${metricId}" not found in response`);
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
    }

    fetchData();
  }, [endpoint, metricId]);

  if (loading) {
    return (
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <Skeleton className='h-4 w-3/4' />
        </CardHeader>
        <CardContent>
          <Skeleton className='h-8 w-1/2' />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className='border-destructive'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium text-destructive'>
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-xs text-destructive-foreground'>
            <p className='font-semibold'>Failed to load metric</p>
            <p className='mt-1'>{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (data) {
    return <MetricDisplay title={title} value={data.value} unit={data.unit} />;
  }

  return null;
}
