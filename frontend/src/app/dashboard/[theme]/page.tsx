import { DashboardConfig } from "@/lib/types";
import { notFound } from "next/navigation";
import ThemeManager from "@/components/ThemeManager";
import Sidebar from "@/components/Sidebar";

interface DashboardPageProps {
  params: Promise<{
    theme: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * Safely loads a dashboard configuration with proper type checking
 * @param theme - The theme identifier (e.g., 'healthcare', 'security')
 * @returns Promise<DashboardConfig> - The validated configuration
 * @throws Calls notFound() if config cannot be loaded or is invalid
 */
async function getDashboardConfig(theme: string): Promise<DashboardConfig> {
  // Validate theme parameter
  if (!theme || typeof theme !== "string" || theme.trim() === "") {
    console.error("Invalid theme parameter:", theme);
    return notFound();
  }

  // Sanitize theme to prevent path traversal
  const sanitizedTheme = theme.replace(/[^a-zA-Z0-9-_]/g, "");
  if (sanitizedTheme !== theme) {
    console.error("Theme contains invalid characters:", theme);
    return notFound();
  }

  try {
    // Dynamically import the config module
    const configModule = await import(`@/configs/${sanitizedTheme}.config.ts`);

    // Extract the config with the correct export name
    const config = configModule.dashboardConfig;

    // Validate the config exists and has required properties
    if (!config || typeof config !== "object") {
      throw new Error(
        `Config not found or invalid in ${sanitizedTheme}.config.ts`
      );
    }

    // Validate required config properties
    if (!config.id || !config.title || !config.apiEndpoints) {
      throw new Error(
        `Invalid config structure in ${sanitizedTheme}.config.ts - missing required properties`
      );
    }

    // Type assertion after validation
    const validatedConfig = config as DashboardConfig;

    // Additional runtime validation for critical properties
    if (
      typeof validatedConfig.id !== "string" ||
      typeof validatedConfig.title !== "string" ||
      typeof validatedConfig.apiEndpoints !== "object"
    ) {
      throw new Error(`Invalid config types in ${sanitizedTheme}.config.ts`);
    }

    return validatedConfig;
  } catch (error) {
    // Log the error for debugging
    console.error(`Failed to load config for theme: ${theme}`, {
      error: error instanceof Error ? error.message : "Unknown error",
      theme: sanitizedTheme,
    });

    // Return 404 for any config loading errors
    return notFound();
  }
}

export default async function DashboardPage({
  params,
  searchParams,
}: DashboardPageProps) {
  // Safely extract params with error handling
  let theme: string;
  try {
    const resolvedParams = await params;
    theme = resolvedParams.theme;
  } catch (error) {
    console.error("Failed to resolve params:", error);
    return notFound();
  }

  const config = await getDashboardConfig(theme);
  const resolvedSearchParams = await searchParams;
  const currentView = resolvedSearchParams.view as string | undefined;

  // Determine which sections of the layout to render based on the 'view' query param
  const sectionsToRender = currentView
    ? config.layout.filter((s) => s.id === currentView)
    : [config.layout[0]].filter(Boolean); // Default to the first section as the "Overview"

  return (
    <>
      <ThemeManager config={config} />
      <div className='flex flex-1 overflow-hidden h-full'>
        <Sidebar config={config} themeId={theme} />
        <main className='flex-1 overflow-y-auto bg-background'>
          <div className='container mx-auto py-10'>
            {sectionsToRender.length > 0 ? (
              sectionsToRender.map((section) => (
                <div key={section.id} id={section.id} className='mb-12'>
                  <h2 className='text-2xl font-bold tracking-tight text-card-foreground'>
                    {section.title ?? "Overview"}
                  </h2>
                  <div className='mt-6 text-muted-foreground'>
                    <p>
                      Rendering component type:{" "}
                      <strong>
                        {section.components[0]?.type || "unknown"}
                      </strong>
                    </p>
                    <p className='mt-2'>
                      Full component implementation will occur in Phase 2.
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className='text-center py-20'>
                <h2 className='text-xl font-semibold text-card-foreground'>
                  View Not Found
                </h2>
                <p className='text-muted-foreground mt-2'>
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
