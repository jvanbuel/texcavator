import { error } from '@sveltejs/kit';
import { getPosts, getTags } from '#lib/server/posts.ts';

export async function entries() {
	return (await getTags()).map(({ tag }) => ({ tag }));
}

export async function load({ params }) {
	const posts = (await getPosts()).filter((p) => p.tags.includes(params.tag));
	if (!posts.length) error(404, 'Not found');
	return { tag: params.tag, posts };
}
