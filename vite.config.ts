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
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter(),
			preprocess: [
				mdsvex({
					extensions: ['.svx', '.md'],
					highlight: {
						// Highlight at build time; no JS ships to the reader.
						highlighter: (code, lang) => {
							const language =
								lang && highlighter.getLoadedLanguages().includes(lang) ? lang : 'text';
							const html = highlighter.codeToHtml(code, { lang: language, theme });
							return `{@html ${JSON.stringify(html)}}`;
						}
					}
				})
			],
			extensions: ['.svelte', '.svx', '.md']
		})
	]
});
