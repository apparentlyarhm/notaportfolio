"use client";

import { useEffect, useState } from "react";
import { Divider } from "@heroui/react";
import clsx from "clsx";
import { codestuff } from "@/config/fonts";

export default function Footer() {
  function formatTime(ms: number) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    console.log("Footer mounted");

    const loadData = async () => {
      try {
        const res = await fetch("/samp.json");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to load JSON:", err);
      }
    };

    loadData();
  }, []);

  if (!data?.item) return null;

  const track = data.item;
  const artists = track.artists?.map((a: any) => a.name).join(", ");
  const artistLinks = track.artists?.map((artist: any, i: number) => (
    <span key={artist.id}>
      <a
        href={artist.external_urls.spotify}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
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
        "text-center border-t border-gray-200 sm:py-6 py-3 px-4",
        codestuff.className
      )}
    >
      <div className="flex items-center justify-center gap-4 overflow-x-auto">
        {albumImage && (
          <img
            src={albumImage}
            alt="Album"
            className="h-10 w-10 rounded shadow shrink-0"
          />
        )}
        <div className="text-left min-w-0">
          <p className="text-xs sm:text-sm text-gray-700 truncate max-w-xs sm:max-w-sm md:max-w-md">
            {data.is_playing ? "🔊" : "⏸️"}&nbsp;
            <a
              href={track.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-500 hover:underline"
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
    </footer>
  );
}
