import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  ViewOptionsPopover,
} from "fumadocs-ui/layouts/docs/page";
import { createRelativeLink } from "fumadocs-ui/mdx";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComponentLinks } from "@/components/ComponentLinks";
import { getMDXComponents } from "@/components/mdx";
import { gitConfig } from "@/lib/layout.shared";
import { getPageImage, source } from "@/lib/source";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const slug = ["components", ...(params.slug ?? [])];
  const page = source.getPage(slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const links = page.data.links;
  const markdownUrl = `/llms/docs/${[...page.slugs, "index.md"].join("/")}`;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      {params.slug !== undefined &&
      params.slug[params.slug?.length - 1] !== "components" ? (
        <div className="flex items-center gap-1.5 text-sm text-fd-muted-foreground">
          <span className="truncate text-fd-primary font-medium">
            Components
          </span>
        </div>
      ) : null}
      <section className="flex flex-col gap-2 mb-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <DocsTitle className="flex items-center gap-2">
            {page.data.title}
          </DocsTitle>
          {page.data.toc.length > 0 && (
            <div className="flex items-center gap-2">
              <ViewOptionsPopover
                markdownUrl={markdownUrl}
                githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/docs/${page.path}`}
                className="text-[0px] pl-0"
              />
            </div>
          )}
        </div>
        <DocsDescription className="mb-0">
          {page.data.description}
        </DocsDescription>
        {!!links && <ComponentLinks links={links} />}
      </section>

      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
        <br />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source
    .generateParams()
    .filter((params) => params.slug?.[0] === "components")
    .map((params) => ({
      ...params,
      slug: params.slug?.slice(1),
    }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const slug = ["components", ...(params.slug ?? [])];
  const page = source.getPage(slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
