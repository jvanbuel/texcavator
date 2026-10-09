<script lang="ts">
	import { resolve } from '$app/paths';
	import * as Card from '#lib/components/ui/card/index.ts';
	import Seo from '#lib/components/Seo.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Seo title="Tags" path="/tags" />
<h1 class="mb-2 text-4xl">Tags</h1>
<p class="mb-8 text-lg text-muted-foreground">Topics that cut across the sections.</p>
<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
	{#each data.tags as { tag, count, posts } (tag)}
		<Card.Root class="relative transition-colors focus-within:ring-ring hover:ring-ring">
			<Card.Header>
				<Card.Title class="font-mono text-lg">
					<a
						href={resolve('/tags/[tag]', { tag })}
						class="after:absolute after:inset-0 hover:underline">{tag}</a
					>
				</Card.Title>
				<Card.Description>{count} {count === 1 ? 'post' : 'posts'}</Card.Description>
			</Card.Header>
			<Card.Content>
				<ul class="grid gap-1 text-sm text-muted-foreground">
					{#each posts.slice(0, 3) as post (post.section + post.slug)}
						<li class="truncate">{post.title}</li>
					{/each}
				</ul>
			</Card.Content>
		</Card.Root>
	{/each}
</div>
