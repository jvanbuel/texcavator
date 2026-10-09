# Texcavator website — plan

> *digging up tech history*: a static blog of short, well-sourced stories about the decisions behind the tools we use.

## 1. Stack

| Concern | Choice | Why |
|---|---|---|
| Framework | **SvelteKit 2 + Svelte 5** with `@sveltejs/adapter-static` | Prerenders every route to plain HTML. No server needed. |
| Markdown | **mdsvex** | `.md` posts with frontmatter, plus Svelte components inside posts when a story needs a diagram or callout. |
| Design system | **shadcn-svelte** on **Tailwind CSS v4** | Components are copied into the repo, so we own and restyle them. Theming is CSS variables, which map directly onto the logo palette. |
| Code highlighting | **Shiki**, via an mdsvex highlighter | Highlights at build time and ships no JS. Two themes, one per colour mode. |
| Fonts | Space Grotesk 700, IBM Plex Sans, IBM Plex Mono (self-hosted with `@fontsource`) | The same fonts the logo uses. |
| Hosting | **GitHub Pages** via GitHub Actions | The repo already lives on GitHub. Cloudflare Pages or Netlify work without changes too. |
| Package manager | pnpm | |

**Why shadcn-svelte rather than Skeleton:** Skeleton ships with its own opinionated theme system and preset look. The brand here is already fixed by the logo (warm earth tones, CRT green, mono type), and a content site only needs a handful of primitives: Button, Badge, Card, Separator, Sheet for the mobile nav, Tooltip, and Toggle for the theme switch. With shadcn we can recolour exactly those, and nothing else ends up in the bundle.

## 2. Brand → design tokens

The source is the **Texcavator Logo** artifact (https://claude.ai/artifact/5KYn8McuTkAatE4ncGf2dT). Its palette maps onto shadcn's CSS variables in `src/app.css`:

| Token | Light | Dark | Logo name |
|---|---|---|---|
| `--background` | `#FBF7F0` | `#161B20` | page bg |
| `--card` | `#FFFFFF` | `#1E252C` | surface |
| `--foreground` | `#2B2B2B` Charcoal | `#F3E9D7` Sand | |
| `--muted-foreground` | `#7A6A57` | `#B6A891` | |
| `--border` | `#E7DCCB` | `#2F3841` | |
| `--primary` | `#B97A3E` Rust | `#D9A566` Ochre | the "x" |
| `--secondary` | `#F3E9D7` Sand | `#26323D` Night | |
| `--accent` | `#E8B04A` Brass | `#E8B04A` Brass | |
| `--ring` / links hover | `#8A5528` Umber | `#D9A566` Ochre | |
| `--terminal` (custom) | `#7FD67A` Phosphor on `#1E2A22` | same | code blocks, `$` prompts |

Typography: headings in Space Grotesk 700 with tight tracking. Body in IBM Plex Sans at around 18px with a 68ch measure. Dates, tags and code in Plex Mono, using the logo tagline's letter-spacing (0.12em) for small labels.

Optional signature details, all in the spirit of the logo:
- Faint "strata" wave dividers between sections, using the logo's three soil paths.
- Code blocks styled as the CRT screen: dark green-black with a phosphor prompt.
- Dark mode is "digging by night", matching the logo's dark variant.

## 3. Logo assets

Take these from the artifact's "copy svg" buttons and add them to `static/brand/`:

- `texcavator-logo-light.svg`, `texcavator-logo-dark.svg`: the header wordmark
- `texcavator-icon-light.svg`, `texcavator-icon-dark.svg`: the round badge only
- Generated from the icon: `favicon.svg` (with a `prefers-color-scheme` switch inside), `favicon.ico` at 32px, `apple-touch-icon.png` at 180px, and a 1200×630 `og-default.png`

Two things to fix during import:
1. **The wordmark is live `<text>`.** In an `<img>` or favicon the web fonts don't load, so it falls back to Arial. Either convert the text to outlines (Inkscape → Object to Path, or `svgo` plus a font-to-path step), or render the icon as SVG and set "te**x**cavator" as real HTML text beside it. The second option is sharper and more accessible, so I recommend it.
2. **The `logo-auto` SVG follows only the OS colour scheme.** The site will have a manual theme toggle (shadcn's `mode-watcher`), so a `<Logo>` component should pick light or dark from the `.dark` class instead.

## 4. Information architecture

```
/                     Home: hero with logo + tagline, latest posts, featured "dig"
/posts                All posts, newest first
/posts/[slug]         A post
/tags                 Tag index (e.g. unix, games, formats, cloud-native, security)
/tags/[tag]           Posts with that tag
/about                What Texcavator is, who writes it, how sources are handled
/rss.xml              RSS feed (prerendered +server.ts)
/sitemap.xml          Sitemap (prerendered +server.ts)
```

## 5. Content model

Posts live in `src/content/posts/<slug>.md`:

```md
---
title: "curses was pulled out of Rogue"
date: 2026-10-20
summary: "Ken Arnold needed Rogue to draw a dungeon on any terminal. The library outlived the game."
tags: [unix, terminals, games]
era: 1980              # optional, for a later timeline view
cover: ./cover.png     # optional
draft: false
sources:
  - title: "..."
    url: "..."
---
```

- Posts are loaded with `import.meta.glob('/src/content/posts/*.md', { eager: true })` in `src/lib/posts.ts`. That module returns sorted metadata, hides drafts in production, and computes reading time.
- A frontmatter schema is validated with **zod** at build time, so a typo in a date or tag fails the build.
- **Sources are a first-class field.** This is a history blog, so every post renders a "Sources" section, and footnotes (via `remark-footnotes` / GFM) link to it.
- Seed content comes from the "Strongest candidates" in the topic shortlist doc: curses/Rogue, the Confused Deputy, why `/usr` exists, Crash Bandicoot's paging, and Krustlet → SpinKube.

## 6. Components

From shadcn-svelte: `button`, `badge`, `card`, `separator`, `sheet`, `tooltip`, `toggle`.

Custom components in `src/lib/components/`:
- `Logo.svelte`: the theme-aware icon plus the HTML wordmark
- `SiteHeader.svelte` / `SiteFooter.svelte`: the footer carries the tagline and RSS link
- `ThemeToggle.svelte`: uses `mode-watcher`, with a sun/moon icon matching the logo's day and night
- `PostCard.svelte`: title, date (mono), summary, tag badges
- `PostLayout.svelte`: the mdsvex layout, with title, meta, prose, sources, and prev/next links
- `Strata.svelte`: decorative divider
- In-post components: `Callout.svelte`, `Timeline.svelte`, `Terminal.svelte` (CRT-styled block)

Prose styling uses `@tailwindcss/typography`, with its colours mapped to the tokens above.

## 7. Repo layout

```
texcavator/
├─ src/
│  ├─ app.css                 # Tailwind v4 + tokens
│  ├─ app.html
│  ├─ content/posts/*.md
│  ├─ lib/
│  │  ├─ components/ui/…      # shadcn-svelte (generated)
│  │  ├─ components/…         # custom
│  │  ├─ posts.ts             # glob + zod + sort
│  │  └─ site.ts              # title, tagline, url, social
│  └─ routes/
│     ├─ +layout.svelte / +layout.ts   # export const prerender = true
│     ├─ +page.svelte
│     ├─ posts/+page.svelte, posts/[slug]/+page.ts|svelte
│     ├─ tags/…, about/…
│     ├─ rss.xml/+server.ts, sitemap.xml/+server.ts
├─ static/brand/…, static/favicon.svg
├─ mdsvex.config.js, svelte.config.js, vite.config.ts
└─ .github/workflows/deploy.yml
```

## 8. SEO and polish

- Per-post `<title>`, description, canonical URL, Open Graph and Twitter tags.
- OG images: start with the static default. Later, generate one per post at build time with `satori` + `@resvg/resvg-js`, using the strata background, the post title and the icon.
- Accessibility: WCAG AA contrast. Rust on the cream background needs checking for body links; use Umber if it falls short. Visible focus rings, skip link, `prefers-reduced-motion` respected.
- Performance: zero client JS on post pages except the theme toggle, fonts subset and preloaded, Lighthouse at 100 as the target.

## 9. Build and deploy

- `svelte.config.js`: `adapter-static` with `fallback: undefined`, `prerender.entries: ['*']`, and `paths.base` from `BASE_PATH`. The base path is needed for a GitHub Pages project URL like `jvanbuel.github.io/texcavator`, and can be dropped once a custom domain is set.
- `.github/workflows/deploy.yml`: on push to `main`, run pnpm install, `pnpm check`, `pnpm build`, then `actions/upload-pages-artifact` and `actions/deploy-pages`.
- PR checks: `svelte-check`, `prettier --check`, `eslint`, and a link checker over the built output (e.g. `lychee`), so sources don't rot silently.

## 10. Milestones

1. **Scaffold**: `npx sv create` (minimal, TS, Tailwind, mdsvex, prettier, eslint), adapter-static, `shadcn-svelte init`, fonts.
2. **Brand**: tokens in `app.css`, logo assets imported and fixed, `Logo`, header, footer, theme toggle, favicons.
3. **Blog engine**: `posts.ts` with zod, post layout, list, tags, RSS, sitemap, Shiki.
4. **Content**: about page and 2–3 seed posts from the shortlist.
5. **Ship**: GitHub Pages workflow, OG tags, Lighthouse and a11y pass.
6. **Later**: per-post OG images, a timeline view by `era`, search (Pagefind runs on static output), newsletter.

## Open questions

- Domain: `texcavator.dev`, a custom domain, or the `github.io` URL to start?
- Comments: none, or Giscus (GitHub Discussions)?
- Language: English only?
