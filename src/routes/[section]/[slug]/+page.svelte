<script lang="ts">
	import { resolve } from '$app/paths';
	import { Badge } from '#lib/components/ui/badge/index.ts';
	import { Separator } from '#lib/components/ui/separator/index.ts';
	import SectionName from '#lib/components/SectionName.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const { post, newer, older } = $derived(data);
	const Content = $derived(data.content);
</script>

<Seo
	title={post.title}
	description={post.summary}
	path="/{post.section}/{post.slug}"
	type="article"
	published={post.dateIso}
/>

<article>
	<header class="mb-8 grid max-w-[68ch] gap-3">
		<p class="label flex flex-wrap gap-x-3">
			<a
				href={resolve('/[section]', { section: post.section })}
				class="tracking-normal normal-case hover:underline"
			>
				<SectionName slug={post.section} />
			</a>
			<time datetime={post.dateIso}>{post.dateIso}</time>
			<span>{post.readingMinutes} min read</span>
		</p>
		<h1 class="text-4xl sm:text-5xl">{post.title}</h1>
		<p class="text-xl text-muted-foreground">{post.summary}</p>
	</header>

	<div class="prose max-w-none">
		<Content />
	</div>

	{#if post.sources.length}
		<section class="mt-12 max-w-[68ch]" aria-labelledby="sources">
			<Separator class="mb-6" />
			<h2 id="sources" class="label mb-3">Sources</h2>
			<ul class="grid list-disc gap-1 pl-5">
				{#each post.sources as s (s.url)}
					<li><a href={s.url} class="text-primary underline underline-offset-4">{s.title}</a></li>
				{/each}
			</ul>
		</section>
	{/if}

	{#if post.tags.length}
		<p class="mt-8 flex flex-wrap gap-2">
			{#each post.tags as tag (tag)}<Badge href={resolve('/tags/[tag]', { tag })}>{tag}</Badge
				>{/each}
		</p>
	{/if}
</article>

<nav class="mt-12 grid max-w-[68ch] gap-4 sm:grid-cols-2" aria-label="More in this section">
	{#if newer}
		<a
			href={resolve('/[section]/[slug]', { section: newer.section, slug: newer.slug })}
			class="rounded-xl border p-4 hover:border-ring"
		>
			<span class="label">Newer</span><br />{newer.title}
		</a>
	{:else}<span></span>{/if}
	{#if older}
		<a
			href={resolve('/[section]/[slug]', { section: older.section, slug: older.slug })}
			class="rounded-xl border p-4 hover:border-ring sm:text-right"
		>
			<span class="label">Older</span><br />{older.title}
		</a>
	{/if}
</nav>
