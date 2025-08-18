---
author: "yjsoon"
pubDatetime: 2025-08-18T02:53:28.100Z
title: "Vim search Dash"
description: >
  I use [MacVim](http://code.google.com/p/macvim/) as my editor and [Dash](http://kapeli.com/dash) as my documentation browser. They're great. Also, Das...
tags: ["Links", "hacks", "Programming"]
---





I use \[MacVim\](http://code.google.com/p/macvim/) as my editor and \[Dash\](http://kapeli.com/dash) as my documentation browser. They're great. Also, Dash has the best nag-screen mechanism I've ever seen. If you use them, too, I [wrote a bit of Vim script](https://gist.github.com/3485271) to make looking things up about 0.5 seconds faster each time. Imagine, \_all that productivity!\_ Just position your cursor on the word you want to look up, leader-d, and the script will try to search the right docset in Dash based on the filetype you're editing. E.g. for JavaScript files, I have it configured to launch js:term in Dash, which searches both the jQuery and JavaScript docs for that term. (Source: a great tip from \[Kapeli\](https://twitter.com/kapeli/statuses/239927573096837123) himself. Herself? Itself?) I'd love to hear suggestions on how to generalise this, without manually adding docsets each time. I tried passing in the filetype to Dash as the search term, but got tripped up by some asset files in Rails that Vim thought were ERB...