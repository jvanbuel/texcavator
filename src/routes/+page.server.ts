import { getPosts, type PostOf } from '#lib/server/posts.ts';
import type { SectionSlug } from '#lib/sections.ts';

export async function load() {
	const all = await getPosts();
	const of = <S extends SectionSlug>(section: S) =>
		all.filter((p): p is PostOf<S> => p.section === section).slice(0, 3);
	return {
		latest: all[0] ?? null,
		// Top to bottom of the dig: words near the surface, bugs in amber below, fossils deepest.
		ettymology: of('ettymology'),
		bugs: of('bugs-in-amber'),
		fossils: of('fossils')
	};
}
