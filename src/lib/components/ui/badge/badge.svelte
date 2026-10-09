<script lang="ts" module>
	import { tv, type VariantProps } from 'tailwind-variants';

	export const badgeVariants = tv({
		base: 'inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-xs font-medium whitespace-nowrap transition-colors',
		variants: {
			variant: {
				default: 'border-transparent bg-primary text-primary-foreground',
				secondary: 'border-transparent bg-secondary text-secondary-foreground',
				outline: 'text-foreground hover:bg-muted'
			}
		},
		defaultVariants: { variant: 'outline' }
	});

	export type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];
</script>

<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { cn } from '#lib/utils.ts';

	let {
		class: className,
		variant = 'outline',
		href,
		children,
		...rest
	}: HTMLAnchorAttributes & { variant?: BadgeVariant } = $props();
</script>

<svelte:element
	this={href ? 'a' : 'span'}
	{href}
	class={cn(badgeVariants({ variant }), className)}
	{...rest}
>
	{@render children?.()}
</svelte:element>
