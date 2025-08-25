"use client";

import { useEffect, useState } from "react";
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

  const [callDuration, setCallDuration] = useState<string>("none");
  const [agentString, setAgentString] = useState<string>("unknown");

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const loadData = async () => {
      const cachedRT = sessionStorage.getItem("lastRT");
      const cachedAgent = sessionStorage.getItem("lastAgent");

      if (cachedRT) {
        setCallDuration(cachedRT);
      }
      if (cachedAgent) {
        setAgentString(cachedAgent);
      }

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
        const startTime = performance.now();
        const diaRes = await fetch(`${BASE_URL}/ping`);
        const endTime = performance.now();

        const duration = Math.round(endTime - startTime).toString();
        const diaJson = await diaRes.json();
        const newAgentString = diaJson.agentString || "unknown";

        setCallDuration(duration);
        setAgentString(newAgentString);

        const res = await fetch(`${BASE_URL}/now`);
        const json = await res.json();
        setData(json);

        sessionStorage.setItem("spotifyData", JSON.stringify(json));
        sessionStorage.setItem("spotifyDataTimestamp", Date.now().toString());
        sessionStorage.setItem("lastRT", duration);
        sessionStorage.setItem("lastAgent", newAgentString);

      } catch (err) {

      }
    };

    loadData();
  }, []);

  if (!data?.item) return null; // We will silently not show anything if the api fails or no listening activity is detected.

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
        "text-center flex flex-col gap-1 sm:gap-6 sm:flex-row justify-center border-t rounded-t-3xl border-gray-300 dark:border-gray-900 sm:py-6 py-3 px-4",
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
      <span className="p-6 rounded-xl bg-green-100 text-green-600 text-[10px] sm:text-xs justify-center">
        {`Diagnostic: ${callDuration}ms latency via "${agentString}" `}
      </span>
    </footer>
  );
}
