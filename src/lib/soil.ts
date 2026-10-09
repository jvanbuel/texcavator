/**
 * Soil layers from the logo, topsoil to bedrock. Each pairs a fill with a text colour that
 * passes WCAG AA, so layers stay readable in both themes.
 */
const soil = [
	'bg-[#f3e9d7] text-[#2b2b2b]',
	'bg-[#e9d2a8] text-[#2b2b2b]',
	'bg-[#d9a566] text-[#2b2b2b]',
	'bg-[#c48a4c] text-[#2b2b2b]',
	'bg-[#9a5d27] text-[#fbf7f0]',
	'bg-[#8a5528] text-[#fbf7f0]',
	'bg-[#6b3f1b] text-[#f3e9d7]'
];

/** The soil tone for layer `i` of `count`, spread so the deepest layer is always the darkest. */
export function soilTone(i: number, count: number) {
	return soil[Math.round((i / Math.max(1, count - 1)) * (soil.length - 1))];
}
