<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Post } from '#lib/server/posts.ts';
	import { Badge } from '#lib/components/ui/badge/index.ts';
	import * as Card from '#lib/components/ui/card/index.ts';
	import SectionName from './SectionName.svelte';

	let { post, showSection = true }: { post: Post; showSection?: boolean } = $props();
</script>

<Card.Root class="relative transition-colors focus-within:ring-ring hover:ring-ring">
	<Card.Header>
		<p class="label flex flex-wrap items-center gap-x-3">
			{#if showSection}<span class="tracking-normal normal-case"
					><SectionName slug={post.section} /></span
				>{/if}
			<time datetime={post.dateIso}>{post.dateIso}</time>
			<span>{post.readingMinutes} min</span>
		</p>
		<Card.Title class="text-xl">
			<a
				href={resolve('/[section]/[slug]', { section: post.section, slug: post.slug })}
				class="after:absolute after:inset-0 hover:underline">{post.title}</a
			>
		</Card.Title>
		<Card.Description class="text-base">{post.summary}</Card.Description>
	</Card.Header>
	{#if post.tags.length}
		<Card.Content class="relative z-10">
			<div class="flex flex-wrap gap-2">
				{#each post.tags as tag (tag)}
					<Badge variant="outline" href={resolve('/tags/[tag]', { tag })}>{tag}</Badge>
				{/each}
			</div>
		</Card.Content>
	{/if}
</Card.Root>
