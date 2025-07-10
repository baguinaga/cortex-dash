"use client";

import { useRef } from "react";
import { useDashboardStore } from "@/stores/dashboardStore";

export const StoreInitializer = () => {
  const isInitialized = useRef(false);

  if (!isInitialized.current) {
    useDashboardStore.setState({ isSidebarOpen: false });
    isInitialized.current = true;
  }
  return null;
};
