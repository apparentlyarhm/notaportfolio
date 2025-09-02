"use client";
import { Image } from "@heroui/react";
import React, { useRef } from "react";
import clsx from "clsx";
import { motion, useScroll, useTransform } from "framer-motion";

import dj from "../../assets/logos/dj2.svg";
import { codestuff } from "@/config/fonts";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // A ref to the container element we want to track the scroll progress of
  const targetRef = useRef<HTMLDivElement>(null);

  // useScroll gives us scroll progress. `target` is our container, `offset` defines
  // the start and end points of the animation relative to the viewport.
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"], // Animate from when the top hits the top, until the bottom hits the top.
  });

  // useTransform maps the scroll progress (0 to 1) to new values.
  // This creates the parallax effect. The DJ deck moves faster.
  const djY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const controllerY = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]); // Fade out as we scroll

  return (
    <>
      {/* 
        This is our main scroll container. It needs a defined height and to be relative 
        so we can position the images absolutely inside it.
      */}
      <div ref={targetRef} className="relative w-full h-screen">
        {/* The sticky container holds our animation, so it stays in view while we scroll past it */}
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(40,40,40,1)_0%,_rgba(10,10,10,1)_100%)]" />

          <motion.div
            style={{ y: controllerY, opacity }}
            className="absolute"
          >
            <p
              className={clsx("sm:w-64 sm:h-64 w-32 h-32 font-black text-3xl text-center text-white", codestuff.className)}
            >{"Xtras"}</p>
          </motion.div>

          <motion.div
            style={{ y: djY, opacity }}
            className="absolute"
          >
            <Image
              alt="DJ"
              className="sm:w-96 sm:h-96 w-48 h-48"
              src={dj.src}
            />
          </motion.div>
        </div>
      </div>

      {/* The actual page content sits below the scroll animation area */}
      <section className="relative z-10 bg-white dark:bg-black flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-full text-center justify-cente">
          {children}
        </div>
      </section>
    </>
  );
}