import { getPosts, getTags } from '#lib/server/posts.ts';
import { sectionSlugs } from '#lib/sections.ts';
import { site } from '#lib/site.ts';

export const prerender = true;

export async function GET() {
	const posts = await getPosts();
	const urls = [
		{ loc: '/' },
		{ loc: '/posts' },
		{ loc: '/about' },
		{ loc: '/tags' },
		...sectionSlugs.map((s) => ({ loc: `/${s}` })),
		...(await getTags()).map(({ tag }) => ({ loc: `/tags/${tag}` })),
		...posts.map((p) => ({ loc: `/${p.section}/${p.slug}`, lastmod: p.dateIso }))
	];
	const body = urls
		.map(
			(u) =>
				`<url><loc>${site.url}${u.loc}</loc>${'lastmod' in u ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`
		)
		.join('');
	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`,
		{ headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
	);
}
