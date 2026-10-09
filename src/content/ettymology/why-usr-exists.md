---
title: 'Why /usr exists'
date: 2026-10-18
summary: 'The first Unix disk on the PDP-11 filled up, so the system spilled onto a second one. That is where /bin and /usr/bin come from.'
section: ettymology
tags: [unix, filesystems]
era: 1971
sources:
  - title: 'Rob Landley, "Understanding the bin, sbin, usr/bin, usr/sbin split"'
    url: 'https://lists.busybox.net/pipermail/busybox/2010-December/074114.html'
  - title: 'Lennart Poettering, "The Case for the /usr Merge"'
    url: 'https://www.freedesktop.org/wiki/Software/systemd/TheCaseForTheUsrMerge/'
---

`/usr` sounds like it should hold _user_ files. It did, once. Then it became the second half of the
operating system.

## Two disks

Early Unix on the PDP-11 lived on small disks. When the system outgrew the first one, the developers
mounted a second disk and kept going. Home directories lived there, under `/usr`. As the system kept
growing, programs moved onto the second disk too, and `/usr/bin` appeared beside `/bin`.

## Why it stuck

The split outlived the hardware. For decades `/bin` held what you needed to boot and repair the
machine, and `/usr` held everything else, even when both lived on the same disk.

Modern distributions have mostly merged them: `/bin` is now a symlink to `/usr/bin`.

```bash
$ ls -ld /bin
lrwxrwxrwx 1 root root 7 /bin -> usr/bin
```

> Draft: the details of the PDP-11 disk layout need checking against the sources below.
