<script lang="ts">
	import type { PostOf } from '#lib/server/posts.ts';
	import { soilTone } from '#lib/soil.ts';

	let { post }: { post: PostOf<'fossils'> } = $props();

	const status = {
		extant: { label: 'Extant', dot: 'bg-[#2f7a3a]', chip: 'bg-[#e4efdf] text-[#2f5e36]' },
		fossilised: { label: 'Fossilised', dot: 'bg-[#96560f]', chip: 'bg-[#f6e3c3] text-[#6b3f0c]' },
		extinct: { label: 'Extinct', dot: 'bg-[#6b5b48]', chip: 'bg-[#e7dccb] text-[#4a3d30]' }
	} as const;

	// Show the newest on top, like real strata.
	const layers = $derived(
		[...post.lineage].reverse().map((l, i, all) => ({
			...l,
			tone: soilTone(i, all.length)
		}))
	);
	const s = $derived(status[post.status]);
</script>

<div class="grid gap-3">
	<p class="flex flex-wrap items-center gap-3">
		<span class="label">Status</span>
		<span
			class={[
				'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-sm font-semibold',
				s.chip
			]}
		>
			<span class={['size-2 rounded-full', s.dot]} aria-hidden="true"></span>{s.label}
		</span>
	</p>
	{#if layers.length}
		<p class="label">Lineage, oldest at the bottom</p>
		<ol class="overflow-hidden rounded-xl border">
			{#each layers as layer (layer.name)}
				<li
					class={[
						'flex items-center justify-between gap-4 px-4 py-2.5',
						layer.tone,
						layer.self && 'shadow-[inset_0_0_0_2px_#e8b04a]'
					]}
				>
					<span>
						<span class="font-semibold">{layer.name}</span>
						{#if layer.self}<span class="opacity-80"> · this post</span>
						{:else if layer.note}<span class="opacity-80"> · {layer.note}</span>{/if}
					</span>
					<span class="shrink-0 font-mono text-sm">{layer.when}</span>
				</li>
			{/each}
		</ol>
	{/if}
</div>
