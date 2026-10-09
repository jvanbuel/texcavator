<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { Button } from '#lib/components/ui/button/index.ts';
</script>

<svelte:head><title>{page.status} · Texcavator</title></svelte:head>

<section class="grid max-w-prose gap-4 py-10">
	<p class="label">Error {page.status}</p>
	{#if page.status === 404}
		<h1 class="text-4xl">Nothing excavated here</h1>
		<p class="text-lg text-muted-foreground">
			We dug, but there is no page at this address. It may have moved, or it was never buried here.
		</p>
	{:else}
		<h1 class="text-4xl">Something broke</h1>
		<p class="text-lg text-muted-foreground">{page.error?.message}</p>
	{/if}
	<p class="flex flex-wrap gap-3">
		<Button href={resolve('/')}>Back to the surface</Button>
		<Button href={resolve('/blog')} variant="outline">Browse the blog</Button>
	</p>
</section>
