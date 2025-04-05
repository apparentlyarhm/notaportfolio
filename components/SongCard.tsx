"use client";

import { Card, CardFooter, CardBody, Divider, Image } from "@heroui/react";
import clsx from "clsx";
import { codestuff } from "@/config/fonts";

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
  return (
    <Card
      className="
                  relative overflow-hidden h-auto max-h-[450px]
                  rounded-[45px] border-1 dark:border-gray-500 
                hover:border-gray-400 dark:hover:border-orange-400 
                  bg-cover bg-center text-white
                "
      style={{ backgroundImage: `url('${imageUrl}')` }}
      shadow="none"
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 dark:bg-black/80 bg-gray-100/70 backdrop-blur-sm z-0" />

      <CardBody
        className={clsx(
          "relative z-10 flex-col gap-6 p-4 sm:p-6 md:px-10 items-left sm:py-12 font-normal text-small",
          codestuff.className
        )}
      >
        <p className="text-2xl sm:text-3xl md:text-4xl tracking-tighter lg:text-5xl font-bold dark:text-white text-gray-900">
          {songName}
        </p>
        <p className="text-sm sm:text-base dark:text-white text-gray-900">
          {artists.join(", ")}
        </p>
      </CardBody>

      <Divider className="relative z-10" />

      <CardFooter
        className={clsx(
          "relative z-10 p-4 sm:p-6 flex justify-between items-center ",
          codestuff.className
        )}
      >
        <p className="text-sm ml-4 sm:text-base md:text-lg truncate max-w-[60%] dark:text-white text-gray-900">
          {albumName}
        </p>
        <Image
          alt="Album art"
          className="object-cover rounded-xl"
          height={80}
          width={80}
          src={imageUrl}
        />
      </CardFooter>
    </Card>
  );
}
