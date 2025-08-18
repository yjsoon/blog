---
author: "yjsoon"
pubDatetime: 2025-08-18T02:53:28.096Z
title: "Fixing Samba shares in Lion"
description: >
  My parents' Mac mini is their media centre -- it's hooked up, via a ridiculously long ethernet cable, to a modded (classic) Xbox in the living room ru...
tags: ["mac"]
---





My parents' Mac mini is their media centre -- it's hooked up, via a ridiculously long ethernet cable, to a modded (classic) Xbox in the living room running a horrendously outdated early build of Xbox Media Centre (now \[XBMC\](http://xbmc.org)). With my usual cautious upgrade habits, I updated the Mac mini to Lion the day after release. (What? It was \_a whole day\_!) It installed fine, but broke media sharing between that and the Xbox, as Apple had dropped Samba networking from Lion (should've read \[this article\](http://www.tuaw.com/2011/03/24/apple-to-drop-samba-networking-tools-from-lion/) earlier). For current XBMC users, this shouldn't be a problem, as newer builds should be able to read NFS shares"¦ but my super-old box is super-old and not conventionally upgradeable\*. Thankfully, someone figured out how to fix it by reinstalling the samba3 package, and I'm just reposting the link here in case anyone needed to stumble across this solution. (The media centre used to be a Linux desktop, until the fan broke and I got tired of fixing X11 problems every 3 weeks. A slight pity, though, that I can no longer tell people my parents use Linux.) \\\* I vaguely recall that these builds weren't legal, and I had to FTP into some secret server after jumping through a few hoops to find a username and password. Fun times. Also, nobody cares about the legality of modding the original Xbox any more, right? "¦right? Umm.