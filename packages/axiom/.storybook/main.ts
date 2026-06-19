import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-vitest"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-themes"),
    {
      name: getAbsolutePath("@storybook/addon-mcp"),
      options: {
        toolsets: {
          dev: false,
          docs: true,
          test: true,
        },
      },
    },
  ],
  framework: getAbsolutePath("@storybook/react-vite"),
  viteFinal: async (config) => {
    config.resolve = {
      ...config.resolve,
      tsconfigPaths: true,
    };
    return config;
  },
  core: {
    disableTelemetry: true,
  },
  docs: {
    defaultName: "Overview",
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      exclude: ["**/node_modules/**", "**/.storybook/**"],
      propFilter: (prop) => {
        if (prop.parent) {
          // Allow props from @mantine to show up in controls
          if (/@mantine/.test(prop.parent.fileName)) {
            return true;
          }
          return !/node_modules/.test(prop.parent.fileName);
        }
        return true;
      },
    },
  },
  managerHead: (head) => `
    ${head}
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
  `,
};
export default config;
