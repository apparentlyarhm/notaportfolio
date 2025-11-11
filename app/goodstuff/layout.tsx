"use client";
import clsx from "clsx";
import React from "react";

import { codestuff } from "@/config/fonts";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        className={clsx(
          "max-w-[100vw] sm:h-[60vh] h-[40vh] md:h-[50vh] flex items-center justify-center",
          "bg-[#05061c] rounded-b-3xl" // A classic editor dark color
        )}
      >

        <div
          className={clsx(
            "flex flex-col text-xl py-5 sm:text-6xl font-extrabold gap-0 sm:gap-2",
            codestuff.className
          )}
        >
          <div className="flex">
            <span className="w-16 sm:w-20 text-right text-gray-700 select-none">
              53
            </span>
          </div>

          <div className="flex items-center">
            <span className="w-16 sm:w-20 text-right text-gray-700 select-none">
              54
            </span>

            <p className="ml-4 text-gray-400">
              <span className="text-[#c678dd]">&lt;</span>
              <span className="text-[#e06c75]">the</span>{" "}
              <span className="text-[#61afef]">good</span>{" "}
              <span className="text-[#e06c75]">stuff</span>{" "}
              <span className="text-[#c678dd]">/&gt;</span>

              <span className="inline-block align-middle h-[0.95em] w-1 sm:w-2 ml-2 bg-emerald-400 animate-blink" />
            </p>
          </div>

          <div className="flex">
            <span className="w-16 sm:w-20 text-right text-gray-700 select-none">
              55
            </span>
          </div>
        </div>
      </div>

      <br />

      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-7xl text-center justify-center">
          {children}
        </div>
      </section>
    </>
  );
}