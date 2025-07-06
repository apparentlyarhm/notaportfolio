"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@heroui/button";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "react-feather";
import clsx from "clsx";

import { cardConfig } from "@/config/CardConfig";
import { CardThing } from "@/components/cardthing";
import { codestuff } from "@/config/fonts";
import { headingsDM } from "@/config/fonts";
import { MusicAccordion } from "@/components/musicaccordion";
import { MusicConfig } from "@/config/MusicConfig";

export default function StuffPage() {
  const [isMobile, setIsMobile] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        mass: 0.5,
      },
    },
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <>
      <br />
      <br />
      <div className="max-w-6xl">
        <motion.h1
          className={clsx(
            "text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter break-words text-left px-6  sm:mb-10",
            headingsDM.className
          )}
          initial="hidden"
          variants={cardVariants}
          viewport={{ once: true, amount: 0.2 }}
          whileInView="visible"
        >
          {
            "Apart from my usual stuff, I've found a passion for gaming and music composition."
          }
        </motion.h1>
        <br />
        <br />
        <motion.h1
          className={clsx(
            "sm:text-xl text-md text-justify px-6 dark:text-gray-400 text-gray-600",
            codestuff.className
          )}
          initial="hidden"
          variants={cardVariants}
          viewport={{ once: true, amount: 0.2 }}
          whileInView="visible"
        >
          {
            "Lets talk games first. Below are some of the games ive played. click on them to get to know my thoughts on them. At times you might think that these just seem like steam reviews and you'd be right- they kinda are but with a bit more personal touch idk lol"
          }
        </motion.h1>
        <br />
        <br />
        <motion.div
          initial="hidden"
          variants={cardVariants}
          viewport={{ once: true, amount: 0.2 }}
          whileInView="visible"
        >
          <CardThing cardConfig={cardConfig} />
          <br />
        </motion.div>
        <motion.h1
          className={clsx(
            "sm:text-xl text-md tracking-tight text-justify px-6 dark:text-gray-400 text-gray-600",
            codestuff.className
          )}
          initial="hidden"
          variants={cardVariants}
          viewport={{ once: true, amount: 0.2 }}
          whileInView="visible"
        >
          {
            "Lets move on to music now. Ever since i discovered Martin Garrix as a teen, i was obsessed with music and EDM in general. Soon afer I got my hands on a *cough* legit copy of FL Studio and the rest was history. The songs I've shared below are the ones ive spent the most time on and think passes my 'threshold' of satisfaction. Oh and by the way, I design my own album arts"
          }
        </motion.h1>
        <br />
        <motion.div
          initial="hidden"
          variants={cardVariants}
          viewport={{ once: true, amount: 0.2 }}
          whileInView="visible"
        >
          <br />
          <MusicAccordion musicConfig={MusicConfig} small={isMobile} />
        </motion.div>
      </div>
      <Button
        as={"a"}
        className={clsx(
          "mt-12 sm:p-12 p-9 text-white text-2xl bg-gray-900 tracking-tighter mr-2 rounded-l-full rounded-r-sm",
          headingsDM.className
        )}
        startContent={<ArrowLeft size={isMobile ? 20 : 50} />}
        href="./goodstuff"
      >
      </Button>

      <Button
        as={"a"}
        className={clsx(
          "mt-12 sm:p-12 p-9 text-white text-2xl bg-gray-900 tracking-tighter rounded-l-2xl rounded-r-full",
          headingsDM.className
        )}
        endContent={<ArrowRight size={isMobile ? 20 : 50} />}
        href="./favourites"
      >

      </Button>
    </>
  );
}
