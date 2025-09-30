"use client";
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, ArrowUpLeft, ArrowUpRight } from "react-feather";
import { motion } from "framer-motion";
import { Divider, Button, ButtonGroup } from "@heroui/react";
import clsx from "clsx";

import { headingsDM, codestuff, nunito, bitter } from "@/config/fonts";
import RepoActivityAccordion from "@/components/github-act-accordion";
import SystemInfo from "@/components/specs-ui";
export default function ProfessionalInfoPage() {
  const [isMobile, setIsMobile] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        mass: 0.5,
      },
    },
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div>
      <div className="sm:p-0 p-2">
      <SystemInfo isMobile={isMobile} />

      </div>
      <br />
      <br />

      <motion.h1
        className={clsx(
          "text-4xl md:text-4xl text-start sm:text-center px-3 lg:text-5xl font-black tracking-tight break-words sm:mb-10",
          nunito.className
        )}
        initial="hidden"
        variants={cardVariants}
        viewport={{ once: true, amount: 0.2 }}
        whileInView="visible"
      >
        Github
      </motion.h1>

      <br />
      <motion.p
        className={clsx(
          "tracking-wider text-md sm:text-xl text-gray-400 text-left px-3",
          bitter.className
        )}
        initial="hidden"
        variants={cardVariants}
        viewport={{ once: true, amount: 0.2 }}
        whileInView="visible"
      >
        {
          "Why github? idk because I can I guess.. anyways, here's my recent activity, directly queried from GitHub"
        }
      </motion.p>      
      <br />

      <RepoActivityAccordion isMobile={isMobile} />

      <br />

      <Button
        as={"a"}
        className={clsx(
          "mt-12 sm:p-12 p-9 text-white text-2xl bg-gray-900 tracking-tighter mr-2 rounded-l-full rounded-r-sm",
          headingsDM.className
        )}
        startContent={<ArrowLeft size={isMobile ? 20 : 50} />}
        href="./"
        variant="shadow"
      >
      </Button>

      <Button
        as={"a"}
        className={clsx(
          "mt-12 sm:p-12 p-9 text-white text-2xl bg-gray-900 tracking-tighter rounded-l-2xl rounded-r-full",
          headingsDM.className
        )}
        endContent={<ArrowRight size={isMobile ? 20 : 50} />}
        href="./xtras"
        variant="shadow"
      >

      </Button>
    </div>
  );
}
