<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Post } from '#lib/server/posts.ts';
	import { Badge } from '#lib/components/ui/badge/index.ts';
	import { Card } from '#lib/components/ui/card/index.ts';
	import SectionName from './SectionName.svelte';

	let { post, showSection = true }: { post: Post; showSection?: boolean } = $props();
</script>

<Card class="p-5 transition-colors focus-within:border-ring hover:border-ring">
	<p class="label flex flex-wrap items-center gap-x-3">
		{#if showSection}<span class="tracking-normal normal-case"
				><SectionName slug={post.section} /></span
			>{/if}
		<time datetime={post.dateIso}>{post.dateIso}</time>
		<span>{post.readingMinutes} min</span>
	</p>
	<h3 class="mt-2 font-display text-xl font-bold tracking-tight">
		<a
			href={resolve('/[section]/[slug]', { section: post.section, slug: post.slug })}
			class="after:absolute after:inset-0 hover:underline">{post.title}</a
		>
	</h3>
	<p class="mt-2 text-muted-foreground">{post.summary}</p>
	{#if post.tags.length}
		<p class="relative z-10 mt-3 flex flex-wrap gap-2">
			{#each post.tags as tag (tag)}<Badge href={resolve('/tags/[tag]', { tag })}>{tag}</Badge
				>{/each}
		</p>
	{/if}
</Card>
