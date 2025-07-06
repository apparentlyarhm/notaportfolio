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
import { TwitterIcon, GithubIcon, LinkedInIcon } from "@/components/icons";

// Font setup
const navbarList = Lato({
  weight: ["400", "700"],
  preload: false,
});

// Extracted Social Links
const SocialLinks = () => (
  <>
    <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
      <TwitterIcon className="text-gray-500" />
    </Link>
    <Link isExternal aria-label="LinkedIn" href={siteConfig.links.linkedin}>
      <LinkedInIcon className="text-gray-500" />
    </Link>
    <Link isExternal aria-label="Github" href={siteConfig.links.github}>
      <GithubIcon className="text-gray-500 " />
    </Link>
  </>
);

// Extracted Nav Items
const NavItems = ({
  onWhoClick,
  onAnyClick,
  mobile = false,
}: {
  onWhoClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onAnyClick?: () => void;
  mobile?: boolean;
}): JSX.Element => {
  return (
    <>
      {siteConfig.navItems.map((item) => {
        const isWho = item.label === "Who?";
        return (
          <NavbarItem key={item.href}>
            <NextLink
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium",
                mobile
                  ? "text-xl py-3"
                  : "text-gray-600 hover:bg-gray-100 px-1 py-3 rounded-2xl",
                navbarList.className
              )}
              href={item.href}
              onClick={(e) => {
                if (isWho) {
                  onWhoClick(e);
                } else {
                  onAnyClick?.();
                }
              }}
            >
              {item.label}
            </NextLink>
          </NavbarItem>
        );
      })}
    </>
  );
};

export default NavItems;


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
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="xl"
        position="sticky"
        className="bg-white border border-gray-300 rounded-b-3xl"
      >
        <NavbarContent className="basis-1/3" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink
              className="flex items-center gap-1"
              href="/"
            >
            </NextLink>
          </NavbarBrand>
          <ul className="hidden lg:flex gap-4 ml-2">
            <NavItems onWhoClick={handleWhoClick} />
          </ul>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex basis-1/3" justify="end">
          <NavbarItem className="hidden sm:flex gap-2">
            <SocialLinks />
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="sm:hidden basis-1/3 pl-4" justify="end">
          <SocialLinks />
          <NavbarMenuToggle aria-label="Toggle menu" className="text-gray-300" />
        </NavbarContent>

        <NavbarMenu>
          <NavItems
            mobile
            onWhoClick={handleWhoClick}
            onAnyClick={() => setIsMenuOpen(false)}
          />
        </NavbarMenu>
      </NextUINavbar>

      <AboutModal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </>
  );
};
