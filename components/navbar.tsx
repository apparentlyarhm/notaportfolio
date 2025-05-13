"use client";
import React from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { useDisclosure } from "@heroui/react";
import { Lato } from "next/font/google";

import { AboutModal } from "./aboutmodal";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { TwitterIcon, GithubIcon, LinkedInIcon } from "@/components/icons";

export const navbarList = Lato({
  weight: ["400", "700"],
  preload: false,
});

export const Navbar = () => {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleWhoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onOpen();
  };

  return (
    <>
      <NextUINavbar
        isBordered
        isBlurred={false}
        isMenuOpen={isMenuOpen}
        maxWidth="xl"
        position="sticky"
        onMenuOpenChange={setIsMenuOpen}
        className="dark:bg-white bg-slate-900 rounded-b-3xl"
      >
        {/* Navbar content for desktop */}
        <NavbarContent
          className="basis-1/5 sm:basis-full bg-transparent"
          justify="start"
        >
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink
              className="flex justify-start items-center gap-1"
              href="/"
             />
          </NavbarBrand>
          <ul className="hidden lg:flex gap-4 justify-start ml-2">
            {siteConfig.navItems.map((item) =>
              item.label === "Who?" ? (
                <NavbarItem key={item.href}>
                  <NextLink
                    className={clsx(
                      linkStyles({ color: "foreground" }),
                      "data-[active=true]:text-primary dark:text-black text-white data-[active=true]:font-medium font-bold",
                      navbarList.className
                    )}
                    color="foreground"
                    href={item.href}
                    onClick={handleWhoClick}
                  >
                    {item.label}
                  </NextLink>
                </NavbarItem>
              ) : (
                <NavbarItem key={item.href}>
                  <NextLink
                    className={clsx(
                      linkStyles({ color: "foreground" }),
                      "data-[active=true]:text-primary dark:text-black text-white data-[active=true]:font-medium font-bold",
                      navbarList.className
                    )}
                    color="foreground"
                    href={item.href}
                  >
                    {item.label}
                  </NextLink>
                </NavbarItem>
              )
            )}
          </ul>
        </NavbarContent>

        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem className="hidden sm:flex gap-2">
            <Link
              isExternal
              aria-label="Twitter"
              href={siteConfig.links.twitter}
            >
              <TwitterIcon className="dark:text-slate-500 text-gray-300" />
            </Link>
            <Link
              isExternal
              aria-label="LinkedIn"
              href={siteConfig.links.linkedin}
            >
              <LinkedInIcon className="dark:text-slate-500 text-gray-300" />
            </Link>
            <Link isExternal aria-label="Github" href={siteConfig.links.github}>
              <GithubIcon className="dark:text-slate-500 text-gray-300" />
            </Link>
            {/* <ThemeSwitch /> */}
          </NavbarItem>
        </NavbarContent>

        {/* Navbar toggle and menu for mobile */}
        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
            <TwitterIcon className="dark:text-slate-500 text-gray-300" />
          </Link>
          <Link
            isExternal
            aria-label="LinkedIn"
            href={siteConfig.links.linkedin}
          >
            <LinkedInIcon className="dark:text-slate-500 text-gray-300" />
          </Link>
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="dark:text-slate-500 text-gray-300" />
          </Link>
          {/* <ThemeSwitch /> */}
          <NavbarMenuToggle aria-label="Toggle menu" className="text-gray-300" />
        </NavbarContent>

        <NavbarMenu>
          {siteConfig.navItems.map((item) =>
            item.label === "Who?" ? (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium text-xl py-3 font-bold",
                    navbarList.className
                  )}
                  color="foreground"
                  href={item.href}
                  onClick={handleWhoClick}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ) : (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium text-xl py-3 font-bold",
                    navbarList.className
                  )}
                  color="foreground"
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            )
          )}
        </NavbarMenu>
      </NextUINavbar>

      {/* Modal Component */}
      <AboutModal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </>
  );
};
