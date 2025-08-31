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
          "max-w-[100vw] text-center sm:h-[60vh] h-[40vh] rounded-b-3xl sm:gap-40 gap-16 flex items-center justify-center",
          "animate-gradient-zoom bg-[length:200%_200%]",
          codestuff.className
        )}
        style={{
          backgroundImage: "linear-gradient(to right, #43e97b 0%, #38f9d7 100%)",
        }}
      >
        <p className="text-3xl sm:text-6xl text-gray-600 font-extrabold tracking-tighter">
          &lt;the <span className="text-emerald-900">good</span> stuff. /&gt;
        </p>
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
