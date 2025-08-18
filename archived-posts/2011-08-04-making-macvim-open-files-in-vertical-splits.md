---
author: "yjsoon"
pubDatetime: 2025-08-18T02:53:28.097Z
title: "Making MacVim open files in vertical splits"
description: >
  When coding, I like to use [MacVim](http://code.google.com/p/macvim/) with PeepCode's little [PeepOpen app](http://peepcode.com/products/peepopen) as ...
tags: ["mac", "vim"]
---





When coding, I like to use \[MacVim\](http://code.google.com/p/macvim/) with PeepCode's little \[PeepOpen app\](http://peepcode.com/products/peepopen) as my auto-completing filename browser. It's like TextMate's Cmd-T "Go to file" functionality, and it's awfully fast and convenient. One problem I've had, however, is that MacVim's preferences (as at snapshot 61)\* only allow you to open files from other applications (in this case, PeepOpen) in the same window, a new tab, or in a horizontal split. Here's how you set MacVim to open files in vertical splits -- open a terminal, and enter: defaults write org.vim.MacVim MMVerticalSplit YES While I'm at it, here's another useful one: \[this link\](http://webexpose.org/2008/10/13/open-macvim-tabs-from-command-line/comment-page-1/#comment-95424) shows you how to edit \`mvim\`, the command line script to open MacVim, so that it doesn't open new windows when called multiple times from the command line. \\\* There's a \[pull request\](https://github.com/alloy/macvim/pull/29) to make MacVim's "open files" preference a bit more sensible: in a new window, in the current window, in tabs, in horizontal splits or in vertical splits. Hopefully this makes it into future builds, because seriously, who the hell understands "open files and set the arglist" as "open in current buffer"?