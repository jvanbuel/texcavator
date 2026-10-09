<script lang="ts">
	import PostCard from '#lib/components/PostCard.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import TagIcon from '#lib/components/TagIcon.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Seo title="Tagged: {data.tag}" path="/tags/{data.tag}" />
<h1 class="mb-8 flex items-center gap-3 text-4xl">
	<TagIcon tag={data.tag} class="size-9 text-primary" />
	<span
		><span class="text-muted-foreground">Tagged</span>
		<span class="font-mono text-primary">{data.tag}</span></span
	>
</h1>
<div class="grid gap-4 sm:grid-cols-2">
	{#each data.posts as post (post.section + post.slug)}<PostCard {post} />{/each}
</div>
