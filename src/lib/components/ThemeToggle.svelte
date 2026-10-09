<script lang="ts">
	import { toggleMode } from 'mode-watcher';
	import { Sun, Moon } from '@lucide/svelte';
	import { Button } from '#lib/components/ui/button/index.ts';
</script>

<Button variant="ghost" size="icon" onclick={toggleMode} aria-label="Toggle light and dark theme">
	<Sun class="dark:hidden" />
	<Moon class="hidden dark:block" />
</Button>
