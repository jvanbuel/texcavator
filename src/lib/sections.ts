/** Single source of truth for sections. A post's `section` must be one of these slugs. */
export const sections = [
	{
		slug: 'fossils',
		name: 'FOSSils',
		/** Part of the name rendered in the accent colour, like the "x" in the logo. */
		highlight: 'FOSS',
		tagline: 'Where open-source projects came from',
		description:
			'Origin stories and family trees of open-source projects: who started them, what they grew out of, and what died along the way.'
	},
	{
		slug: 'ettymology',
		name: 'eTTYmology',
		highlight: 'TTY',
		tagline: 'Where the names come from',
		description:
			'Where a name, path, word or key binding comes from. Short pieces about why things are called what they are called.'
	},
	{
		slug: 'bugs-in-amber',
		name: 'Bugs in Amber',
		highlight: 'Amber',
		tagline: 'Bugs, glitches and hacks, preserved',
		description:
			'Famous bugs, glitches and hacks: the ones kept on purpose for compatibility, the ones people exploited, and the post-mortems of the ones that got caught.'
	}
] as const;

export type SectionSlug = (typeof sections)[number]['slug'];
export const sectionSlugs = sections.map((s) => s.slug) as [SectionSlug, ...SectionSlug[]];

export function getSection(slug: string) {
	return sections.find((s) => s.slug === slug);
}
