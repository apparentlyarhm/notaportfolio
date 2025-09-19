"use client"

import { codestuff, nunito } from "@/config/fonts";
import { arts } from "@/config/portal/ascii";
import { LyricLine, timelineEvents } from "@/config/portal/lyrics";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

import AudioMotionAnalyzer from "audiomotion-analyzer";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CloudLightning, VolumeX } from "react-feather";
import { Button, Image } from "@heroui/react"
import { visOptions } from "@/config/portal/visualizer";

const DRAW_INTERVAL_MS = 5;
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms)); // helper

export default function Portal() {

  const [hasAudio, setHasAudio] = useState(true); // this is just for rendering an alternate ui

  const [showContent, setShowContent] = useState(false);

  const [displayedLyrics, setDisplayedLyrics] = useState("");
  const [currentAsciiArt, setCurrentAsciiArt] = useState("");
  const [currentProcessingString, setCurrentProcessingString] = useState("INIT ANIM-ENGINEv0.5");
  const [isPlaying, setIsPlaying] = useState(false);

  // this is the best i could come up with
  const [taskQueue, setTaskQueue] = useState<LyricLine[]>([]);
  const [artTaskQueue, setArtTaskQueue] = useState<LyricLine[]>([]);

  const animationFrameId = useRef<number>();
  const startTime = useRef<number>(0);
  const eventIndex = useRef<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const audioMotionRef = useRef<AudioMotionAnalyzer | null>(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessingArt, setIsProcessingArt] = useState(false);

  useEffect(() => {
    fetch("/portal/song.mp3", { method: "HEAD" })
      .then((res) => setHasAudio(res.ok))
      .catch(() => setHasAudio(false));
  }, []);


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
          if (event.mode === 'START_MUSIC') startVisualizer();
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

        setCurrentProcessingString(`ANIM-ENGINEv0.5 :: processing "${task.words}" @ ${perCharacterIntervalMs.toFixed(2)}ms/char`);
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

        setCurrentProcessingString(`ANIM-ENGINEv0.5 :: drawing ascii art #${task.words} ...`);
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

  const startVisualizer = async () => {
    if (!containerRef.current || audioMotionRef.current) return;

    const audioMotion = new AudioMotionAnalyzer(containerRef.current, visOptions);

    const audioEl = document.getElementById("audio") as HTMLAudioElement;
    if (audioEl) {
      audioMotion.connectInput(audioEl);
      await audioEl.play();
    }

    audioMotionRef.current = audioMotion;
  };

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

  if (!hasAudio) {
    return (
      <div className="flex flex-col items-center min-w-full gap-6">

        <AnimatePresence>
          {!showContent && (
            <motion.div
              key="intro"
              className="flex flex-col items-center justify-center gap-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >

              <p className={clsx("text-4xl md:text-4xl font-black lg:text-5xl tracking-tighter break-words text-left px-6 sm:mb-10", nunito.className)}>
                {"YOU MADE IT TILL HERE! I planned something cool but it seems its is broken right now :("}
              </p>

              <CloudLightning size={120} className="text-gray-300" />

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    )
  }

  return (
    <div className="flex flex-col items-center min-w-full gap-6">

      <AnimatePresence mode="wait">
        {!showContent && (
          <motion.div
            key="intro"
            className="flex flex-col items-center justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <p className={clsx("text-4xl md:text-4xl font-black lg:text-5xl tracking-tighter break-words text-left px-6 sm:mb-10", nunito.className)}>
              {"YOU MADE IT TILL HERE! as a token of my appreciation, here's a little something"}
            </p>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  height={400}
                  width={250}
                  onClick={handleStart}
                  src="/portal/glados.png"
                  className="rounded-3xl hover:cursor-pointer"
                />

              </motion.div>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContent && (
          <motion.div
            key="content"
            className="flex flex-col items-center gap-6 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >


            <motion.div
              className="flex w-full flex-col gap-4 px-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div
                className={clsx(
                  "min-w-full md:min-w-[600px] h-[400px] border-stone-200 hover:border-stone-400 flex rounded-xl border p-4 overflow-y-auto",
                  codestuff.className
                )}
              >
                <pre className="text-stone-500 text-start text-sm tracking-wider">
                  {displayedLyrics}
                </pre>
              </div>

              <div
                className={clsx(
                  "min-w-full md:min-w-[600px] h-[400px] rounded-xl border border-sky-200 hover:border-sky-400 p-4 overflow-y-auto flex items-center justify-center",
                  codestuff.className
                )}
              >
                <pre className="text-sky-500 text-sm leading-tight">
                  {currentAsciiArt}
                </pre>
              </div>



              {/* TODO: investigate better ways to load audio and not load if not found and also avoid redundant requests */}
              {/* we are kind of relying on default cache control measures. */}
              {/* disabling the lint because the UI literally displays the lyrics */}
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <audio
                id="audio"
                ref={audioRef}
                src="/portal/song.mp3"
                preload="auto"
              />

            </motion.div>
            <motion.div
              ref={containerRef}
              className="w-full max-w-full h-[200px] rounded-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            />
            {/* <motion.div
              className="w-full max-w-full align-middle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <pre className="text-stone-500 text-center align-middle text-sm tracking-wider">
                {currentProcessingString}
              </pre>

            </motion.div> */}
          </motion.div>
        )}
      </AnimatePresence>


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
