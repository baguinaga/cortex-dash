import { DashboardConfig } from "@/lib/types";
import { notFound } from "next/navigation";
import ThemeManager from "@/components/ThemeManager";
import Sidebar from "@/components/Sidebar";
import DashboardSectionRenderer from "@/components/dashboard/DashboardSectionRenderer";

interface DashboardPageProps {
  params: Promise<{
    theme: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * Safely loads a dashboard configuration with proper type checking
 * @param theme - The theme identifier (e.g., 'healthcare', 'pharmacy')
 * @returns Promise<DashboardConfig> - The validated configuration
 * @throws Calls notFound() if config cannot be loaded or is invalid
 */
async function getDashboardConfig<TEndpoints extends Record<string, string>>(
  theme: string
): Promise<DashboardConfig<TEndpoints>> {
  if (!theme || typeof theme !== "string" || theme.trim() === "") {
    return notFound();
  }

  const sanitizedTheme = theme.replace(/[^a-zA-Z0-9-_]/g, "");
  if (sanitizedTheme !== theme) {
    return notFound();
  }

  try {
    const configModule = await import(`@/configs/${sanitizedTheme}.config.ts`);
    const config = configModule.dashboardConfig;

    if (!config || typeof config !== "object") {
      throw new Error(
        `Config not found or invalid in ${sanitizedTheme}.config.ts`
      );
    }

    if (!config.id || !config.title || !config.apiEndpoints) {
      throw new Error(
        `Invalid config structure in ${sanitizedTheme}.config.ts - missing required properties`
      );
    }

    const validatedConfig = config as DashboardConfig<TEndpoints>;

    if (
      typeof validatedConfig.id !== "string" ||
      typeof validatedConfig.title !== "string" ||
      typeof validatedConfig.apiEndpoints !== "object"
    ) {
      throw new Error(`Invalid config types in ${sanitizedTheme}.config.ts`);
    }

    return validatedConfig;
  } catch {
    return notFound();
  }
}

export default async function DashboardPage<
  TEndpoints extends Record<string, string>
>({ params, searchParams }: DashboardPageProps) {
  let theme: string;
  try {
    const resolvedParams = await params;
    theme = resolvedParams.theme;
  } catch {
    return notFound();
  }

  const config = await getDashboardConfig<TEndpoints>(theme);
  const resolvedSearchParams = await searchParams;
  const currentView = resolvedSearchParams.view as string | undefined;

  const sectionsToRender = currentView
    ? config.layout.filter((s) => s.id === currentView)
    : config.layout[0]
    ? [config.layout[0]]
    : [];

  return (
    <>
      <ThemeManager config={config} />
      <div className='flex flex-1 flex-col md:flex-row overflow-hidden h-full'>
        <Sidebar config={config} themeId={theme} />
        <main className='bg-card flex-1'>
          <div className='max-w-5xl 2xl:max-w-7xl mx-auto p-6'>
            {sectionsToRender.length > 0 ? (
              sectionsToRender.map((section) => (
                <div key={section.id} id={section.id} className='mb-12'>
                  <h2 className='text-black text-2xl font-bold tracking-tight'>
                    {section.title ?? "Overview"}
                  </h2>
                  <DashboardSectionRenderer section={section} config={config} />
                </div>
              ))
            ) : (
              <div className='text-center py-20'>
                <h2 className='text-black text-xl font-semibold'>
                  View Not Found
                </h2>
                <p className='text-black mt-2'>
                  The view &quot;{currentView}&quot; does not exist for this
                  dashboard.
                  <br />
                  Please select a valid view from the sidebar.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
