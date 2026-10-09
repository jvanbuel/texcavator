import { error } from '@sveltejs/kit';
import { getPosts } from '#lib/server/posts.ts';
import { rssFeed } from '#lib/server/rss.ts';
import { getSection, sectionSlugs } from '#lib/sections.ts';
import { site } from '#lib/site.ts';

export const prerender = true;

export function entries() {
	return sectionSlugs.map((section) => ({ section }));
}

export async function GET({ params }) {
	const section = getSection(params.section);
	if (!section) error(404, 'Not found');
	return rssFeed({
		title: `${section.name} · ${site.name}`,
		description: section.description,
		path: `/${section.slug}/rss.xml`,
		posts: await getPosts(section.slug)
	});
}
