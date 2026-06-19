"use client";

import { useSearchContext } from "fumadocs-ui/contexts/search";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  {
    text: "Foundations",
    href: "/docs",
    match: (p: string) =>
      p.startsWith("/docs") &&
      !p.startsWith("/docs/components") &&
      !p.startsWith("/docs/demo"),
  },
  {
    text: "Components",
    href: "/docs/components",
    match: (p: string) => p.startsWith("/docs/components"),
  },
  {
    text: "Demos",
    href: "/docs/demos",
    match: (p: string) => p.startsWith("/docs/demo") || p.startsWith("/demos"),
  },
];

export function Header() {
  const { setOpenSearch } = useSearchContext();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-fd-border/50 backdrop-blur-md bg-fd-background/80 [transform:translateZ(0)] [will-change:transform]">
      <div className="mx-auto max-w-[1400px]">
        <nav className="flex h-16 w-full items-center px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-white ring-1 ring-fd-border/60 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <svg
                width="20"
                height="18"
                viewBox="0 0 48 44"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M23.3136 0.000172577C23.7656 -0.00605594 23.921 0.156142 24.1433 0.514231C24.5509 1.16966 24.9009 1.85882 25.2687 2.53651L27.1908 6.07788L33.0947 16.9308C31.8192 18.8636 30.2932 20.6278 28.5552 22.1798C28.2073 21.4364 27.6831 20.5047 27.2923 19.7644L24.7031 14.8787C24.3176 14.148 23.785 13.2011 23.4606 12.4684C23.0447 13.3426 22.3635 14.5124 21.894 15.378L18.6731 21.292L14.3638 29.2211C13.529 30.7588 12.6725 32.3915 11.801 33.9017C12.793 33.4631 14.4233 32.949 15.5187 32.5115C18.5383 31.3291 21.4343 29.8654 24.1669 28.1413C30.1592 24.3097 35.1209 18.924 36.4043 11.869C36.5267 11.1972 36.6041 10.5141 36.7469 9.84772C36.8285 10.4874 36.7935 11.4111 36.7809 12.0675C36.7396 12.4292 36.7265 12.7951 36.6857 13.1533C34.7223 30.3381 16.9084 39.3342 1.48403 43.0826C1.17902 43.1566 0.767969 43.2439 0.466573 43.1428C-0.578555 42.7936 0.413054 41.5168 0.734277 40.9317L2.16974 38.3147L7.1813 29.1154L17.4297 10.2815L20.8145 4.05739C21.4407 2.90164 22.0628 1.74064 22.6952 0.588359C22.8846 0.24334 22.9652 0.176358 23.3136 0.000172577Z"
                  fill="#0F6EEF"
                />
                <path
                  d="M38.5368 18.7218C38.5949 18.8947 38.5834 19.556 38.586 19.7823C38.609 21.9011 38.3406 23.8773 37.9901 25.9588C38.7707 27.639 47.1256 42.3444 47.1282 42.8973C47.1288 43.0964 47.0131 43.2486 46.8729 43.3844C46.7144 43.5375 46.5099 43.5692 46.2964 43.585C45.5373 43.6422 44.7489 43.6024 43.9866 43.6013L39.6695 43.5957L25.7783 43.5973C24.0289 43.5901 22.2797 43.5916 20.5304 43.6018C21.0917 43.0913 22.3192 42.2122 22.9642 41.696C24.3464 40.5974 25.6774 39.4384 26.9529 38.2223C30.3702 38.1677 34.048 38.1973 37.4701 38.2361C37.1206 37.7139 36.4583 36.4309 36.1412 35.8504C35.2314 34.1544 34.3044 32.4671 33.3606 30.7885C35.4365 27.6017 37.1169 24.444 38.0497 20.761C38.214 20.1123 38.3223 19.4113 38.518 18.7809L38.5368 18.7218Z"
                  fill="#0F6EEF"
                />
              </svg>
            </div>
            <span className="font-semibold text-[15px] tracking-tight text-fd-foreground">
              Axiom
            </span>
          </Link>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Nav links — desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = link.match(pathname);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? "text-fd-foreground bg-fd-accent"
                      : "text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent/50"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.text}
                </Link>
              );
            })}
          </div>

          {/* Search — desktop */}
          <button
            type="button"
            onClick={() => setOpenSearch(true)}
            className="hidden md:flex ml-6 items-center gap-2.5 rounded-lg border border-fd-border/60 bg-fd-muted/30 px-3.5 py-2 text-sm text-fd-muted-foreground hover:bg-fd-accent hover:border-fd-border hover:text-fd-foreground transition-all w-[200px]"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-label="Search"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="flex-1 text-left">Search...</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-md border border-fd-border/60 bg-fd-background px-1.5 py-0.5 text-[11px] text-fd-muted-foreground font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Hamburger — mobile */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden ml-2 p-2 rounded-lg text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-foreground transition-colors"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-fd-border/50 bg-fd-background/95 backdrop-blur-xl px-4 py-3 flex flex-col gap-1 animate-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => {
              const isActive = link.match(pathname);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-fd-foreground bg-fd-accent"
                      : "text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.text}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setOpenSearch(true);
              }}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent transition-colors"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              Search...
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
