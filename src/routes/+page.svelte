<script lang="ts">
	import { resolve } from '$app/paths';
	import Logo from '#lib/components/Logo.svelte';
	import PostCard from '#lib/components/PostCard.svelte';
	import SectionName from '#lib/components/SectionName.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { Button } from '#lib/components/ui/button/index.ts';
	import { site } from '#lib/site.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Seo />

<section class="grid gap-6 py-6">
	<h1>
		<Logo
			size={96}
			class="flex-wrap gap-6 [&>span:last-child]:text-5xl sm:[&>span:last-child]:text-7xl"
		/>
	</h1>
	<p class="label !text-base text-primary">{site.tagline}</p>
	<p class="max-w-prose text-xl text-muted-foreground">{site.description}</p>
	<p class="flex flex-wrap gap-3">
		<Button href={resolve('/blog')}>Read the blog</Button>
		<Button href={resolve('/about')} variant="outline">About</Button>
	</p>
</section>

<section class="mt-16" aria-labelledby="latest">
	<h2 id="latest" class="label mb-4">Latest</h2>
	<div class="grid gap-4 sm:grid-cols-2">
		{#each data.latest as post (post.section + post.slug)}
			<PostCard {post} />
		{:else}
			<p class="text-muted-foreground">First dig in progress.</p>
		{/each}
	</div>
</section>

{#each data.strips as { section, posts } (section.slug)}
	<section class="mt-16" aria-labelledby="s-{section.slug}">
		<div class="mb-4 flex flex-wrap items-baseline justify-between gap-2">
			<h2 id="s-{section.slug}" class="text-3xl">
				<a href={resolve('/[section]', { section: section.slug })} class="hover:underline"
					><SectionName slug={section.slug} /></a
				>
			</h2>
			<p class="text-muted-foreground">{section.tagline}</p>
		</div>
		<div class="grid gap-4 sm:grid-cols-2">
			{#each posts as post (post.slug)}
				<PostCard {post} showSection={false} />
			{:else}
				<p class="text-muted-foreground">Nothing dug up here yet.</p>
			{/each}
		</div>
	</section>
{/each}
