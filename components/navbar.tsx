"use client";
import React from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { useDisclosure } from "@nextui-org/react";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { TwitterIcon, GithubIcon, LinkedInIcon } from "@/components/icons";
import { AboutModal } from "./aboutmodal";
import { Lato } from "next/font/google";

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
        className="absolute"
        position="sticky"
        shouldHideOnScroll
        maxWidth="xl"
        isBordered
        onMenuOpenChange={setIsMenuOpen}
        isMenuOpen={isMenuOpen}
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
            ></NextLink>
          </NavbarBrand>
          <ul className="hidden lg:flex gap-4 justify-start ml-2">
            {siteConfig.navItems.map((item) =>
              item.label === "Who?" ? (
                <NavbarItem key={item.href}>
                  <NextLink
                    onClick={handleWhoClick}
                    className={clsx(
                      linkStyles({ color: "foreground" }),
                      "data-[active=true]:text-primary data-[active=true]:font-medium font-bold",
                      navbarList.className
                    )}
                    color="foreground"
                    href={item.href}
                  >
                    {item.label}
                  </NextLink>
                </NavbarItem>
              ) : (
                <NavbarItem key={item.href}>
                  <NextLink
                    className={clsx(
                      linkStyles({ color: "foreground" }),
                      "data-[active=true]:text-primary data-[active=true]:font-medium font-bold",
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
              <TwitterIcon className="text-default-500" />
            </Link>
            <Link
              isExternal
              aria-label="LinkedIn"
              href={siteConfig.links.linkedin}
            >
              <LinkedInIcon className="text-default-500" />
            </Link>
            <Link isExternal aria-label="Github" href={siteConfig.links.github}>
              <GithubIcon className="text-default-500" />
            </Link>
            <ThemeSwitch />
          </NavbarItem>
        </NavbarContent>

        {/* Navbar toggle and menu for mobile */}
        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link
            isExternal
            aria-label="LinkedIn"
            href={siteConfig.links.linkedin}
          >
            <LinkedInIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
          <NavbarMenuToggle aria-label="Toggle menu" />
        </NavbarContent>

        <NavbarMenu>
          {siteConfig.navItems.map((item) =>
            item.label === "Who?" ? (
              <NavbarItem key={item.href}>
                <NextLink
                  onClick={handleWhoClick}
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium text-xl py-3 font-bold",
                    navbarList.className
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ) : (
              <NavbarItem key={item.href}>
                <NextLink
                  onClick={() => setIsMenuOpen(false)}
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium text-xl py-3 font-bold",
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
        </NavbarMenu>
      </NextUINavbar>

      {/* Modal Component */}
      <AboutModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
    </>
  );
};
