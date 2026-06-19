import fs from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  addGetDocumentationTool,
  addGetStoryDocumentationTool,
  addListAllDocumentationTool,
  type StorybookContext,
} from "@storybook/mcp";
import { ValibotJsonSchemaAdapter } from "@tmcp/adapter-valibot";
import { StdioTransport } from "@tmcp/transport-stdio";
import { McpServer } from "tmcp";
import packageJson from "../../package.json";

const __dirname = dirname(fileURLToPath(import.meta.url));

const adapter = new ValibotJsonSchemaAdapter();
const server = new McpServer(
  {
    name: "axiom-ui",
    version: packageJson.version,
  },
  {
    adapter,
    capabilities: {
      tools: { listChanged: true },
    },
    instructions:
      "Axiom Design System — component docs, APIs, and usage examples for the axiom-ui React component library built on Mantine v9.",
  },
).withContext<StorybookContext>();

await addListAllDocumentationTool(server);
await addGetDocumentationTool(server);
await addGetStoryDocumentationTool(server);

const transport = new StdioTransport(server);

transport.listen({
  // format: "markdown",
  manifestProvider: async (_request, path) =>
    fs.readFile(join(__dirname, path), "utf-8"),
});
