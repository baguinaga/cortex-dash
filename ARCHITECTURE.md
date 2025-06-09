# CortexDash: Architectural Evolution & Technical Overview

This document provides technical documentation on the CortexDash project, detailing its architectural evolution and strategic implementation plan.

## 1. Core Concept: A Config-Driven Architecture

The foundational principle of CortexDash is a **config-driven architecture**. The goal is to create a platform where entire dashboards—including data sources, layouts, metrics, charts, tables, and themes—are defined by a TypeScript configuration file rather than being hardcoded in React components.

A single config file defines the entire dashboard experience, from API endpoints to the color palette.

```typescript
// frontend/src/configs/healthcare.config.ts
import { DashboardConfig } from "@/lib/types";
import { generateDashboardTheme } from "@/lib/theme-generator";

export const dashboardConfig: DashboardConfig = {
  id: "healthcare",
  title: "Healthcare Operations Dashboard",
  apiEndpoints: {
    metrics: "/api/healthcare/metrics",
    // ... more endpoints
  },
  layout: [
    {
      id: "metrics-section",
      gridCols: 4,
      components: [{ type: "metricDisplay", metricId: "total-patients" }],
    },
    // ... more layout sections
  ],
  colors: generateDashboardTheme({
    navbar: { background: { hue: 220, chroma: 0.05 } },
    // ... other color definitions
  }),
};
```

This approach offers several strategic advantages:

- **Maximize Reusability:** Core UI components (`ChartWrapper`, `DataTable`) are designed to be generic, rendering content dynamically based on the provided configuration.
- **Accelerate Development:** New dashboard instances can be launched by defining a new configuration file and corresponding API endpoints, which dramatically reduces frontend development time.
- **Ensure Consistency:** A master configuration schema, enforced by TypeScript, guarantees that all dashboards maintain a consistent structure and user experience.
- **Enable Role-Based Access Control (RBAC):** Configurations can be extended to support complex permissions. For example, a `pharmacist.config.ts` could extend a base `technician.config.ts` to include privileged data visualizations, ensuring users only see data appropriate for their role.

## 2. Project Evolution: From Prototype to Platform

CortexDash began as an exploratory full-stack application (Next.js/Python) for a niche use case. The project underwent a strategic pivot when the potential for a more powerful, reusable platform was identified.

The focus shifted from building a single dashboard to creating a generic, config-centric architecture. This led to a dedicated **Refactoring Phase** to build a robust and scalable foundation before implementing specific features. This phase was critical for establishing the architectural patterns detailed below.

## 3. Key Architectural Features

The current architecture is the result of deliberate design decisions aimed at creating a maintainable and scalable system.

### 3.1. Dynamic Theming System

A robust, runtime-dynamic theming system decouples visual styling from component logic, centralizing customization within the configuration file.

- **`theme-generator.ts`**: A utility programmatically generates a full HSL color palette from high-level inputs (hue, chroma). It maps these inputs to a consistent set of CSS variable names.

  ```typescript
  // frontend/src/lib/theme-generator.ts
  function generateHslScale(hue: number, chroma: number): string[] {
    // ... uses lightness stops to generate 10 shades
  }

  export function generateDashboardTheme(options: ThemeGeneratorOptions): ThemeColors {
    const navbarBgScale = generateHslScale(options.navbar.background.hue, ...);
    // ...
    return {
      "--background": navbarBgScale[8], // Dark shade for the background
      "--foreground": navbarFgScale[1], // Light shade for text
      // ... maps all colors to CSS variables
    };
  }
  ```

- **CSS Custom Properties**: The generated palette is mapped to a consistent set of CSS custom properties (e.g., `--background`, `--primary`, `--card`).

- **`globals.css` & Tailwind CSS**: The project leverages Tailwind's `@theme` feature. All themeable utility classes (`bg-background`, `text-primary`, etc.) are configured to consume the corresponding CSS variables.

- **`ThemeManager.tsx`**: A client-side React component injects the theme colors as CSS variables at runtime, allowing for seamless theme application without a page reload.

  ```tsx
  // frontend/src/components/ThemeManager.tsx
  export default function ThemeManager({ config }: ThemeManagerProps) {
    useEffect(() => {
      const colors = config.colors;
      if (!colors) return;

      Object.entries(colors).forEach(([property, value]) => {
        document.documentElement.style.setProperty(property, value);
      });
      // ... includes cleanup logic
    }, [config.colors]);

    return null;
  }
  ```

### 3.2. Type-Safe, Robust Config Loading

The mechanism for loading dashboard configurations is designed for security and stability. The dynamic route handler in `app/dashboard/[theme]/page.tsx` is responsible for this.

- **Sanitization:** The incoming `theme` URL parameter is sanitized to prevent path traversal vulnerabilities.
- **Validation:** A dynamically imported module is validated to ensure the `dashboardConfig` object exists and adheres to the required schema.
- **Error Handling:** If a configuration fails to load or is malformed, the application gracefully falls back to a 404 page.

```tsx
// frontend/src/app/dashboard/[theme]/page.tsx
async function getDashboardConfig(theme: string): Promise<DashboardConfig> {
  // 1. Sanitize to prevent path traversal
  const sanitizedTheme = theme.replace(/[^a-zA-Z0-9-_]/g, "");
  if (sanitizedTheme !== theme) {
    return notFound();
  }

  try {
    // 2. Dynamically import the config module
    const configModule = await import(`@/configs/${sanitizedTheme}.config.ts`);
    const config = configModule.dashboardConfig;

    // 3. Validate the config structure
    if (!config || !config.id || !config.title) {
      throw new Error("Invalid config structure");
    }

    return config as DashboardConfig;
  } catch (error) {
    // 4. Fallback to 404 on any error
    console.error(`Failed to load config for theme: ${theme}`, error);
    return notFound();
  }
}
```

### 3.3. Component & Layout Philosophy

- **Shadcn/ui Integration:** The project adopted the Shadcn/ui pattern, vending UI components directly from the local codebase. This provides full control and ensures they can be styled to consume the dynamic CSS theme variables.
- **Layout Standardization:** The core application layout (`Navbar`, `Sidebar`, content area) is standardized using modern CSS to ensure consistent viewport management across all dashboard themes.

## 4. Execution Plan: Phase 2

With a solid architectural foundation in place, the project is moving into a structured implementation phase with a strategically targeted MVP.

### 4.1. MVP Focus: "Pharmacy Analytics"

The initial generic "Healthcare" theme will be pivoted to a more specific and impactful **"Pharmacy Analytics"** theme. This allows the dashboard to showcase more complex and relevant data visualizations and business metrics, such as patient adherence PDC and drug revenue trends.

### 4.2. Decoupled Development Workflow

A professional, decoupled workflow has been adopted to enable parallel development and minimize risk.

1. **API Contract First:** A complete set of API endpoints and their data schemas are defined.
2. **Mock API Implementation:** A stable mock API serves static JSON data, allowing for rapid and predictable frontend development.
3. **Frontend Build-out:** The entire frontend UI will be built and perfected against the mock API before backend integration.

### 4.3. State Management

Initially considered for theme management, Zustand will now be implemented for a more critical use case: managing the state of dismissible, application-wide alerts. An `alertsStore` will hold alerts fetched from an API and handle user interactions (e.g., `dismissAlert`), decoupling this global state from any single component.

## 5. Future State: Production & Scalability

### 5.1. Production Architecture

Following the completion of the frontend, the backend will be transitioned to a production-ready stack.

- **Database:** A PostgreSQL database will be provisioned on **Render.com**.
- **Backend Application:** The Flask backend will be updated to use **SQLAlchemy** to model and query the live database. It will be deployed as a Web Service on Render.
- **CI/CD:** Vercel (frontend) and Render (backend) are connected to the GitHub repository, enabling continuous deployment on every push to the main branch.
