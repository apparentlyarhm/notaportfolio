"use client";
import { useState } from "react";
import React, { useEffect } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import {ArrowUpRight} from "react-feather";

import {Ghosts} from "@/components/ghosts";
import { headingsDM, codestuff } from "@/config/fonts";



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
    <section className="flex flex-col items-center justify-center h-[600px] sm:h-[900px]">
      <div className="max-w-7xl w-full text-center px-4 py-8 md:px-10 md:py-16 lg:px-20 lg:py-24">
          <Ghosts />
          <motion.h1
              className={clsx(
                  "text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter break-words px-6  sm:mb-10",
                  headingsDM.className
              )}
              initial="hidden"
              viewport={{ once: true, amount: 0.2 }}
              whileInView="visible"
          >
            {
              "Hey! I'm Arhum. Welcome to my site!"
            }
          </motion.h1>

        <Button
            as={"a"}
            className={clsx(
                "mt-12 sm:p-10 p-8 rounded-2xl sm:text-2xl text-medium text-white bg-blue-950 dark:bg-gray-800 tracking-tighter",
                headingsDM.className
            )}
            endContent={<ArrowUpRight />}
            href="./goodstuff"
            variant="shadow"
        >
          {"Next (get it?)"}
        </Button>

        <motion.h1
            className={clsx(
                "text-medium md:text-large lg:text-xl font-black tracking-tight break-words px-6 mt-10 sm:mb-10",
                codestuff.className
            )}
            initial="hidden"
            viewport={{ once: true, amount: 0.2 }}
            whileInView="visible"
        >
          {
            "bro i am not gonna lie i dont know what else to add here, so just click the button thanks"
          }
        </motion.h1>

      </div>
    </section>
  );
}
