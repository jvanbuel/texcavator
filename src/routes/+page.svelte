<script lang="ts">
	import { resolve } from '$app/paths';
	import Seo from '#lib/components/Seo.svelte';
	import SectionName from '#lib/components/SectionName.svelte';
	import { Button } from '#lib/components/ui/button/index.ts';
	import { getSection } from '#lib/sections.ts';
	import { site } from '#lib/site.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const link = (p: { section: string; slug: string }) =>
		resolve('/[section]/[slug]', { section: p.section, slug: p.slug });
	const manPage = (term: string, n: number) => `${term.replace(/^\//, '').toUpperCase()}(${n})`;

	// The home page is a cross-section of the dig: one soil layer per section, darkening with depth.
	// The wave on top of each layer is its own colour, laid over the layer above.
	const layers = {
		ettymology: {
			ground: 'bg-[#d9a566] text-[#2b2b2b]',
			fill: '#d9a566',
			muted: 'text-[#4a3622]',
			highlight: 'text-[#1e5a28]'
		},
		bugs: {
			ground: 'bg-[#8a5528] text-[#fbf7f0]',
			fill: '#8a5528',
			muted: 'text-[#f3e3c8]',
			highlight: 'text-[#ffd48a]'
		},
		fossils: {
			ground: 'bg-[#5e3a1b] text-[#f3e9d7]',
			fill: '#5e3a1b',
			muted: 'text-[#e2cfae]',
			highlight: 'text-[#ffe6bd]'
		}
	};
	const wave = 'M0 18 Q150 4 300 14 T600 12 T900 16 T1200 10 V40 H0Z';
</script>

<Seo />

<section class="grid gap-10 pt-4 pb-16 sm:pt-10 sm:pb-20">
	<div class="grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:gap-12">
		<div class="grid gap-8">
			<h1
				class="max-w-[14ch] text-[clamp(3rem,9vw,6rem)] leading-[0.95] tracking-[-0.035em] text-balance"
			>
				Digging up tech history.
			</h1>
			<p class="max-w-[52ch] text-xl text-muted-foreground sm:text-2xl">{site.description}</p>
		</div>
		<!-- The logo at full size, by day or by night. Decorative: the header already names the site. -->
		<div class="-order-1 md:order-none">
			<img
				src="/brand/texcavator-icon-light.svg"
				alt=""
				width="280"
				height="280"
				class="block size-28 drop-shadow-[0_12px_24px_rgb(138_85_40_/_0.25)] sm:size-40 md:size-[17.5rem] dark:hidden"
			/>
			<img
				src="/brand/texcavator-icon-dark.svg"
				alt=""
				width="280"
				height="280"
				class="hidden size-28 drop-shadow-[0_12px_24px_rgb(0_0_0_/_0.4)] sm:size-40 md:size-[17.5rem] dark:block"
			/>
		</div>
	</div>

	{#if data.latest}
		{@const post = data.latest}
		<div class="grid justify-items-start gap-4 border-t pt-8">
			<div class="grid max-w-[60ch] gap-2">
				<a
					href={link(post)}
					class="group font-heading text-3xl leading-tight font-bold tracking-tight sm:text-4xl"
				>
					<span
						class="underline decoration-primary/40 decoration-2 underline-offset-[0.2em] group-hover:decoration-primary"
						>{post.title}</span
					>
					<span
						aria-hidden="true"
						class="ml-1 inline-block text-primary transition-transform group-hover:translate-x-1"
						>→</span
					>
				</a>
				<p class="text-lg text-muted-foreground">{post.summary}</p>
				<p class="font-mono text-sm text-muted-foreground">
					Latest find · <SectionName slug={post.section} /> ·
					<time datetime={post.dateIso}>{post.dateIso}</time>
					· {post.readingMinutes} min
				</p>
			</div>
			<Button href={resolve('/blog')} variant="outline" size="lg" class="justify-self-start"
				>Browse the blog</Button
			>
		</div>
	{/if}
</section>

<section aria-label="The sections" class="overflow-hidden rounded-3xl">
	<!-- eTTYmology: nearest the surface -->
	{#if getSection('ettymology')}
		{@const s = getSection('ettymology')!}
		{@const l = layers.ettymology}
		<div class={['relative mt-10 px-6 py-12 sm:px-10', l.ground]}>
			<svg
				viewBox="0 0 1200 40"
				preserveAspectRatio="none"
				aria-hidden="true"
				class="absolute inset-x-0 -top-[39px] h-10 w-full"
			>
				<path d={wave} fill={l.fill} />
			</svg>
			<div class="grid gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-center">
				<div class="grid gap-3">
					<h2 class="text-4xl sm:text-5xl">
						<a href={resolve('/[section]', { section: s.slug })} class="hover:underline"
							><SectionName slug={s.slug} highlight={l.highlight} /></a
						>
					</h2>
					<p class={['text-lg', l.muted]}>{s.tagline}.</p>
				</div>
				<ul class="grid gap-3">
					{#each data.ettymology as post (post.slug)}
						<li>
							<a
								href={link(post)}
								class="group grid gap-1 rounded-xl border border-[#2f4a36] bg-terminal px-5 py-4 font-mono text-terminal-foreground shadow-[0_6px_18px_rgb(43_26_8_/_0.25)] transition-transform hover:-translate-y-0.5"
							>
								<span class="font-semibold text-phosphor"
									>{manPage(post.term, post.manSection)}</span
								>
								<span
									><span class="font-semibold text-white">{post.term}</span> — {post.whatis}</span
								>
								<span class="font-sans text-sm text-[#9fb89c] group-hover:text-terminal-foreground"
									>{post.title} · {post.readingMinutes} min</span
								>
							</a>
						</li>
					{:else}
						<li class={l.muted}>Nothing dug up here yet.</li>
					{/each}
				</ul>
			</div>
		</div>
	{/if}

	<!-- Bugs in Amber: preserved in the middle layers -->
	{#if getSection('bugs-in-amber')}
		{@const s = getSection('bugs-in-amber')!}
		{@const l = layers.bugs}
		<div class={['relative px-6 py-12 sm:px-10', l.ground]}>
			<svg
				viewBox="0 0 1200 40"
				preserveAspectRatio="none"
				aria-hidden="true"
				class="absolute inset-x-0 -top-[39px] h-10 w-full"
			>
				<path d={wave} fill={l.fill} transform="translate(1200 0) scale(-1 1)" />
			</svg>
			<div class="grid gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-center">
				<div class="grid gap-3">
					<h2 class="text-4xl sm:text-5xl">
						<a href={resolve('/[section]', { section: s.slug })} class="hover:underline"
							><SectionName slug={s.slug} highlight={l.highlight} /></a
						>
					</h2>
					<p class={['text-lg', l.muted]}>{s.tagline}.</p>
				</div>
				<ul class="flex flex-wrap gap-3">
					{#each data.bugs as post (post.slug)}
						<li class="w-full sm:w-80">
							<a
								href={link(post)}
								class="grid gap-3 rounded-[1.75rem] bg-[#e8a23a] p-5 text-[#2b1a08] shadow-[inset_0_0_0_2px_#f5c37a,0_12px_28px_rgb(232_162_58_/_0.2)] transition-transform hover:-translate-y-0.5"
							>
								<span class="flex items-start justify-between gap-3">
									<span class="font-mono text-xs">#{post.bugId}</span>
									<span
										class="rounded-md bg-[#2b1a08] px-2 py-0.5 font-mono text-xs font-semibold text-[#f5c37a]"
										>{post.resolution}</span
									>
								</span>
								<span class="font-heading text-xl leading-tight font-bold">{post.title}</span>
							</a>
						</li>
					{:else}
						<li class={l.muted}>Nothing preserved yet.</li>
					{/each}
				</ul>
			</div>
		</div>
	{/if}
	<!-- FOSSils: deepest, down to bedrock -->
	{#if getSection('fossils')}
		{@const s = getSection('fossils')!}
		{@const l = layers.fossils}
		<div class={['relative px-6 pt-12 pb-8 sm:px-10', l.ground]}>
			<svg
				viewBox="0 0 1200 40"
				preserveAspectRatio="none"
				aria-hidden="true"
				class="absolute inset-x-0 -top-[39px] h-10 w-full"
			>
				<path d={wave} fill={l.fill} />
			</svg>
			<div class="grid gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-center">
				<div class="grid gap-3">
					<h2 class="text-4xl sm:text-5xl">
						<a href={resolve('/[section]', { section: s.slug })} class="hover:underline"
							><SectionName slug={s.slug} highlight={l.highlight} /></a
						>
					</h2>
					<p class={['text-lg', l.muted]}>{s.tagline}.</p>
				</div>
				<ul class="flex flex-wrap gap-3">
					{#each data.fossils as post (post.slug)}
						<li>
							<a
								href={link(post)}
								class="flex items-center gap-3 rounded-2xl bg-[#fffdf8] py-3 pr-5 pl-3 text-[#2b2b2b] shadow-[0_2px_0_#3a2410,0_10px_24px_rgb(43_26_8_/_0.3)] transition-transform hover:-translate-y-0.5"
							>
								<svg width="40" height="40" viewBox="0 0 32 32" aria-hidden="true" class="shrink-0">
									<path
										d="M16 16 a1.2 1.2 0 0 1 2.4 0 a2.6 2.6 0 0 1 -5.2 0 a4 4 0 0 1 8 0 a5.4 5.4 0 0 1 -10.8 0 a6.8 6.8 0 0 1 13.6 0 a8.2 8.2 0 0 1 -16.4 0 a9.6 9.6 0 0 1 19.2 0"
										fill="none"
										stroke="#8a5528"
										stroke-width="1.8"
										stroke-linecap="round"
									/>
								</svg>
								<span class="grid">
									<span class="font-heading text-lg font-bold">{post.title}</span>
									<span class="font-mono text-xs text-[#6b5b48]"
										>{post.era} · {post.status} · {post.readingMinutes} min</span
									>
								</span>
							</a>
						</li>
					{:else}
						<li class={l.muted}>Nothing excavated yet.</li>
					{/each}
				</ul>
			</div>
			<p
				class={[
					'mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-[#f3e9d7]/20 pt-5 font-mono text-sm',
					l.muted
				]}
			>
				<span>Bedrock · keep digging</span>
				<a
					href={resolve('/blog')}
					class="text-[#f3e9d7] underline underline-offset-4 hover:text-white"
					>Every post, newest first →</a
				>
			</p>
		</div>
	{/if}
</section>
