<script lang="ts">
	import { resolve } from '$app/paths';
	import PostCard from '#lib/components/PostCard.svelte';
	import SectionName from '#lib/components/SectionName.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Seo title={data.section.name} description={data.section.description} path="/{data.section.slug}" />
<header class="mb-8 grid gap-3">
	<h1 class="text-5xl"><SectionName slug={data.section.slug} /></h1>
	<p class="label !text-sm">{data.section.tagline}</p>
	<p class="max-w-prose text-lg text-muted-foreground">{data.section.description}</p>
	<p class="text-sm">
		<a
			href={resolve('/[section]/rss.xml', { section: data.section.slug })}
			class="underline underline-offset-4">RSS feed</a
		>
	</p>
</header>
<div class="grid gap-4 sm:grid-cols-2">
	{#each data.posts as post (post.slug)}
		<PostCard {post} showSection={false} />
	{:else}
		<p class="text-muted-foreground">Nothing dug up here yet.</p>
	{/each}
</div>
