---
author: "yjsoon"
pubDatetime: 2025-08-18T02:53:28.095Z
title: "How to self-update Mail.app plugin compatibility"
description: >
  The new MacBook Pros ship with a new version of Mail.app (4.4/1082.1, vs 4.4/1082 previously). Nothing much seems to have changed except the version n...
tags: ["Links", "Howto", "Mac"]
---





The new MacBook Pros ship with a new version of Mail.app (4.4/1082.1, vs 4.4/1082 previously). Nothing much seems to have changed except the version number, but an annoying side effect manifested when I first started the program: all my mail plugins\* were deemed "incompatible" and promptly disabled. As this wasn't a major version update, not all my plugins had been updated for compatibility, \_\_but\_\_ I figured there wouldn't be any real compatibility issues (not ones that required re-compilation, anyway). As such, I performed some minor plumbing and restored their functionality. Your mileage may vary, but here's how I did it: \* In Finder, navigate to \_~/Library/Mail/Bundles (Disabled)\_. \* Ctrl-click on a bundle, and select "Show Package Contents". \* Navigate to Contents, then open Info.plist with a text editor (e.g. TextEdit). \* Near the end, look for a <key> called SupportedPluginCompatibilityUUIDs, where you'll see a bunch of <string>s denoting compatible Mail versions. \* For \_\_this version of Mail\_\_, just add this line right before the closing </array> tag: <string>36555EB0-53A7-4B29-9B84-6C0C6BACFC23</string> \* (For future versions of Mail, if you'd like to try this hack, start by looking at plugins that are already compatible. In their Info.plist files, try to identify the compatibility string to paste in.) \* Save the file, move the bundle back to \_~/Library/Mail/Bundles\_, and start Mail. \* WOOHOO, YOU'VE CHEATED THE SYSTEM! YOU LEET HAX0R!!! (Does anyone still say that?) \\\* \[DockStar\](http://www.ecamm.com/mac/dockstar/), \[Mail ActOn\](http://indev.ca/MailActOn.html), \[Letterbox\](http://harnly.net/) and \[MailFollowUp\](http://www.cs.unc.edu/~welch/MailFollowup/index.html).