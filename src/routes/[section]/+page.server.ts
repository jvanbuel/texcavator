import { error } from '@sveltejs/kit';
import { getPosts } from '#lib/server/posts.ts';
import { getSection, sectionSlugs } from '#lib/sections.ts';

export function entries() {
	return sectionSlugs.map((section) => ({ section }));
}

export async function load({ params }) {
	const section = getSection(params.section);
	if (!section) error(404, 'Not found');
	return { section, posts: await getPosts(section.slug) };
}
