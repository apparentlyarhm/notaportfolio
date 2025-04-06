"use client";

import {
  Spinner,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { headingsDM, codestuff } from "@/config/fonts";
import { ArrowDown, ArrowUpRight } from "react-feather";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import clsx from "clsx";
import TopTracksList from "@/components/TopTracksList";

export default function BlogPage() {
  // API related states
  const [apiLoading, setApiLoading] = useState(true);
  const [tracks, setTracks] = useState([]);
  const [limit, setLimit] = useState(3);
  const [timeRange, setTimeRange] = useState("short_term");
  const [error, setError] = useState<string | null>(null);

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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
      .catch((err) => {
        console.error("[Frontend] Error fetching top tracks:", err);
        setError(
          "Something went wrong. If you are Arhum, check the GCP logs or browser console whatever"
        );
        setApiLoading(false);
      });
  }, [timeRange, limit]);

  return (
    <div className="justify-center">
      <p
        className={clsx(
          "text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter break-words px-6  sm:mb-10",
          headingsDM.className
        )}
      >
        {"My favourite everything"}
      </p>

      <motion.p
        className={clsx(
          "text-md sm:text-xl md:text-lg lg:text-xl dark:text-gray-400 text-gray-600 px-3 text-left",
          codestuff.className
        )}
      >
        <br />
        {
          "TBH I couldn't think of anything else apart from songs/artists at this moment lol and spotify conveniently provides APIs for that. I will keep time_range as short as it might get changed frequently based on what I like at the moment. Lets start with songs:"
        }
      </motion.p>
      <br />

      {/* api config ui */}
      <div className="flex gap-4 justify-center">
        <Dropdown size="lg">
          <DropdownTrigger className="mt-10 mb-10 py-9 px-14 border-1">
            <Button
              variant="light"
              className={clsx(
                "max-w-[70vw] sm:max-w-none overflow-hidden",
                codestuff.className
              )}
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
            <Button variant="light" className={clsx("", codestuff.className)}>
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
          <Spinner variant="wave" size="lg" />
        </div>
      ) : error ? (
        <div
          className={clsx(
            "text-center text-red-500 text-base sm:text-md md:text-lg",
            codestuff.className
          )}
        >
          {error}
        </div>
      ) : (
        <div>
          <br />

          <TopTracksList tracks={tracks} />
        </div>
      )}
      <br />
      <br />
      <br />

      <p
        className={clsx(
          " text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl sm:mb-10 break-text",
          codestuff.className
        )}
      >
        {"more coming soon (dont ask me when)"}
      </p>

      <Button
        as={"a"}
        className={clsx(
          "mt-12 p-10 rounded-2xl text-2xl text-white bg-cyan-600 tracking-tighter",
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
