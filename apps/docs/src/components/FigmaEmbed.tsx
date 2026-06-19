"use client";

import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { FigmaIcon } from "./CustomIcons";

interface FigmaEmbedProps
  extends Omit<HTMLAttributes<HTMLIFrameElement>, "id"> {
  /**
   * The regular Figma URL or the Figma embed URL.
   * Example: `https://www.figma.com/design/nrPSsILSYjesyc5UHjYYa4/...`
   */
  url: string;
  /**
   * Optional height for the iframe.
   * Defaults to '450px'.
   */
  height?: string | number;
  /**
   * Whether to show the top toolbar.
   * Defaults to true.
   */
  showToolbar?: boolean;
  /**
   * The title for the iframe.
   */
  title?: string;
}

export function FigmaEmbed({
  url,
  height = "450px",
  showToolbar = false,
  className,
  title = "Figma Preview",
  ...props
}: FigmaEmbedProps) {
  if (!url) {
    return (
      <div className="p-4 text-sm text-destructive border rounded-md my-4">
        Error: No url provided to FigmaEmbed.
      </div>
    );
  }

  let embedUrl = url;
  const linkUrl = url.replace("embed.figma.com", "www.figma.com");

  // If a regular figma.com URL is provided, convert it to the embed URL format
  // Replace www.figma.com with embed.figma.com
  if (url.includes("www.figma.com")) {
    embedUrl = url.replace("www.figma.com", "embed.figma.com");
  }

  // Ensure it has an embed-host if not present
  try {
    const urlObj = new URL(embedUrl);
    if (!urlObj.searchParams.has("embed-host")) {
      urlObj.searchParams.set("embed-host", "axiom-design-system");
    }
    embedUrl = urlObj.toString();
  } catch (_e) {
    // If URL is invalid, ignore
  }

  return (
    <div
      className={cn(
        "my-6 w-full overflow-hidden rounded-xl border bg-background",
        className,
      )}
    >
      {showToolbar && (
        <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-2">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <FigmaIcon className="h-4 w-4" />
            Figma
          </div>
        </div>
      )}
      <iframe
        src={embedUrl}
        title={title}
        width="100%"
        height={height}
        frameBorder="0"
        allowFullScreen
        className="w-full bg-background"
        {...props}
      />
      <a
        className="flex items-center justify-end gap-2 px-4 py-2 text-xs text-current text-opacity-50 no-underline hover:text-opacity-100 transition-opacity"
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FigmaIcon style={{ height: 14, width: 14 }} />
        Open in Figma
      </a>
    </div>
  );
}
