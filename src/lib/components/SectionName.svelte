<script lang="ts">
	import { getSection } from '#lib/sections.ts';

	/** `highlight` overrides the accent colour, for names set on a coloured ground. */
	let { slug, highlight }: { slug: string; highlight?: string } = $props();

	const colour: Record<string, string> = {
		fossils: 'text-fossils',
		ettymology: 'text-ettymology',
		'bugs-in-amber': 'text-amber'
	};

	const section = $derived(getSection(slug));
	const parts = $derived.by(() => {
		if (!section) return null;
		const i = section.name.indexOf(section.highlight);
		return {
			before: section.name.slice(0, i),
			mid: section.highlight,
			after: section.name.slice(i + section.highlight.length)
		};
	});
</script>

{#if parts}
	<span class="font-heading font-bold tracking-tight">
		{parts.before}<span class={highlight ?? colour[slug]}>{parts.mid}</span>{parts.after}
	</span>
{/if}
