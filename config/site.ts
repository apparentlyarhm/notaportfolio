export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "imagine a cool name here",
  description: "arhm's personal website",

  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Good stuff",
      href: "/goodstuff",
    },
    {
      label: "Xtras",
      href: "/xtras",
    },
    {
      label: "Favourites",
      href: "favourites",
    },
    {
      label: "whoami",
      href: "/",
    },
  ],

  links: {
    portfolio: "https://arhm.dev/",
  },
};
