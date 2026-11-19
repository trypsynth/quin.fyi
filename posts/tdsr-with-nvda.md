---
title: tdsr through NVDA, over Tailscale
description: Run tdsr on a remote machine and hear it through NVDA on Windows, with TDSR Server, Tailscale, and a PuTTY app module that keeps NVDA quiet.
published_date: 2026-11-18 20:15:08 -0700
layout: post.liquid
---
For years, my terminal workflow has been the same: I SSH in from PuTTY on Windows, and [tdsr](https://github.com/tspivey/tdsr) reads the terminal on the remote machine. These days its speech comes back to my PC over [Tailscale](https://tailscale.com), where [TDSR Server](https://github.com/trypsynth/tdsr-server) speaks it through NVDA.

If you want the same setup, or just to Quinify your terminal a little, here's how.

## How it works

tdsr can send its speech to any command you give it with `-s`. We'll give it `socat`, which forwards the speech over TCP to TDSR Server on your Windows PC.

Tailscale connects the two machines, so this works from anywhere, with no port forwarding. And on the Windows side, a small NVDA app module stops NVDA reading PuTTY itself, so you don't hear everything twice.

## 1. Run TDSR Server

On your Windows PC, download `tdsr-server-x64.exe` or `tdsr-server-arm64.exe` from the [latest release](https://github.com/trypsynth/tdsr-server/releases/latest) and run it. It sits in the system tray and listens on port 64111. To use another port, pass it as an argument. Allow it through Windows Firewall when asked.

The protocol is one command per line: `s` followed by text speaks the text, and `x` stops speech. That's all it can do, but anything that can reach the port can make it talk, so don't expose it beyond your own network and tailnet.

## 2. Connect the machines with Tailscale

Put your PC and the remote machine on the same tailnet. The examples below use `my-pc` as your PC's name; run `tailscale status` to find yours. Then check that the remote machine can reach TDSR Server:

```sh
printf 'sTest\n' | socat - TCP4:my-pc:64111
```

If your screen reader says "Test", you're connected.

## 3. Set up tdsr

On the remote machine, install tdsr with [uv](https://docs.astral.sh/uv/):

```sh
uv tool install git+https://github.com/tspivey/tdsr.git
```

Next, tdsr needs a command to send its speech to. Save this as `~/.local/bin/tdsr-speech` and make it executable:

```sh
#!/bin/sh
exec socat - TCP4:my-pc:64111,nodelay
```

Finally, add this to your shell config, to save typing:

```sh
alias tdsr='tdsr -s tdsr-speech'
```

Run `tdsr`, and you should hear it start talking.

## 4. Keep NVDA quiet in PuTTY

At this point NVDA and tdsr both read PuTTY, which gets old fast. NVDA's built-in PuTTY support reads new output as it arrives and reports the caret as you type and move. This app module replaces it. PuTTY becomes plain editable text: NVDA reads no new output, the editing and navigation keys report nothing, and the review cursor still works. Copying from the review cursor also drops the spaces PuTTY pads each line with.

To install it, turn on "Enable loading custom code from Developer Scratchpad directory" in NVDA's Advanced settings, save the module as `%APPDATA%\nvda\scratchpad\appModules\putty.py`, and restart NVDA. It only affects PuTTY, so NVDA behaves as usual everywhere else.

```python
import unicodedata

import appModuleHandler
import oleacc
import textInfos
import textUtils
from displayModel import EditableTextDisplayModelTextInfo
from NVDAObjects.IAccessible import IAccessible
from NVDAObjects.window import DisplayModelEditableText


def isWordChar(char):
	return unicodedata.category(char)[0] in "LMNP"


def findStartOfWord(text, offset):
	if offset >= len(text):
		return offset
	while offset > 0 and text[offset].isspace():
		offset -= 1
	if isWordChar(text[offset]):
		while offset > 0 and isWordChar(text[offset - 1]):
			offset -= 1
	return offset


def findEndOfWord(text, offset):
	if offset >= len(text):
		return offset + 1
	if isWordChar(text[offset]):
		while offset < len(text) and isWordChar(text[offset]):
			offset += 1
	elif unicodedata.category(text[offset])[0] != "Z":
		offset += 1
	while offset < len(text) and text[offset].isspace():
		offset += 1
	return offset


class TerminalTextInfo(EditableTextDisplayModelTextInfo):
	def _get_clipboardText(self):
		# Drop the spaces that pad each line out to the window width.
		return "\r\n".join(line.strip("\r\n").rstrip() for line in self.getTextInChunks(textInfos.UNIT_LINE))

	def _getWordOffsets(self, offset):
		if self.encoding not in (textUtils.WCHAR_ENCODING, None, "utf_32_le", textUtils.USER_ANSI_CODE_PAGE):
			raise NotImplementedError
		lineStart, lineEnd = self._getLineOffsets(offset)
		# Break words on NUL and non-breaking space too.
		lineText = self._getTextRange(lineStart, lineEnd).translate({0: " ", 0xA0: " "})
		relOffset = offset - lineStart
		if self.useUniscribe:
			offsets = self._calculateUniscribeOffsets(lineText, textInfos.UNIT_WORD, relOffset)
			if offsets is not None:
				return (offsets[0] + lineStart, offsets[1] + lineStart)
		if self.encoding == textUtils.WCHAR_ENCODING:
			converter = textUtils.WideStringOffsetConverter(lineText)
			strOffset = converter.encodedToStrOffsets(relOffset, relOffset)[0]
			start, end = converter.strToEncodedOffsets(findStartOfWord(lineText, strOffset), findEndOfWord(lineText, strOffset))
		else:
			start, end = findStartOfWord(lineText, relOffset), findEndOfWord(lineText, relOffset)
		return (start + lineStart, end + lineStart)


class QuietTerminal(DisplayModelEditableText):
	TextInfo = TerminalTextInfo
	# Unbound, so NVDA doesn't read the line or character after these keys.
	__gestures = dict.fromkeys(
		(
			"kb:enter",
			"kb:upArrow",
			"kb:downArrow",
			"kb:leftArrow",
			"kb:rightArrow",
			"kb:pageUp",
			"kb:pageDown",
			"kb:control+leftArrow",
			"kb:control+rightArrow",
			"kb:home",
			"kb:end",
			"kb:delete",
			"kb:backspace",
		)
	)


class AppModule(appModuleHandler.AppModule):
	def chooseNVDAObjectOverlayClasses(self, obj, clsList):
		if obj.windowClassName == "PuTTY" and isinstance(obj, IAccessible) and obj.IAccessibleRole == oleacc.ROLE_SYSTEM_CLIENT:
			if DisplayModelEditableText in clsList:
				clsList.remove(DisplayModelEditableText)
			clsList.insert(0, QuietTerminal)
```
