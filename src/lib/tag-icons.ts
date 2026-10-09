import type { Component } from 'svelte';
import {
	siApachehadoop,
	siApachespark,
	siDocker,
	siFreebsd,
	siGit,
	siKubernetes,
	siLinux,
	siRust,
	siVim,
	siWebassembly,
	type SimpleIcon
} from 'simple-icons';
import AppWindow from '@lucide/svelte/icons/app-window';
import Bug from '@lucide/svelte/icons/bug';
import FolderTree from '@lucide/svelte/icons/folder-tree';
import Gamepad2 from '@lucide/svelte/icons/gamepad-2';
import Puzzle from '@lucide/svelte/icons/puzzle';
import SquareTerminal from '@lucide/svelte/icons/square-terminal';
import Tag from '@lucide/svelte/icons/tag';
import Terminal from '@lucide/svelte/icons/terminal';

export type TagIcon =
	{ kind: 'brand'; title: string; path: string } | { kind: 'lucide'; component: Component };

const brand = (icon: SimpleIcon): TagIcon => ({
	kind: 'brand',
	title: icon.title,
	path: icon.path
});
const lucide = (component: Component): TagIcon => ({ kind: 'lucide', component });

/**
 * Brand logos come from Simple Icons (CC0) and are drawn in the current text colour. Simple Icons
 * has no Windows or Unix logo, so those tags, and the concept tags, use Lucide icons.
 * Add a tag here to give it an icon; any other tag falls back to a plain tag glyph.
 */
const icons: Record<string, TagIcon> = {
	// products and projects
	linux: brand(siLinux),
	docker: brand(siDocker),
	kubernetes: brand(siKubernetes),
	wasm: brand(siWebassembly),
	webassembly: brand(siWebassembly),
	rust: brand(siRust),
	hadoop: brand(siApachehadoop),
	spark: brand(siApachespark),
	git: brand(siGit),
	vim: brand(siVim),
	freebsd: brand(siFreebsd),
	// concepts and platforms
	unix: lucide(Terminal),
	terminals: lucide(SquareTerminal),
	filesystems: lucide(FolderTree),
	games: lucide(Gamepad2),
	windows: lucide(AppWindow),
	compatibility: lucide(Puzzle),
	bugs: lucide(Bug)
};

const fallback = lucide(Tag);

export function tagIcon(tag: string): TagIcon {
	return icons[tag.toLowerCase()] ?? fallback;
}
