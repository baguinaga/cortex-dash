"use client";

import React from "react";
import Link from "next/link";
import { DashboardConfig } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarProps {
  config: DashboardConfig;
  themeId: string;
}

export default function Sidebar({ config, themeId }: SidebarProps) {
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view");

  const baseClasses =
    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors";
  const activeClasses = "bg-sidebar-accent text-sidebar-accent-foreground";
  const inactiveClasses = "text-sidebar-foreground hover:bg-sidebar-accent/50";

  return (
    <aside className='bg-sidebar border-r border-sidebar-border w-56 h-full shrink-0'>
      <div className='p-4'>
        <h2
          className='text-sidebar-primary-foreground px-3 py-2 text-lg font-semibold tracking-tight leading-tight'
          title={config.title}
        >
          {config.title}
        </h2>
        <nav className='mt-4 space-y-1'>
          <Link
            href={`/dashboard/${themeId}`}
            className={cn(
              baseClasses,
              !currentView ? activeClasses : inactiveClasses
            )}
          >
            Overview
          </Link>
          {config.layout.map((section) =>
            section.title ? (
              <Link
                key={section.id}
                href={`/dashboard/${themeId}?view=${section.id}`}
                className={cn(
                  baseClasses,
                  currentView === section.id ? activeClasses : inactiveClasses
                )}
              >
                {section.title}
              </Link>
            ) : null
          )}
        </nav>
      </div>
    </aside>
  );
}
