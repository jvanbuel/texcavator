<script lang="ts">
	import { resolve } from '$app/paths';
	import Logo from './Logo.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
</script>

<a
	href="#main"
	class="sr-only z-50 rounded-md bg-primary px-3 py-2 text-primary-foreground focus:not-sr-only focus:absolute focus:top-2 focus:left-2"
>
	Skip to content
</a>
<header class="border-b">
	<div
		class="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-4"
	>
		<a href={resolve('/')} aria-label="Texcavator home"
			><Logo
				size={36}
				class="gap-2 sm:gap-3 [&>span:last-child]:text-xl sm:[&>span:last-child]:text-2xl"
			/></a
		>
		<nav aria-label="Main" class="flex items-center gap-3 text-sm font-medium sm:gap-6">
			<a href={resolve('/blog')} class="hover:underline">Blog</a>
			<a href={resolve('/tags')} class="hover:underline">Tags</a>
			<a href={resolve('/about')} class="hover:underline">About</a>
			<ThemeToggle />
		</nav>
	</div>
</header>
