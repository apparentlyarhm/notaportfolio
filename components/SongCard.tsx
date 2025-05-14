"use client";

import { Card, CardFooter, CardBody, Divider } from "@heroui/react";
import clsx from "clsx";
import { useState } from "react";
import { motion } from "framer-motion";

import {headingsDM, fontMono } from "@/config/fonts";
interface SongCardProps {
  songName: string;
  artists: string[];
  albumName: string;
  imageUrl: string;
}

export default function SongCard({
  songName,
  artists,
  albumName,
  imageUrl,
}: SongCardProps) {
   const [hovered, setHovered] = useState<"card" | "image" | null>(null);

  const cardScale = hovered === "card" ? 1.1 : hovered === "image" ? 0.95 : 1;
  const imageScale = hovered === "image" ? 1.1 : hovered === "card" ? 0.8 : 1;

  return (
    <div className="flex items-center justify-center gap-4">
      <motion.div
        animate={{ scale: cardScale }}
        className="
          relative overflow-hidden h-auto max-h-[450px] sm:w-[50vw] w-[100vw]
          rounded-3xl hover:rounded-[128px] hover:px-10 hover:transition-all duration-1000 ease-in-out border-1
          hover:border-gray-400 dark:hover:border-orange-400 
          text-white bg-transparent
        "
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onHoverEnd={() => setHovered(null)}
        onHoverStart={() => setHovered("card")}
      >
        <Card shadow="none">
          <CardBody
            className={clsx(
              "relative z-10 flex-col gap-6 p-4 sm:p-6 md:px-10 items-left sm:py-12 font-normal text-sm",
              fontMono.className
            )}
          >
            <p
              className={clsx(
                "text-lg sm:text-3xl md:text-4xl tracking-tighter lg:text-5xl font-bold dark:text-white text-gray-900",
                headingsDM.className
              )}
            >
              {songName}
            </p>
            <p className="text-xs sm:text-lg dark:text-white text-gray-900">
              {artists.join(", ")}
            </p>
          </CardBody>

          <Divider className="relative z-10" />

          <CardFooter
            className={clsx(
              "relative z-10 p-4 sm:p-6 flex justify-between items-center ",
              fontMono.className
            )}
          >
            <p className="text-xs sm:text-lg md:text-xl truncate max-w-[60%] dark:text-white text-gray-900">
              {`"${albumName}"`}
            </p>
          </CardFooter>
        </Card>
      </motion.div>

      <motion.img
        alt="Album art"
        animate={{ scale: imageScale }}
        className="hidden sm:block object-cover rounded-3xl hover:rounded-[64px] hover:transition-all duration-400 ease-in-out"
        height={275}
        src={imageUrl}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        width={275}
        onHoverEnd={() => setHovered(null)}
        onHoverStart={() => setHovered("image")}
      />
    </div>
  );
}
