<script lang="ts">
	import BlogTabs from '#lib/components/BlogTabs.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Seo title="Blog" path="/blog" />
<h1 class="mb-6 text-4xl">Blog</h1>
<BlogTabs active="all" posts={data.posts} />
