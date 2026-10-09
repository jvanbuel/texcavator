<script lang="ts">
	import { resolve } from '$app/paths';
	import { Badge } from '#lib/components/ui/badge/index.ts';
	import Seo from '#lib/components/Seo.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Seo title="Tags" path="/tags" />
<h1 class="mb-8 text-4xl">Tags</h1>
<p class="flex flex-wrap gap-3">
	{#each data.tags as { tag, count } (tag)}
		<Badge href={resolve('/tags/[tag]', { tag })} class="text-sm">{tag} · {count}</Badge>
	{/each}
</p>
