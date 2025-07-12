import { Accordion, AccordionItem } from "@heroui/react";
import clsx from "clsx";
import { Divider } from "@heroui/react";
import React from "react";

import { CardConfig } from "@/config/CardConfig";
import { codestuff, headingsDM, nunito } from "@/config/fonts";


interface CardThingProps {
  cardConfig: CardConfig[];
}

export const CardThing: React.FC<CardThingProps> = ({ cardConfig }) => {
  return (
    <Accordion className="sm:p-10" selectionMode="multiple" variant="splitted">
      {cardConfig.map((accordion, index) => (
        <AccordionItem
          key={index}
          aria-label={accordion.heading}
          className="mb-7 py-9 px-10 rounded-full bg-blue-200/30 shadow-none"
          subtitle={
            <div className={clsx("sm:pl-7 sm:text-xl text-blue-900 opacity-50", codestuff.className)}>
              {accordion.footerText.toUpperCase()}
            </div>
          }
          title={
            <div
              className={clsx(
                "sm:pl-7 sm:text-4xl font-black text-blue-900  sm:mb-2 tracking-tighter",
                nunito.className
              )}
            >
              {accordion.heading}
            </div>
          }
        >
          <div
            className={clsx(
              "mt-4 rounded-lg sm:p-2 mx-1 text-small sm:mx-6 sm:text-xl dark:text-gray-400 text-gray-500 text-md p-1 tracking-tight text-justify",
              codestuff.className
            )}
          >
            <Divider className="mb-10 opacity-50" />
            {accordion.gamedesc}
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
