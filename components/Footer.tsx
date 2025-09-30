"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

import { codestuff } from "@/config/fonts";
import { Chip } from "@heroui/react";
import { Info } from "react-feather";

export default function Footer() {
  function formatTime(ms: number) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  const [data, setData] = useState<any>(null);


  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const loadData = async () => {
      const cachedData = sessionStorage.getItem("spotifyData");
      const cachedTimestamp = sessionStorage.getItem("spotifyDataTimestamp");

      if (cachedData && cachedTimestamp) {
        const timestamp = parseInt(cachedTimestamp);

        if (Date.now() - timestamp < 60000) {

          setData(JSON.parse(cachedData));

          return;
        }

      }

      try {
        const res = await fetch(`${BASE_URL}/now`);
        const json = await res.json();
        setData(json);

        sessionStorage.setItem("spotifyData", JSON.stringify(json));
        sessionStorage.setItem("spotifyDataTimestamp", Date.now().toString());

      } catch (err) {

      }
    };

    loadData();
  }, []);


  if (!data?.item) return (
    <div
      className={clsx(
        "text-center items-center flex flex-col gap-1 sm:gap-6 sm:flex-row justify-center sm:py-6 py-3 px-4",
        codestuff.className
      )}
    >
    </div>
  );

  const track = data.item;
  const artistLinks = track.artists?.map((artist: any, i: number) => (
    <span key={artist.id}>
      <a
        className="text-blue-500 hover:underline"
        href={artist.external_urls.spotify}
        rel="noopener noreferrer"
        target="_blank"
      >
        {artist.name}
      </a>
      {i < track.artists.length - 1 && ", "}
    </span>
  ));
  const albumImage = track.album.images[0]?.url;

  return (
    <footer
      className={clsx(
        "text-center flex flex-col gap-3 sm:gap-6 sm:flex-row justify-center border-t rounded-t-3xl border-gray-300 dark:border-gray-900 sm:py-6 py-3 px-4",
        codestuff.className
      )}

    >

      <div className="justify-start rounded-2xl  border-1 dark:border-gray-500 hover:border-gray-400 dark:hover:border-orange-400 max-w-[500px]">
        <div className="flex items-center justify-center sm:justify-start gap-4 overflow-x-auto p-5">
          {albumImage && (
            <img
              alt="Album"
              className="h-10 w-10 rounded shadow shrink-0"
              src={albumImage}
            />
          )}
          <div className="text-left min-w-0">

            <p className="text-xs sm:text-sm text-gray-700 truncate max-w-xs sm:max-w-sm md:max-w-md">
              {data.is_playing ? "🔊" : "⏸️"}&nbsp;
              <a
                className="font-medium text-blue-500 hover:underline"
                href={track.external_urls.spotify}
                rel="noopener noreferrer"
                target="_blank"
                title={track.name}
              >
                {track.name}
              </a>{" "}
              by {artistLinks}
            </p>

            <div className="text-[10px] sm:text-xs text-gray-400">
              on {data.device?.name ?? "Unknown device"}
            </div>

            <div className="text-[10px] sm:text-xs text-gray-500">
              {formatTime(data.progress_ms)} / {formatTime(track.duration_ms)}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
