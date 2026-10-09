import { getPosts } from '#lib/server/posts.ts';

export async function load() {
	return { posts: await getPosts() };
}
