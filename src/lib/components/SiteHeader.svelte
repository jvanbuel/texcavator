<script lang="ts">
	import { resolve } from '$app/paths';
	import { afterNavigate } from '$app/navigation';
	import { Menu } from '@lucide/svelte';
	import Logo from './Logo.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import SectionName from './SectionName.svelte';
	import { buttonVariants } from '#lib/components/ui/button/index.ts';
	import * as Sheet from '#lib/components/ui/sheet/index.ts';
	import { sections } from '#lib/sections.ts';

	let open = $state(false);
	afterNavigate(() => (open = false));
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
		<div class="flex items-center gap-2">
			<nav aria-label="Main" class="hidden items-center gap-x-5 text-sm sm:flex">
				{#each sections as s (s.slug)}
					<a href={resolve('/[section]', { section: s.slug })} class="hover:underline"
						><SectionName slug={s.slug} /></a
					>
				{/each}
				<a href={resolve('/about')} class="hover:underline">About</a>
			</nav>
			<ThemeToggle />
			<Sheet.Root bind:open>
				<Sheet.Trigger
					class={buttonVariants({ variant: 'ghost', size: 'icon' }) + ' sm:hidden'}
					aria-label="Open menu"
				>
					<Menu />
				</Sheet.Trigger>
				<Sheet.Content side="right">
					<Sheet.Header>
						<Sheet.Title>Menu</Sheet.Title>
						<Sheet.Description class="sr-only">Site navigation</Sheet.Description>
					</Sheet.Header>
					<nav aria-label="Mobile" class="grid gap-5 px-6 text-lg">
						{#each sections as s (s.slug)}
							<a href={resolve('/[section]', { section: s.slug })}><SectionName slug={s.slug} /></a>
						{/each}
						<a href={resolve('/about')}>About</a>
					</nav>
				</Sheet.Content>
			</Sheet.Root>
		</div>
	</div>
</header>
