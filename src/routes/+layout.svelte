<script lang="ts">
	import './layout.css';
	import { ModeWatcher } from 'mode-watcher';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import { site } from '#lib/site.ts';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<link rel="icon" href="/favicon.ico" sizes="32x32" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<link rel="alternate" type="application/rss+xml" title={site.name} href="/rss.xml" />
</svelte:head>

<ModeWatcher />
<div class="flex min-h-screen flex-col">
	<SiteHeader />
	<main id="main" class="mx-auto w-full max-w-5xl flex-1 px-5 py-10">
		{@render children()}
	</main>
	<SiteFooter />
</div>
