"use client";

import { Card, CardFooter, CardBody, Divider } from "@heroui/react";
import clsx from "clsx";
import { useState } from "react";
import { motion } from "framer-motion";

import { headingsDM, fontMono, paragraph } from "@/config/fonts";
interface SongCardProps {
  songName: string;
  artists: string[];
  albumName: string;
  imageUrl: string;
  isMobile?: boolean; // Optional prop to handle mobile-specific styles
  index: number;
}

export default function SongCard({
  songName,
  artists,
  albumName,
  imageUrl,
  isMobile = false, // Default to false
  index,
}: SongCardProps) {
  const [hovered, setHovered] = useState<"card" | "image" | null>(null);

  const cardScale = hovered === "card" ? 1.1 : hovered === "image" ? 0.9 : 1;
  const imageScale = hovered === "image" ? 1.1 : hovered === "card" ? 0.7 : 1;

  if (isMobile) {
    return (
      <div className="flex flex-col items-center p-4 gap-4 w-full">
        <div className="relative w-full max-w-[300px] rounded-3xl overflow-hidden">
          <img
            src={imageUrl}
            alt="Album Art"
            className="w-full h-auto object-cover rounded-3xl brightness-[0.6]"
          />
          <p className="
    absolute inset-0 flex items-start justify-center
    text-[200px] opacity-60  font-extrabold
    text-white text-stroke-white select-none
  ">
            {index + 1}
          </p>
        </div>
        <div className="w-full text-center">
          <p className={clsx("text-2xl tracking-tighter font-bold", headingsDM.className)}>{songName}.</p>
          <p className={clsx("text-sm text-gray-600 mb-2", paragraph.className)}>{artists.join(", ")}</p>
          <p className={clsx("text-xs italic text-gray-400", paragraph.className)}>{`"${albumName}"`}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-4">
      <motion.div
        animate={{ scale: cardScale }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative overflow-hidden h-auto max-h-[450px] sm:w-[50vw] w-[100vw] border-1 rounded-3xl"
        onClick={() => alert("Yeah i dont send the song link as response (yet)")}
        onHoverEnd={() => setHovered(null)}
        onHoverStart={() => setHovered("card")}
      >
        <Card className="transition-colors duration-500 hover:bg-gray-900 hover:text-white" shadow="none">
          <CardBody
            className={clsx(
              "relative z-10 flex-col gap-6 p-4 sm:p-6 md:px-10 items-left sm:py-12 font-normal text-sm",
              paragraph.className
            )}
          >
            <p className={clsx(
              "text-2xl sm:text-3xl md:text-4xl tracking-tighter lg:text-5xl font-bold",
              headingsDM.className
            )}>
              {songName}.
            </p>
            <p className="text-xs sm:text-lg">
              {artists.join(", ")}
            </p>
          </CardBody>

          <CardFooter
            className={clsx(
              "relative z-10 p-4 sm:p-6 flex justify-between items-center ",
              paragraph.className
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
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="hidden sm:block object-cover rounded-3xl"
        height={275}
        width={275}
        src={imageUrl}
        onHoverEnd={() => setHovered(null)}
        onHoverStart={() => setHovered("image")}
      />
    </div>

  );
}
