import { useMantineColorScheme } from "@mantine/core";
import type { Preview } from "@storybook/react-vite";
import { useEffect, useRef } from "react";
import { addons } from "storybook/preview-api";
import { create } from "storybook/theming/create";
import { ColorSchemeScript, ThemeProvider } from "../src/";

const docsTheme = create({
  base: "light",
  fontBase: '"Inter", sans-serif',
  fontCode: "monospace",
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        date: /Date$/i,
      },
    },
    docs: {
      theme: docsTheme,
      defaultName: "Overview",
    },
    a11y: {
      test: "todo",
    },
    options: {
      storySort: {
        order: [
          "Getting Started",
          "Changelog",
          "Demos",
          "Components",
          "Themed",
        ],
      },
    },
    // backgrounds: { disable: true },
  },
  decorators: [
    (Story, context) => {
      const scheme = (context.globals.theme || "light") as "light" | "dark";
      return (
        <ThemeProvider defaultColorScheme={scheme}>
          <ColorSchemeScript />
          <ColorSchemaUpdater colorScheme={scheme} />
          <Story />
        </ThemeProvider>
      );
    },
  ],
};

function ColorSchemaUpdater({
  colorScheme: globalColorSchema,
}: {
  colorScheme: "light" | "dark";
}) {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const prevGlobalRef = useRef<string>(globalColorSchema);
  const prevMantineRef = useRef<string>(colorScheme);

  useEffect(() => {
    const globalChanged = globalColorSchema !== prevGlobalRef.current;
    const mantineChanged = colorScheme !== prevMantineRef.current;

    if (globalChanged) {
      // Toolbar changed → sync to Mantine
      prevGlobalRef.current = globalColorSchema;
      prevMantineRef.current = globalColorSchema;
      setColorScheme(globalColorSchema);
    } else if (mantineChanged) {
      // Component changed Mantine → sync to Toolbar
      prevMantineRef.current = colorScheme;
      prevGlobalRef.current = colorScheme;
      addons.getChannel().emit("updateGlobals", {
        globals: { theme: colorScheme },
      });
    }
  }, [globalColorSchema, colorScheme, setColorScheme]);

  return null;
}

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Color scheme",
    defaultValue: "light",
    toolbar: {
      icon: "mirror",
      items: [
        { value: "light", title: "Light" },
        { value: "dark", title: "Dark" },
      ],
    },
  },
};

export default preview;
