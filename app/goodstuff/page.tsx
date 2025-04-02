"use client";
import { useState, useEffect } from "react";
import { ArrowUpRight } from "react-feather";
import { Tooltip } from "flowbite-react";
import { motion } from "framer-motion";
import { Divider, Button } from "@heroui/react";
import clsx from "clsx";

import { ProjectCard } from "@/components/projectcard";
import { ProjectCardConfig } from "@/config/projectcardconfig"; // Import the config file
import { headingsDM, codestuff } from "@/config/fonts";
import { Protimeline as ProTime } from "@/components/protimeline";
import { jobtimelineConfig, timelineConfig } from "@/config/time";
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each card animation
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
      <h1
        className={clsx(
          "text-3xl md:text-4xl lg:text-5xl font-black tracking-tight break-words sm:mb-10",
          headingsDM.className
        )}
      >
        Timeline
      </h1>
      <br />
      <Tooltip
        content={
          <div className="px-1 py-2">
            <div className="text-normal font-bold">Quick Disclaimer</div>
            <div className="text-small">
              {"I will try my best to update all this regularly."}
            </div>
          </div>
        }
      >
        <motion.p
          className={clsx(
            "tracking-tight text-md sm:text-xl text-gray-400 px-3 text-left",
            codestuff.className
          )}
          variants={containerVariants}
        >
          {
            "The blue timeline is regarding my education and the green one is professional."
          }
        </motion.p>
      </Tooltip>
      <br />
      <Divider />
      <br />
      <ProTime
        jobtimelineConfig={jobtimelineConfig}
        timelineConfig={timelineConfig}
      />
      <br />
      <motion.h1
        className={clsx(
          "text-3xl md:text-4xl lg:text-5xl font-black tracking-tight break-words sm:mb-10",
          headingsDM.className
        )}
        initial="hidden"
        variants={cardVariants}
        viewport={{ once: true, amount: 0.2 }}
        whileInView="visible"
      >
        Projects
      </motion.h1>
      <br />
      <motion.p
        className={clsx(
          "tracking-tight text-md sm:text-xl text-gray-400 text-left px-3",
          codestuff.className
        )}
        initial="hidden"
        variants={cardVariants}
        viewport={{ once: true, amount: 0.2 }}
        whileInView="visible"
      >
        {
          "Goofy ahh stuff I've worked on. Some of them are still WIP, while others were not good enough so got abandoned."
        }
      </motion.p>
      <br />
      <br />
      <div className="max-w-full md:grid md:grid-cols-2 md:gap-10">
        {isMobile
          ? ProjectCardConfig.map((config, index) => (
              <motion.div
                key={index}
                className="py-4 px-3 h-full"
                id="CARDDIV"
                initial="hidden"
                variants={cardVariants}
                viewport={{ once: true, amount: 0.2 }}
                whileInView="visible"
              >
                <ProjectCard
                  key={index}
                  category={config.category}
                  images={config.images}
                  projectDesc={config.projectDesc}
                  projectLink={config.projectLink}
                  title={config.title}
                />
              </motion.div>
            ))
          : ProjectCardConfig.map((config, index) => (
              <motion.div
                key={index}
                className="py-4 px-3"
                id="CARDDIV"
                initial="hidden"
                variants={cardVariants}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ translateY: -7 }}
                whileInView="visible"
                whileTap={{ scale: 0.96 }}
              >
                <ProjectCard
                  key={index}
                  category={config.category}
                  images={config.images}
                  projectDesc={config.projectDesc}
                  projectLink={config.projectLink}
                  title={config.title}
                />
              </motion.div>
            ))}
      </div>
      <Button
        as={"a"}
        className={clsx(
          "mt-12 p-10 rounded-2xl text-white text-2xl bg-emerald-600 tracking-tighter",
          headingsDM.className
        )}
        endContent={<ArrowUpRight />}
        href="./mehstuff"
        variant="shadow"
      >
        {"Music and Stuff"}
      </Button>
    </div>
  );
}
