import { error } from '@sveltejs/kit';
import { getPosts, getPost } from '#lib/server/posts.ts';

export async function entries() {
	return (await getPosts()).map((p) => ({ section: p.section, slug: p.slug }));
}

export async function load({ params }) {
	const found = await getPost(params.section, params.slug);
	if (!found) error(404, 'Not found');
	return found;
}
