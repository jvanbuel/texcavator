<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '#lib/utils.ts';

	let {
		class: className,
		orientation = 'horizontal',
		...rest
	}: HTMLAttributes<HTMLDivElement> & { orientation?: 'horizontal' | 'vertical' } = $props();
</script>

<div
	role="separator"
	aria-orientation={orientation}
	class={cn(
		'shrink-0 bg-border',
		orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
		className
	)}
	{...rest}
></div>
