import { Accordion, AccordionItem } from "@heroui/react";
import clsx from "clsx";
import { Divider } from "@heroui/react";

import { CardConfig } from "@/config/CardConfig";
import { codestuff, headingsDM, inter } from "@/config/fonts";


interface CardThingProps {
  cardConfig: CardConfig[];
}

export const CardThing: React.FC<CardThingProps> = ({ cardConfig }) => {
  return (
    <Accordion className="sm:p-10" selectionMode="multiple" variant="splitted">
      {cardConfig.map((accordion, index) => (
        <AccordionItem
          key={index}
          className="mb-7 py-9 rounded-3xl dark:bg-slate-900 border-2 dark:border-2 dark:border-slate-900 border-slate-100 bg-slate-100 shadow-none"
          aria-label={accordion.heading}
          // startContent={
          //   <Image
          //     isBlurred
          //     height={100}
          //     width={100}
          //     alt="gameimg"
          //     src={accordion.imgSrc}
          //   />
          // }
          subtitle={
            <div className={clsx("sm:pl-7 sm:text-xl", codestuff.className)}>
              {accordion.footerText.toUpperCase()}
            </div>
          }
          title={
            <div
              className={clsx(
                "sm:pl-7 sm:text-4xl  sm:mb-2 tracking-tighter",
                headingsDM.className
              )}
            >
              {accordion.heading}
            </div>
          }
        >
          <div
            className={clsx(
              "mt-4 rounded-lg sm:p-2 mx-1 text-small sm:mx-6 sm:text-xl dark:text-gray-400 text-gray-500 text-md p-1 tracking-tight text-justify",
              inter.className
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
