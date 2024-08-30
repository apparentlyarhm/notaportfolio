"use client";
import React, { useState, useEffect } from "react";
import { cardConfig } from "@/config/CardConfig";
import { motion } from "framer-motion";
import { CardThing } from "@/components/cardthing";
import { crimsonserif } from "@/config/fonts";
import { headingsDM, paragraph } from "@/config/fonts";
import { Button } from "@nextui-org/button";
import { ArrowUpRight } from "react-feather";
import { MusicAccordion } from "@/components/musicaccordion";
import { MusicConfig } from "@/config/MusicConfig";
import clsx from "clsx";

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

  const typewriterVariants = {
    hidden: { opacity: 0, y: "100%" },
    visible: { opacity: 1, y: 0 },
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
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardVariants}
          className={clsx(
            "text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter break-words text-left px-6  sm:mb-10",
            headingsDM.className
          )}
        >
          {
            "Apart from my usual stuff, I've found a passion for gaming and music composition."
          }
        </motion.h1>
        <br />
        <br />
        <motion.h1
          initial="hidden"
          whileInView="visible"
          variants={cardVariants}
          viewport={{ once: true, amount: 0.2 }}
          className={clsx(
            "sm:text-2xl text-md tracking-tight text-justify px-6 text-gray-400",
            crimsonserif.className
          )}
        >
          {
            "Lets talk games first. Below are some of the games ive played. click on them to get to know my thoughts on them. At times you might think that these just seem like steam reviews and you'd be right- they kinda are but with a bit more personal touch idk lol"
          }
        </motion.h1>
        <br />
        <br />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardVariants}
        >
          <CardThing cardConfig={cardConfig} />
          <br />
        </motion.div>
        <br />
        <motion.h1
          initial="hidden"
          whileInView="visible"
          variants={cardVariants}
          viewport={{ once: true, amount: 0.2 }}
          className={clsx(
            "sm:text-2xl text-md tracking-tight text-justify px-6 text-gray-400",
            crimsonserif.className
          )}
        >
          {
            "Lets move on to music now. Ever since i discovered Martin Garrix as a teen, i was obsessed with music and EDM in general. Soon afer I got my hands on a *cough* legit copy of FL Studio and the rest was history. The songs I've shared below are the ones ive spent the most time on and think passes my 'threshold' of satisfaction. Oh and by the way, I design my own album arts"
          }
        </motion.h1>
        <br />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardVariants}
        >
          <br />
          <MusicAccordion
            musicConfig={MusicConfig}
            small={isMobile ? true : false}
          />
        </motion.div>
      </div>
      <Button
        as={"a"}
        variant="shadow"
        href="./"
        endContent={<ArrowUpRight />}
        className={clsx(
          "mt-12 p-10 rounded-2xl text-2xl text-white bg-cyan-600 tracking-tighter",
          headingsDM.className
        )}
      >
        {"Back to home"}
      </Button>
    </>
  );
}
