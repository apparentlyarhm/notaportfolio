import * as React from "react";
import { Accordion, AccordionItem, Divider, Image } from "@nextui-org/react";
import { codestuff, headingsDM, crimsonserif } from "@/config/fonts";
import { motion } from "framer-motion";
import clsx from "clsx";
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
    <Accordion selectionMode="multiple" variant="splitted" className="sm:p-10 ">
      {musicConfig.map((entry, index) => (
        <AccordionItem
          key={index}
          className="mb-7 py-9"
          aria-label={entry.name}
          title={
            <div
              className={clsx(
                "sm:pl-7 sm:text-4xl sm:mb-2 tracking-tighter",
                headingsDM.className
              )}
            >
              {entry.name}
            </div>
          }
          subtitle={
            <div className={clsx("sm:pl-7 sm:text-xl", codestuff.className)}>
              {entry.time.toUpperCase()}
            </div>
          }
        >
          <div
            className={clsx(
              "mt-4 rounded-lg sm:p-2 mx-1 sm:mx-6 sm:text-2xl dark:text-gray-400 text-md p-1 tracking-tight text-justify",
              crimsonserif.className
            )}
          >
            <Divider className="mb-10 opacity-50" />
            <div className="flex flex-col items-center sm:flex-row">
              <motion.div
                whileTap={{ scale: 0.93 }}
                whileHover={{ scale: 1.05 }}
                className="w-full sm:w-1/3 mb-4 sm:mb-0 flex justify-center"
              >
                <a href={entry.link} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={entry.img}
                    alt="Music Image"
                    width={!small ? 300 : 200}
                    height={!small ? 300 : 200}
                    isBlurred
                    className="rounded-lg dark:border-0 border-1 border-gray-400"
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
