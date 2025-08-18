---
author: "yjsoon"
pubDatetime: 2025-08-18T02:53:28.083Z
title: "The new countdown timer"
description: >
  Only tangentially related to this post, but interesting nonetheless, are various online responses to Szemeng's letter to the ST forum about social mob...
tags: ["Links", "Ramblings"]
---





Only tangentially related to this post, but interesting nonetheless, are various online responses to Szemeng's letter to the ST forum about social mobility and the scholarships system in Singapore: two from From a Singapore Angle ([\[1\]](http://singaporeangle.blogspot.com/2005/06/just-who-are-beneficiaries-of-academic.html), [\[2\]](http://singaporeangle.blogspot.com/2005/07/singapores-scholarship-system-study-by.html)), another from [Zuco](http://blog.gerek.org/2005/07/wealth-poverty-and-scholarship.php). As possibly part of his statistic (that 75% of scholarship-holding Singaporean students at Stanford who don't live in HDB flats), I feel that I should demonstrate how truly ungrateful I am for having had the chance to study overseas for free by being able to remind myself of how long more I'm bonded for. The new countdown timer on the sidebar shows exactly how many days I have left until my bond is up, and assuming a base value of $500,000 for the bond with interest (I think that's what was stated on my contract, higher than usual because of NIE), how much I'd have to pay back if I broke it right this second. If anyone else wants to use it, here's the pluggable PHP code to put in your HTML. The two end dates are for those who've completed NS -- I'm assuming 10 months of it counted towards the bond, although is only the case if the bond is completed.

<?php
$end\_date\_break = "20 June 2011 00:01";
$end\_date\_endure = "20 August 2010 00:01";
$start\_date = "20 June 2005 00:01";
$bond = 500000;

$seconds = strtotime($end\_date\_endure) - strtotime("now");
$hours = $seconds / 3600;
$days = floor($hours / 24);
echo $days . " days and \\$";
$total = strtotime($end\_date\_break) - strtotime($start\_date);
$seconds2 = strtotime($end\_date\_break) - strtotime("now");
$remaining = $seconds2 / $total \* $bond;
echo number\_format($remaining, 2, '.', ',') . " away from freedom\\n";
?>

The depressingly large debt I seem to have signed myself into aside, it's mildly amusing to keep refreshing the page to see the bond value go down by a few cents. Edit: Stupid blogging software, "smartening" all the damn quotes. Gah! Actually, the real reason I thought about coding that little snippet up? A good friend is moving on from being bonded to hopefully much greener pastures. Good luck, you.