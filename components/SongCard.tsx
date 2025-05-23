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

  const cardScale = hovered === "card" ? 1.1 : hovered === "image" ? 0.9 : 1;
  const imageScale = hovered === "image" ? 1.1 : hovered === "card" ? 0.7 : 1;

  return (
    <div className="flex items-center justify-center gap-4">
      <motion.div
        animate={{ scale: cardScale }}
        className="
          relative overflow-hidden h-auto max-h-[450px] sm:w-[50vw] w-[100vw]
          rounded-3xl hover:rounded-[128px] hover:px-12 hover:transition-all duration-1000 ease-in-out hover:bg-gray-900 bg-transparent
          border-1 hover:border-gray-400
        " 
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={() => alert("Yeah i dont send the song link as response (yet)")}
        onHoverEnd={() => setHovered(null)}
        onHoverStart={() => setHovered("card")}
      >
        <Card className="hover:bg-gray-900 hover:text-white" shadow="none">
          <CardBody
            className={clsx(
              "relative z-10 flex-col gap-6 p-4 sm:p-6 md:px-10 items-left sm:py-12 font-normal text-sm",
              fontMono.className
            )}
          >
            <p
              className={clsx(
                "text-lg sm:text-3xl md:text-4xl tracking-tighter lg:text-5xl font-bold",
                headingsDM.className
              )}
            >
              {songName}
            </p>
            <p className="text-xs sm:text-lg">
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
            <p className="text-xs sm:text-lg md:text-xl truncate max-w-[80%]">
              {`"${albumName}"`}
            </p>
          </CardFooter>
        </Card>
      </motion.div>

      <motion.img
        alt="Album art"
        animate={{ scale: imageScale }}
        className="hidden sm:block object-cover rounded-3xl hover:rounded-[100px] hover:transition-all duration-400 ease-in-out"
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
