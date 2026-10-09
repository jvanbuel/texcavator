<script lang="ts">
	import { resolve } from '$app/paths';
	import Logo from './Logo.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import SectionName from './SectionName.svelte';
	import { sections } from '#lib/sections.ts';
</script>

<a
	href="#main"
	class="sr-only z-50 rounded-md bg-primary px-3 py-2 text-primary-foreground focus:not-sr-only focus:absolute focus:top-2 focus:left-2"
>
	Skip to content
</a>
<header class="border-b">
	<div
		class="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-4"
	>
		<a href={resolve('/')} aria-label="Texcavator home"><Logo size={36} /></a>
		<nav aria-label="Main" class="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
			{#each sections as s (s.slug)}
				<a href={resolve('/[section]', { section: s.slug })} class="hover:underline"
					><SectionName slug={s.slug} /></a
				>
			{/each}
			<a href={resolve('/about')} class="hover:underline">About</a>
			<ThemeToggle />
		</nav>
	</div>
</header>
