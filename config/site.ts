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
      label: "Professional",
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
    github: "https://github.com/apparentlyarhm",
    twitter: "https://x.com/MohammedArhum",
    linkedin: "https://www.linkedin.com/in/shaharhum",
  },
};
