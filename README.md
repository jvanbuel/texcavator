# texcavator

Source for [texcavator.dev](https://texcavator.dev): _digging up tech history_. A static blog of short, sourced stories about the decisions, accidents and people behind the tools we use.

SvelteKit (static adapter) · mdsvex · Tailwind CSS v4 · shadcn-style components · Shiki. Hosted on Cloudflare Pages. The full design is in [PLAN.md](PLAN.md).

## Develop

```sh
pnpm install
pnpm dev          # http://localhost:5173
pnpm lint         # prettier + eslint
pnpm check        # svelte-check
pnpm build        # static site in ./build
pnpm preview
```

## Writing a post

Add `src/content/<section>/<slug>.md`. The folder must match the `section` in the frontmatter (`fossils`, `ettymology` or `bugs-in-amber`; sections are defined in `src/lib/sections.ts`).

```md
---
title: 'Why /usr exists'
date: 2026-10-18
summary: 'One sentence for cards, feeds and link previews.'
section: ettymology
tags: [unix]
draft: false # drafts are visible in `pnpm dev` only
sources:
  - title: 'Source name'
    url: 'https://example.com'
---
```

Each section adds its own fields, which shape the post header:

| Section         | Required                                                                                 | Optional                                                                      | Header                                                                           |
| --------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `ettymology`    | `term`, `whatis`, `from` (2+ steps, oldest first)                                        | `manSection` (default 7), `synopsis`, `seeAlso`                               | a man page                                                                       |
| `fossils`       | `era` (year), `status` (`extant`, `fossilised`, `extinct`)                               | `lineage` (oldest first; mark this post's project `self: true`)               | status chip and lineage strata; the FOSSils tab places posts in the dig by `era` |
| `bugs-in-amber` | `bugId`, `resolution` (`WONTFIX`, `BY DESIGN`, `EXPLOITED`, `CANNOT REPRODUCE`, `FIXED`) | `resolutionNote`, `bugClass`, `component`, `severity`, `preserved`, `history` | a bug ticket with its history                                                    |

The seed posts in `src/content/` show each one in use. Invalid or missing fields fail the build with the file name and the offending field.

Tags get an icon from `src/lib/tag-icons.ts` (brand logos via Simple Icons, concepts via Lucide). Add a line there for new tags; unmapped tags fall back to a generic tag glyph.

## Deploy (Cloudflare Pages)

Create a Pages project from this repo with build command `pnpm build` and output directory `build`, then add `texcavator.dev` as a custom domain. `static/_headers` and `static/_redirects` are picked up automatically. GitHub Actions (`.github/workflows/check.yml`) only runs checks.

## Brand

Colours and fonts come from the Texcavator logo. Tokens live in `src/routes/layout.css`; logo files in `static/brand/`.
