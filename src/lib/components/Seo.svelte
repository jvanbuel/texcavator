<script lang="ts">
	import { site } from '#lib/site.ts';

	let {
		title,
		description = site.description,
		path = '/',
		type = 'website',
		published
	}: {
		title?: string;
		description?: string;
		path?: string;
		type?: 'website' | 'article';
		published?: string;
	} = $props();

	const fullTitle = $derived(title ? `${title} · ${site.name}` : `${site.name}: ${site.tagline}`);
	const url = $derived(site.url + path);
	const image = `${site.url}/brand/og-default.png`;
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:type" content={type} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={image} />
	<meta name="twitter:card" content="summary_large_image" />
	{#if published}<meta property="article:published_time" content={published} />{/if}
</svelte:head>
