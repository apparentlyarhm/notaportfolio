export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "An Attempt",
  description: "idk",
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
      label: "Music & Stuff",
      href: "/mehstuff",
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
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/apparentlyarhm",
    twitter: "https://x.com/MohammedArhum",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
    linkedin: "https://www.linkedin.com/in/shah-mohd-arhum-57862b286/",
    sc: "https://soundcloud.com/mohammed-arhum",
  },
};
