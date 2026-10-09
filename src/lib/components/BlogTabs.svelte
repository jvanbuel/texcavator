<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Post } from '#lib/server/posts.ts';
	import { sections, type SectionSlug } from '#lib/sections.ts';
	import * as Tabs from '#lib/components/ui/tabs/index.ts';
	import PostCard from './PostCard.svelte';
	import SectionName from './SectionName.svelte';

	let { active, posts }: { active: 'all' | SectionSlug; posts: Post[] } = $props();

	const section = $derived(sections.find((s) => s.slug === active));
</script>

<!-- Each tab is a real link to a prerendered page, so every section keeps its own URL and RSS feed. -->
<Tabs.Root value={active} activationMode="manual">
	<Tabs.List variant="line" class="h-auto w-full justify-start gap-0 border-b pb-2 sm:gap-1">
		<Tabs.Trigger value="all" class="flex-none px-2 py-2 text-sm sm:px-3 sm:text-base">
			{#snippet child({ props })}
				<a {...props} href={resolve('/blog')}>All</a>
			{/snippet}
		</Tabs.Trigger>
		{#each sections as s (s.slug)}
			<Tabs.Trigger value={s.slug} class="flex-none px-2 py-2 text-sm sm:px-3 sm:text-base">
				{#snippet child({ props })}
					<a {...props} href={resolve('/[section]', { section: s.slug })}>
						<SectionName slug={s.slug} />
					</a>
				{/snippet}
			</Tabs.Trigger>
		{/each}
	</Tabs.List>

	<Tabs.Content value={active} class="grid gap-6 pt-4">
		<header class="grid max-w-prose gap-2">
			{#if section}
				<p class="label !text-sm">{section.tagline}</p>
				<p class="text-lg text-muted-foreground">{section.description}</p>
				<p class="text-sm">
					<a
						href={resolve('/[section]/rss.xml', { section: section.slug })}
						class="underline underline-offset-4">RSS feed</a
					>
				</p>
			{:else}
				<p class="text-lg text-muted-foreground">Everything dug up so far, newest first.</p>
			{/if}
		</header>
		<div class="grid gap-4 sm:grid-cols-2">
			{#each posts as post (post.section + post.slug)}
				<PostCard {post} showSection={!section} />
			{:else}
				<p class="text-muted-foreground">Nothing dug up here yet.</p>
			{/each}
		</div>
	</Tabs.Content>
</Tabs.Root>
