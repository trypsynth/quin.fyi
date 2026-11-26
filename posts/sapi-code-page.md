---
title: How one manifest line broke ä and ö
description: A Finnish SAPI 5 voice garbled every ä and ö in Paperback's read aloud, and the cause turned out to be a single line in Paperback's app manifest.
published_date: 2026-11-26 09:04:59 -0700
layout: post.liquid
---
Paperback's desktop app is getting read aloud in 1.2, and with it, support for SAPI 5 voices. One of the first people to try it uses Mikropuhe, a Finnish voice, and every ä and ö came out garbled.

The fix ended up being one line in a build helper, but finding it took a few wrong guesses, from both of us.

## The wrong guesses

The first suggestion was to send the voice text in the ANSI code page instead of UTF-8, as a setting. That can't work, because SAPI 5 doesn't take text in any code page. `ISpVoice::Speak` takes UTF-16, and there's no other version of the call. Besides, ä and ö are both in Windows-1252.

Next, a speech plugin for Notepad++ read the same text through the same voice perfectly. My guess was that the plugin was using the 32-bit version of Mikropuhe and Paperback the 64-bit one, but the plugin was 64-bit too.

Then there was a theory that Paperback was sending the text as SAPI's XML markup, and Mikropuhe was choking on that. Paperback only does that when you change the pitch, though, since SAPI 5 can only change pitch with markup, and this happened even at the default pitch.

## The log

Mikropuhe can write a log of the text it gets, and at first, the log looked fine.

Then someone on a mailing list suggested opening the log in Notepad with the encoding set to ANSI. Now the log from Notepad++ still looked right, but the one from Paperback said this:

```
<mikropuhe svt="4"/><mpcallback mark="0"/>Ã¤ Ã¶
```

That's a classic. In UTF-8, ä is the two bytes `C3 A4`. Read those as Windows-1252, and you get two characters instead: `Ã` and `¤`. ö is `C3 B6`, which becomes `Ã¶`. So Mikropuhe was writing UTF-8 bytes to its log, and the editors we'd been checking it in were helpfully detecting that and showing the right letters, which hid the whole bug.

But Paperback hands SAPI proper UTF-16. Where were the UTF-8 bytes coming from?

## The code page

A SAPI 5 voice is a DLL that gets loaded into your app's process. So when Mikropuhe converts the text it's given into an 8-bit encoding, it uses the ANSI code page of the process it's running in. Normally that's whatever your system uses, like Windows-1252 for Finnish. But since Windows 10 version 1903, an app can ask for UTF-8 as its code page instead, with one line in its manifest:

```xml
<activeCodePage xmlns="http://schemas.microsoft.com/SMI/2019/WindowsSettings">UTF-8</activeCodePage>
```

Paperback's manifest had that line. It comes from shipfitter, the crate that builds and packages all my Rust desktop apps, and the [embed-manifest](https://crates.io/crates/embed-manifest) crate it uses asks for UTF-8 by default. That makes sense for an app's own code, but the code page belongs to the whole process, including every DLL loaded into it. So Mikropuhe got proper UTF-16 from SAPI, converted it to what it thought was Windows-1252, and got UTF-8 instead.

The Notepad++ plugin worked because Notepad++ doesn't ask for UTF-8, so Mikropuhe got the system's code page there.

## The fix

shipfitter 0.2.6 keeps the system's code page by default, and an app that really wants UTF-8 has to ask for it:

```rust
let code_page = if options.utf8_code_page { ActiveCodePage::Utf8 } else { ActiveCodePage::System };
```

It has to name the system code page, since leaving it out gets you embed-manifest's UTF-8 default. Once I had Mikropuhe installed to test, it logged and said "Hyvää päivää" correctly. Thanks to the user who reported this and stuck with it through all the wrong guesses.

If you've got a Windows app that loads other people's DLLs, like speech voices or plugins, think twice before turning on the UTF-8 code page. Your code might be ready for it, but theirs probably isn't.
