---
title: 'The game that found Unix its computer'
date: 2026-10-31
summary: 'Ken Thompson wanted a better machine for his solar-system game. The PDP-7 he found it on became the first home of Unix. You can fly it below.'
section: fossils
status: extinct
era: 1969
lineage:
  - name: Space Travel on Multics and GECOS
    when: '1969'
    note: Fortran on the GE-635, about $75 of CPU time a game
  - name: Space Travel for the PDP-7
    when: '1969'
    self: true
  - name: PDP-7 Unix
    when: 1969–70
    note: written on the same machine, with the same tools
  - name: Rust port
    when: '2026'
    note: ratatui, in a terminal or a browser
tags: [unix, games, rust, webassembly]
draft: true
sources:
  - title: 'Dennis M. Ritchie, "The Evolution of the Unix Time-sharing System"'
    url: 'https://www.bell-labs.com/usr/dmr/www/hist.html'
  - title: 'pdp7-unix: the restored PDP-7 Unix and Space Travel source'
    url: 'https://github.com/DoctorWkt/pdp7-unix'
  - title: 'The 1970 listings (McIlroy v0), The Unix Heritage Society'
    url: 'https://www.tuhs.org/Archive/Distributions/Research/McIlroy_v0/'
  - title: 'space-travel: the Rust port played on this page'
    url: 'https://github.com/jvanbuel/space-travel'
---

In 1969 Ken Thompson had a game, and the game needed a computer. The computer he found for it, a
little-used PDP-7 at Bell Labs, is where Unix was written a few months later.

## The game

_Space Travel_ simulates the Sun, the nine planets of the time and 22 of their moons. You fly a ship
between them, watch the scenery, and try to land.

Thompson first wrote it on Multics and then in Fortran for GECOS on the GE-635. Dennis Ritchie later
recalled two problems with that version: you steered it by typing commands, so the display was jerky,
and a game cost about $75 of time on the big machine.

The PDP-7 had a good vector display, the Graphic-II. Thompson and Ritchie rewrote the game for it in
assembly. They used none of the existing software, so they also wrote a floating-point package and a
debugger. The code was cross-assembled on GECOS and carried to the PDP-7 on paper tape. Soon Thompson
was writing a file system and a set of tools on the same machine. That became Unix.

## Play it

<figure class="not-prose my-8">
	<iframe
		src="/play/space-travel/index.html"
		title="Space Travel, playable"
		loading="lazy"
		style="display:block;width:100%;height:min(88vh,720px);border:1px solid var(--border);border-radius:0.75rem;background:#000"
	></iframe>
	<figcaption class="mt-2 text-sm text-muted-foreground">
		<a href="/play/space-travel/index.html" class="text-primary underline underline-offset-4">Open full screen</a>
		(works on phones too).
	</figcaption>
</figure>

You start parked on Earth, and at first the screen looks empty: at the starting scale Earth is smaller
than a dot. Zoom in with `+` about eight times and its outline appears. To take off, zoom in to about
`-18` and hold `↓`. Steer with `←` and `→`, and land on anything slower than about 1 km/s. `L` means
landed, `CL` means crashed.

This is a port to Rust of the surviving 1970 listing, about 1,400 lines of PDP-7 assembly. It follows
the original routine by routine.

## What is in the listing

The physics is real. Distances are in Earth radii, and one pass of the main loop is about one second:
Earth's gravitational parameter in the table is its real value in those units, so you fall at 9.8 m/s².
The ship moves by Verlet integration, and its coordinates are always relative to whichever body pulls
on it hardest. Fly close enough to the Moon and the readout switches from `earth` to `moon`.

The view is centred on the ship and turns with it. One screen unit is 2^scale Earth radii, and the
engine pushes half a screen unit per tick squared. So thrust grows when you zoom out: at the starting
scale one burst sends you off at thousands of kilometres a second.

## What the port turned up

- **The planets barely move.** Each orbit step rotates a body by an angle from a table. Those values
  are GM/r³ of the parent, which is ω², not ω. With one-second ticks the planets are effectively fixed.
- **Thrust is read off the end of a constant.** `ascale` is one word, `-1`, but a float load reads
  three. Its mantissa comes from the next constant in memory, and the thrust works out to about -0.5.
- **A number that isn't octal.** The crash threshold's exponent is written `-028`. Read the 8 as an
  octal digit anyway and it is -24, which makes landing above about 1.1 km/s a crash.
- **Floats in software.** The PDP-7 had no floating-point hardware. The game's package stores each
  number in three 18-bit words, and the game multiplies by powers of two by adding to the exponent
  word directly. The port decodes the original tables from those words and does the arithmetic in
  ordinary 64-bit floats.
