"use client"

import { codestuff, nunito } from "@/config/fonts";
import { arts } from "@/config/portal/ascii";
import { LyricLine, timelineEvents } from "@/config/portal/lyrics";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { Play } from "react-feather";
import { Image } from "@heroui/react";

const DRAW_INTERVAL_MS = 5;
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms)); // helper

export default function Portal() {
    const [showContent, setShowContent] = useState(false);

  const [displayedLyrics, setDisplayedLyrics] = useState("");
  const [currentAsciiArt, setCurrentAsciiArt] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  // this is the best i could come up with
  const [taskQueue, setTaskQueue] = useState<LyricLine[]>([]);
  const [artTaskQueue, setArtTaskQueue] = useState<LyricLine[]>([]);

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

        const text = task.words as string;
        const charCount = text.length > 0 ? text.length : 1;

        let perCharacterIntervalMs = 50;

        if (task.interval < 0) {
          const nextEvent = timelineEvents[timelineEvents.indexOf(task) + 1];
          
          if (nextEvent) {
            const duration = nextEvent.time - task.time;
            perCharacterIntervalMs = (duration * 10) / charCount; // same cs factor
          }

        } else {
          perCharacterIntervalMs = (task.interval * 1000) / charCount;
        }

        await typeLyrics(text, perCharacterIntervalMs, task.mode === 'LYRIC_NEWLINE');

        setTaskQueue(currentQueue => currentQueue.slice(1));
        setIsProcessing(false);
      })();
    }
  }, [taskQueue, isProcessing]);


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
      await sleep(intervalMs); // this interval looks good, but it isnt present in the original song
    }
  }

  const handleStart = () => {
    // Reset state for a fresh start
    setShowContent(true);

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
    <div className="flex flex-col items-center min-w-full gap-6">

      <Image height={300} width={200} isBlurred src="/portal/glados.png" className="rounded-3xl" />

      <AnimatePresence>
        {!showContent && (
          <motion.div
            key="intro"
            className="flex flex-col items-center justify-center h-[400px] gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className={clsx("text-stone-600 text-lg italic", nunito.className)}>
              {"YOU MADE IT TILL HERE! as a token of my appreciation, here's a little something"}
            </p>

            <button
              onClick={handleStart}
              className="flex flex-col gap-2 items-center justify-center w-48 h-36 rounded-3xl bg-gray-800 text-white hover:bg-gray-700"
            >
              <Play className="w-8 h-8 mb-1" />
              <span className="text-sm">{"Press here for cake"}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContent && (
          <motion.div
            key="content"
            className="flex flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className={clsx(
                "min-w-full md:min-w-[600px] h-[400px] border-stone-200 flex rounded-xl border p-4 overflow-y-auto",
                codestuff.className
              )}
            >
              <pre className="text-stone-600 text-start text-sm tracking-wider">
                {displayedLyrics}
              </pre>
            </div>

            <div
              className={clsx(
                "min-w-full md:min-w-[600px] h-[400px] rounded-xl border border-sky-200 p-4 overflow-y-auto flex items-center justify-center",
                codestuff.className
              )}
            >
              <pre className="text-sky-500 text-sm leading-tight">
                {currentAsciiArt}
              </pre>
            </div>

            <audio ref={audioRef} src="/portal/song.mp3" preload="auto" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
