export const SITE = {
  website: "https://yjsoon.com/",
  author: "YJ Soon",
  profile: "https://yjsoon.com/about",
  desc: "YJ Soon's personal blog.",
  title: "yjsoon",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 5, // Show 5 full posts on homepage
  postPerPage: 10,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: false,
    text: "Edit page",
    url: "",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Singapore",
} as const;
