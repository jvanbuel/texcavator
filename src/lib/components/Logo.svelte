<script lang="ts">
	import { cn } from '#lib/utils.ts';

	let {
		class: className,
		size = 40,
		wordmark = true
	}: { class?: string; size?: number; wordmark?: boolean } = $props();
</script>

<span class={cn('inline-flex items-center gap-3', className)}>
	<img
		src="/brand/texcavator-icon-light.svg"
		alt=""
		width={size}
		height={size}
		class="block dark:hidden"
	/>
	<img
		src="/brand/texcavator-icon-dark.svg"
		alt=""
		width={size}
		height={size}
		class="hidden dark:block"
	/>
	{#if wordmark}
		<span class="font-display text-2xl leading-none font-bold tracking-tight">
			te<span class="text-primary">x</span>cavator
		</span>
	{:else}
		<span class="sr-only">Texcavator</span>
	{/if}
</span>
