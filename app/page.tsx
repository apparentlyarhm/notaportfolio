"use client";
import { useState } from "react";
import React, { useEffect } from "react";
import { Jost, DM_Sans } from "next/font/google";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Ghosts } from "@/components/ghosts";

export const headingsDM = DM_Sans({
  weight: "1000",
  preload: false,
});

export const paragraph = Jost({
  weight: ["400", "600"],
  preload: false,
});

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    // Initial check
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const typewriterVariants = {
    hidden: { opacity: 0, y: "100%" },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="max-w-6xl w-full text-center px-4 py-8 md:px-10 md:py-16 lg:px-20 lg:py-24">
        {/* <DraggableSquare /> */}
        <Ghosts />

        <div id="text-wrapper">
          <motion.h1
            className={clsx(
              "text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter break-words sm:mb-10 ",
              headingsDM.className
            )}
            whileInView="visible"
            initial="hidden"
            animate="visible"
            transition={{
              duration: 0.1,
              ease: "easeInOut",
              staggerChildren: 0.02,
            }}
          >
            {"hi, i'm ARHM".split("").map((char, index) => (
              <motion.span key={index} variants={typewriterVariants}>
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
          <br />
          {/* <motion.h1
            className={clsx(
              "text-medium md:text-xl lg:text-s text-gray-400 tracking-tighter break-words mb-12",
              paragraph.className
            )}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.1,
              ease: "easeInOut",
              staggerChildren: 0.02,
            }}
          >
            {"[if you see funky text wrapping im sorry i tried my best :( ] "
              .split("")
              .map((char, index) => (
                <motion.span key={index} variants={typewriterVariants}>
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
          </motion.h1> */}
          <br />
        </div>
      </div>
    </section>
  );
}
