<script lang="ts">
	import { resolve } from '$app/paths';
	import Strata from './Strata.svelte';
	import { site } from '#lib/site.ts';
</script>

<footer class="mt-24">
	<Strata />
	<div class="bg-[#8a5528] text-[#f3e9d7]">
		<div class="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-6">
			<p class="font-mono text-xs tracking-[0.12em] uppercase">{site.tagline}</p>
			<p class="flex gap-5 text-sm">
				<a href={resolve('/rss.xml')} class="underline underline-offset-4">RSS</a>
				<a href={resolve('/blog')} class="underline underline-offset-4">Blog</a>
				<a href={resolve('/tags')} class="underline underline-offset-4">Tags</a>
				<a href={site.repo} rel="external" class="underline underline-offset-4">Source</a>
			</p>
		</div>
	</div>
</footer>
