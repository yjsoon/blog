---
author: "yjsoon"
pubDatetime: 2025-08-18T02:53:28.094Z
title: "A quick redesign, and new link behaviour"
description: >
  I've done a quick redesign of this blog. There are very few visually discernible changes unless you were paying attention, but I did develop a WordPre...
tags: ["Geekiness", "Webdev"]
---





I've done a quick redesign of this blog. There are very few visually discernible changes unless you were paying attention, but I did develop a WordPress plugin along the way (perhaps not "develop" as much as "become really surprised by ending up with"). Mainly, I've changed my link posts to behave more like they do at \[Daring Fireball\](http://daringfireball.net) "“ now, clicking on article titles in link posts (on the blog and in the RSS reader) will bring you straight to the linked item (this post isn't one; take a look at the \[homepage\](http://yjsoon.com) for examples). RSS feeds will indicate these items with "Link" in front, and also include an extra footer with the link again and the page permalink. If you'd like to try some of this on your own WordPress site, I've done up a quick \[WordPress plugin\](http://github.com/yjsoon/df-style-linked-list\_wordpress-plugin) (which, keep in mind, adjusts your **RSS feeds only**), adapted from \[Jonathan Penn's original WordPress linked list plugin\](http://github.com/jonathanpenn/wordpress-linked-list-plugin) (via \[Shawn Blanc\](http://shawnblanc.net/2009/08/wp-linked-list-plugin/)). To use, download the plugin (\[direct download link\](http://github.com/yjsoon/df-style-linked-list\_wordpress-plugin/archives/master)), put it in your plugins folder, and then activate it. When posting, you just need to define a custom field in WordPress called "linked\_list\_url", which will be the link that your post goes to in your RSS feed, and it'll behave like a link post. A quick note, though "“ the plugin's behaviour is much closer to DF's RSS feed, in that it adds a â˜… glyph for the permalink at the end of your post item, and also adds the glyph in front of your non-link post titles. Just remember, this affects your blog's RSS feed only, so you'd have to adjust the look of these link posts on your blog yourself. You can do that by editing the template and making use of the built-in functions. I'll add in an option to change the glyph and toggle some of these behaviours in a future version, which I might then submit to the plugin directory. For now, it's available on a MIT license, so do whatever you'd like with it. More to come if I continue to procrastinate on real work.