import {
  Card,
  CardHeader,
  CardFooter,
  Image,
  CardBody,
  Button,
} from "@nextui-org/react";
import { Cabin } from "next/font/google";
import clsx from "clsx";

export const cardText = Cabin({
  weight: ["500", "400", "600"],
});

interface CardThingProps {
  heading: string;
  imgSrc: string;
  footerText: string;
}

export const DesktopCard: React.FC<CardThingProps> = ({
  heading,
  imgSrc,
  footerText,
}) => {
  return (
    <div className="max-w-[1000px] grid grid-cols-1 grid-rows-1 px-4">
      <Card
        isFooterBlurred
        className="w-full h-[300px] col-span-12 sm:col-span-7"
      >
        <CardHeader className="absolute z-10 top-1 flex-col items-start"></CardHeader>
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover"
          src={imgSrc}
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-default-600 dark:border-default-100 h-5/6 scale-110 -translate-x-40 -translate-y-40 origin-bottom-left rotate-45">
          <div className="flex flex-grow gap-2 items-center">
            <div className="flex flex-col"></div>
          </div>
        </CardFooter>
        <div className="absolute bottom-4 left-4 z-20">
          <h4
            className={clsx(
              "text-white/90 text-lg font-medium tracking-tight",
              cardText.className
            )}
          >
            {heading}, {footerText}
          </h4>
        </div>
      </Card>
    </div>
  );
};
