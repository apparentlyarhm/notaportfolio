"use client";

import {
  Spinner
} from "@heroui/react";
import { headingsDM, codestuff } from "@/config/fonts";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import clsx from "clsx";
import TopTracksList from "@/components/TopTracksList";

export default function BlogPage() {

  const [apiLoading, setApiLoading] = useState(true);
  const [tracks, setTracks] = useState([])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetch("/samp.json")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setTracks(data.items)
          setApiLoading(false); 
        });
    }, 2000);

    return () => clearTimeout(timeoutId); // cleanup if unmounted
  }, []);

  return (
    <>
      <p
        className={clsx(
          "tracking-tighter text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl sm:mb-10 break-text",
          headingsDM.className
        )}
      >
        {"My favourite everything"}
      </p>

      <motion.p
        className={clsx(
          "tracking-tight text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 px-3 text-left",
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

      <p
        className={clsx(
          "tracking-tighter text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl sm:mb-10 break-text",
          headingsDM.className
        )}
      >
        {"1. Songs (top)"}
      </p>
      {apiLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Spinner variant="wave" size="lg" />
        </div>
      ) : (
        <>
          <br />

          <TopTracksList tracks={tracks} />
        </>
      )}
      <br />
      <br />
      <br />

      <p
        className={clsx(
          "tracking-tighter text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl sm:mb-10 break-text",
          headingsDM.className
        )}
      >
        {"2. idk :| coming soon i guess"}
      </p>
    </>
  );
}
