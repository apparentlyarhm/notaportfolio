"use client";
import { useState } from "react";
import React, { useEffect } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Image, Button } from "@nextui-org/react";
import { headingsDM, codestuff } from "@/config/fonts";
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
        {/* <DraggableSquare /> */}
        <motion.h1
          className={clsx(
            "text-lg md:text-xl lg:text-2xl",
            codestuff.className
          )}
        >
          {"469: PAGE_UNDER_CONSTRUCTION"}
        </motion.h1>
        <br />
        <br />
        <br />
        <motion.div
          className="flex justify-center"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Image
            src="https://media1.tenor.com/m/GOabrbLMl4AAAAAd/plink-cat-plink.gif"
            className={clsx(
              "text-center dark:border-1 dark:border-yellow-300 border-2 border-blue-950",
              isMobile ? "w-44 h-44" : "w-60 h-60"
            )}
            alt="cat"
            isBlurred
          />
        </motion.div>
        <motion.div
          id="text-wrapper"
          initial="hidden"
          animate="visible"
          variants={typewriterVariants}
          transition={{ delay: 0.5, duration: 0.5, ease: "easeInOut" }}
        >
          <br></br>
          <br></br>
          {/* <Ghosts /> */}
          <motion.h1
            className={clsx(
              "text-md md:text-lg lg:text-xl font-black text-left tracking-tighter break-words sm:mb-10 dark:text-yellow-200 text-blue-950 ",
              codestuff.className
            )}
            transition={{
              duration: 0.1,
              ease: "easeInOut",
              staggerChildren: 0.02,
            }}
          >
            {" user@system>~$ hi, i'm Arhum"} <br></br>
            {
              "user@system>~$ ive hired this cat to stare at you at all times so u better click the button below"
            }
            <br></br>
            {
              "user@system>~$ oh and btw i dont like calling this a 'portfolio' "
            }
          </motion.h1>
          <br />
          <Button
            as={"a"}
            variant="ghost"
            size="lg"
            className="p-5"
            href="/goodstuff"
          >
            Professional section
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
