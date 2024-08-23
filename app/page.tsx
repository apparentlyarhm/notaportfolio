"use client";
import { useState } from "react";
import React, { useEffect } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { headingsDM } from "@/config/fonts";
import { Ghosts } from "@/components/ghosts";

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

  const typewriterVariants = {
    hidden: { opacity: 0, y: "100%" },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-6xl w-full text-center px-4 py-8 md:px-10 md:py-16 lg:px-20 lg:py-24">
        {/* <DraggableSquare /> */}
        <Ghosts />

        <div id="text-wrapper">
          <motion.h1
            className={clsx(
              "text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter break-words sm:mb-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent",
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
        </div>
      </div>
    </section>
  );
}
