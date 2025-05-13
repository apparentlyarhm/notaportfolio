import * as React from "react";
import { Accordion, AccordionItem, Divider, Image } from "@heroui/react";
import { motion } from "framer-motion";
import clsx from "clsx";

import { codestuff, headingsDM, inter } from "@/config/fonts";
import { MusicConfig } from "@/config/MusicConfig";

export interface props {
  musicConfig: MusicConfig[];
  small: boolean;
}

export const MusicAccordion: React.FC<props> = ({
  musicConfig,
  small,
}): JSX.Element => {
  return (
    <Accordion className="sm:p-10 " selectionMode="multiple" variant="splitted">
      {musicConfig.map((entry, index) => (
        <AccordionItem
          key={index}
          aria-label={entry.name}
          className="mb-7 py-9 px-10 rounded-full dark:bg-gray-900 shadow-none bg-green-100"
          subtitle={
            <div className={clsx("sm:pl-7 sm:text-xl text-green-900 opacity-50", codestuff.className)}>
              {entry.time.toUpperCase()}
            </div>
          }
          title={
            <div
              className={clsx(
                "sm:pl-7 sm:text-4xl sm:mb-2 text-green-800 tracking-tighter",
                headingsDM.className
              )}
            >
              {entry.name}
            </div>
          }
        >
          <div
            className={clsx(
              "mt-4 rounded-lg sm:p-2 mx-1 sm:mx-6 text-small sm:text-xl dark:text-gray-400 text-md p-1 tracking-tight text-justify",
              codestuff.className
            )}
          >
            <Divider className="mb-10 opacity-50" />
            <div className="flex flex-col items-center sm:flex-row">
              <motion.div
                className="w-full sm:w-1/3 mb-4 sm:mb-0 flex justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.93 }}
              >
                <a href={entry.link} rel="noopener noreferrer" target="_blank">
                  <Image
                    isBlurred
                    alt="Music Image"
                    className="rounded-lg dark:border-0 border-1 border-gray-400"
                    height={!small ? 300 : 200}
                    src={entry.img}
                    width={!small ? 300 : 200}
                  />
                </a>
              </motion.div>
              <br />
              <div className="w-full sm:w-2/3 pl-0 sm:pl-4">
                <p>{entry.songdesc}</p>
              </div>
            </div>
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
