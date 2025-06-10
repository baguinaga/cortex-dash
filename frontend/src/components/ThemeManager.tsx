"use client";

import { useEffect } from "react";
import { DashboardConfig } from "@/lib/types";

interface ThemeManagerProps<TEndpoints> {
  config: DashboardConfig<TEndpoints>;
}

export default function ThemeManager<TEndpoints>({
  config,
}: ThemeManagerProps<TEndpoints>) {
  useEffect(() => {
    const colors = config.colors;
    if (!colors) return;

    const originalValues: Record<string, string> = {};

    Object.entries(colors).forEach(([property, value]) => {
      if (value) {
        originalValues[property] = getComputedStyle(
          document.documentElement
        ).getPropertyValue(property);
        document.documentElement.style.setProperty(property, value);
      }
    });

    return () => {
      Object.keys(originalValues).forEach((property) => {
        document.documentElement.style.removeProperty(property);
      });
    };
  }, [config.colors]);

  return null;
}
