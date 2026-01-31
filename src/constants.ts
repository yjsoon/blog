import type { Props } from "astro";
import IconMail from "@/assets/icons/IconMail.svg";
import IconBrandX from "@/assets/icons/IconBrandX.svg";
import IconLinkedin from "@/assets/icons/IconLinkedin.svg";
import IconThreads from "@/assets/icons/IconThreads.svg";
import IconWhatsapp from "@/assets/icons/IconWhatsapp.svg";
import IconFacebook from "@/assets/icons/IconFacebook.svg";
import IconTelegram from "@/assets/icons/IconTelegram.svg";
import IconPinterest from "@/assets/icons/IconPinterest.svg";
import IconGitHub from "@/assets/icons/IconGitHub.svg";
import IconRss from "@/assets/icons/IconRss.svg";
import { SITE } from "@/config";

interface Social {
  name: string;
  href: string;
  linkTitle: string;
  icon: (_props: Props) => Element;
}

export const SOCIALS: Social[] = [
  {
    name: "X",
    href: "https://x.com/yjsoon",
    linkTitle: `${SITE.title} on Twitter`,
    icon: IconBrandX,
  },
  {
    name: "Threads",
    href: "https://threads.net/@yjsoon",
    linkTitle: `${SITE.title} on Threads`,
    icon: IconThreads,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/yjsoon",
    linkTitle: `${SITE.title} on LinkedIn`,
    icon: IconLinkedin,
  },
  {
    name: "GitHub",
    href: "https://www.github.com/yjsoon",
    linkTitle: `${SITE.title} on GitHub`,
    icon: IconGitHub,
  },
  {
    name: "Mail",
    href: "#",
    linkTitle: `Send an email to ${SITE.title}`,
    icon: IconMail,
  },
  {
    name: "RSS",
    href: "/feed",
    linkTitle: `${SITE.title} RSS Feed`,
    icon: IconRss,
  },
] as const;

export const SHARE_LINKS: Social[] = [
  {
    name: "WhatsApp",
    href: "https://wa.me/?text=",
    linkTitle: `Share this post via WhatsApp`,
    icon: IconWhatsapp,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/sharer.php?u=",
    linkTitle: `Share this post on Facebook`,
    icon: IconFacebook,
  },
  {
    name: "X",
    href: "https://x.com/intent/post?url=",
    linkTitle: `Share this post on X`,
    icon: IconBrandX,
  },
  {
    name: "Telegram",
    href: "https://t.me/share/url?url=",
    linkTitle: `Share this post via Telegram`,
    icon: IconTelegram,
  },
  {
    name: "Pinterest",
    href: "https://pinterest.com/pin/create/button/?url=",
    linkTitle: `Share this post on Pinterest`,
    icon: IconPinterest,
  },
  {
    name: "Mail",
    href: "mailto:?subject=See%20this%20post&body=",
    linkTitle: `Share this post via email`,
    icon: IconMail,
  },
] as const;
