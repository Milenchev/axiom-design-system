<div align="center">

# Axiom Design System

**A modern, accessible, fully-typed React design system built on Mantine v9.**

Axiom is an enterprise-grade component library, interactive documentation site, and
living style guide — developed as a diploma project to explore the architecture,
tooling, and engineering practices behind production design systems.

[Components](#-whats-inside) ·
[Quick start](#-quick-start) ·
[Architecture](#-architecture) ·
[Scripts](#-scripts) ·
[Testing](#-testing)

![React 19](https://img.shields.io/badge/React-19-149eca)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6)
![Mantine v9](https://img.shields.io/badge/Mantine-v9-339af0)
![Storybook 10](https://img.shields.io/badge/Storybook-10-ff4785)
![Tests](https://img.shields.io/badge/tests-vitest-6da75d)
![License](https://img.shields.io/badge/license-MIT-green)

</div>

---

## ✨ Overview

Axiom packages a reusable set of UI primitives, composite components, and full
application layouts into a single publishable library (`axiom-ui`). It is designed
around four goals:

- **Consistency** — a centralized token system (colors, typography, spacing,
  radius) drives every component, so screens stay visually coherent.
- **Accessibility** — components follow WCAG 2.2 AA practices and are validated
  with Storybook's a11y addon.
- **Developer experience** — fully typed APIs, a wrapper pattern over Mantine,
  and an MCP server so AI assistants understand the system.
- **Documentation as a product** — a Next.js + Fumadocs site with live Storybook
  embeds, foundations, patterns, guidelines, and four full demo applications.

---

## 🧩 What's inside

| Area | Count | Description |
| --- | --- | --- |
| **Original components** | 23 | Purpose-built components (Button, Badge, Datagrid, AppLayout, MetricCard, FormSection, FilterBar, SearchModal, …) |
| **Themed Mantine wrappers** | 40+ | Themed primitives (inputs, overlays, navigation, feedback) re-exported with Axiom styling |
| **Storybook stories** | 290+ | Interactive, isolated examples for every component and demo |
| **Documentation pages** | 200+ | Component docs, foundations, patterns, guidelines, and demos |
| **Demo applications** | 4 | Application shell, campaign management, settings & forms, analytics dashboard |

---

## 📦 Workspace

This is a [pnpm](https://pnpm.io/) + [Turborepo](https://turbo.build/) monorepo.

```
axiom-design-system/
├── packages/
│   └── axiom/        → the library, published as `axiom-ui`
├── apps/
│   └── docs/         → Next.js 16 + Fumadocs documentation site
├── docs/             → MDX content consumed by the docs app
└── demos/            → demo source referenced by Storybook
```

| Path | Package | Purpose |
| --- | --- | --- |
| `packages/axiom` | `axiom-ui` | React component library, Storybook, MCP server |
| `apps/docs` | `docs` | Documentation website |
| `docs` | — | Authored MDX documentation content |

---

## 🛠 Stack

| Layer | Technology |
| --- | --- |
| Runtime | Node 22 |
| Package manager | pnpm 10 (workspaces) |
| Build orchestration | Turborepo |
| UI runtime | React 19 |
| Component foundation | Mantine v9 |
| Bundler | tsup |
| Docs | Next.js 16 + Fumadocs + Tailwind v4 |
| Component workshop | Storybook 10 |
| Testing | Vitest + Testing Library (jsdom) |
| Lint / format | Biome |
| AI integration | Model Context Protocol (MCP) server |

---

## 🚀 Quick start

```bash
# 1. Install dependencies
pnpm install

# 2. Build the library (generates packages/axiom/dist)
pnpm build

# 3. Develop components in isolation (http://localhost:6006)
pnpm storybook
```

### Running the documentation site

The docs site embeds **live Storybook previews**, so run both processes together:

```bash
# Terminal 1 — Storybook (required for component previews)
pnpm storybook            # → http://localhost:6006

# Terminal 2 — Docs site
pnpm dev:docs             # → http://localhost:3000
```

Then open **http://localhost:3000/docs**.

> For a deployed docs site, set `NEXT_PUBLIC_STORYBOOK_URL` to your hosted
> Storybook URL so the embeds don't point at `localhost`.

---

## 🧱 Architecture

Axiom follows a **wrapper pattern**: each component composes a Mantine primitive
and exposes a smaller, intent-driven API tailored to Axiom's design language.

```tsx
import { Button, Badge, FormSection, ThemeProvider } from "axiom-ui";
import "axiom-ui/styles.css";

function Example() {
  return (
    <ThemeProvider>
      <FormSection title="Account" description="Manage your details">
        <Button intent="primary">Save</Button>
        <Badge type="success">Active</Badge>
      </FormSection>
    </ThemeProvider>
  );
}
```

- **Design tokens** live in `packages/axiom/src/themes` and are exposed as CSS
  variables, consumed by every component's CSS module.
- **`ThemeProvider`** wraps Mantine's provider with Axiom's theme and token
  resolver, giving consumers a one-line setup with light/dark support.
- **Peer dependencies** (`@mantine/core`, `@mantine/dates`, `@mantine/hooks`,
  `react`, `react-dom`) keep the bundle lean for consumers.

---

## 📜 Scripts

Run from the repository root:

| Command | Description |
| --- | --- |
| `pnpm install` | Install all workspace dependencies |
| `pnpm build` | Build every package via Turborepo |
| `pnpm storybook` | Start Storybook on `:6006` |
| `pnpm dev:docs` | Start the docs dev server on `:3000` |
| `pnpm build:docs` | Build the static documentation site |
| `pnpm test` | Run the unit test suite |
| `pnpm lint` | Lint with Biome |
| `pnpm fix` | Auto-fix lint/format issues |
| `pnpm types:check` | Type-check all packages |

---

## 🧪 Testing

Unit tests use **Vitest** + **Testing Library** in a fast jsdom environment,
rendering components through Axiom's `ThemeProvider` exactly as consumers do.

```bash
pnpm test                                    # run once (from repo root)
pnpm --filter axiom-ui test:watch            # watch mode
pnpm --filter axiom-ui test:coverage         # with coverage report
```

Storybook also runs interaction and accessibility checks per story via the
Storybook + Vitest browser integration.

---

## 📄 License

MIT © Georgi Milenchev