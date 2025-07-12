import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Code,
} from "@heroui/react";
import clsx from "clsx";
import { Inter } from "next/font/google";
import { Image } from "@heroui/react";
import React from "react";

import arhm from "../assets/arhm.png";
import { codestuff, crimsonserif, nunito, paragraph } from "@/config/fonts";



interface AppProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
}

export const modalText = Inter({
  weight: ["400", "500"],
  preload: false,
});

//TODO: fix the scroll
export const AboutModal: React.FC<AppProps> = ({
  isOpen,
  onOpenChange,
                                               }) => {
  return (
    <div className="flex flex-col gap-2 overflow-y-auto">
      <Modal
        backdrop="blur"
        className="sm:max-w-7xl sm:max-h-5xl sm:py-8 sm:px-6 "
        isOpen={isOpen}
        placement="auto"
        scrollBehavior="inside"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <>
            <ModalHeader>
              <Code size="lg" className="max-w-xs" color="success">~$ man -F -M PATH arhm</Code>
            </ModalHeader>
            <ModalBody>
              <hr className="opacity-10" />
              <div
                className={clsx("h-4/5 sm:h-auto sm:max-h-[75vh] overflow-y-auto font-bold", nunito.className)}
                id="ihavenoclue"
              >
                <p
                  className={clsx(
                    " text-m sm:text-lg  tracking-tight",
                  )}
                >
                  {"Oh boy, time to get a little formal, isn't it? Well, okay."}
                </p>
                <br />
                <p
                  className={clsx(
                    "text-m sm:text-lg  tracking-tight",
                  )}
                >
                  {
                    "I was brought up and raised in Uttar Pradesh, India. Did my schooling there in DPS (for those unaware, a rather famous public school 'chain' in the NCR region) and for my Bachelor's, flew all the way over to Chennai at SRM, Kattankulathur, to pursue Computer Science & Engineering. Currently working at a startup in Chennai."
                  }
                </p>
                <br />
                <p
                  className={clsx(
                    "text-m sm:text-lg  tracking-tight",
                  )}
                >
                  {
                    "Huge fan of Linus Tech Tips and Micheal Reeves I'd say. Beyond tech, I love playing games and making music. (Once I build my own studio its basically over for the music industry /s) I built this site so that you can get to know me not only professioanlly but as a person as well. Do not hesitate to reach out!"
                  }
                </p>
                <br />
                <br />
                <p
                  className={clsx(
                    "text-lg sm:text-xl tracking-tight", crimsonserif.className
                  )}
                >
                  {"Shah Mohd. Arhum"}
                </p>
                <br />
                <Image
                  isZoomed
                  alt="Me after haircut"
                  className="h-36 w-32 sm:w-40 sm:h-44 sm:border dark:border-white border-gray-700 border-b-16 rounded-3xl"
                  src={arhm.src}
                />
              </div>
            </ModalBody>
            <ModalFooter />
          </>
        </ModalContent>
      </Modal>
    </div>
  );
};
