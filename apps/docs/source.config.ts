import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { z } from "zod";

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  dir: "../../docs",
  docs: {
    schema: pageSchema.extend({
      links: z
        .object({
          figma: z.union([z.string(), z.boolean()]).optional(),
          mantine: z.string().optional(),
          storybook: z.string().optional(),
          source: z.string().optional(),
        })
        .optional(),
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    // MDX options
    rehypeCodeOptions: {
      themes: {
        light: "github-dark",
        dark: "github-dark",
      },
    },
  },
});
