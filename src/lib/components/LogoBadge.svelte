<script lang="ts">
	import { onMount } from 'svelte';
	import { cn } from '#lib/utils.js';

	let { class: className }: { class?: string } = $props();

	// The terminal's face blinks: "> -" becomes "- -" for a moment, once on load and on hover.
	let closed = $state(false);
	let timer: ReturnType<typeof setTimeout> | undefined;

	function blink() {
		if (closed || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		closed = true;
		timer = setTimeout(() => (closed = false), 160);
	}

	onMount(() => {
		const first = setTimeout(blink, 900);
		return () => {
			clearTimeout(first);
			clearTimeout(timer);
		};
	});
</script>

<!--
	The logo badge, inlined so the terminal's face can blink. Generated from
	static/brand/texcavator-icon-{light,dark}.svg; keep them in sync. Decorative.
-->
<svg
	onpointerenter={blink}
	viewBox="8 8 184 184"
	aria-hidden="true"
	focusable="false"
	class={cn('dark:hidden', className)}
>
	<defs><clipPath id="badge-day"><circle cx="100" cy="100" r="84" /></clipPath></defs>
	<g clip-path="url(#badge-day)">
		<rect width="200" height="200" fill="#F3E9D7" />
		<path d="M0 92 Q50 84 100 90 T200 88 V200 H0Z" fill="#D9A566" />
		<path d="M0 122 Q60 114 110 121 T200 118 V200 H0Z" fill="#B97A3E" />
		<path d="M0 152 Q50 146 100 152 T200 150 V200 H0Z" fill="#8A5528" />
		<g transform="translate(100 130) rotate(-12)">
			<rect
				x="-40"
				y="-36"
				width="80"
				height="66"
				rx="9"
				fill="#E6DCC6"
				stroke="#2B2B2B"
				stroke-width="4"
			/>
			<rect x="-30" y="-27" width="60" height="42" rx="7" fill="#1E2A22" /><path
				d="M-21 -14 L-12 -7 L-21 0"
				fill="none"
				stroke="#7FD67A"
				stroke-width="3.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				opacity={closed ? 0 : 1}
			/><rect
				x="-23"
				y="-3"
				width="12"
				height="4"
				rx="1"
				fill="#7FD67A"
				opacity={closed ? 1 : 0}
			/><rect x="-7" y="-3" width="14" height="4" rx="1" fill="#7FD67A" />
			<circle cx="30" cy="22" r="2.5" fill="#B97A3E" /></g
		>
		<path d="M0 136 Q55 128 105 136 T200 132 V200 H0Z" fill="#B97A3E" />
		<path d="M0 156 Q50 150 100 157 T200 154 V200 H0Z" fill="#8A5528" />
		<circle cx="52" cy="80" r="2.5" fill="#B97A3E" /><circle
			cx="146"
			cy="76"
			r="2"
			fill="#B97A3E"
		/><circle cx="160" cy="84" r="2.5" fill="#D9A566" />
	</g>
	<g transform="translate(150 40) rotate(40)">
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
		/></g
	>
	<circle cx="100" cy="100" r="84" fill="none" stroke="#2B2B2B" stroke-width="6" />
</svg>
<svg
	onpointerenter={blink}
	viewBox="8 8 184 184"
	aria-hidden="true"
	focusable="false"
	class={cn('hidden dark:block', className)}
>
	<defs><clipPath id="badge-night"><circle cx="100" cy="100" r="84" /></clipPath></defs>
	<g clip-path="url(#badge-night)">
		<rect width="200" height="200" fill="#26323D" /><circle
			cx="52"
			cy="52"
			r="9"
			fill="#F3E9D7"
		/><circle cx="57" cy="48" r="8" fill="#26323D" /><circle
			cx="40"
			cy="60"
			r="1.6"
			fill="#F3E9D7"
		/><circle cx="70" cy="34" r="1.2" fill="#F3E9D7" /><circle
			cx="112"
			cy="30"
			r="1.8"
			fill="#F3E9D7"
		/><circle cx="58" cy="82" r="1" fill="#F3E9D7" /><circle
			cx="150"
			cy="44"
			r="1.2"
			fill="#F3E9D7"
		/><circle cx="92" cy="58" r="1" fill="#F3E9D7" />
		<path d="M0 92 Q50 84 100 90 T200 88 V200 H0Z" fill="#D9A566" />
		<path d="M0 122 Q60 114 110 121 T200 118 V200 H0Z" fill="#B97A3E" />
		<path d="M0 152 Q50 146 100 152 T200 150 V200 H0Z" fill="#8A5528" />
		<g transform="translate(100 130) rotate(-12)">
			<rect x="-34" y="-31" width="68" height="50" rx="10" fill="#7FD67A" opacity="0.25" /><rect
				x="-40"
				y="-36"
				width="80"
				height="66"
				rx="9"
				fill="#E6DCC6"
				stroke="#2B2B2B"
				stroke-width="4"
			/>
			<rect x="-30" y="-27" width="60" height="42" rx="7" fill="#1E2A22" /><path
				d="M-21 -14 L-12 -7 L-21 0"
				fill="none"
				stroke="#7FD67A"
				stroke-width="3.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				opacity={closed ? 0 : 1}
			/><rect
				x="-23"
				y="-3"
				width="12"
				height="4"
				rx="1"
				fill="#7FD67A"
				opacity={closed ? 1 : 0}
			/><rect x="-7" y="-3" width="14" height="4" rx="1" fill="#7FD67A" />
			<circle cx="30" cy="22" r="2.5" fill="#B97A3E" /></g
		>
		<path d="M0 136 Q55 128 105 136 T200 132 V200 H0Z" fill="#B97A3E" />
		<path d="M0 156 Q50 150 100 157 T200 154 V200 H0Z" fill="#8A5528" />
	</g>
	<g transform="translate(150 40) rotate(40)">
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
		/></g
	>
	<circle cx="100" cy="100" r="84" fill="none" stroke="#F3E9D7" stroke-width="6" />
</svg>
