import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/bin/mcp.ts"],
  format: ["esm"],
  outDir: "dist",
  dts: false,
  splitting: false,
  banner: { js: "#!/usr/bin/env node" },
  noExternal: [/.*/],
  clean: false,
});
