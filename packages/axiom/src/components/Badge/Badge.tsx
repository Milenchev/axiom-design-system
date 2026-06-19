import {
  Badge as MantineBadge,
  type BadgeProps as MantineBadgeProps,
  type MantineTheme,
} from "@mantine/core";
import clsx from "clsx";
import React from "react";
import classes from "./Badge.module.css";

/* Semantic badge types (matching the old DS) */

export type BadgeType =
  | "primary"
  | "secondary"
  | "tertiary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "critical"
  | "dark"
  | "pending"
  | "active"
  | "inactive"
  | "accent1"
  | "accent2"
  | "accent3"
  | "approved"
  | "available"
  | "escalated"
  | "needreview"
  | "rejected"
  | "disabled"
  | "submitted";

export type BadgeEmphasis = "bold" | "subtle" | "minimal";

/* Emphasis → Mantine variant mapping */

const emphasisToVariant: Record<BadgeEmphasis, string> = {
  bold: "filled",
  subtle: "light",
  minimal: "outline",
};

// [colorScale, boldShade, darkTextOnBold]
// Colors matched exactly to hex values from the Axiom token palette.
type BadgeColorEntry = [
  colorScale: string,
  boldShade: number,
  darkText: boolean,
];

const badgeColorScale: Record<BadgeType, BadgeColorEntry> = {
  primary: ["axiom-blue", 6, false],
  secondary: ["axiom-violet", 2, true], // #d38cff
  tertiary: ["axiom-magenta", 2, true], // #ff6dcd
  info: ["axiom-blue", 8, false],
  success: ["axiom-green", 7, false],
  warning: ["axiom-yellow", 8, true], // #ff9600
  error: ["axiom-red", 6, false],
  critical: ["axiom-red", 7, false], // #b20008
  dark: ["axiom-neutral", 9, false], // #252525
  pending: ["axiom-yellow", 5, true], // #ffd600
  active: ["axiom-chartreuse", 4, true], // #8de400
  inactive: ["axiom-neutral", 2, true], // #e0e0e0
  accent1: ["axiom-cyan", 6, true], // #00b4b4
  accent2: ["axiom-violet", 5, false], // #8a00df
  accent3: ["axiom-magenta", 6, false], // #cf0089
  // Legacy aliases
  approved: ["axiom-green", 7, false],
  available: ["axiom-blue", 6, false],
  escalated: ["axiom-yellow", 8, true],
  needreview: ["axiom-red", 7, false],
  rejected: ["axiom-red", 6, false],
  disabled: ["axiom-neutral", 2, true],
  submitted: ["axiom-neutral", 9, false],
};

/** Convert hex to rgba for semi-transparent subtle backgrounds that work in both light and dark mode. */
function hexToRgba(hex: string, alpha: number): string {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export interface BadgeProps
  extends Omit<MantineBadgeProps, "color" | "variant"> {
  children: React.ReactNode;
  /** Semantic badge type — maps to Axiom categorical color */
  type?: BadgeType;
  /** Visual emphasis level */
  emphasis?: BadgeEmphasis;
  /** Direct Mantine color override (bypasses type) */
  color?: MantineBadgeProps["color"];
  /** Direct Mantine variant override (bypasses emphasis) */
  variant?: MantineBadgeProps["variant"];
}

function axiomBadgeVars(theme: MantineTheme, props: Record<string, unknown>) {
  const type = props["data-axiom-type"] as BadgeType | undefined;
  const emphasis = props["data-axiom-emphasis"] as BadgeEmphasis | undefined;

  if (!type || !badgeColorScale[type]) return { root: {} };

  const [colorName, boldShade, darkText] = badgeColorScale[type];
  const boldBg = theme.colors[colorName]?.[boldShade];
  if (!boldBg) return { root: {} };

  const textOnBold = darkText
    ? "var(--axiom-text-on-light)"
    : "var(--axiom-text-on-dark)";

  if (emphasis === "bold" || emphasis === undefined) {
    return { root: { "--badge-bg": boldBg, "--badge-color": textOnBold } };
  }
  if (emphasis === "subtle") {
    // Semi-transparent tint adapts to both light and dark backgrounds
    return {
      root: {
        "--badge-bg": hexToRgba(boldBg, 0.18),
        "--badge-color": "var(--axiom-text)",
      },
    };
  }
  if (emphasis === "minimal") {
    return {
      root: {
        "--badge-bg": "transparent",
        "--badge-color": "var(--axiom-text)",
        "--badge-bd": `1px solid ${boldBg}`,
      },
    };
  }

  return { root: {} };
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, type, emphasis = "bold", color, variant, ...props }, ref) => {
    const resolvedVariant = type ? emphasisToVariant[emphasis] : variant;

    // Closure captures type/emphasis — no data-attributes needed in the DOM
    const vars = type
      ? (theme: MantineTheme) =>
          axiomBadgeVars(theme, {
            "data-axiom-type": type,
            "data-axiom-emphasis": emphasis,
          })
      : undefined;

    return (
      <MantineBadge
        ref={ref}
        color={type ? undefined : color}
        variant={resolvedVariant}
        className={clsx(classes.root, className)}
        vars={vars}
        {...props}
      />
    );
  },
);

Badge.displayName = "Badge";
