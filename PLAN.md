# Texcavator website — plan

> _digging up tech history_: a static blog of short, well-sourced stories about the decisions behind the tools we use.

## 1. Stack

| Concern           | Choice                                                                           | Why                                                                                                                                  |
| ----------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Framework         | **SvelteKit 3 + Svelte 5** with `@sveltejs/adapter-static`                       | Prerenders every route to plain HTML. No server needed.                                                                              |
| Markdown          | **mdsvex**                                                                       | `.md` posts with frontmatter, plus Svelte components inside posts when a story needs a diagram or callout.                           |
| Design system     | **shadcn-svelte** on **Tailwind CSS v4**                                         | Components are copied into the repo, so we own and restyle them. Theming is CSS variables, which map directly onto the logo palette. |
| Code highlighting | **Shiki**, via an mdsvex highlighter                                             | Highlights at build time and ships no JS. Two themes, one per colour mode.                                                           |
| Fonts             | Space Grotesk 700, IBM Plex Sans, IBM Plex Mono (self-hosted with `@fontsource`) | The same fonts the logo uses.                                                                                                        |
| Hosting           | **Cloudflare Pages** with Git integration, on **texcavator.dev**                 | Builds on every push, gives every branch and PR a preview URL, and serves from Cloudflare's CDN.                                     |
| Package manager   | pnpm                                                                             |                                                                                                                                      |

**Why shadcn-svelte rather than Skeleton:** Skeleton ships with its own opinionated theme system and preset look. The brand here is already fixed by the logo (warm earth tones, CRT green, mono type), and a content site only needs a handful of primitives: Button, Badge, Card, Separator, Sheet for the mobile nav, Tooltip, and Toggle for the theme switch. With shadcn we can recolour exactly those, and nothing else ends up in the bundle.

## 2. Brand → design tokens

The source is the **Texcavator Logo** artifact (https://claude.ai/artifact/5KYn8McuTkAatE4ncGf2dT). Its palette maps onto shadcn's CSS variables in `src/app.css`:

| Token                  | Light                           | Dark            | Logo name                |
| ---------------------- | ------------------------------- | --------------- | ------------------------ |
| `--background`         | `#FBF7F0`                       | `#161B20`       | page bg                  |
| `--card`               | `#FFFFFF`                       | `#1E252C`       | surface                  |
| `--foreground`         | `#2B2B2B` Charcoal              | `#F3E9D7` Sand  |                          |
| `--muted-foreground`   | `#7A6A57`                       | `#B6A891`       |                          |
| `--border`             | `#E7DCCB`                       | `#2F3841`       |                          |
| `--primary`            | `#B97A3E` Rust                  | `#D9A566` Ochre | the "x"                  |
| `--secondary`          | `#F3E9D7` Sand                  | `#26323D` Night |                          |
| `--accent`             | `#E8B04A` Brass                 | `#E8B04A` Brass |                          |
| `--ring` / links hover | `#8A5528` Umber                 | `#D9A566` Ochre |                          |
| `--terminal` (custom)  | `#7FD67A` Phosphor on `#1E2A22` | same            | code blocks, `$` prompts |

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

Top navigation: **Blog · Tags · About** (plus the theme toggle). The sections are tabs on the Blog page rather than top-level nav items.

```
/                     Home: hero with logo + tagline, latest posts, one strip per section
/blog                 Blog: tabs All | FOSSils | eTTYmology | Bugs in Amber, showing all posts
/fossils              The FOSSils tab (intro, RSS link, its posts)
/ettymology           The eTTYmology tab
/bugs-in-amber        The Bugs in Amber tab
/[section]/[slug]     A post, e.g. /ettymology/why-usr-exists
/tags                 Tags page: one card per tag (name, post count, latest titles)
/tags/[tag]           Posts with that tag
/about                What Texcavator is, who writes it, how sources are handled
/rss.xml              RSS feed (global); /[section]/rss.xml per section
/sitemap.xml          Sitemap
```

Each tab is a real link to its own prerendered page (built with shadcn's Tabs, rendering the triggers as anchors), so every section keeps a shareable URL and its own RSS feed, and the page works without JavaScript.

## 4b. Sections

Every post belongs to exactly one **section**, a recurring series with its own name, intro, colour and small glyph. Tags still cut across sections.

| Section           | Slug             | What goes in it                                                                                                                                                  | Shortlist topics that fit                                                                                                                                     |
| ----------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **FOSSils**       | `/fossils`       | Origin stories and lineages of open-source projects: who started them, what they grew out of, what died along the way.                                           | curses ← Rogue, ncurses and Thomas Dickey, Krustlet → SpinKube, GFS → Hadoop → Spark, Docker at dotCloud, chroot → namespaces → bubblewrap, GNU screen → CBOR |
| **eTTYmology**    | `/ettymology`    | Where a name, word, path or key binding comes from. Short pieces, often under 800 words.                                                                         | Why `/usr` exists, Ping and sonar, Hadoop's toy elephant, Kubernetes and "Seven of Nine", Ctrl-S and XON/XOFF, ¥ as the path separator, termcap/terminfo      |
| **Bugs in Amber** | `/bugs-in-amber` | Famous bugs, glitches and hacks, preserved: bugs kept on purpose for compatibility, glitches people exploited, and the post-mortems of the ones that got caught. | SimCity and Windows 95, Excel's 1900 leap year, AARD code, MissingNo, Mario 64 upwarp, NES Tetris crash, the Confused Deputy, the xz backdoor, Trusting Trust |

Possible further section, only if the material keeps piling up:

- **Dig Site**: long reads and multi-part series (capability OSes in two parts).

Implementation:

- `src/lib/sections.ts` is the single source of truth: `{ slug, name, tagline, description, accent, glyph }[]`. The zod schema checks `section` against it, so adding a section is one entry plus a folder.
- Posts live in `src/content/<section>/<slug>.md`. The URL is `/<section>/<slug>`, rendered by `src/routes/[section]/[slug]`, with `entries()` listing every pair for prerendering.
- **Wordmark styling:** the names are puns on embedded capitals, the way the logo highlights the "x". Render them with the pun letters in the accent colour: **FOSS**ils, e**TTY**mology and Bugs in **Amber**. A `SectionName.svelte` component handles this so it looks the same in nav, badges and headings.
- **Section accents** come from the logo palette, so the brand stays one family. FOSSils uses Rust (an earth layer, fitting the fossil theme). eTTYmology uses Phosphor-on-CRT (terminal green, fitting TTY). Bugs in Amber gets a new `--amber` token (around `#D4892A`; it needs an AA check for text use, falling back to Umber for text and keeping amber for fills). The section header shows the bug "preserved" in a translucent amber drop.
- **Glyphs:** a small fossil/ammonite, a blinking `▍` cursor, and a beetle in an amber drop, drawn as inline SVG in the logo's line weight.
- Each section gets its own RSS feed (`/fossils/rss.xml`) next to the global one.
- The home page shows one strip per section, with its name, one-line tagline and its 3 latest posts.

## 5. Content model

Posts live in `src/content/<section>/<slug>.md`:

```md
---
title: 'curses was pulled out of Rogue'
date: 2026-10-20
summary: 'Ken Arnold needed Rogue to draw a dungeon on any terminal. The library outlived the game.'
section: fossils # fossils | ettymology | bugs-in-amber (see §4b)
tags: [unix, terminals, games]
era: 1980 # optional, for a later timeline view
cover: ./cover.png # optional
draft: false
sources:
  - title: '...'
    url: '...'
---
```

- Posts are loaded with `import.meta.glob('/src/content/*/*.md', { eager: true })` in `src/lib/posts.ts`. That module returns sorted metadata, hides drafts in production, and computes reading time.
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
│  ├─ content/<section>/*.md   # fossils/, ettymology/, bugs-in-amber/
│  ├─ lib/
│  │  ├─ components/ui/…      # shadcn-svelte (generated)
│  │  ├─ components/…         # custom
│  │  ├─ posts.ts             # glob + zod + sort
│  │  ├─ sections.ts          # section registry
│  │  └─ site.ts              # title, tagline, url, social
│  └─ routes/
│     ├─ +layout.svelte / +layout.ts   # export const prerender = true
│     ├─ +page.svelte
│     ├─ posts/+page.svelte
│     ├─ [section]/+page.ts|svelte, [section]/[slug]/+page.ts|svelte
│     ├─ tags/…, about/…
│     ├─ rss.xml/+server.ts, sitemap.xml/+server.ts
├─ static/brand/…, static/favicon.svg, static/_headers, static/_redirects, .nvmrc
├─ mdsvex.config.js, svelte.config.js, vite.config.ts
└─ .github/workflows/check.yml   # lint/typecheck/links; Cloudflare deploys
```

## 8. SEO and polish

- Per-post `<title>`, description, canonical URL, Open Graph and Twitter tags.
- OG images: start with the static default. Later, generate one per post at build time with `satori` + `@resvg/resvg-js`, using the strata background, the post title and the icon.
- Accessibility: WCAG AA contrast. Rust on the cream background needs checking for body links; use Umber if it falls short. Visible focus rings, skip link, `prefers-reduced-motion` respected.
- Performance: zero client JS on post pages except the theme toggle, fonts subset and preloaded, Lighthouse at 100 as the target.

## 9. Build and deploy (Cloudflare Pages + texcavator.dev)

- **Adapter:** keep `@sveltejs/adapter-static`. The site is fully prerendered, so no Worker runtime is needed. Switch to `@sveltejs/adapter-cloudflare` only if server routes appear later (forms, view counts). No `paths.base`, because the site is served at the domain root.
- **Pages project:** connect the GitHub repo in the Cloudflare dashboard (Workers & Pages → Create → Pages → Connect to Git).
  - Framework preset: SvelteKit. Build command: `pnpm build`. Output directory: `build`.
  - Pin Node with `.nvmrc` (e.g. `22`) or a `NODE_VERSION` env var. pnpm is detected from `pnpm-lock.yaml`.
  - Production branch is `main`. Every other branch and PR gets a `<hash>.texcavator.pages.dev` preview.
- **Domain:** add `texcavator.dev` (and `www`) under the project's Custom domains. If the domain's DNS is already on Cloudflare this is one click. Otherwise move the nameservers to Cloudflare, or add a CNAME to `texcavator.pages.dev`. `.dev` is HSTS-preloaded, so HTTPS is mandatory, and Cloudflare issues the certificate automatically.
- **`static/_redirects`:** `https://www.texcavator.dev/* https://texcavator.dev/:splat 301`. Redirects for renamed slugs also go here.
- **`static/_headers`:** long cache for `/_app/immutable/*`, plus security headers (CSP, `X-Content-Type-Options`, `Referrer-Policy`).
- **URLs:** SvelteKit's default `trailingSlash: 'never'` emits `about.html`, and Pages serves it at `/about`. The two match, so leave the default.
- **PR checks** stay in GitHub Actions (`svelte-check`, prettier, eslint, `lychee` link checker over `build/`), while Cloudflare does the building and deploying.
- **Analytics (optional):** Cloudflare Web Analytics. It's cookieless, so no consent banner is needed.
- Note: Cloudflare now also offers static sites on **Workers with static assets**, and points new projects there. Pages still works well for this site. Moving later is a config change (`wrangler.jsonc` with `assets.directory = "build"`), not a rewrite.

## 10. Milestones

1. **Scaffold**: `npx sv create` (minimal, TS, Tailwind, mdsvex, prettier, eslint), adapter-static, `shadcn-svelte init`, fonts.
2. **Brand**: tokens in `app.css`, logo assets imported and fixed, `Logo`, header, footer, theme toggle, favicons.
3. **Blog engine**: `sections.ts`, `posts.ts` with zod, section landings, post layout, tags, RSS (global + per section), sitemap, Shiki.
4. **Content**: about page, one seed post per section (FOSSils: curses ← Rogue; eTTYmology: why `/usr` exists; Bugs in Amber: SimCity and Windows 95).
5. **Ship**: Cloudflare Pages project, texcavator.dev domain, `_headers`/`_redirects`, OG tags, Lighthouse and a11y pass.
6. **Later**: per-post OG images, a timeline view by `era`, search (Pagefind runs on static output), newsletter.

## Open questions

- Comments: none, or Giscus (GitHub Discussions)?
- Language: English only?

## Implementation notes (deviations from the plan above)

Milestones 1–4 are built; deployment (milestone 5) needs the Cloudflare Pages project and domain set up in the dashboard.

- **SvelteKit 3.** The scaffold is Kit 3, which configures Kit inside `vite.config.ts` and uses `#lib/*` subpath imports instead of `$lib`. Imports therefore need explicit extensions (`#lib/utils.ts`, `#lib/components/ui/button/index.ts`).
- **shadcn-svelte components come from the real project.** The registry host (`shadcn-svelte.com`) is blocked by this environment's egress policy, so the registry was built from a clone of [huntabyte/shadcn-svelte](https://github.com/huntabyte/shadcn-svelte) on GitHub (commit `493481f`), served on localhost, and installed with that repo's own CLI (v1.7.0, `COMPONENTS_REGISTRY_URL` override). Preset: **Vega** style, stone base, Lucide icons, IBM Plex Sans body and Space Grotesk headings (the logo's fonts). Installed: `button`, `badge`, `card`, `separator`, `tabs` (blog sections) and `tooltip` (theme toggle). `components.json` points at the official registry, so later `npx shadcn-svelte add <component>` works wherever that host is reachable. Do not hand-edit files in `src/lib/components/ui/`; ESLint's `no-navigation-without-resolve` is switched off for that folder so the generated code stays pristine.
- **Light-mode primary is Umber (`#8a5528`), not Rust.** Rust on the cream background fails WCAG AA for text, so Rust stays a logo and decoration colour. All token pairs were checked (4.5:1 or better). Section accents use text-safe variants: Umber (FOSSils), a darker green (eTTYmology) and `#96560f` (Bugs in Amber) in light mode, with Ochre, Phosphor and a brighter amber in dark mode.
- **Code blocks use one dark Shiki theme** (`vitesse-dark`) on the CRT background in both colour modes, instead of two themes.
- **Post parsing is server-only.** `src/lib/server/posts.ts` (zod, globbing, sorting) runs only in `+page.server.ts` loads at build time. The post page lazily imports just its own Markdown component, so no post index or zod ships to the browser.
- **Footnotes are deferred;** each post ends with its Sources list instead.
- **The wordmark is HTML text** next to the icon SVGs (see section 3). Raster assets (`apple-touch-icon.png`, `favicon.ico`, `og-default.png`) were rendered from the logo SVGs.
- **The three seed posts are short drafts** from the topic shortlist and carry a visible "Draft" note. Their facts and attributions still need checking against the listed sources before launch.
- **Tag icons.** Every tag shows a vector icon (tag cards, tag badges, and the tag page heading). The mapping lives in `src/lib/tag-icons.ts`: brand logos come from [Simple Icons](https://simpleicons.org) (CC0, drawn in the current text colour, tree-shaken so only the listed ones ship), and concept tags use Lucide icons. Simple Icons has no Windows, Unix or Microsoft logo, so `windows` and `unix` use Lucide icons. To give a new tag an icon, add one line to that file; unmapped tags get a plain tag glyph. Brand logos are trademarks of their owners and are used only to identify the topic.
- **Section signatures** (chosen from the section mocks): eTTYmology posts open as a man page (`USR(7)`, NAME/`whatis`, SYNOPSIS, a FROM chain, SEE ALSO); FOSSils posts show a status chip and a lineage strip drawn as soil layers, and the FOSSils tab is a **dig**: one soil layer per decade, newest on top, posts placed by `era`; Bugs in Amber posts open as a bug ticket (ID, resolution badge, fields) followed by its ticket history. Each section has its own frontmatter schema (a zod discriminated union), so missing fields fail the build. Deferred until there is more content: the eTTYmology A–Z lexicon (from about 20 entries) and the Bugs in Amber display case. Placeholders for unwritten posts are not shown.
