"use client"

import { codestuff, nunito } from "@/config/fonts";
import { arts } from "@/config/portal/ascii";
import { LyricLine, timelineEvents } from "@/config/portal/lyrics";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

const DRAW_INTERVAL_MS = 5; // 30ms delay between each line
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms)); // helper

export default function Portal() {

  const [displayedLyrics, setDisplayedLyrics] = useState("");
  const [currentAsciiArt, setCurrentAsciiArt] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const [taskQueue, setTaskQueue] = useState<LyricLine[]>([]);
  const [artTaskQueue, setArtTaskQueue] = useState<LyricLine[]>([]);


  // Refs to manage the animation state WITHOUT causing re-renders
  const animationFrameId = useRef<number>();
  const startTime = useRef<number>(0);
  const eventIndex = useRef<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessingArt, setIsProcessingArt] = useState(false);

  // the task router
  useEffect(() => {

    if (!isPlaying) {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      return;
    }

    const loop = (timestamp: number) => {
      if (startTime.current === 0) startTime.current = timestamp;
      const elapsedTime = (timestamp - startTime.current) / 10; // convert to centi-seconds

      while (
        eventIndex.current < timelineEvents.length && elapsedTime >= timelineEvents[eventIndex.current].time
      ) {
        const event = timelineEvents[eventIndex.current];

        // Route the task to the correct queue or execute immediately
        if (event.mode === 'LYRIC_NEWLINE' || event.mode === 'LYRIC_NONEWLINE') {
          setTaskQueue(prev => [...prev, event]);
        } else if (event.mode === 'DRAW_ART') {
          setArtTaskQueue(prev => [...prev, event]);
        } else {
          // Instant tasks that don't need a queue
          if (event.mode === 'CLEAR_LYRICS') setDisplayedLyrics("");
          if (event.mode === 'START_MUSIC') audioRef.current?.play();
        }

        eventIndex.current++;
        if (event.mode === 'END') {
          setIsPlaying(false);
          return;
        }
      }
      animationFrameId.current = requestAnimationFrame(loop);
    };

    animationFrameId.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    }

  }, [isPlaying]);

  // the lyrics consumer
  useEffect(() => {

    if (!isProcessing && taskQueue.length > 0) {
      const task = taskQueue[0];

      (async () => {
        setIsProcessing(true);
        // The lyric processing logic from your previous version
        const text = task.words as string;
        const charCount = text.length > 0 ? text.length : 1;
        let perCharacterIntervalMs = 50;
        if (task.interval < 0) {
          const nextEvent = timelineEvents[timelineEvents.indexOf(task) + 1];
          if (nextEvent) {
            const duration = nextEvent.time - task.time;
            perCharacterIntervalMs = (duration * 10) / charCount;
          }
        } else {
          perCharacterIntervalMs = (task.interval * 1000) / charCount;
        }
        await typeLyrics(text, perCharacterIntervalMs, task.mode === 'LYRIC_NEWLINE');

        setTaskQueue(currentQueue => currentQueue.slice(1));
        setIsProcessing(false);
      })();
    }
  }
    , [taskQueue, isProcessing]);


  useEffect(() => {
    if (!isProcessingArt && artTaskQueue.length > 0) {
      const task = artTaskQueue[0];

      (async () => {
        setIsProcessingArt(true);
        await drawAsciiArt(task.words as number, DRAW_INTERVAL_MS);
        setArtTaskQueue(currentQueue => currentQueue.slice(1));
        setIsProcessingArt(false);
      })();
    }
  }, [artTaskQueue, isProcessingArt]); // this dependency array ensures it runs when the artTaskQueue changes

  const typeLyrics = async (text: string, intervalMs: number, addNewline: boolean) => {

    console.log("Typing lyrics:", { text, intervalMs, addNewline });
    for (const char of text) {
      setDisplayedLyrics(prev => prev + char);
      await sleep(intervalMs);
    }

    if (addNewline) {
      setDisplayedLyrics(prev => prev + '\n');
    }
  }

  const drawAsciiArt = async (artIndex: number, intervalMs: number) => {
    setCurrentAsciiArt("");
    const artToDraw = arts[artIndex];
    if (!artToDraw) return;

    let drawnArt = "";
    for (const line of artToDraw) {
      drawnArt += line + '\n';
      setCurrentAsciiArt(drawnArt);
      await sleep(intervalMs);
    }
  }

  const handleStart = () => {
    // Reset state for a fresh start
    setDisplayedLyrics("");
    setCurrentAsciiArt("");

    startTime.current = 0;
    eventIndex.current = 0;

    setIsProcessing(false);
    setTaskQueue([]);

    setIsProcessingArt(false)
    setArtTaskQueue([]);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }

    setIsPlaying(true);
  };

  return (
    <div className="flex flex-col gap-3 min-w-full items-center">
      <h1 className={clsx("font-black align-middle", nunito.className)}> She sings!</h1>

      <img src="https://upload.wikimedia.org/wikipedia/commons/e/ee/Aperture_Science.svg" className=" h-10 w-10" />

      <div className="flex gap-4 my-4">

        <button
          onClick={handleStart}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
        >
          Start
        </button>

      </div>

      <div className="flex flex-row gap-2">

        <div className={clsx(
          "min-w-full md:min-w-[600px] h-[400px] rounded-xl border-1 p-4 overflow-y-auto",
          codestuff.className
        )}>

          <pre className="text-slate-400 text-sm leading-tight">
            {displayedLyrics}
          </pre>

        </div>

        <div className={clsx(
          "min-w-full md:min-w-[600px] h-[400px] rounded-xl border-1 p-4 overflow-y-auto items-center justify-center",
          codestuff.className
        )}>

          <pre className="text-slate-400 text-sm leading-tight">
            {currentAsciiArt}
          </pre>
        </div>

        <audio ref={audioRef} src="/portal/song.mp3" preload="auto" />

      </div>


    </div>
  );
}
