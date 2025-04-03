"use client";

import {
  Card,
  CardHeader,
  CardFooter,
  Image,
  Button,
  CardBody,
  Divider,
} from "@heroui/react";
import { headingsDM, codestuff, paragraph } from "@/config/fonts";
import { motion } from "framer-motion";
import { useEffect } from "react";
import clsx from "clsx";

export default function BlogPage() {
  useEffect(() => {
    fetch("/samp.json")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <>
      <p
        className={clsx(
          "tracking-tighter text-3xl md:text-4xl lg:text-5xl sm:mb-10 break-text",
          headingsDM.className
        )}
      >
        {"My favourite everything"}
      </p>
      <motion.p
        className={clsx(
          "tracking-tight text-md sm:text-xl text-gray-400 px-3 text-left",
          codestuff.className
        )}
      >
        <br />
        {
          "TBH I couldn't think of anything else apart from songs/artists at this moment lol and spotify conveniently provides APIs for that. I will keep time_range as short as it might get changed frequently based on what I like at the moment"
        }
      </motion.p>
      <br />
      <br />

      <Card
        className="max-w-[700px] min-h-[150px] rounded-3xl bg-transparent border-1 dark:border-gray-500 hover:border-gray-400 dark:hover:border-orange-400"
        shadow="none"
      >
        <CardHeader className="flex md:flex-row gap-2">
          {/* Title section */}
          <div
            className={clsx(
              "mt-2 tracking-tight p-4 md:mt-0 sm:text-xl text-lg font-bold sm:font-bold",
              paragraph.className
            )}
          >
            <p className="text-md">SONG TITLE</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody
          className={clsx(
            "p-6 sm:px-10 flex-col items-center gap-7 sm:py-12 sm:text-justify font-normal text-small",
            codestuff.className
          )}
        >
          <Image
            alt="Woman listing to music"
            className="object-cover"
            height={300}
            src="https://i.scdn.co/image/ab67616d00001e02864f08aa363057917e587f55"
            width={450}
          />
          {"artis1, artist2"}
        </CardBody>
        <Divider />
        <CardFooter className={clsx("p-6", codestuff.className)}>
          <p>{"album name"}</p>
        </CardFooter>
      </Card>
    </>
  );
}
