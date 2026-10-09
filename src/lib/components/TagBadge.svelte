<script lang="ts">
	import { resolve } from '$app/paths';
	import { Badge } from '#lib/components/ui/badge/index.ts';
	import TagIcon from './TagIcon.svelte';

	let { tag }: { tag: string } = $props();
</script>

<Badge variant="outline" href={resolve('/tags/[tag]', { tag })}>
	<TagIcon {tag} class="size-3" />{tag}
</Badge>
