import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';

// Lazy glob: only the requested post's component is loaded, so no post index ships to the client.
const bodies = import.meta.glob<{ default: Component }>('/src/content/*/*.md');

export async function load({ data, params }) {
	const load = bodies[`/src/content/${params.section}/${params.slug}.md`];
	if (!load) error(404, 'Not found');
	return { ...data, content: (await load()).default };
}
