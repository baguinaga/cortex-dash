import { ThemeColors } from "./types";

/**
 * Pre-defined lightness stops for a 10-shade color scale.
 * These are the foundation of the generator, ensuring perceptual uniformity.
 * Index 0 = lightest, Index 9 = darkest.
 */
const lightnessStops = [0.98, 0.95, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2];

/**
 * Defines the input for a color scale: its hue and intensity.
 */
interface ColorScaleDefinition {
  hue: number; // 0-360 on the color wheel
  chroma: number; // 0-0.4, color intensity
}

/**
 * The new, decoupled options object for the theme generator.
 * Allows defining separate color foundations for each major UI region.
 */
interface ThemeGeneratorOptions {
  navbar: {
    background: ColorScaleDefinition;
    foreground: ColorScaleDefinition;
  };
  sidebar: {
    background: ColorScaleDefinition;
    brand: ColorScaleDefinition;
  };
  main: {
    background: ColorScaleDefinition;
    accent: ColorScaleDefinition;
  };
}

/**
 * Generates a 10-step HSL color scale from a given hue and chroma.
 * It uses OKLCH principles for generation, converted to HSL for compatibility.
 */
function generateHslScale(hue: number, chroma: number): string[] {
  return lightnessStops.map((lightness) => {
    const saturation = Math.min(100, chroma * 300);
    const lightnessPercent = lightness * 100;
    return `hsl(${hue.toFixed(0)}, ${saturation.toFixed(
      0
    )}%, ${lightnessPercent.toFixed(0)}%)`;
  });
}

/**
 * Generates a complete, decoupled dashboard theme.
 */
export function generateDashboardTheme(
  options: ThemeGeneratorOptions
): ThemeColors {
  const navbarBgScale = generateHslScale(
    options.navbar.background.hue,
    options.navbar.background.chroma
  );
  const navbarFgScale = generateHslScale(
    options.navbar.foreground.hue,
    options.navbar.foreground.chroma
  );

  const sidebarBgScale = generateHslScale(
    options.sidebar.background.hue,
    options.sidebar.background.chroma
  );
  const sidebarBrandScale = generateHslScale(
    options.sidebar.brand.hue,
    options.sidebar.brand.chroma
  );

  const mainBgScale = generateHslScale(
    options.main.background.hue,
    options.main.background.chroma
  );
  const mainAccentScale = generateHslScale(
    options.main.accent.hue,
    options.main.accent.chroma
  );

  return {
    //TODO: create dark mode variables
    // Nav
    "--background": navbarBgScale[8],
    "--foreground": navbarFgScale[1],
    "--border": navbarBgScale[6],
    "--muted-foreground": navbarFgScale[3],
    // Sidebar
    "--sidebar": sidebarBgScale[1],
    "--sidebar-foreground": sidebarBgScale[8],
    "--sidebar-primary-foreground": sidebarBrandScale[9],
    "--sidebar-accent": sidebarBrandScale[3],
    "--sidebar-accent-foreground": sidebarBrandScale[9],
    "--sidebar-border": sidebarBgScale[3],
    // Main Content Area
    "--card": mainBgScale[0],
    "--card-foreground": mainBgScale[9],
    // Buttons
    "--primary": mainAccentScale[6],
    "--primary-foreground": navbarFgScale[0],
    // Secondary Buttons
    "--secondary": mainBgScale[2],
    "--secondary-foreground": mainBgScale[8],
  };
}
