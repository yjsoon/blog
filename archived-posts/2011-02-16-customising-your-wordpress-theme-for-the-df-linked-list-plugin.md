---
author: "yjsoon"
pubDatetime: 2025-08-18T02:53:28.095Z
title: "Customising your WordPress theme for the DF Linked List plugin"
description: >
  I've received quite a few emails asking about how to customise WordPress themes for the [Daring Fireball Linked List plugin](http://yjsoon.com/dfll-pl...
tags: ["DFLL", "WordPress"]
---





I've received quite a few emails asking about how to customise WordPress themes for the \[Daring Fireball Linked List plugin\](http://yjsoon.com/dfll-plugin). Since the plugin only affects the RSS feed items' links, some users aren't sure how to get the same effect on their webpages. So here's my attempt at helping budding link-bloggers build their own "DFLL-compliant" WordPress themes. For this guide, I'll be basing my instructions on the (current) default WordPress theme, \[TwentyTen\](http://2010dev.wordpress.com/). \[\_\_Aside\_\_: To briefly answer another question I've gotten more than once -- instead of just changing the RSS links and then going through all this trouble to adjust the theme, why doesn't the plugin just change your permalinks? Because then you wouldn't get \_any\_ permalinks to your linked list posts. If that's your cup of tea, though, you can try the \[FeedWordPress\](http://feedwordpress.radgeek.com/) plugin.\] \_\_Disclaimer\_\_: Please be careful! I've done a bit of testing, but I can't be responsible for helping you if you mess up your WordPress install with these instructions. Back up! If you don't know where to find these theme files, or if you're not comfortable mucking around with code, you might be better off getting someone to do it for you. I can help for a small fee -- see the [bottom of this post](#help). ### Before you begin Did you actually \[install the plugin\](http://yjsoon.com/dfll-plugin), either from the link or by searching in your WordPress blog's plugin directory? Please do, before following any of the instructions below. ### The Quick Way: Using a child theme I've prepared the methods below as a \[child theme\](http://codex.wordpress.org/Child\_Themes), which will only work if you have TwentyTen installed in the default directory. This could be useful if you're starting a new blog. You can either get it here: \[TwentyTen DF Linked List Child Theme\](http://yjsoon.com/files/twentyten-dfll.zip), or find it in your DFLL plugin directory if you have the latest version. Move it to your WordPress themes directory, and activate it. ### The Long Way: Editing your theme manually This section goes into detail about how to edit your theme by hand. You might want to read this if you're not using TwentyTen but are vaguely familiar with how PHP and WordPress themes work. First, edit the linked list titles on your main page. To do this, open up loop.php, and look for this line around line 126:

## [](<?php the_permalink\(\); ?> "<?php printf( esc_attr__( 'Permalink to %s', 'twentyten' ), the_title_attribute( 'echo=0' ) ); ?>")

Edit it to:

  

##  [&rarr;](<?php the_linked_list_link\(\); ?> "<?php printf( esc_attr__( 'Link to %s', 'twentyten' ), the_title_attribute( 'echo=0' ) ); ?>")

  

## [](<?php the_permalink\(\); ?> "<?php printf( esc_attr__( 'Permalink to %s', 'twentyten' ), the_title_attribute( 'echo=0' ) ); ?>")

\_\_Notes\_\_: \* The first section occurs twice. The first occurrence, on line 62, applies only to gallery items -- you want the second occurrence on line 126. (Line numbers may have changed in later versions of WordPress.) \* I've taken the liberty of changing the link title to become "Link to your post title" instead of "Permalink to your post title", and adding a right arrow (&rarr;) at the end of your post title. You can change these in line 3 of the code. If you want, you can use the symbol you define in the DFLL settings by using get\_glyph(). \* Readers can still click on the date to get to the permalink. You can change this, of course. \* I've also added a class to your title, linked-list-item. You can use this to style the title to look different from your other entries. Take a look at how Misters \[Blanc\](http://shawnblanc.net/) and \[Brooks\](http://brooksreview.net/) do it. Next, you should also edit your single page template, so that if anyone gets to your link post's permalink, they can get to the link. Open single.php and look for this line (line 22, in my version):

It doesn't link to anything at the moment, so you can either make it go to your link:

  

#  [&rarr;](<?php the_linked_list_link\(\) ?> "Link to <?php the_title_attribute(); ?>")

  

... or you can just insert the link below, like so:

[Go to this link](<?php the_linked_list_link\(\) ?> "Link to <?php the_title_attribute(); ?>")

Edit my suggested defaults as appropriate, of course. \_Update, 31 March\_: I forgot something when I first wrote this article -- how to add the permalink glyph into your post. (Thanks go to \[Jason Clarke\](http://twitter.com/jasonclarke) for reminding me.) Here's how you add a permalink glyph to your linked list posts:

This adds a link, using the glyph you define in the plugin's options page, to this post. With this, you can probably get rid of other links that come by default in TwentyTen -- try searching for other anchor tags to the\_permalink. (**Note**: Previous versions of this had a link to the permalink surrounding the call to the\_permalink\_glyph, which resulted in a double link. This has been fixed -- thanks to \[Nat Robertson\](http://overanalyze.net/) for pointing it out.) If you want this permalink glyph to show up for all posts (and not just linked list posts), remove the first and third lines (the "if" and "endif" ones). I only put this in loop.php, so it only shows up on the front page, since I suppose the single-page view is already at the permalink. If you're not using TwentyTen, look for similar code in page.php, post.php and single.php. Usually, you'll want to find a h1 or h2 tag that calls the WordPress function the\_permalink(), something like the below:

# [](<?php the_permalink\(\) ?>)

Which you can adapt to:

  

# [](<?php the_linked_list_link\(\) ?> "Link to <?php the_title_attribute(); ?>")

  

# [](<?php the_permalink\(\) ?>)

Hopefully these examples have given you enough information to do some "pattern-matching" on how to identify the code to change, and what to change it to. Once again, remember to back up before doing anything drastic! ### References \* To see an example of the plugin and theme in action, go to my \[test blog\](http://soon.sg/blog), which has the plugin set up and the child theme installed. \* If you want to create your own WordPress theme instead, \[here's a walkthrough\](http://line25.com/tutorials/how-to-create-your-own-custom-wordpress-theme) by Chris Spooner. \* If you're migrating from Tumblr, Ian Hines has you covered with a set of \[detailed instructions\](http://ianhin.es/wrote-about/tumblr-to-wordpress/). ### None of this makes any sense. Can you do it for me? Sure, I can customise your theme for a small fee. \[Get in touch\](http://yjsoon.com/contact) and we'll work something out.