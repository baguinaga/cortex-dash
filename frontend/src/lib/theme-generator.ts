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
    // This is a simplified but effective OKLCH -> HSL conversion
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
    //TODO: allow for a dark-mode definition
    // Nav
    "--background": navbarBgScale[8], // Dark shade for the background
    "--foreground": navbarFgScale[1], // Light shade for text
    "--border": navbarBgScale[6], // Slightly lighter dark shade for borders
    "--muted-foreground": navbarFgScale[3], // Muted text color

    // Sidebar
    "--sidebar": sidebarBgScale[1], // Very light background
    "--sidebar-foreground": sidebarBgScale[8], // Dark text
    "--sidebar-primary-foreground": sidebarBrandScale[9], // Darkest brand color for titles
    "--sidebar-accent": sidebarBrandScale[3], // Light brand color for active items
    "--sidebar-accent-foreground": sidebarBrandScale[9], // Dark brand text on active items
    "--sidebar-border": sidebarBgScale[3], // Subtle border color

    //TODO: Consider an off-white background usecase, current code forces --card variable to white.
    // Main Content Area
    "--card": mainBgScale[0], // Lightest shade (white/off-white) for cards
    "--card-foreground": mainBgScale[9], // Darkest shade for text
    // Buttons
    "--primary": mainAccentScale[6], // The main brand accent color for buttons
    "--primary-foreground": navbarFgScale[0], // Use navbar's lightest color for text on primary buttons
    // Secondary Buttons
    "--secondary": mainBgScale[2], // A light secondary background color
    "--secondary-foreground": mainBgScale[8], // Dark text for secondary elements
  };
}
