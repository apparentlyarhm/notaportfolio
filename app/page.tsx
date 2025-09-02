"use client";
import { useState } from "react";
import React, { useEffect } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { ArrowUpRight } from "react-feather";
import { Image } from "@heroui/react";

import bg from "../assets/bgate.jpeg"

import { nunito, bitter } from "@/config/fonts";


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
        <motion.h1
          className={clsx(
            "text-4xl md:text-4xl lg:text-5xl text-left font-black tracking-tight break-words px-6 sm:mb-10",
            nunito.className
          )}
          initial="hidden"
          viewport={{ once: true, amount: 0.2 }}
          whileInView="visible"
        >
          {"I think I know what I'm doing but I really don't."}
        </motion.h1>

        <motion.h1
          className={clsx(
            "text-large md:text-large tracking-wide lg:text-xl text-left font-semibold break-words px-6 mt-10 sm:mb-10",
            bitter.className
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
            "text-small md:text-sm lg:text-md tracking-wide font-medium text-left break-words px-6 mt-6 sm:mb-8",
            bitter.className
          )}
          initial="hidden"
          viewport={{ once: true, amount: 0.2 }}
          whileInView="visible"
        >
          {"incredibly mid at everything"}
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
            "mt-8 sm:p-10 p-8 rounded-full text-2xl font-black tracking-tighter text-white bg-gray-900",
            nunito.className
          )}
          endContent={<ArrowUpRight size={40} />}
          href="./goodstuff"
          variant="shadow"
        >
          {"Next"}
        </Button>
      </div>
    </section>
  );
}
