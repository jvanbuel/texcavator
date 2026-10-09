<script lang="ts">
	import { tagIcon } from '#lib/tag-icons.ts';
	import { cn } from '#lib/utils.js';

	let { tag, class: className }: { tag: string; class?: string } = $props();

	const icon = $derived(tagIcon(tag));
</script>

<!-- Decorative: the tag name is always shown next to it. -->
{#if icon.kind === 'brand'}
	<svg
		viewBox="0 0 24 24"
		fill="currentColor"
		aria-hidden="true"
		focusable="false"
		class={cn('size-4 shrink-0', className)}
	>
		<path d={icon.path} />
	</svg>
{:else}
	{@const Icon = icon.component}
	<Icon aria-hidden="true" class={cn('size-4 shrink-0', className)} />
{/if}
