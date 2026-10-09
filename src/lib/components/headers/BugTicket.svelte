<script lang="ts">
	import type { PostOf } from '#lib/server/posts.ts';

	let { post }: { post: PostOf<'bugs-in-amber'> } = $props();

	const fields = $derived(
		[
			['Bug class', post.bugClass],
			['Component', post.component],
			['Severity', post.severity],
			['Preserved', post.preserved]
		].filter((f): f is [string, string] => Boolean(f[1]))
	);
</script>

<!-- Bugs in Amber posts open as a bug ticket; the ticket holds the post title. -->
<div class="overflow-hidden rounded-xl border bg-card">
	<div
		class="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-5 gap-y-3 border-b p-5 sm:grid-cols-[auto_minmax(0,1fr)_auto]"
	>
		<svg width="56" height="66" viewBox="0 0 64 76" aria-hidden="true" class="shrink-0">
			<path
				d="M32 2 C50 22 60 36 60 50 A28 28 0 0 1 4 50 C4 36 14 22 32 2 Z"
				fill="#e8a23a"
				stroke="#96560f"
				stroke-width="2"
			/>
			<path
				d="M18 30 C22 22 26 16 30 12"
				stroke="#fff3d6"
				stroke-width="4"
				stroke-linecap="round"
				fill="none"
				opacity="0.7"
			/>
			<g stroke="#4a2a0c" stroke-width="2" stroke-linecap="round" fill="none">
				<ellipse cx="32" cy="52" rx="8" ry="11" fill="#6b3f1b" />
				<path d="M32 41 V63" />
				<path
					d="M24 46 L16 42 M24 52 L15 52 M24 58 L17 63 M40 46 L48 42 M40 52 L49 52 M40 58 L47 63"
				/>
				<path d="M29 41 L26 35 M35 41 L38 35" />
			</g>
		</svg>
		<div class="grid min-w-0 gap-1">
			<p class="font-mono text-sm text-muted-foreground">#{post.bugId}</p>
			<h1 class="text-3xl sm:text-5xl">{post.title}</h1>
		</div>
		<div
			class="col-span-2 flex flex-wrap items-center gap-x-3 gap-y-1 sm:col-span-1 sm:grid sm:justify-items-end"
		>
			<span
				class="rounded-md bg-amber px-3 py-1 font-mono text-sm font-semibold tracking-wide text-background"
				>{post.resolution}</span
			>
			{#if post.resolutionNote}
				<span class="text-sm text-muted-foreground">{post.resolutionNote}</span>
			{/if}
		</div>
	</div>
	{#if fields.length}
		<dl class="grid grid-cols-2 sm:grid-cols-4">
			{#each fields as [label, value] (label)}
				<div class="grid gap-1 border-b border-l px-5 py-3 first:border-l-0 sm:border-b-0">
					<dt class="label">{label}</dt>
					<dd class="font-semibold">{value}</dd>
				</div>
			{/each}
		</dl>
	{/if}
</div>
