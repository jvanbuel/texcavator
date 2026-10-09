<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PostOf } from '#lib/server/posts.ts';
	import { soilTone } from '#lib/soil.ts';

	let { posts }: { posts: PostOf<'fossils'>[] } = $props();

	const decade = (year: number) => Math.floor(year / 10) * 10;

	// One layer per decade, from the decade of the newest post down to the oldest find.
	const layers = $derived.by(() => {
		if (!posts.length) return [];
		const top = decade(Math.max(...posts.map((p) => p.date.getUTCFullYear())));
		const bottom = decade(Math.min(...posts.map((p) => p.era)));
		const decades = [];
		for (let d = top; d >= bottom; d -= 10) decades.push(d);
		return decades.map((d, i) => ({
			decade: d,
			tone: soilTone(i, decades.length),
			finds: posts.filter((p) => decade(p.era) === d).sort((a, b) => b.era - a.era)
		}));
	});

	const statusLabel = { extant: 'extant', fossilised: 'fossilised', extinct: 'extinct' } as const;
</script>

<!-- The FOSSils landing page: posts sit in the decade they come from, newest on top. -->
<div class="overflow-hidden rounded-2xl border">
	<div class="label flex items-center justify-between bg-card px-5 py-3">
		<span>Surface · today</span>
		<svg width="30" height="30" viewBox="-20 -40 40 90" aria-hidden="true">
			<g transform="rotate(40)">
				<rect
					x="-5"
					y="-38"
					width="10"
					height="30"
					rx="4"
					fill="#E8B04A"
					stroke="#2B2B2B"
					stroke-width="3"
				/>
				<rect x="-2" y="-10" width="4" height="10" fill="#2B2B2B" />
				<path
					d="M0 0 L16 10 L0 46 L-16 10Z"
					fill="#C9CED6"
					stroke="#2B2B2B"
					stroke-width="3"
					stroke-linejoin="round"
				/>
			</g>
		</svg>
	</div>
	<ol aria-label="Finds by decade, newest first">
		{#each layers as layer (layer.decade)}
			<li
				class={[
					'grid gap-3 px-5 py-4 sm:grid-cols-[6rem_minmax(0,1fr)] sm:items-center',
					layer.tone
				]}
			>
				<h2 class="font-mono text-base font-semibold tracking-normal">{layer.decade}s</h2>
				{#if layer.finds.length}
					<ul class="flex flex-wrap gap-3">
						{#each layer.finds as post (post.slug)}
							<li>
								<a
									href={resolve('/[section]/[slug]', { section: post.section, slug: post.slug })}
									class="flex items-center gap-3 rounded-xl bg-[#fffdf8] py-2 pr-4 pl-2.5 text-[#2b2b2b] shadow-[0_2px_0_#6b3f1b,0_6px_16px_rgb(43_26_8_/_0.25)] transition-transform hover:-translate-y-0.5"
								>
									<svg
										width="28"
										height="28"
										viewBox="0 0 32 32"
										aria-hidden="true"
										class="shrink-0"
									>
										<path
											d="M14.8 16.0 L14.7 15.9 L14.7 15.8 L14.6 15.7 L14.6 15.6 L14.6 15.4 L14.5 15.3 L14.5 15.2 L14.5 15.0 L14.6 14.9 L14.6 14.7 L14.6 14.6 L14.7 14.4 L14.8 14.3 L14.9 14.2 L15.0 14.0 L15.1 13.9 L15.2 13.8 L15.4 13.6 L15.6 13.5 L15.7 13.4 L15.9 13.4 L16.1 13.3 L16.3 13.2 L16.5 13.2 L16.8 13.2 L17.0 13.2 L17.2 13.2 L17.4 13.2 L17.7 13.3 L17.9 13.4 L18.1 13.5 L18.4 13.6 L18.6 13.7 L18.8 13.9 L19.0 14.0 L19.2 14.2 L19.4 14.4 L19.6 14.7 L19.7 14.9 L19.8 15.2 L20.0 15.5 L20.1 15.7 L20.1 16.0 L20.2 16.4 L20.2 16.7 L20.2 17.0 L20.2 17.3 L20.2 17.6 L20.1 18.0 L20.0 18.3 L19.9 18.6 L19.7 19.0 L19.5 19.3 L19.3 19.6 L19.1 19.9 L18.9 20.1 L18.6 20.4 L18.3 20.6 L18.0 20.8 L17.6 21.0 L17.3 21.2 L16.9 21.4 L16.5 21.5 L16.1 21.6 L15.7 21.6 L15.3 21.7 L14.9 21.7 L14.4 21.6 L14.0 21.6 L13.6 21.5 L13.1 21.3 L12.7 21.2 L12.3 21.0 L11.9 20.7 L11.5 20.5 L11.2 20.2 L10.8 19.9 L10.5 19.5 L10.2 19.1 L9.9 18.7 L9.7 18.3 L9.4 17.8 L9.3 17.4 L9.1 16.9 L9.0 16.4 L8.9 15.9 L8.9 15.3 L8.9 14.8 L8.9 14.3 L9.0 13.7 L9.1 13.2 L9.3 12.7 L9.5 12.2 L9.7 11.6 L10.0 11.2 L10.3 10.7 L10.7 10.2 L11.1 9.8 L11.5 9.4 L12.0 9.0 L12.5 8.7 L13.0 8.4 L13.5 8.1 L14.1 7.9 L14.7 7.7 L15.3 7.6 L15.9 7.5 L16.5 7.4 L17.2 7.4 L17.8 7.5 L18.5 7.6 L19.1 7.7 L19.7 7.9 L20.3 8.1 L20.9 8.4 L21.5 8.7 L22.1 9.1 L22.6 9.5 L23.1 10.0 L23.6 10.5 L24.0 11.0 L24.5 11.6 L24.8 12.2 L25.1 12.8 L25.4 13.5 L25.6 14.2 L25.8 14.9 L25.9 15.6 L26.0 16.3 L26.0 17.1 L26.0 17.8 L25.9 18.5 L25.8 19.3 L25.5 20.0 L25.3 20.7 L25.0 21.4 L24.6 22.1 L24.2 22.8 L23.7 23.4 L23.2 24.0 L22.6 24.6 L22.0 25.1 L21.4 25.6 L20.7 26.0 L20.0 26.4 L19.2 26.7 L18.5 27.0 L17.7 27.2 L16.8 27.4 L16.0 27.5 L15.2 27.5 L14.3 27.5 L13.5 27.4 L12.6 27.2 L11.8 27.0 L11.0 26.7 L10.1 26.4 L9.4 26.0 L8.6 25.5 L7.9 25.0 L7.2 24.4 L6.5 23.8 L5.9 23.1 L5.4 22.4 L4.9 21.7 L4.4 20.9 L4.0 20.0 L3.7 19.2 L3.5 18.3 L3.3 17.3 L3.1 16.4 L3.1 15.5 L3.1 14.5 L3.1 13.5 L3.3 12.6 L3.5 11.7 L3.8 10.7 L4.2 9.8 L4.6 8.9 L5.1 8.1"
											fill="none"
											stroke="#8a5528"
											stroke-width="2"
											stroke-linecap="round"
										/>
									</svg>
									<span class="grid">
										<span class="font-semibold">{post.title}</span>
										<span class="font-mono text-xs text-[#6b5b48]">
											{post.era} · {statusLabel[post.status]} · {post.readingMinutes} min
										</span>
									</span>
								</a>
							</li>
						{/each}
					</ul>
				{:else}
					<p class="text-sm opacity-75">Nothing excavated yet.</p>
				{/if}
			</li>
		{/each}
	</ol>
	<div class="label bg-[#5e3a1b] px-5 py-3 !text-[#e9d2a8]">Bedrock · keep digging</div>
</div>
