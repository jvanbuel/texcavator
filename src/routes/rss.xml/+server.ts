import { getPosts } from '#lib/server/posts.ts';
import { rssFeed } from '#lib/server/rss.ts';
import { site } from '#lib/site.ts';

export const prerender = true;

export async function GET() {
	return rssFeed({
		title: `${site.name}: ${site.tagline}`,
		description: site.description,
		path: '/rss.xml',
		posts: await getPosts()
	});
}
