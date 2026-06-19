"use client";

import { IconMoon, IconSun } from "@tabler/icons-react";
import { type HTMLAttributes, useEffect, useState } from "react";
import { STORYBOOK_URL } from "@/config/constants";
import { cn } from "@/lib/cn";
import { StorybookIcon } from "./CustomIcons";

interface StorybookStory {
  id: string;
  label: string;
}

interface StorybookEmbedProps
  extends Omit<HTMLAttributes<HTMLIFrameElement>, "id"> {
  /**
   * The ID of a single story to embed.
   * You can find this in the URL of your Storybook instance.
   * Example: `components-button--primary`
   */
  id?: string;
  /**
   * An array of stories to embed. If provided, a select dropdown will appear in the toolbar.
   */
  stories?: StorybookStory[];
  /**
   * The base URL of your Storybook instance.
   * Defaults to localhost:6006 for local development.
   */
  baseUrl?: string;
  /**
   * Optional view mode. Usually 'story' or 'docs'.
   * Defaults to 'story'.
   */
  viewMode?: "story" | "docs";
  /**
   * Optional height for the iframe.
   * Defaults to '400px'.
   */
  height?: string | number;
  /**
   * Whether to show the top toolbar.
   * Defaults to true.
   */
  showToolbar?: boolean;
}

export function StorybookEmbed({
  id,
  stories,
  baseUrl = STORYBOOK_URL,
  viewMode = "story",
  height = "320px",
  showToolbar = true,
  className,
  title = "Storybook Preview",
  ...props
}: StorybookEmbedProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Determine initial story id
  const initialStoryId =
    id || (stories && stories.length > 0 ? stories[0].id : "");
  const [selectedStoryId, setSelectedStoryId] = useState(initialStoryId);

  // Sync selectedStoryId if id or stories prop changes
  useEffect(() => {
    if (id) {
      setSelectedStoryId(id);
    } else if (stories && stories.length > 0) {
      setSelectedStoryId(stories[0].id);
    }
  }, [id, stories]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("storybook-embed-theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      localStorage.setItem("storybook-embed-theme", newTheme);
      return newTheme;
    });
  };

  if (!selectedStoryId) {
    return (
      <div className="p-4 text-sm text-destructive border rounded-md my-4">
        Error: No story ID provided to StorybookEmbed.
      </div>
    );
  }

  // Construct the embed URL based on Storybook's URL structure
  // Documentation: https://storybook.js.org/docs/sharing/embed
  // Storybook serves the preview at /iframe.html (a bare /iframe returns 404).
  const embedUrl = new URL("/iframe.html", baseUrl);
  embedUrl.searchParams.set("id", selectedStoryId);
  embedUrl.searchParams.set("viewMode", viewMode);

  const linkUrl = new URL("/", baseUrl);
  linkUrl.searchParams.set("path", `/story/${selectedStoryId}`);

  // Add the theme global parameter
  // Appended as a raw string because Storybook expects `&globals=theme:dark`
  // rather than standard URL encoding which might escape the colon.
  let finalUrl = embedUrl.toString();
  finalUrl += `&globals=theme:${theme}`;

  let finalLinkUrl = linkUrl.toString();
  finalLinkUrl += `&globals=theme:${theme}`;

  const hasMultipleStories = stories && stories.length > 1;

  return (
    <div
      className={cn(
        "my-6 w-full overflow-hidden rounded-xl border bg-background",
        className,
      )}
    >
      {showToolbar && (
        <div
          className={cn(
            "flex items-center border-b bg-muted/50 px-4 py-2",
            hasMultipleStories ? "justify-between" : "justify-end",
          )}
        >
          {hasMultipleStories && (
            <select
              value={selectedStoryId}
              onChange={(e) => setSelectedStoryId(e.target.value)}
              className="h-8 rounded-md border border-input bg-background px-3 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {stories.map((story) => (
                <option key={story.id} value={story.id}>
                  {story.label}
                </option>
              ))}
            </select>
          )}
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ml-auto"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          >
            {theme === "dark" ? (
              <IconMoon className="h-4 w-4 text-muted-foreground" />
            ) : (
              <IconSun className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        </div>
      )}
      <iframe
        src={finalUrl}
        title={title}
        width="100%"
        height={height}
        frameBorder="0"
        allow="clipboard-write; fullscreen"
        className="w-full bg-background"
        {...props}
      />
      <a
        className="flex items-center justify-end gap-2 px-4 py-2 text-xs text-current text-opacity-50 no-underline"
        href={finalLinkUrl}
        target="_blank"
        rel="noopener"
      >
        <StorybookIcon
          className="text-[#ff4785]"
          style={{ height: 14, width: 14 }}
        />
        View in Storybook
      </a>
    </div>
  );
}
