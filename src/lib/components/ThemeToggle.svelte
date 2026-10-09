<script lang="ts">
	import { toggleMode } from 'mode-watcher';
	import { Sun, Moon } from '@lucide/svelte';
	import { buttonVariants } from '#lib/components/ui/button/index.ts';
	import * as Tooltip from '#lib/components/ui/tooltip/index.ts';
</script>

<Tooltip.Root>
	<Tooltip.Trigger
		class={buttonVariants({ variant: 'ghost', size: 'icon' })}
		onclick={toggleMode}
		aria-label="Toggle light and dark theme"
	>
		<Sun class="dark:hidden" />
		<Moon class="hidden dark:block" />
	</Tooltip.Trigger>
	<Tooltip.Content>Light / dark</Tooltip.Content>
</Tooltip.Root>
