"use client";
import { useState } from "react";
import React, { useEffect } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { ArrowUpRight } from "react-feather";
import { Image } from "@heroui/react";

import bg from "../assets/bg.png"

import { headingsDM, fontMono } from "@/config/fonts";


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
                "text-3xl md:text-4xl lg:text-5xl text-left font-semibold tracking-tight break-words px-6 sm:mb-10",
                headingsDM.className
              )}
              initial="hidden"
              viewport={{ once: true, amount: 0.2 }}
              whileInView="visible"
            >
              {"I think I know what I'm doing but I really don't."}
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
                "hi! I'm Arhum, welcome to my site!"
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
                className="text-blue-500 underline"
                href="https://randomwalk.ai"
                rel="noopener noreferrer"
                target="_blank"
              >
                {"randomwalk.ai"}
              </a>
              {" and building "}
              <a
                className="text-blue-500 underline"
                href="https://chateleon.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                {"chateleon"}
              </a>
              {"."}
            </motion.h1>
            <div className="flex justify-center mt-6">
            <Image
              alt="i must find woman"
              className="rounded-full object-fill w-full max-w-[800px] h-auto sm:w-[800px] sm:h-[600px]"
              src={bg.src}
            />
            </div>
        <Button
          as={"a"}
          className={clsx(
            "mt-8 sm:p-10 p-8 rounded-full border-1 border-gray-600 dark:border-red-900 sm:text-2xl text-medium dark:text-gray-200 bg-transparent text-black tracking-tighter",
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
