<script lang="ts" module>
	import { tv, type VariantProps } from 'tailwind-variants';

	export const buttonVariants = tv({
		base: 'inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4',
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/90',
				secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				outline: 'border bg-background hover:bg-muted',
				ghost: 'hover:bg-muted'
			},
			size: {
				default: 'h-9 px-4 py-2',
				sm: 'h-8 px-3',
				icon: 'size-9'
			}
		},
		defaultVariants: { variant: 'default', size: 'default' }
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
	export type ButtonSize = VariantProps<typeof buttonVariants>['size'];
</script>

<script lang="ts">
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { cn } from '#lib/utils.ts';

	type Props = (HTMLButtonAttributes & HTMLAnchorAttributes) & {
		variant?: ButtonVariant;
		size?: ButtonSize;
	};

	let {
		class: className,
		variant = 'default',
		size = 'default',
		href,
		children,
		...rest
	}: Props = $props();
</script>

{#if href}
	<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- callers pass resolved paths -->
	<a {href} class={cn(buttonVariants({ variant, size }), className)} {...rest}>
		{@render children?.()}
	</a>
{:else}
	<button
		class={cn(buttonVariants({ variant, size }), className)}
		{...rest as HTMLButtonAttributes}
	>
		{@render children?.()}
	</button>
{/if}
