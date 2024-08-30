"use client";
import { useState, useEffect } from "react";
import { ArrowUpRight } from "react-feather";
import { Tooltip } from "flowbite-react";
import { ProjectCard } from "@/components/projectcard";
import { ProjectCardConfig } from "@/config/projectcardconfig"; // Import the config file
import { headingsDM, codestuff, crimsonserif } from "@/config/fonts";
import { motion } from "framer-motion";
import { card, Divider, Button } from "@nextui-org/react";
import clsx from "clsx";
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
      {/* <DraggableSquare /> */}
      <h1
        className={clsx(
          "text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter break-words sm:mb-10",
          headingsDM.className
        )}
      >
        Timeline
      </h1>
      <br></br>
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
            "tracking-tight text-lg sm:text-2xl text-gray-400 px-3 text-left",
            crimsonserif.className
          )}
          variants={containerVariants}
        >
          {
            "'Time, Dr. Freeman? Is it really that time again? It seems as if you only just arrived.' The blue timeline is regarding my education and the green one is professional."
          }
        </motion.p>
      </Tooltip>
      <br />
      <Divider />
      <br />
      <ProTime
        timelineConfig={timelineConfig}
        jobtimelineConfig={jobtimelineConfig}
      />
      <br />
      <motion.h1
        className={clsx(
          "text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter break-words sm:mb-10",
          headingsDM.className
        )}
        initial="hidden"
        whileInView="visible"
        variants={cardVariants}
        viewport={{ once: true, amount: 0.2 }}
      >
        Projects
      </motion.h1>
      <br />
      <motion.p
        className={clsx(
          "tracking-tight text-lg sm:text-2xl text-gray-400 text-left px-3",
          crimsonserif.className
        )}
        initial="hidden"
        whileInView="visible"
        variants={cardVariants}
        viewport={{ once: true, amount: 0.2 }}
      >
        {
          "'Do I need to be liked? Absolutely not. I like to be liked. I enjoy being liked. I have to be liked. But it’s not like this compulsive need like my need to be praised.'"
        }
      </motion.p>
      <br></br>
      <Divider />
      <br></br>
      <div className="max-w-full md:grid md:grid-cols-2 md:gap-10">
        {isMobile
          ? ProjectCardConfig.map((config, index) => (
              <motion.div
                className="py-4 px-3"
                key={index}
                initial="hidden"
                whileInView="visible"
                variants={cardVariants}
                viewport={{ once: true, amount: 0.2 }}
              >
                <ProjectCard
                  key={index}
                  title={config.title}
                  projectDesc={config.projectDesc}
                  projectLink={config.projectLink}
                  images={config.images}
                />
              </motion.div>
            ))
          : ProjectCardConfig.map((config, index) => (
              <ProjectCard
                key={index}
                title={config.title}
                projectDesc={config.projectDesc}
                projectLink={config.projectLink}
                images={config.images}
              />
            ))}
      </div>
      <Button
        as={"a"}
        variant="shadow"
        href="./mehstuff"
        endContent={<ArrowUpRight />}
        className={clsx(
          "mt-12 p-10 rounded-2xl text-white text-2xl bg-emerald-600",
          headingsDM.className
        )}
      >
        {"Music and Stuff"}
      </Button>
    </div>
  );
}
