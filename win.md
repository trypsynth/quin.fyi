---
layout: default.liquid
title: Windows utilities
permalink: /win
description: Small, free Windows utilities by Quin Gillespie.
---
# Windows utilities

Small, free tools I've written to make Windows a little easier to use.

## Micstate

Press **Control+Alt+Shift+M** to hear whether your default microphone appears
muted. Micstate sits in the system tray and speaks through your screen reader
or a text-to-speech voice. Right-click its tray icon and choose Exit to quit.

It checks a short audio sample, so a very quiet microphone can also be reported
as muted. The threshold is configurable in `config.ini`; see the
[README](https://github.com/trypsynth/micstate#configuration).

Requires Windows 10 or later. Download the x64 version for most Intel and AMD
PCs, or ARM64 for Windows on Arm. Run the downloaded executable; no installation is needed.

<ul id="micstate-downloads">
  <li><a href="https://github.com/trypsynth/micstate/releases/latest/download/micstate-x64.exe">Download Micstate for Windows (x64)</a></li>
  <li><a href="https://github.com/trypsynth/micstate/releases/latest/download/micstate-arm64.exe">Download Micstate for Windows (ARM64)</a></li>
</ul>

<p id="micstate-download-status" role="status"></p>

[Release notes](https://github.com/trypsynth/micstate/releases/latest) ·
[Source code](https://github.com/trypsynth/micstate)

<script src="/js/win-downloads.js" defer></script>
