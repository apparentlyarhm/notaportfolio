"use client";
import { useState } from "react";
import React, { useEffect } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { ArrowUpRight } from "react-feather";

import { Ghosts } from "@/components/ghosts";
import { headingsDM, codestuff, fontMono } from "@/config/fonts";
import { Image } from "@heroui/react";
import a from "../assets/cat-kitty.gif" 

export default function Home() {
  const [, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <section className="flex flex-col items-center justify-center">
      <div className="max-w-7xl w-full text-center px-4 py-8 md:px-10 md:py-16 lg:px-20 lg:py-24">
        {/* <Ghosts /> */}
        <motion.h1
          className={clsx(
            "text-2xl md:text-3xl lg:text-4xl text-left font-semibold tracking-tight break-words px-6 sm:mb-10",
            fontMono.className
          )}
          initial="hidden"
          viewport={{ once: true, amount: 0.2 }}
          whileInView="visible"
        >
          {"i'm "}
          <span className="font-black">{"Arhum"}</span>
          {"; welcome to my site!"}
        </motion.h1>

        <motion.h1
          className={clsx(
            "text-medium md:text-large lg:text-xl text-left font-semibold tracking-tight break-words px-6 mt-10 sm:mb-10",
            fontMono.className
          )}
          initial="hidden"
          viewport={{ once: true, amount: 0.2 }}
          whileInView="visible"
        >
          {
            "please give me ideas what do i write here omg omg"
          }
        </motion.h1>

        <motion.h1
          className={clsx(
            "text-xs md:text-sm lg:text-md font-medium text-left tracking-tight break-words px-6 mt-6 sm:mb-8",
            fontMono.className
          )}
          initial="hidden"
          viewport={{ once: true, amount: 0.2 }}
          whileInView="visible"
        >
          {"software @ "}
          <a
            href="https://randomwalk.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {"randomwalk.ai"}
          </a>
          {" and building "}
          <a
            href="https://chateleon.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {"chateleon"}
          </a>
          {"."}
        </motion.h1>

        <div className="flex justify-center mt-8">
          <Image src={a.src} isBlurred />
        </div>

        <Button
          as={"a"}
          className={clsx(
            "mt-8 sm:p-10 p-8 rounded-2xl border-1 border-red-600 dark:border-red-900 sm:text-2xl text-medium dark:text-gray-200 bg-transparent text-black tracking-tighter",
            headingsDM.className
          )}
          endContent={<ArrowUpRight />}
          href="./goodstuff"
          variant="bordered"
        >
          {"Next"}
        </Button>
      </div>
    </section>
  );
}
