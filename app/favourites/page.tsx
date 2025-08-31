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

import { headingsDM, codestuff, nunito, bitter } from "@/config/fonts";
import TopTracksList from "@/components/TopTracksList";

export default function BlogPage() {
  // API related states
  const [apiLoading, setApiLoading] = useState(true);
  const [tracks, setTracks] = useState([]);
  const [limit, setLimit] = useState(3);
  const [timeRange, setTimeRange] = useState("short_term");
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const [isTimeMenuOpen, setIsTimeMenuOpen] = useState(false);

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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
        className={clsx(
          "text-4xl md:text-4xl text-start sm:text-center lg:text-5xl font-black tracking-tighter break-words px-3  sm:mb-10",
          nunito.className
        )}
      >
        {"My favourite everything"}
      </motion.p>

      <motion.p
        className={clsx(
          "text-sm sm:text-xl tracking-wider md:text-lg lg:text-xl dark:text-gray-400 text-gray-600 px-3 text-left",
          bitter.className
        )}
      >
        <br />
        {
          "Try playing around with the options below, but there is no reason for this page to exist but I wanted to make it anyway"
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
                bitter.className
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
            classNames={{ list: clsx("gap-2", nunito.className) }}
            onAction={(key) => setTimeRange(String(key))}
          >
            <DropdownItem key="short_term" description="Short term interests">{"Last 4 Weeks"}</DropdownItem>
            <DropdownItem key="medium_term" description="Relatively longer duration" >{"Last 6 Months"}</DropdownItem>
            <DropdownItem key="long_term" description="Not sure how its calculated">{"All Time"}</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown size="lg">
          <DropdownTrigger className="mt-10 mb-10 py-9 px-14 border-1 ">
            <Button className={clsx("", bitter.className)} variant="light">
              {`Count: ${limit}`}
              <ArrowDown className="ml-4" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Track Count"
            selectedKeys={[String(limit)]}
            classNames={{ list: clsx("gap-1 max-h-[200px] px-1 overflow-y-auto", nunito.className) }}
            onAction={(key) => setLimit(Number(key))}
          >
            {Array.from({ length: 11 }, (_, i) => (
              <DropdownItem description="please help me" key={i}>{`${i} Track(s)`}</DropdownItem>
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

      <Button
        as={"a"}
        className={clsx(
          "mt-12 sm:p-12 p-9 rounded-full text-2xl font-black text-white bg-gray-900 tracking-tighter",
          nunito.className
        )}
        endContent={<ArrowUpRight size={40} />}
        href="./"
        variant="shadow"
      >
        {"Back to home"}
      </Button>
    </div>
  );
}
