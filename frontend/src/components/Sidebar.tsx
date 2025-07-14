"use client";

import { useEffect } from "react";
import Link from "next/link";
import { DashboardConfig } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useDashboardStore } from "@/stores/dashboardStore";
import { useMediaQuery } from "usehooks-ts";

interface SidebarProps<TEndpoints> {
  config: DashboardConfig<TEndpoints>;
  themeId: string;
}

export default function Sidebar<TEndpoints>({
  config,
  themeId,
}: SidebarProps<TEndpoints>) {
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view");
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useDashboardStore();
  const isSmallScreen = useMediaQuery("(max-width: 1023px)");

  const baseClasses =
    "flex items-center px-3 py-2 text-md font-medium rounded-md transition-colors";
  const activeClasses = "bg-sidebar-accent text-sidebar-accent-foreground";
  const inactiveClasses = "text-sidebar-foreground hover:bg-sidebar-accent/50";

  useEffect(() => {
    if (isSmallScreen) {
      closeSidebar();
    }
  }, [isSmallScreen, closeSidebar]);

  return (
    <aside className='bg-sidebar border-r border-sidebar-border w-full absolute z-10 lg:relative lg:w-72 lg:h-full lg:block'>
      <div className='py-4 px-6'>
        <Collapsible
          open={isSidebarOpen || !isSmallScreen}
          onOpenChange={toggleSidebar}
        >
          <div className='flex justify-between'>
            <h2
              className='text-sidebar-primary-foreground px-3 py-2 text-xl font-semibold tracking-tight leading-tight truncate md:text-wrap md:overflow-visible'
              title={config.title}
            >
              {config.title}
            </h2>
            <CollapsibleTrigger asChild className='lg:hidden'>
              <Button
                variant='ghost'
                className='flex px-3 py-2 text-sidebar-primary-foreground'
              >
                <ChevronDown
                  className={cn(
                    "h-6 w-6 transition-transform duration-200",
                    isSidebarOpen && "rotate-180"
                  )}
                />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <nav className='mt-4 space-y-1 lg:block'>
              <Link
                href={`/dashboard/${themeId}`}
                onClick={() => closeSidebar()}
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
                    onClick={() => closeSidebar()}
                    className={cn(
                      baseClasses,
                      currentView === section.id
                        ? activeClasses
                        : inactiveClasses
                    )}
                  >
                    {section.title}
                  </Link>
                ) : null
              )}
            </nav>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </aside>
  );
}
