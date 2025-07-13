"use client";

import {
  Spinner,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { ArrowDown, ArrowUpRight } from "react-feather";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import clsx from "clsx";

import { headingsDM, codestuff, nunito } from "@/config/fonts";
import TopTracksList from "@/components/TopTracksList";
import PlaylistView from "@/components/playlist-items";

export default function BlogPage() {
  // API related states
  const [apiLoading, setApiLoading] = useState(true);
  const [tracks, setTracks] = useState([]);
  const [limit, setLimit] = useState(3);
  const [timeRange, setTimeRange] = useState("short_term");
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  // Pretty sure we can refactor this.
  const animationVars = {
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
  }, []); // I am lazy so im copying this from the other page, ideally this should be in a custom hook and a shared state across the app...

  // Im too lazy to refactor this into a utils file.. I think its not even required.
  useEffect(() => {
    setApiLoading(true);
    setError(null);

    const params = new URLSearchParams({
      type: "tracks", // or 'artists' -- there is no support for artists yet
      time_range: timeRange, // 'short_term' | 'medium_term' | 'long_term'
      limit: String(limit),
      offset: "0",
    });

    fetch(`${BASE_URL}/top?${params.toString()}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch top tracks");
        }

        return res.json();
      })
      .then((data) => {
        setTracks(data.items);
        setApiLoading(false);
      })
      .catch(() => {

        setError(
          "Something went wrong. If you are Arhum, check the GCP logs or browser console whatever"
        );
        setApiLoading(false);
      });
  }, [timeRange, limit]);

  return (
    <div className="justify-center">
      <motion.p
        initial="hidden"
        variants={animationVars}
        viewport={{ once: true, amount: 0.2 }}
        whileInView="visible"
        className={clsx(
          "text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter break-words px-6  sm:mb-10",
          nunito.className
        )}
      >
        {"My favourite everything"}
      </motion.p>

      <motion.p
        initial="hidden"
        variants={animationVars}
        viewport={{ once: true, amount: 0.2 }}
        whileInView="visible"
        className={clsx(
          "text-sm sm:text-xl md:text-lg lg:text-xl dark:text-gray-400 text-gray-600 px-3 text-left",
          codestuff.className
        )}
      >
        <br />
        {
          "TBH I couldn't think of anything else apart from songs/artists at this moment lol and spotify conveniently provides APIs for that. I will keep time_range as short as it might get changed frequently based on what I like at the moment. Also, theres this cool animation thing that i configured only for desktop. You can play around with the time range and count to change the data. I am planning to add artists next."
        }
      </motion.p>
      <br />

      {/* api config ui */}
      <div className="flex gap-4 justify-center">
        <Dropdown size="lg">
          <DropdownTrigger className="mt-10 mb-10 py-9 px-14 border-1">
            <Button
              className={clsx(
                "max-w-[70vw] sm:max-w-none overflow-hidden",
                codestuff.className
              )}
              variant="light"
            >
              <span className="whitespace-normal break-words text-center text-xs sm:text-md">
                {`Time range: ${timeRange}`}
              </span>

              <ArrowDown className="ml-4 shrink-0" />
            </Button>
          </DropdownTrigger>

          <DropdownMenu
            aria-label="Time Range"
            selectedKeys={[timeRange]}
            onAction={(key) => setTimeRange(String(key))}
          >
            <DropdownItem key="short_term">{"Last 4 Weeks"}</DropdownItem>
            <DropdownItem key="medium_term">{"Last 6 Months"}</DropdownItem>
            <DropdownItem key="long_term">{"All Time"}</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown size="lg">
          <DropdownTrigger className="mt-10 mb-10 py-9 px-14 border-1 ">
            <Button className={clsx("", codestuff.className)} variant="light">
              {`Count: ${limit}`}
              <ArrowDown className="ml-4" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Track Count"
            selectedKeys={[String(limit)]}
            onAction={(key) => setLimit(Number(key))}
          >
            {Array.from({ length: 11 }, (_, i) => (
              <DropdownItem key={i}>{i}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>

      {apiLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Spinner size="lg" variant="wave" />
        </div>
      ) : error ? (
        <div
          className={clsx(
            "text-center text-red-500 text-xs sm:text-md md:text-lg",
            codestuff.className
          )}
        >
          {error}
        </div>
      ) : (
        <div>
          <br />

          <TopTracksList tracks={tracks} isMobile={isMobile} />
        </div>
      )}
      <br />
      <br />
      <br />

      <motion.p
        initial="hidden"
        variants={animationVars}
        viewport={{ once: true, amount: 0.2 }}
        whileInView="visible"
        className={clsx(
          "text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter break-words px-6  sm:mb-10",
          headingsDM.className
        )}
      >
        {"My playlist on Spotify is interesting."}
      </motion.p>

      <PlaylistView />

      <Button
        as={"a"}
        className={clsx(
          "mt-12 sm:p-12 p-9 rounded-full text-2xl text-white bg-gray-900 tracking-tighter",
          headingsDM.className
        )}
        endContent={<ArrowUpRight />}
        href="./"
        variant="shadow"
      >
        {"Back to home"}
      </Button>
    </div>
  );
}
