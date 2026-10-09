---
title: 'SimCity and Windows 95'
date: 2026-10-16
summary: 'SimCity read memory right after freeing it. Windows 95 noticed, and switched allocators just for that game.'
section: bugs-in-amber
tags: [windows, compatibility]
era: 1995
sources:
  - title: 'Joel Spolsky, "How Microsoft Lost the API War"'
    url: 'https://www.joelonsoftware.com/2004/06/13/how-microsoft-lost-the-api-war/'
  - title: 'Raymond Chen, The Old New Thing'
    url: 'https://devblogs.microsoft.com/oldnewthing/'
---

The game worked on Windows 3.1 because of a bug: it used memory after releasing it. On Windows 3.1 the
freed memory was still intact, so nobody noticed.

## The preserved bug

Windows 95 had a stricter allocator, and the game broke. Rather than ask users to wait for a patch,
Microsoft made Windows detect SimCity and run its allocator in a mode that tolerated the mistake.

The bug is still in the game. Windows carries the workaround so the game does not have to.

## It was not alone

Raymond Chen's blog documents many of these compatibility hacks. A companion story: Excel treats 1900 as
a leap year on purpose, to match a bug in Lotus 1-2-3.

> Draft: the exact mechanism needs checking against Chen's posts before this goes live.
