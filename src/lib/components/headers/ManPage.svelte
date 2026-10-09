<script lang="ts">
	import type { PostOf } from '#lib/server/posts.ts';

	let { post }: { post: PostOf<'ettymology'> } = $props();

	const page = $derived(`${post.term.replace(/^\//, '').toUpperCase()}(${post.manSection})`);
</script>

<!-- eTTYmology posts open as a man page. Terminal colours in both themes, like code blocks. -->
<div
	class="overflow-hidden rounded-xl border border-[#2f4a36] bg-terminal font-mono text-[0.95rem] leading-relaxed text-terminal-foreground"
>
	<div
		class="flex justify-between gap-4 border-b border-[#2f4a36] px-5 py-2.5 font-semibold text-phosphor"
	>
		<span>{page}</span>
		<span class="hidden font-normal text-[#9fb89c] sm:inline">Texcavator Manual</span>
		<span>{page}</span>
	</div>
	<dl class="grid gap-x-4 gap-y-3 px-5 py-4 sm:grid-cols-[8rem_minmax(0,1fr)]">
		<dt class="font-semibold text-phosphor">NAME</dt>
		<dd><span class="font-semibold text-white">{post.term}</span> — {post.whatis}</dd>

		{#if post.synopsis}
			<dt class="font-semibold text-phosphor">SYNOPSIS</dt>
			<dd class="break-words whitespace-pre-wrap">{post.synopsis}</dd>
		{/if}

		<dt class="font-semibold text-phosphor">FROM</dt>
		<dd>
			<ol
				class="flex flex-wrap items-center gap-2"
				aria-label="How the name came about, oldest first"
			>
				{#each post.from as step, i (i)}
					<li class="flex items-center gap-2">
						{#if i > 0}<span class="text-phosphor" aria-hidden="true">→</span>{/if}
						<span
							class={[
								'rounded-md border px-2.5 py-0.5',
								i === post.from.length - 1 ? 'border-phosphor text-white' : 'border-[#3d5f45]'
							]}>{step}</span
						>
					</li>
				{/each}
			</ol>
		</dd>

		{#if post.seeAlso.length}
			<dt class="font-semibold text-phosphor">SEE ALSO</dt>
			<dd>
				{#each post.seeAlso as ref, i (ref.title)}
					{#if i > 0},
					{/if}
					{#if ref.url}
						<a href={ref.url} rel="external" class="underline underline-offset-4 hover:text-white"
							>{ref.title}</a
						>
					{:else}{ref.title}{/if}
				{/each}
			</dd>
		{/if}
	</dl>
	<div
		class="flex justify-between gap-4 border-t border-[#2f4a36] px-5 py-2 text-sm text-[#9fb89c]"
	>
		<span>Texcavator</span><time datetime={post.dateIso}>{post.dateIso}</time><span>{page}</span>
	</div>
</div>
