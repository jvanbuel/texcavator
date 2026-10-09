<script lang="ts">
	import type { PostOf } from '#lib/server/posts.ts';

	let { post }: { post: PostOf<'bugs-in-amber'> } = $props();
</script>

{#if post.history.length}
	<section aria-labelledby="ticket-history" class="grid gap-3">
		<h2 id="ticket-history" class="label">Ticket history</h2>
		<ol class="grid gap-3">
			{#each post.history as entry, i (i)}
				<li class="grid grid-cols-[0.75rem_6rem_minmax(0,1fr)] items-start gap-3">
					<span
						class={[
							'mt-2 size-2.5 rounded-full',
							i === post.history.length - 1 ? 'bg-amber' : 'bg-[#d9a566]'
						]}
						aria-hidden="true"
					></span>
					<span class="pt-0.5 font-mono text-sm text-muted-foreground">{entry.when}</span>
					<span>{entry.what}</span>
				</li>
			{/each}
		</ol>
	</section>
{/if}
