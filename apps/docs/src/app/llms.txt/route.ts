import { llms } from "fumadocs-core/source";
import { source } from "@/lib/source";

export const revalidate = false;

export function GET() {
  const content = llms(source).index();

  // Replace links from [Text](/docs/path) to [Text](/llms.mdx/docs/path/index.mdx)
  // The regex targets markdown links that point to /docs/
  const modifiedContent = content
    .replace("(/docs)", "(/llms/docs/index.md)")
    .replace(/\[(.*?)\]\(\/docs\/(.*?)\)/g, "[$1](/llms/docs/$2/index.md)")
    .replaceAll(": undefined", "")
    .replace("\n- ** Welcome **\n", "")
    .replace(/^- \*\*.*\*\*\n?/gm, "")
    .replace(/^ {2}- \*\*.*\*\*\n?/gm, "")
    .replace("- [Components](/llms/docs/components/index.md)\n", "")
    .replace("- [Explore all components](/llms/docs/components/index.md)", "");

  return new Response(modifiedContent);
}
