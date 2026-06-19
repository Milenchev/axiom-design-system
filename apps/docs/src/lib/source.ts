import { icons } from "@tabler/icons-react";
import { docs } from "collections/server";
import type { Root } from "fumadocs-core/page-tree";
import { type InferPageType, loader } from "fumadocs-core/source";
import { createElement } from "react";

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  plugins: [],
  icon(icon) {
    if (!icon) return;
    if (icon in icons) {
      return createElement(icons[icon as keyof typeof icons], { size: 16 });
    }
  },
});

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, "image.webp"];

  return {
    segments,
    url: `/og/docs/${segments.join("/")}`,
  };
}

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText("processed");

  return `# ${page.data.title}

${processed}`;
}

/**
 * Return the page tree without the "Components" root folder.
 * Used by the (design) route group layout so the sidebar
 * only shows design/foundation pages.
 */
export function getPageTreeWithoutComponents(): Root {
  const tree = source.getPageTree();
  return {
    ...tree,
    children: tree.children.filter(
      (node) =>
        !(
          node.type === "folder" &&
          node.root === true &&
          typeof node.name === "string" &&
          node.name.toLowerCase() === "components"
        ),
    ),
  };
}
