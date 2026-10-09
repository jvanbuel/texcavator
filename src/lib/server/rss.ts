import type { Post } from '#lib/server/posts.ts';
import { site } from '#lib/site.ts';

const esc = (s: string) =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function rssFeed(opts: { title: string; description: string; path: string; posts: Post[] }) {
	const items = opts.posts
		.map((p) => {
			const url = `${site.url}/${p.section}/${p.slug}`;
			return `<item><title>${esc(p.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><pubDate>${p.date.toUTCString()}</pubDate><description>${esc(p.summary)}</description>${p.tags.map((t) => `<category>${esc(t)}</category>`).join('')}</item>`;
		})
		.join('');
	const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${esc(opts.title)}</title><link>${site.url}</link><description>${esc(opts.description)}</description><language>en</language><atom:link href="${site.url}${opts.path}" rel="self" type="application/rss+xml"/>${items}</channel></rss>`;
	return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
