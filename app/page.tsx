"use client";
import { useState } from "react";
import React, { useEffect } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Image, Button, Snippet } from "@nextui-org/react";
import { headingsDM, codestuff } from "@/config/fonts";
import { Ghosts } from "@/components/ghosts";
import {ArrowUpRight} from "react-feather";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  const typewriterVariants = {
    hidden: { opacity: 0, y: "100%" },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="flex flex-col items-center justify-center h-[600px] sm:h-[900px]">
      <div className="max-w-7xl w-full text-center px-4 py-8 md:px-10 md:py-16 lg:px-20 lg:py-24">

        <Ghosts />
        <motion.div
          id="text-wrapper"
          initial="hidden"
          animate="visible"
          // className="rounded-xl px-3 py-2 pb-5 dark:bg-gray-900 bg-gray-300"
          variants={typewriterVariants}
          transition={{ delay: 0.5, duration: 0.5, ease: "easeInOut" }}
        >
          <p>WOW</p>
        </motion.div>
        <Button
            as={"a"}
            variant="shadow"
            href="./goodstuff"
            endContent={<ArrowUpRight />}
            className={clsx(
                "mt-12 sm:p-10 p-8 rounded-2xl sm:text-2xl text-medium text-white bg-blue-950 dark:bg-gray-800 tracking-tighter",
                headingsDM.className
            )}
        >
          {"Next (get it?)"}
        </Button>
      </div>
    </section>
  );
}
