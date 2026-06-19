import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Fast, jsdom-based unit tests for the component library.
// Kept separate from vitest.config.ts (which runs Storybook stories in a real
// browser) so `pnpm test` stays quick and dependency-light.
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    name: "unit",
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    css: false,
  },
});
