<script lang="ts">
	import { resolve } from '$app/paths';
	import Seo from '#lib/components/Seo.svelte';
	import SectionName from '#lib/components/SectionName.svelte';
	import { sections } from '#lib/sections.ts';
	import { site } from '#lib/site.ts';
</script>

<Seo title="About" path="/about" />
<h1 class="mb-6 text-4xl">About</h1>
<div class="prose max-w-none">
	<p>
		{site.name} digs up the small decisions behind the tools we use: the evening a utility was written,
		the game that shaped a library, the bug that got kept on purpose.
	</p>
	<p>
		Every post ends with its sources, and posts flag what is documented and what is only a
		hypothesis. Spotted a mistake? <a href="{site.repo}/issues" rel="external">Open an issue</a>.
	</p>
	<h2>Sections</h2>
	<ul>
		{#each sections as s (s.slug)}
			<li>
				<a href={resolve('/[section]', { section: s.slug })}><SectionName slug={s.slug} /></a>: {s.description}
			</li>
		{/each}
	</ul>
	<p>
		Written by {site.author}. The site is a static SvelteKit build served from Cloudflare Pages.
	</p>
</div>
