import { z } from 'zod';
import type { SectionSlug } from '#lib/sections.ts';

const source = z.object({ title: z.string(), url: z.url() });

const base = z.object({
	title: z.string().min(1),
	date: z.coerce.date(),
	summary: z.string().min(1),
	tags: z.array(z.string()).default([]),
	era: z.number().int().optional(),
	draft: z.boolean().default(false),
	sources: z.array(source).default([])
});

/** eTTYmology posts open with a man page: the term, its manual section and where the name came from. */
const ettymology = base.extend({
	section: z.literal('ettymology'),
	term: z.string().min(1),
	/** The one-line description after the name, as in `whatis`. */
	whatis: z.string().min(1),
	manSection: z.number().int().min(1).max(9).default(7),
	synopsis: z.string().optional(),
	/** The name's history, oldest first: at least where it started and where it ended up. */
	from: z.array(z.string()).min(2),
	seeAlso: z.array(z.object({ title: z.string(), url: z.url().optional() })).default([])
});

/** FOSSils posts show the project's status and its lineage, and need an era to sit in the dig. */
const fossils = base.extend({
	section: z.literal('fossils'),
	era: z.number().int(),
	status: z.enum(['extant', 'fossilised', 'extinct']),
	/** Oldest first. Mark the post's own project with `self: true`. */
	lineage: z
		.array(
			z.object({
				name: z.string(),
				when: z.string(),
				note: z.string().optional(),
				self: z.boolean().default(false)
			})
		)
		.default([])
});

export const resolutions = [
	'WONTFIX',
	'BY DESIGN',
	'EXPLOITED',
	'CANNOT REPRODUCE',
	'FIXED'
] as const;

/** Bugs in Amber posts open as a bug ticket. */
const bugsInAmber = base.extend({
	section: z.literal('bugs-in-amber'),
	bugId: z.string().min(1),
	resolution: z.enum(resolutions),
	resolutionNote: z.string().optional(),
	bugClass: z.string().optional(),
	component: z.string().optional(),
	severity: z.string().optional(),
	preserved: z.string().optional(),
	/** Oldest first. */
	history: z.array(z.object({ when: z.string(), what: z.string() })).default([])
});

const frontmatter = z.discriminatedUnion('section', [ettymology, fossils, bugsInAmber]);

// Every section in sections.ts needs a schema above, and vice versa.
type SchemaSection = z.infer<typeof frontmatter>['section'];
const sectionsCovered: Record<SectionSlug, true> & Record<SchemaSection, true> = {
	ettymology: true,
	fossils: true,
	'bugs-in-amber': true
};
void sectionsCovered;

export type Post = z.infer<typeof frontmatter> & {
	slug: string;
	/** Date as YYYY-MM-DD, safe to render during prerendering. */
	dateIso: string;
	readingMinutes: number;
};

export type PostOf<S extends SectionSlug> = Extract<Post, { section: S }>;

type Loaded = { metadata?: unknown };

const files = import.meta.glob<Loaded>('/src/content/*/*.md');
const rawFiles = import.meta.glob<string>('/src/content/*/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
});

function parse(path: string, metadata: unknown): Post {
	const [, section, file] = /\/src\/content\/([^/]+)\/([^/]+)\.md$/.exec(path) ?? [];
	const result = frontmatter.safeParse(metadata);
	if (!result.success) {
		throw new Error(`Invalid frontmatter in ${path}:\n${z.prettifyError(result.error)}`);
	}
	if (result.data.section !== section) {
		throw new Error(`${path}: frontmatter section "${result.data.section}" must match its folder`);
	}
	const words = (rawFiles[path] ?? '').split(/\s+/).length;
	return {
		...result.data,
		slug: file,
		dateIso: result.data.date.toISOString().slice(0, 10),
		readingMinutes: Math.max(1, Math.round(words / 220))
	};
}

async function loadAll(): Promise<{ post: Post }[]> {
	const entries = await Promise.all(
		Object.entries(files).map(async ([path, load]) => {
			const mod = await load();
			return { post: parse(path, mod.metadata) };
		})
	);
	return entries
		.filter((e) => import.meta.env.DEV || !e.post.draft)
		.sort((a, b) => b.post.date.getTime() - a.post.date.getTime());
}

export async function getPosts(section?: SectionSlug): Promise<Post[]> {
	const all = (await loadAll()).map((e) => e.post);
	return section ? all.filter((p) => p.section === section) : all;
}

export async function getPost(section: string, slug: string) {
	const all = await loadAll();
	const index = all.findIndex((e) => e.post.section === section && e.post.slug === slug);
	if (index === -1) return null;
	const { post } = all[index];
	const same = all.filter((e) => e.post.section === section);
	const i = same.findIndex((e) => e.post.slug === slug);
	return {
		post,
		newer: same[i - 1]?.post ?? null,
		older: same[i + 1]?.post ?? null
	};
}

export async function getTags() {
	const byTag = new Map<string, Post[]>();
	for (const p of await getPosts()) {
		for (const t of p.tags) byTag.set(t, [...(byTag.get(t) ?? []), p]);
	}
	return [...byTag]
		.map(([tag, posts]) => ({ tag, count: posts.length, posts }))
		.sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}
