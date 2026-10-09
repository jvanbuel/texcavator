import { z } from 'zod';
import { sectionSlugs, type SectionSlug } from '#lib/sections.ts';

const source = z.object({ title: z.string(), url: z.url() });

const frontmatter = z.object({
	title: z.string().min(1),
	date: z.coerce.date(),
	summary: z.string().min(1),
	section: z.enum(sectionSlugs),
	tags: z.array(z.string()).default([]),
	era: z.number().int().optional(),
	draft: z.boolean().default(false),
	sources: z.array(source).default([])
});

export type Post = z.infer<typeof frontmatter> & {
	slug: string;
	/** Date as YYYY-MM-DD, safe to render during prerendering. */
	dateIso: string;
	readingMinutes: number;
};

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
	const counts = new Map<string, number>();
	for (const p of await getPosts()) for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
	return [...counts]
		.map(([tag, count]) => ({ tag, count }))
		.sort((a, b) => a.tag.localeCompare(b.tag));
}
