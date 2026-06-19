import {
  type CSSVariablesResolver,
  createTheme,
  Input,
  type MantineColorsTuple,
} from "@mantine/core";
import inputClasses from "./inputBase.module.css";
import stepperClasses from "./stepper.module.css";
import tabsClasses from "./tabs.module.css";

/* Axiom Color Scales (synced from Figma Axiom DS variables) */

const axiomBlue: MantineColorsTuple = [
  "#e8f1fe", // 0
  "#c7ddfb", // 1
  "#a2c7f9", // 2
  "#7db1f7", // 3
  "#589af5", // 4
  "#3384f2", // 5
  "#0f6eef", // 6
  "#0d5dca", // 7
  "#0a4ca5", // 8
  "#1a2a4a", // 9
];

const axiomRed: MantineColorsTuple = [
  "#fff0f0", // 0
  "#ffd6d6", // 1
  "#ffb9bd", // 2
  "#ff828a", // 3
  "#ff4242", // 4
  "#ff1321", // 5
  "#dc000d", // 6
  "#b20008", // 7
  "#7c0004", // 8
  "#3a0a0a", // 9
];

const axiomGreen: MantineColorsTuple = [
  "#e6ffe9", // 0
  "#c3ffc9", // 1
  "#97faa1", // 2
  "#55fa5b", // 3
  "#20f01b", // 4
  "#0dd208", // 5
  "#04b000", // 6
  "#00850d", // 7
  "#005f09", // 8
  "#0a2a0a", // 9
];

const axiomYellow: MantineColorsTuple = [
  "#fffce6", // 0
  "#fff7e1", // 1
  "#ffebb4", // 2
  "#fff183", // 3
  "#ffe453", // 4
  "#ffd600", // 5
  "#ffc700", // 6
  "#ffa800", // 7
  "#ff9600", // 8
  "#ff7a00", // 9
];

/* Figma Neutral-gray has 15 shades (0-14). Mapped to Mantine 10-tuple: */
const axiomNeutral: MantineColorsTuple = [
  "#f8f9fa", // 0 (Figma [1])
  "#f2f2f2", // 1 (Figma [2])
  "#e0e0e0", // 2 (Figma [3])
  "#cccccc", // 3 (Figma [4])
  "#a2a2a2", // 4 (Figma [5])
  "#8d8d8d", // 5 (Figma [6])
  "#707070", // 6 (Figma [7])
  "#444444", // 7 (Figma [8])
  "#383838", // 8 (Figma [9])
  "#252525", // 9 (Figma [10])
];

const axiomBrown: MantineColorsTuple = [
  "#f6ebd4", // 0
  "#ecd6a9", // 1
  "#d4bb87", // 2
  "#bca26b", // 3
  "#9d8247", // 4
  "#866b30", // 5
  "#735920", // 6
  "#58410f", // 7
  "#493406", // 8
  "#3a2a00", // 9
];

const axiomChartreuse: MantineColorsTuple = [
  "#e0ffc2", // 0
  "#d4ff8e", // 1
  "#c5ff65", // 2
  "#afff2b", // 3
  "#8de400", // 4
  "#77c000", // 5
  "#588e00", // 6
  "#3b6000", // 7
  "#243a00", // 8
  "#192800", // 9
];

const axiomSpringGreen: MantineColorsTuple = [
  "#b5ffd7", // 0
  "#84ffbd", // 1
  "#54ffa2", // 2
  "#21ff87", // 3
  "#00e469", // 4
  "#00d462", // 5
  "#00b051", // 6
  "#008b40", // 7
  "#005a29", // 8
  "#003619", // 9
];

const axiomCyan: MantineColorsTuple = [
  "#c6fafa", // 0
  "#a3f7f7", // 1
  "#74fcfc", // 2
  "#3bf8f8", // 3
  "#00ffff", // 4
  "#00d4d4", // 5
  "#00b4b4", // 6
  "#008787", // 7
  "#004f4f", // 8
  "#003333", // 9
];

const axiomMagenta: MantineColorsTuple = [
  "#ffccee", // 0
  "#ffa0df", // 1
  "#ff6dcd", // 2
  "#ff42bf", // 3
  "#ff19b1", // 4
  "#f1009f", // 5
  "#cf0089", // 6
  "#990065", // 7
  "#70004a", // 8
  "#47002f", // 9
];

const axiomViolet: MantineColorsTuple = [
  "#f1daff", // 0
  "#e6bcff", // 1
  "#d38cff", // 2
  "#b948ff", // 3
  "#9e00ff", // 4
  "#8a00df", // 5
  "#6800a8", // 6
  "#460070", // 7
  "#350056", // 8
  "#210036", // 9
];

const axiomNeutralCool: MantineColorsTuple = [
  "#eef2f5", // 0
  "#d5dfe4", // 1
  "#bbcad2", // 2
  "#9fb4bf", // 3
  "#89a2b0", // 4
  "#66818f", // 5
  "#475862", // 6
  "#2d383f", // 7
  "#1c2328", // 8
  "#1c2328", // 9
];

/* Feedback color mapping (shared by Notification & Alert vars) */

const feedbackColorMap: Record<string, string> = {
  green: "var(--axiom-feedback-success)",
  "axiom-green": "var(--axiom-feedback-success)",
  red: "var(--axiom-feedback-error)",
  "axiom-red": "var(--axiom-feedback-error)",
  blue: "var(--axiom-feedback-info)",
  "axiom-blue": "var(--axiom-feedback-info)",
  yellow: "var(--axiom-feedback-warning)",
  "axiom-yellow": "var(--axiom-feedback-warning)",
};

function resolveFeedbackColorVar(
  props: { color?: string },
  cssVar: string,
): { root: Record<string, string> } {
  const mapped = props.color ? feedbackColorMap[props.color] : undefined;
  return { root: mapped ? { [cssVar]: mapped } : {} };
}

type ComponentVarsProps = {
  color?: string;
  variant?: string;
  disabled?: boolean;
};

/* Axiom Theme */

export const axiomTheme = createTheme({
  fontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif",
  fontFamilyMonospace: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
  primaryColor: "axiom-blue",
  primaryShade: { light: 6, dark: 5 },
  colors: {
    "axiom-blue": axiomBlue,
    "axiom-red": axiomRed,
    "axiom-green": axiomGreen,
    "axiom-yellow": axiomYellow,
    "axiom-neutral": axiomNeutral,
    "axiom-brown": axiomBrown,
    "axiom-chartreuse": axiomChartreuse,
    "axiom-spring-green": axiomSpringGreen,
    "axiom-cyan": axiomCyan,
    "axiom-magenta": axiomMagenta,
    "axiom-violet": axiomViolet,
    "axiom-neutral-cool": axiomNeutralCool,
  },
  radius: {
    xs: "0.125rem", // 2px
    sm: "0.25rem", // 4px
    md: "0.5rem", // 8px
    lg: "1rem", // 16px
    xl: "2rem", // 32px
  },
  spacing: {
    xs: "0.5rem", // Figma 8px
    sm: "1rem", // Figma 16px
    md: "1.5rem", // Figma 24px
    lg: "2rem", // Figma 32px
    xl: "2.5rem", // Figma 40px
  },
  headings: {
    fontWeight: "700",
    sizes: {
      h1: { fontSize: "1.5rem", lineHeight: "1.2" }, // Figma 24px
      h2: { fontSize: "1.25rem", lineHeight: "1.2" }, // Figma 20px
      h3: { fontSize: "1.125rem", lineHeight: "1.2" }, // Figma 18px
      h4: { fontSize: "1rem", lineHeight: "1.2" }, // Figma 16px (P1)
    },
  },
  components: {
    Button: {
      defaultProps: {
        radius: "sm",
      },
      vars: (_theme: unknown, props: ComponentVarsProps) => {
        const { color, variant, disabled } = props;
        // Disabled: use Axiom disabled tokens
        if (disabled) {
          return {
            root: {
              "--button-bg": "var(--axiom-content-field-disabled)",
              "--button-color": "var(--axiom-text-disabled)",
              "--button-hover": "var(--axiom-content-field-disabled)",
              "--button-hover-color": "var(--axiom-text-disabled)",
              "--button-bd": "1px solid var(--axiom-border)",
            },
          };
        }
        // Red light variant: use Axiom error surface/feedback tokens
        if (color === "axiom-red" && variant === "light") {
          return {
            root: {
              "--button-bg": "var(--axiom-surface-error)",
              "--button-color": "var(--axiom-feedback-error)",
              "--button-hover":
                "color-mix(in srgb, var(--axiom-feedback-error) 20%, var(--axiom-surface-error))",
              "--button-hover-color": "var(--axiom-feedback-error)",
            },
          };
        }
        return {};
      },
    },
    Badge: {
      defaultProps: {
        radius: "sm",
      },
    },
    Input: Input.extend({
      classNames: {
        input: inputClasses.input,
      },
    }),
    TagsInput: {
      styles: () => ({
        input: {
          display: "flex",
          alignItems: "center",
        },
      }),
    },
    InputWrapper: Input.Wrapper.extend({
      classNames: {
        label: inputClasses.label,
        description: inputClasses.description,
        error: inputClasses.error,
      },
    }),
    TextInput: {
      defaultProps: {
        radius: "sm",
      },
    },
    Textarea: {
      defaultProps: {
        radius: "sm",
      },
    },
    NumberInput: {
      defaultProps: {
        radius: "sm",
      },
    },
    Checkbox: {
      defaultProps: {
        radius: "sm",
      },
    },
    Card: {
      defaultProps: {
        radius: "md",
        withBorder: true,
      },
    },
    Switch: {
      styles: () => ({
        track: {
          borderColor: "var(--axiom-border)",
        },
      }),
    },
    Tooltip: {
      defaultProps: {
        withArrow: true,
      },
      styles: () => ({
        tooltip: {
          backgroundColor: "var(--axiom-surface-emphasis)",
          color: "var(--axiom-text-on-dark)",
          fontSize: "0.75rem",
        },
      }),
    },
    Notification: {
      defaultProps: {
        radius: "sm",
      },
      vars: (_theme: unknown, props: ComponentVarsProps) =>
        resolveFeedbackColorVar(props, "--notification-color"),
      styles: () => ({
        root: {
          borderColor: "var(--axiom-border)",
          backgroundColor: "var(--axiom-surface-primary)",
        },
        title: {
          color: "var(--axiom-text)",
        },
        description: {
          color: "var(--axiom-text-secondary)",
        },
        closeButton: {
          color: "var(--axiom-text-secondary)",
        },
      }),
    },
    Alert: {
      defaultProps: {
        radius: "sm",
      },
      vars: (_theme: unknown, props: ComponentVarsProps) =>
        resolveFeedbackColorVar(props, "--alert-color"),
      styles: () => ({
        root: {
          borderColor: "var(--axiom-border)",
        },
        title: {
          color: "var(--axiom-text)",
        },
        message: {
          color: "var(--axiom-text-secondary)",
        },
      }),
    },
    Modal: {
      defaultProps: {
        radius: "sm",
      },
      styles: () => ({
        header: {
          borderBottom: "1px solid var(--axiom-border)",
        },
        title: {
          color: "var(--axiom-text)",
          fontWeight: "var(--axiom-font-weight-semibold)",
        },
        body: {
          color: "var(--axiom-text)",
        },
        content: {
          backgroundColor: "var(--axiom-surface-primary)",
        },
      }),
    },
    Drawer: {
      defaultProps: {
        radius: "sm",
      },
      styles: () => ({
        header: {
          borderBottom: "1px solid var(--axiom-border)",
        },
        title: {
          color: "var(--axiom-text)",
          fontWeight: "var(--axiom-font-weight-semibold)",
        },
        body: {
          color: "var(--axiom-text)",
        },
        content: {
          backgroundColor: "var(--axiom-surface-primary)",
        },
      }),
    },
    Dialog: {
      defaultProps: {
        radius: "md",
      },
      styles: () => ({
        root: {
          backgroundColor: "var(--axiom-surface-primary)",
          borderColor: "var(--axiom-border)",
        },
      }),
    },
    Menu: {
      styles: () => ({
        dropdown: {
          borderColor: "var(--axiom-border)",
          backgroundColor: "var(--axiom-surface-primary)",
        },
        item: {
          color: "var(--axiom-text)",
        },
        label: {
          color: "var(--axiom-text-secondary)",
        },
        divider: {
          borderColor: "var(--axiom-border)",
        },
      }),
    },
    Accordion: {
      styles: () => ({
        item: {
          borderColor: "var(--axiom-border)",
        },
        control: {
          color: "var(--axiom-text)",
        },
        panel: {
          color: "var(--axiom-text-secondary)",
        },
      }),
    },
    Tabs: {
      classNames: tabsClasses,
      vars: () => ({
        root: {
          "--tabs-color": "var(--axiom-primary)",
          "--tab-border-color": "var(--axiom-border)",
        },
      }),
      styles: () => ({
        list: {
          borderColor: "var(--axiom-border)",
        },
      }),
    },
    Progress: {
      defaultProps: {
        radius: "sm",
      },
      styles: () => ({
        root: {
          backgroundColor: "var(--axiom-surface-secondary)",
        },
      }),
    },
    Popover: {
      styles: () => ({
        dropdown: {
          borderColor: "var(--axiom-border)",
          backgroundColor: "var(--axiom-surface-primary)",
        },
      }),
    },
    Select: {
      defaultProps: {
        radius: "sm",
      },
    },
    Radio: {
      defaultProps: {
        radius: "xl",
      },
    },
    Slider: {
      styles: () => ({
        track: {
          backgroundColor: "var(--axiom-surface-secondary)",
        },
      }),
    },
    ScrollArea: {
      styles: () => ({
        scrollbar: {
          backgroundColor: "var(--axiom-surface-secondary)",
        },
      }),
    },
    Table: {
      styles: () => ({
        table: {
          borderColor: "var(--axiom-border)",
        },
        th: {
          color: "var(--axiom-text)",
          borderColor: "var(--axiom-border)",
        },
        td: {
          color: "var(--axiom-text-secondary)",
          borderColor: "var(--axiom-border)",
        },
      }),
    },
    Breadcrumbs: {
      styles: () => ({
        separator: {
          color: "var(--axiom-text-secondary)",
        },
      }),
    },
    ActionIcon: {
      defaultProps: {
        radius: "sm",
      },
    },
    Stepper: {
      defaultProps: {
        radius: "xl",
      },
      classNames: stepperClasses,
      styles: () => ({
        stepLabel: {
          fontWeight: 500,
          color: "var(--axiom-text)",
        },
        stepDescription: {
          color: "var(--axiom-text-secondary)",
          fontSize: "0.75rem",
        },
      }),
    },
    Pagination: {
      defaultProps: {
        radius: "sm",
      },
      styles: () => ({
        control: {
          borderColor: "var(--axiom-border)",
        },
      }),
    },
    SegmentedControl: {
      defaultProps: {
        radius: "sm",
      },
      styles: () => ({
        root: {
          backgroundColor: "var(--axiom-surface-secondary)",
        },
        label: {
          color: "var(--axiom-text)",
        },
      }),
    },
    Chip: {
      styles: () => ({
        label: {
          borderColor: "var(--axiom-border)",
        },
      }),
    },
    Skeleton: {
      styles: () => ({
        root: {
          backgroundColor: "var(--axiom-surface-secondary)",
        },
      }),
    },
    Timeline: {
      styles: () => ({
        itemBullet: {
          borderColor: "var(--axiom-border)",
        },
        item: {
          borderColor: "var(--axiom-border)",
        },
      }),
    },
    Paper: {
      styles: () => ({
        root: {
          borderColor: "var(--axiom-border)",
        },
      }),
    },
    ThemeIcon: {
      defaultProps: {
        radius: "sm",
      },
    },
    Fieldset: {
      styles: () => ({
        root: {
          borderColor: "var(--axiom-border)",
          backgroundColor: "var(--axiom-surface-primary)",
        },
        legend: {
          color: "var(--axiom-text)",
        },
      }),
    },
    NavLink: {
      styles: () => ({
        root: {
          borderRadius: "var(--mantine-radius-sm)",
        },
        label: {
          color: "var(--axiom-text)",
        },
      }),
    },
    Divider: {
      styles: () => ({
        label: {
          color: "var(--axiom-text-secondary)",
        },
      }),
    },
    HoverCard: {
      styles: () => ({
        dropdown: {
          borderColor: "var(--axiom-border)",
          backgroundColor: "var(--axiom-surface-primary)",
        },
      }),
    },
  },
});

/* CSS Variables Resolver (maps Axiom tokens to CSS vars) */

export const axiomCSSVariablesResolver: CSSVariablesResolver = (theme) => ({
  variables: {
    // Spacing (aliased from Mantine theme spacing)
    "--axiom-spacing-3xs": "0px",
    "--axiom-spacing-2xs": "0.25rem", // 4px
    "--axiom-spacing-xs": theme.spacing.xs, // 8px
    "--axiom-spacing-sm": theme.spacing.sm, // 16px
    "--axiom-spacing-md": theme.spacing.md, // 24px
    "--axiom-spacing-lg": theme.spacing.lg, // 32px
    "--axiom-spacing-xl": theme.spacing.xl, // 40px
    "--axiom-spacing-2xl": "3rem", // 48px
    "--axiom-spacing-3xl": "3.75rem", // 60px
    // Extended radius
    "--axiom-radius-3xs": "0px",
    "--axiom-radius-2xs": "0.25rem", // 4px
    "--axiom-radius-2xl": "2.5rem", // 40px
    "--axiom-radius-3xl": "3.75rem", // 60px
    // Padding scale
    "--axiom-padding-3xs": "0px",
    "--axiom-padding-2xs": "0.25rem", // 4px
    "--axiom-padding-xs": "0.5rem", // 8px
    "--axiom-padding-sm": "0.75rem", // 12px
    "--axiom-padding-md": "1rem", // 16px
    "--axiom-padding-lg": "1.25rem", // 20px
    "--axiom-padding-xl": "1.75rem", // 28px
    "--axiom-padding-2xl": "2.25rem", // 36px
    "--axiom-padding-3xl": "2.5rem", // 40px
    // Sizing scale
    "--axiom-sizing-3xs": "0.5rem", // 8px
    "--axiom-sizing-2xs": "0.75rem", // 12px
    "--axiom-sizing-xs": "1rem", // 16px
    "--axiom-sizing-sm": "1.25rem", // 20px
    "--axiom-sizing-md": "1.75rem", // 28px
    "--axiom-sizing-lg": "2.25rem", // 36px
    "--axiom-sizing-xl": "2.5rem", // 40px
    "--axiom-sizing-2xl": "3rem", // 48px
    "--axiom-sizing-3xl": "3.75rem", // 60px
    // Font size scale
    "--axiom-font-size-2xs": "0.625rem", // 10px
    "--axiom-font-size-xs": "0.75rem", // 12px
    "--axiom-font-size-sm": "0.875rem", // 14px
    "--axiom-font-size-md": "1rem", // 16px
    "--axiom-font-size-lg": "1.125rem", // 18px
    "--axiom-font-size-xl": "1.25rem", // 20px
    "--axiom-font-size-2xl": "1.5rem", // 24px
    "--axiom-font-size-3xl": "2rem", // 32px
    // Font weight scale
    "--axiom-font-weight-regular": "400",
    "--axiom-font-weight-medium": "500",
    "--axiom-font-weight-semibold": "600",
    "--axiom-font-weight-bold": "700",
    // Line height scale
    "--axiom-line-height-tight": "1.1",
    "--axiom-line-height-snug": "1.2",
    "--axiom-line-height-normal": "1.4",
    "--axiom-line-height-relaxed": "1.6",
    // Header (dark surface) tokens
    "--axiom-header-search-width": "clamp(10rem, 16vw, 16rem)",
    "--axiom-header-input-bg": "rgba(255, 255, 255, 0.06)",
    "--axiom-header-input-border": "rgba(255, 255, 255, 0.1)",
    "--axiom-header-input-border-focus": "var(--mantine-color-blue-5)",
    "--axiom-header-input-placeholder": "rgba(203, 213, 225, 0.7)",
    // AI button tokens
    "--axiom-ai-color": "rgb(196, 181, 253)",
    "--axiom-ai-bg":
      "linear-gradient(90deg, rgba(139, 92, 246, 0.28), rgba(59, 130, 246, 0.2))",
    "--axiom-ai-border": "rgba(120, 100, 240, 0.35)",
    "--axiom-ai-bg-hover":
      "linear-gradient(90deg, rgba(139, 92, 246, 0.4), rgba(59, 130, 246, 0.32))",
  },
  light: {
    "--axiom-primary": theme.colors["axiom-blue"][6], // #0f6eef
    "--axiom-primary-hover": theme.colors["axiom-blue"][7], // #0d5dca
    "--axiom-surface-primary": "#ffffff",
    "--axiom-surface-secondary": "#f8f9fa",
    "--axiom-surface-emphasis": "#252525",
    "--axiom-surface-page": "#eef2f5",
    "--axiom-surface-disabled": "#e0e0e0",
    "--axiom-surface-info": theme.colors["axiom-blue"][0], // #e8f1fe
    "--axiom-surface-warning": "#fffce6",
    "--axiom-surface-success": theme.colors["axiom-green"][0], // #e6ffe9
    "--axiom-surface-error": theme.colors["axiom-red"][0], // #fff0f0
    "--axiom-text": "#212121",
    "--axiom-text-secondary": "#707070",
    "--axiom-text-disabled": "#a2a2a2",
    "--axiom-text-link": theme.colors["axiom-blue"][6], // #0f6eef
    "--axiom-text-placeholder": "#cccccc",
    "--axiom-text-on-dark": "#f2f2f2",
    "--axiom-text-on-light": "#212121",
    "--axiom-border": "#e0e0e0",
    "--axiom-border-error": theme.colors["axiom-red"][6], // #dc000d
    "--axiom-feedback-info": theme.colors["axiom-blue"][7], // #0d5dca
    "--axiom-feedback-error": theme.colors["axiom-red"][6], // #dc000d
    "--axiom-feedback-success": theme.colors["axiom-green"][6], // #04b000
    "--axiom-feedback-warning": "#ff7a00",
    "--axiom-state-focus-primary": theme.colors["axiom-blue"][6],
    "--axiom-state-focus-secondary": "rgba(162,199,249,0.20)",
    "--axiom-state-hover": "rgba(112, 112, 112, 0.05)",
    "--axiom-state-selection": "rgba(15,110,239,0.10)",
    "--axiom-state-overlay": "rgba(6,6,6,0.20)",
    "--axiom-state-highlight": "rgba(255,255,255,0.10)",
    "--axiom-content-field": "#ffffff",
    "--axiom-content-field-disabled": "#f2f2f2",
    // Charts
    "--axiom-charts-1": "#088ae0",
    "--axiom-charts-2": "#ffbb0b",
    "--axiom-charts-3": "#38c15e",
    "--axiom-charts-4": "#e25691",
    "--axiom-charts-5": "#3dc1c6",
    "--axiom-charts-6": "#9146b4",
    "--axiom-charts-7": "#057d4b",
    "--axiom-charts-8": "#ff8eb7",
    "--axiom-charts-9": "#c27fe1",
    "--axiom-charts-10": "#9ecb3e",
    "--axiom-charts-11": "#014589",
    "--axiom-charts-12": "#ad1d48",
    // Categorical
    "--axiom-categorical-1": theme.colors["axiom-neutral-cool"][8],
    "--axiom-categorical-2": theme.colors["axiom-cyan"][5],
    "--axiom-categorical-3": theme.colors["axiom-blue"][8],
    "--axiom-categorical-4": theme.colors["axiom-blue"][5],
    "--axiom-categorical-5": theme.colors["axiom-violet"][6],
    "--axiom-categorical-6": theme.colors["axiom-violet"][3],
    "--axiom-categorical-7": theme.colors["axiom-magenta"][6],
    "--axiom-categorical-8": theme.colors["axiom-magenta"][2],
    "--axiom-categorical-9": theme.colors["axiom-red"][7],
    "--axiom-categorical-10": theme.colors["axiom-red"][4],
    "--axiom-categorical-11": theme.colors["axiom-yellow"][9],
    "--axiom-categorical-12": theme.colors["axiom-yellow"][5],
    "--axiom-categorical-13": theme.colors["axiom-green"][8],
    "--axiom-categorical-14": theme.colors["axiom-chartreuse"][5],
    "--axiom-categorical-15": theme.colors["axiom-brown"][7],
  },
  dark: {
    "--axiom-primary": "#3384f2",
    "--axiom-primary-hover": "#589af5",
    "--axiom-surface-primary": "#212121",
    "--axiom-surface-secondary": "#181818",
    "--axiom-surface-emphasis": "#ffffff",
    "--axiom-surface-page": "#060606",
    "--axiom-surface-disabled": "#383838",
    "--axiom-surface-info": "#1a2a4a",
    "--axiom-surface-warning": "#3a2a00",
    "--axiom-surface-success": "#0a2a0a",
    "--axiom-surface-error": "#3a0a0a",
    "--axiom-text": "#f2f2f2",
    "--axiom-text-secondary": "#a2a2a2",
    "--axiom-text-disabled": "#707070",
    "--axiom-text-link": "#589af5",
    "--axiom-text-placeholder": "#444444",
    "--axiom-text-on-dark": "#f2f2f2",
    "--axiom-text-on-light": "#212121",
    "--axiom-border": "#444444",
    "--axiom-border-error": "#ff1321",
    "--axiom-feedback-info": "#589af5",
    "--axiom-feedback-error": "#ff1321",
    "--axiom-feedback-success": "#0dd208",
    "--axiom-feedback-warning": "#ffc700",
    "--axiom-state-focus-primary": "#ffffff",
    "--axiom-state-focus-secondary": "#707070",
    "--axiom-state-hover": "rgba(255,255,255,0.05)",
    "--axiom-state-selection": "rgba(255,255,255,0.10)",
    "--axiom-state-overlay": "rgba(255,255,255,0.20)",
    "--axiom-state-highlight": "rgba(6,6,6,0.10)",
    "--axiom-content-field": "#383838",
    "--axiom-content-field-disabled": "#252525",
    // Charts
    "--axiom-charts-1": "#4589ff",
    "--axiom-charts-2": "#ffff38",
    "--axiom-charts-3": "#55e874",
    "--axiom-charts-4": "#ff7eb6",
    "--axiom-charts-5": "#60f9f6",
    "--axiom-charts-6": "#daaaff",
    "--axiom-charts-7": "#30cb93",
    "--axiom-charts-8": "#fc62ff",
    "--axiom-charts-9": "#c27fe1",
    "--axiom-charts-10": "#ccffba",
    "--axiom-charts-11": "#8ea0ff",
    "--axiom-charts-12": "#757c96",
    // Categorical
    "--axiom-categorical-1": theme.colors["axiom-neutral-cool"][8],
    "--axiom-categorical-2": theme.colors["axiom-cyan"][5],
    "--axiom-categorical-3": theme.colors["axiom-blue"][8],
    "--axiom-categorical-4": theme.colors["axiom-blue"][5],
    "--axiom-categorical-5": theme.colors["axiom-violet"][6],
    "--axiom-categorical-6": theme.colors["axiom-violet"][3],
    "--axiom-categorical-7": theme.colors["axiom-magenta"][5],
    "--axiom-categorical-8": theme.colors["axiom-magenta"][2],
    "--axiom-categorical-9": theme.colors["axiom-red"][7],
    "--axiom-categorical-10": theme.colors["axiom-red"][4],
    "--axiom-categorical-11": theme.colors["axiom-yellow"][9],
    "--axiom-categorical-12": theme.colors["axiom-yellow"][4],
    "--axiom-categorical-13": theme.colors["axiom-green"][8],
    "--axiom-categorical-14": theme.colors["axiom-chartreuse"][4],
    "--axiom-categorical-15": theme.colors["axiom-brown"][7],
  },
});
