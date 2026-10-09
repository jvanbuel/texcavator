import { getPosts } from '#lib/server/posts.ts';
import { sections } from '#lib/sections.ts';

export async function load() {
	const all = await getPosts();
	return {
		strips: sections.map((section) => ({
			section,
			posts: all.filter((p) => p.section === section.slug).slice(0, 3)
		})),
		latest: all.slice(0, 4)
	};
}
