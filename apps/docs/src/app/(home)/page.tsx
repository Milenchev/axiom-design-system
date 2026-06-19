import Link from "next/link";
import { STORYBOOK_URL } from "@/config/constants";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-20">
      {/* Badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-fd-border/60 bg-fd-muted/50 px-4 py-1.5 text-sm text-fd-muted-foreground">
        <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        Production-tested at enterprise scale
      </div>

      {/* Hero heading */}
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-center max-w-4xl leading-[1.1]">
        Build interfaces{" "}
        <span className="bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
          that scale
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-6 text-lg md:text-xl text-fd-muted-foreground text-center max-w-2xl leading-relaxed">
        Axiom is a modern React component library with 60+ accessible, themeable
        components. From buttons to full application shells — everything you
        need to build enterprise-grade UIs.
      </p>

      {/* CTAs */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <Link
          href="/docs"
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-7 py-3 rounded-xl font-medium text-sm shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-0.5 transition-all"
        >
          Get Started
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
        <a
          href={STORYBOOK_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 border border-fd-border bg-fd-background px-7 py-3 rounded-xl font-medium text-sm text-fd-foreground hover:bg-fd-accent hover:-translate-y-0.5 transition-all"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect width="7" height="7" x="3" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="14" rx="1" />
            <rect width="7" height="7" x="3" y="14" rx="1" />
          </svg>
          Component Catalog
        </a>
      </div>

      {/* Stats */}
      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
        {[
          { value: "60+", label: "Components" },
          { value: "100%", label: "TypeScript" },
          { value: "AA", label: "Accessible" },
          { value: "4", label: "Live Demos" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-3xl md:text-4xl font-bold tracking-tight text-fd-foreground">
              {stat.value}
            </div>
            <div className="mt-1 text-sm text-fd-muted-foreground">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Feature cards */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl w-full">
        <div className="rounded-2xl border border-fd-border/60 bg-fd-card p-6 hover:border-violet-200 hover:shadow-sm transition-all">
          <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center mb-4">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="hsl(262 83% 58%)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          </div>
          <h3 className="font-semibold text-fd-foreground mb-1.5">Themeable</h3>
          <p className="text-sm text-fd-muted-foreground leading-relaxed">
            Light and dark mode out of the box. Customizable design tokens for
            any brand.
          </p>
        </div>
        <div className="rounded-2xl border border-fd-border/60 bg-fd-card p-6 hover:border-violet-200 hover:shadow-sm transition-all">
          <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center mb-4">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="hsl(262 83% 58%)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <h3 className="font-semibold text-fd-foreground mb-1.5">
            Composable
          </h3>
          <p className="text-sm text-fd-muted-foreground leading-relaxed">
            Combine primitives into complex layouts. AppLayout, GridLayout, and
            more.
          </p>
        </div>
        <div className="rounded-2xl border border-fd-border/60 bg-fd-card p-6 hover:border-violet-200 hover:shadow-sm transition-all">
          <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center mb-4">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="hsl(262 83% 58%)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <h3 className="font-semibold text-fd-foreground mb-1.5">
            Enterprise-Ready
          </h3>
          <p className="text-sm text-fd-muted-foreground leading-relaxed">
            Battle-tested in production at a large company with thousands of
            daily users.
          </p>
        </div>
      </div>
    </main>
  );
}
