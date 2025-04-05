"use client";

import {
  Spinner,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { headingsDM, codestuff } from "@/config/fonts";
import { ArrowDown } from "react-feather";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import clsx from "clsx";
import TopTracksList from "@/components/TopTracksList";
import { count } from "console";

export default function BlogPage() {
  const [apiLoading, setApiLoading] = useState(true);
  const [tracks, setTracks] = useState([]);
  const [limit, setLimit] = useState(3); // max Spotify API allows
  const [timeRange, setTimeRange] = useState("short_term"); // default

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    setApiLoading(true);

    const params = new URLSearchParams({
      type: "tracks", // or 'artists'
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
        console.log("[Frontend] Fetched top tracks:", data);
        setTracks(data.items);
        setApiLoading(false);
      })
      .catch((err) => {
        console.error("[Frontend] Error fetching top tracks:", err);
        setApiLoading(false);
      });
  }, [timeRange, limit]);

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
          "TBH I couldn't think of anything else apart from songs/artists at this moment lol and spotify conveniently provides APIs for that. I will keep time_range as short as it might get changed frequently based on what I like at the moment. Lets start with songs:"
        }
      </motion.p>
      <br />
      <br />

      {/* api config ui */}
      <div className="flex items-end gap-4 ">
        <Dropdown size="lg">
          <DropdownTrigger className="mt-10 mb-10 py-9 px-14 border-1">
            <Button variant="light" className={clsx("", codestuff.className)}>
              {`Time Range: ${timeRange}`}
              <ArrowDown className="ml-4" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Time Range"
            selectedKeys={[timeRange]}
            onAction={(key) => setTimeRange(key)}
          >
            <DropdownItem key="short_term">{"Last 4 Weeks"}</DropdownItem>
            <DropdownItem key="medium_term">{"Last 6 Months"}</DropdownItem>
            <DropdownItem key="long_term">{"All Time"}</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown size="lg">
          <DropdownTrigger className="mt-10 mb-10 py-9 px-14 border-1">
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
          " text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl sm:mb-10 break-text",
          codestuff.className
        )}
      >
        {"more coming soon"}
      </p>
    </>
  );
}
