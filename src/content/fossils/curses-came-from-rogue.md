---
title: 'curses was pulled out of Rogue'
date: 2026-10-20
summary: 'Ken Arnold wrote curses so Rogue could draw its dungeon on any terminal. The library outlived the game.'
section: fossils
tags: [unix, terminals, games]
era: 1980
sources:
  - title: 'Curses (programming library), Wikipedia'
    url: 'https://en.wikipedia.org/wiki/Curses_(programming_library)'
  - title: 'Rogue (video game), Wikipedia'
    url: 'https://en.wikipedia.org/wiki/Rogue_(video_game)'
---

Every terminal user interface you have used, from `htop` to `vim`'s split windows, descends from a library
that was written so a dungeon crawler could run on whichever terminal you happened to own.

## The problem

In the late 1970s there was no single way to draw on a screen. Each terminal had its own escape
sequences for moving the cursor or clearing a line. Bill Joy's `termcap` database, written for `vi`,
described those differences. But a program still had to decide, character by character, how to turn a
change on screen into the cheapest sequence of bytes, because terminals were slow.

## The game

_Rogue_ redraws a whole dungeon every turn, so it needed exactly that: describe the screen you want,
and let a library work out the minimal update. Ken Arnold, at Berkeley, wrote **curses** to do this,
and it shipped with BSD Unix, which is how it reached everything else.

## What came after

- **System V** reworked curses and replaced termcap with **terminfo**, written by Mary Ann Horton.
- **ncurses** is the free reimplementation, maintained for decades largely by Thomas Dickey.
- Modern Rust TUI crates such as ratatui keep the same idea: diff the screen you want against the one
  you have, and emit only the changes.

```c
initscr();                    /* take over the terminal */
mvaddch(5, 10, '@');          /* put the hero at row 5, column 10 */
refresh();                    /* send only what changed */
endwin();
```

The name is a joke that stuck: it is short for _cursor optimisation_.

> Draft: dates and attributions above still need checking against primary sources before this goes
> live.
