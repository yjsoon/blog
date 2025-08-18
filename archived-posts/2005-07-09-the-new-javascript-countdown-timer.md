---
author: "yjsoon"
pubDatetime: 2025-08-18T02:53:28.083Z
title: "The new Javascript countdown timer"
description: >
  I got a couple of requests for a version of the bond countdown timer that'd work with Blogger or any other non-self-hosted blogging system. Here it i...
tags: ["Links", "Geekiness", "Ramblings"]
---





I got a couple of requests for a version of the [bond countdown timer](http://yjblog.stupidchicken.com/archives/2005/07/03/the-new-countdown-timer) that'd work with Blogger or any other non-self-hosted blogging system. Here it is, with comments and all too. See, two years of teaching programming style haven't gone down the drain. Much.

<script type=""text/javascript">

function formatAsMoney(mnt) {
    mnt -= 0;
    mnt = (Math.round(mnt\*100))/100;
    return (mnt == Math.floor(mnt)) ? mnt + '.00'
              : ( (mnt\*10 == Math.floor(mnt\*10)) ?
                       mnt + '0' : mnt);
} // from http://www.rgagnon.com/jsdetails/js-0076.html

/\*

Simple script that writes out a line of text with how many days
of bond left to go, and how much it's worth right now if paid up.
E.g. "1870 days and $496250.40 left to go". Extremely
depressing.

Variables to change:

enddate:
The end date of the bond, assuming a full (4/6/8-year) bond.

enddate\_discount:
The end date of the bond assuming it's completed. Applies only
to those who serve full-time NS and have half of that counted
towards the bond (usually 10 months), or teachers whose NIE term
isn't counted unless they complete the bond.

startdate:
First day of work.

bond:
Bond value with interest and LD. Assumes a linear depreciation
of an already-compounded bond value with liquidated damages.
The amount signed on the contract can be used as a rough estimate.

OPTIONAL -- nowdate:
Change to a date in the future e.g.
nowdate = new Date("June 20, 2009");
to see how much to pay at that point of time.

\*/

var enddate = new Date("June 20, 2011");
var enddate\_discount = new Date("August 20, 2010");
// Uncomment this following line if end date is fixed:
// enddate\_discount = enddate;
var startdate = new Date("June 20, 2005");
var bond = 500000;

var nowdate = new Date();
ms1 = enddate\_discount - nowdate;
days = Math.floor(ms1 / 86400000); // from millisecs to days

document.write(days);
document.write(" days and ");

total = enddate - startdate;
ms2 = enddate - nowdate;
rem = formatAsMoney(ms2 / total \* bond);

document.write("$");
document.write(rem);
document.write(" left to go");

</script>

To use, copy and paste the entire section into anywhere you want the words "x days and $y left to go" to show up, making sure to customise the variables for your own situation -- bond value and the start and end dates. If there's an error, let me know by email or on the comments. Enjoy :)