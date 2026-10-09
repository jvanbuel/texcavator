import { mdsvex } from 'mdsvex';
import { createHighlighter } from 'shiki';
import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const theme = 'vitesse-dark';
const highlighter = await createHighlighter({
	themes: [theme],
	langs: [
		'bash',
		'shell',
		'c',
		'cpp',
		'rust',
		'go',
		'python',
		'ts',
		'js',
		'json',
		'yaml',
		'toml',
		'diff',
		'asm',
		'html',
		'css',
		'sql',
		'text'
	]
});

export default defineConfig({
	plugins: [
		tailwindcss(),
		// mdsvex 1.x is a Vite plugin (not a Svelte preprocessor) and emits Svelte 5's `<script module>`.
		mdsvex({
			extensions: ['.md'],
			// Highlight at build time; no JS ships to the reader. Inline code stays plain.
			highlight: (code, { lang, inline }) =>
				inline
					? null
					: highlighter.codeToHtml(code, {
							lang: highlighter.getLoadedLanguages().includes(lang) ? lang : 'text',
							theme,
							transformers: [
								{
									pre(node) {
										// Browsers already make scrollable blocks keyboard-focusable; Svelte's a11y check flags the tabindex.
										delete node.properties.tabindex;
										// The CRT background comes from the stylesheet (--terminal), not the Shiki theme.
										node.properties.style = String(node.properties.style ?? '').replace(
											/background-color:[^;]+;?/,
											''
										);
									}
								}
							]
						})
		}),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			// 404.html: the site's error page, served by Cloudflare for unknown paths.
			adapter: adapter({ fallback: '404.html' }),
			extensions: ['.svelte', '.md']
		})
	]
});
