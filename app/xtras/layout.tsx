"use client";
import { Image } from "@heroui/react";
import React from "react";

import controller from "../../assets/logos/controller.svg";
import dj from "../../assets/logos/dj.svg";
import clsx from "clsx";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div
      className={clsx(
        "max-w-[100vw] text-center sm:h-[60vh] h-[40vh] rounded-b-3xl sm:gap-40 gap-16 flex items-center justify-center",
        "animate-gradient-zoom bg-[length:200%_200%]"
      )}
      style={{
        backgroundImage: "linear-gradient(to top, #ff0844 0%, #ffb199 100%)",
      }}
    >
        <Image
          isBlurred
          alt="Controller"
          className="sm:w-80 sm:h-80 w-28 h-28 text-gray-500 dark:text-gray-300 fill-red-500"
          src={controller.src}
          style={{ fill: "#ffffff" }}
        />
        <Image
          isBlurred
          alt="DJ"
          className="sm:w-80 sm:h-80 w-28 h-28 text-gray-500 dark:text-gray-300 fill-red-500"
          src={dj.src}
          style={{ fill: "#ffffff" }}
        />
      </div>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-full text-center justify-center">
          {children}
        </div>
      </section>
    </>
  );
}
