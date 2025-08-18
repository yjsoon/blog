---
author: "yjsoon"
pubDatetime: 2025-08-18T02:53:28.100Z
title: "Keyboard-only searching with Safari 6's unified URL bar"
description: >
  A couple of months ago, I adapted a user script called [knogs](https://github.com/nqzero/knogs) (\\"keyboard navigation on Google Search\\") into a Safari...
tags: ["Links", "hacks", "Mac", "Projects", "safari"]
---





A couple of months ago, I adapted a user script called \[knogs\](https://github.com/nqzero/knogs) ("keyboard navigation on Google Search") into a Safari extension. knogs restores Google's search page keyboard navigation shortcuts (\[background here\](http://yjsoon.com/2012/02/re-enabling-jk-keyboard-navigation-on-google-search)), so you can navigate between search results with \`j\` (down) and \`k\` (up), and get to the search field with \`/\`. Unfortunately, Safari 6's new unified "URL + search" bar behaviour \_retains focus\_ after a search. As a result, you have to click in the search page to use any keyboard shortcuts, rendering the extension fairly useless unless you like searching for JJ Abrams by mistake. So I've updated the extension to remove focus from the unified search bar. (It's an ugly hack, though--I did it by prepending an input field on the page, calling \`focus\` on it to remove focus from the search bar, and then removing focus with \`blur\`. \[Let me know\](http://yjsoon.com/contact) if you have any better ideas.) Download the Safari extension \[here\](http://dl.dropbox.com/u/90126/GoogleJK/GoogleJK.safariextz), and the source (userscript version) is available \[here\](http://dl.dropbox.com/u/90126/GoogleJK/GoogleJK.user.js). If you were using the previous extension, it should have auto-updated, if I set it up right. Test it out by searching in Safari's URL bar, waiting a few milliseconds, and entering \`j\`, \`k\`, or \`/\` to navigate. A couple of notes on usage: - You have to be searching with \`google.com\` for this to work, and not any country-specific domains. This is due to the way Safari handles extension whitelisting--I can't get it to whitelist \`google.com.\*\` URLs. - Disable Google Instant search in your account settings, otherwise typing \`j\` will just append that letter to your search terms. Thanks to \[Nick Farina\](http://nfarina.com) for helping me find this issue.