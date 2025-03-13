"use client";
import controller from "../../assets/logos/controller.svg";
import dj from "../../assets/logos/dj.svg";
import { Divider, Image } from "@heroui/react";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-gradient-to-r from-emerald-300 to-blue-500 dark:from-stone-500 dark:to-stone-700 max-w-[100vw] text-center sm:h-[60vh] h-[40vh] rounded-b-3xl sm:gap-40 gap-16 flex items-center justify-center">
        {" "}
        <Image
          isBlurred
          src={controller.src}
          alt="Controller"
          className="sm:w-80 sm:h-80 w-28 h-28 text-gray-500 dark:text-gray-300 fill-red-500"
          style={{ fill: "#ffffff" }}
        />
        <Image
          isBlurred
          src={dj.src}
          alt="DJ"
          className="sm:w-80 sm:h-80 w-28 h-28 text-gray-500 dark:text-gray-300 fill-red-500"
          style={{ fill: "#ffffff" }}
        />
      </div>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-full text-center justify-center">
          {children}
        </div>
      </section>
      <section className="text-center py-2">
        <Divider className="my-10 w-full" />
        <p className="text-small text-gray-500 pb-2">
          &copy; i would say all rights reseverd but i cant, right? &trade;
        </p>
      </section>
    </>
  );
}
