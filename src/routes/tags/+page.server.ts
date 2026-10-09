import { getTags } from '#lib/server/posts.ts';

export async function load() {
	return { tags: await getTags() };
}
