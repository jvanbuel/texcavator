<script lang="ts">
	import PostCard from '#lib/components/PostCard.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Seo title="All posts" path="/posts" />
<h1 class="mb-8 text-4xl">All posts</h1>
<div class="grid gap-4 sm:grid-cols-2">
	{#each data.posts as post (post.section + post.slug)}<PostCard {post} />{/each}
</div>
