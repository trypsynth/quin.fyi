---
layout: default.liquid
title: Software
permalink: /software
description: Free software by Quin Gillespie.
---
# Software

Programs I've made, mostly for my own use. They're all free, and each one links to its source code on GitHub.

## Command-line tools

These run on Windows, macOS and Linux. Download the file for your system, rename it to the tool's name (with `.exe` on the end on Windows), and put it in a folder on your PATH. On macOS and Linux, make it executable first with `chmod +x`.

### Codestats

Count the code, comment and blank lines in a project, by language. Codestats follows `.gitignore` files, skips generated files such as lockfiles, and counts code inside other files by that code's own language, such as scripts in HTML pages or code blocks in Markdown. It can print its report as text, JSON, CSV, TSV, Markdown or HTML.

The command is `cs`. Run it in a folder to count everything in it, or follow it with the files and folders to count.

<ul data-download-repo="codestats">
  <li><a href="https://github.com/trypsynth/codestats/releases/latest/download/cs-x86_64-pc-windows-gnu.exe">Codestats for Windows (x64)</a></li>
  <li><a href="https://github.com/trypsynth/codestats/releases/latest/download/cs-aarch64-pc-windows-gnullvm.exe">Codestats for Windows (ARM64)</a></li>
  <li><a href="https://github.com/trypsynth/codestats/releases/latest/download/cs-aarch64-apple-darwin">Codestats for macOS (Apple Silicon)</a></li>
  <li><a href="https://github.com/trypsynth/codestats/releases/latest/download/cs-x86_64-apple-darwin">Codestats for macOS (Intel)</a></li>
  <li><a href="https://github.com/trypsynth/codestats/releases/latest/download/cs-x86_64-unknown-linux-gnu">Codestats for Linux (x64)</a></li>
  <li><a href="https://github.com/trypsynth/codestats/releases/latest/download/cs-aarch64-unknown-linux-gnu">Codestats for Linux (ARM64)</a></li>
  <li><a href="https://github.com/trypsynth/codestats/releases/latest/download/cs-x86_64-unknown-linux-musl">Codestats for Linux (x64, static)</a></li>
  <li><a href="https://github.com/trypsynth/codestats/releases/latest/download/cs-aarch64-unknown-linux-musl">Codestats for Linux (ARM64, static)</a></li>
</ul>

[Source code](https://github.com/trypsynth/codestats)

### Gitkeep

Keep a local archive of accounts on GitHub, GitLab, Forgejo and Gitea. Give Gitkeep the users or organizations to keep, and it clones every one of their repositories, then brings them all up to date each time you sync.

Run `gitkeep init` to choose where the archive goes, and `gitkeep login` to add a GitHub access token. Then run `gitkeep add` followed by a user or organization name, and `gitkeep sync` whenever you want to update everything.

<ul data-download-repo="gitkeep">
  <li><a href="https://github.com/trypsynth/gitkeep/releases/latest/download/gitkeep-x86_64-pc-windows-gnu.exe">Gitkeep for Windows (x64)</a></li>
  <li><a href="https://github.com/trypsynth/gitkeep/releases/latest/download/gitkeep-aarch64-pc-windows-gnullvm.exe">Gitkeep for Windows (ARM64)</a></li>
  <li><a href="https://github.com/trypsynth/gitkeep/releases/latest/download/gitkeep-aarch64-apple-darwin">Gitkeep for macOS (Apple Silicon)</a></li>
  <li><a href="https://github.com/trypsynth/gitkeep/releases/latest/download/gitkeep-x86_64-apple-darwin">Gitkeep for macOS (Intel)</a></li>
  <li><a href="https://github.com/trypsynth/gitkeep/releases/latest/download/gitkeep-x86_64-unknown-linux-musl">Gitkeep for Linux (x64)</a></li>
  <li><a href="https://github.com/trypsynth/gitkeep/releases/latest/download/gitkeep-aarch64-unknown-linux-musl">Gitkeep for Linux (ARM64)</a></li>
</ul>

[Source code](https://github.com/trypsynth/gitkeep)

### Podfeed

Get the RSS feed URL of a podcast from its Apple Podcasts link, so you can follow it in any podcast app.

Run `podfeed` followed by one or more Apple Podcasts links, and it prints the feed URL for each one.

<ul data-download-repo="podfeed">
  <li><a href="https://github.com/trypsynth/podfeed/releases/latest/download/podfeed-x86_64-windows-gnu.exe">Podfeed for Windows (x64)</a></li>
  <li><a href="https://github.com/trypsynth/podfeed/releases/latest/download/podfeed-aarch64-windows-gnu.exe">Podfeed for Windows (ARM64)</a></li>
  <li><a href="https://github.com/trypsynth/podfeed/releases/latest/download/podfeed-aarch64-macos">Podfeed for macOS (Apple Silicon)</a></li>
  <li><a href="https://github.com/trypsynth/podfeed/releases/latest/download/podfeed-x86_64-macos">Podfeed for macOS (Intel)</a></li>
  <li><a href="https://github.com/trypsynth/podfeed/releases/latest/download/podfeed-x86_64-linux-musl">Podfeed for Linux (x64)</a></li>
  <li><a href="https://github.com/trypsynth/podfeed/releases/latest/download/podfeed-aarch64-linux-musl">Podfeed for Linux (ARM64)</a></li>
</ul>

[Source code](https://github.com/trypsynth/podfeed)

### Scriptview

Read the source code of compiled AppleScript files (`.scpt`) on Windows, macOS or Linux, without needing a Mac. Scriptview prints the same thing that Apple's `osadecompile` prints. It also reads run-only scripts, JavaScript for Automation scripts, and classic Mac OS scripts back to 1993.

Run `scriptview` followed by the script's file name. You can also give it a script bundle (`.scptd`) or an applet (`.app`). Scriptview comes in an archive: extract it, and the program inside is already called `scriptview`.

<ul data-download-repo="scriptview">
  <li><a href="https://github.com/trypsynth/scriptview/releases/download/v0.4.0/scriptview-v0.4.0-windows-amd64.zip">Scriptview for Windows (x64)</a></li>
  <li><a href="https://github.com/trypsynth/scriptview/releases/download/v0.4.0/scriptview-v0.4.0-windows-arm64.zip">Scriptview for Windows (ARM64)</a></li>
  <li><a href="https://github.com/trypsynth/scriptview/releases/download/v0.4.0/scriptview-v0.4.0-darwin-arm64.tar.gz">Scriptview for macOS (Apple Silicon)</a></li>
  <li><a href="https://github.com/trypsynth/scriptview/releases/download/v0.4.0/scriptview-v0.4.0-darwin-amd64.tar.gz">Scriptview for macOS (Intel)</a></li>
  <li><a href="https://github.com/trypsynth/scriptview/releases/download/v0.4.0/scriptview-v0.4.0-linux-amd64.tar.gz">Scriptview for Linux (x64)</a></li>
  <li><a href="https://github.com/trypsynth/scriptview/releases/download/v0.4.0/scriptview-v0.4.0-linux-arm64.tar.gz">Scriptview for Linux (ARM64)</a></li>
</ul>

[Source code](https://github.com/trypsynth/scriptview)

### Txt2img

Draw text onto an image from the command line, without AI. You can set the image size and colors, place and align the text, use your own BDF or PCF bitmap font, add a drop shadow, or have the image sized to fit the text.

Run `txt2img` followed by the text in quotes. It saves `image.png` unless you give another name with `-o`, and `txt2img --help` lists every option.

<ul data-download-repo="txt2img">
  <li><a href="https://github.com/trypsynth/txt2img/releases/latest/download/txt2img-x86_64-windows-gnu.exe">Txt2img for Windows (x64)</a></li>
  <li><a href="https://github.com/trypsynth/txt2img/releases/latest/download/txt2img-aarch64-windows-gnu.exe">Txt2img for Windows (ARM64)</a></li>
  <li><a href="https://github.com/trypsynth/txt2img/releases/latest/download/txt2img-aarch64-macos">Txt2img for macOS (Apple Silicon)</a></li>
  <li><a href="https://github.com/trypsynth/txt2img/releases/latest/download/txt2img-x86_64-macos">Txt2img for macOS (Intel)</a></li>
  <li><a href="https://github.com/trypsynth/txt2img/releases/latest/download/txt2img-x86_64-linux-musl">Txt2img for Linux (x64)</a></li>
  <li><a href="https://github.com/trypsynth/txt2img/releases/latest/download/txt2img-aarch64-linux-musl">Txt2img for Linux (ARM64)</a></li>
</ul>

[Source code](https://github.com/trypsynth/txt2img)

## Windows utilities

### Fastwin

Turn off Windows annoyances from one small menu. Disable telemetry, ads and suggested apps, OneDrive, and Bing results in Start search. Control when Windows Update installs and restarts, and fix File Explorer defaults such as hidden file extensions. Each option says whether it's on or off, and choosing it switches it.

Windows 10 or later. Run the file and accept the administrator prompt. Press a number to open a category, then press an option's number to switch it. Fastwin works well with screen readers.

<ul data-download-repo="fastwin">
  <li><a href="https://github.com/trypsynth/fastwin/releases/latest/download/fastwin-x64.exe">Fastwin for Windows (x64)</a></li>
  <li><a href="https://github.com/trypsynth/fastwin/releases/latest/download/fastwin-arm64.exe">Fastwin for Windows (ARM64)</a></li>
</ul>

[Source code](https://github.com/trypsynth/fastwin)

### Micstate

Press Control+Alt+Shift+M to hear if your microphone is muted. Micstate uses your screen reader or a speech voice. You can set the audio level used to detect mute in `config.ini`.

Windows 10 or later. Download and run the file. To close Micstate, right-click its tray icon and select Exit.

<ul id="micstate-downloads" data-download-repo="micstate">
  <li><a href="https://github.com/trypsynth/micstate/releases/latest/download/micstate-x64.exe">Micstate for Windows (x64)</a></li>
  <li><a href="https://github.com/trypsynth/micstate/releases/latest/download/micstate-arm64.exe">Micstate for Windows (ARM64)</a></li>
</ul>

[Source code](https://github.com/trypsynth/micstate)

### Taskmon

A small task manager for Windows. View running programs and system resource use, end processes, and control services.

<ul data-download-repo="taskmon">
  <li><a href="https://github.com/trypsynth/taskmon/releases/latest/download/taskmon-setup-x64.exe">Taskmon installer (x64)</a></li>
  <li><a href="https://github.com/trypsynth/taskmon/releases/latest/download/taskmon-setup-arm64.exe">Taskmon installer (ARM64)</a></li>
  <li><a href="https://github.com/trypsynth/taskmon/releases/latest/download/taskmon-x64.zip">Taskmon portable (x64)</a></li>
  <li><a href="https://github.com/trypsynth/taskmon/releases/latest/download/taskmon-arm64.zip">Taskmon portable (ARM64)</a></li>
</ul>

[Source code](https://github.com/trypsynth/taskmon)

### TDSR Server

Hear [tdsr](https://github.com/tspivey/tdsr), the console screen reader for macOS and Linux, through your Windows screen reader. Run tdsr on another computer, such as a Linux server you connect to over SSH, and TDSR Server speaks it through NVDA, JAWS or another screen reader, or a Windows voice if no screen reader is running.

Run the file on your Windows PC. It listens on port 64111, or on a port you give it on the command line. Then point tdsr at it, as the [readme](https://github.com/trypsynth/tdsr-server#usage) explains. To close TDSR Server, right-click its tray icon and select Quit.

<ul data-download-repo="tdsr-server">
  <li><a href="https://github.com/trypsynth/tdsr-server/releases/latest/download/tdsr-server-x64.exe">TDSR Server for Windows (x64)</a></li>
  <li><a href="https://github.com/trypsynth/tdsr-server/releases/latest/download/tdsr-server-arm64.exe">TDSR Server for Windows (ARM64)</a></li>
</ul>

[Source code](https://github.com/trypsynth/tdsr-server)

### Uphide

Hide a Windows update that causes problems, such as a driver update. You can also restore hidden updates so Windows offers them again.

Run the file, accept the administrator prompt, and choose which updates to hide or restore.

<ul data-download-repo="uphide">
  <li><a href="https://github.com/trypsynth/uphide/releases/latest/download/uphide-x64.exe">Uphide for Windows (x64)</a></li>
  <li><a href="https://github.com/trypsynth/uphide/releases/latest/download/uphide-arm64.exe">Uphide for Windows (ARM64)</a></li>
</ul>

[Source code](https://github.com/trypsynth/uphide)

<script src="/js/downloads.js" defer></script>
