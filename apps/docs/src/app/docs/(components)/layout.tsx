import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions()}
      themeSwitch={{ enabled: false }}
      sidebar={{ collapsible: false }}
      searchToggle={{ enabled: false }}
      tabs={false}
      containerProps={{
        style: {
          "--fd-docs-row-1": "calc(var(--fd-banner-height, 0px) + 3.5rem)",
        } as React.CSSProperties,
      }}
    >
      {children}
    </DocsLayout>
  );
}
