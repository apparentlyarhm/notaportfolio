"use client";
import * as React from "react";
import { Timeline } from "flowbite-react";
import { Card, CardHeader, CardBody, Divider } from "@heroui/react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { CustomFlowbiteTheme } from "flowbite-react";

import { paragraph, headingsDM, codestuff, fontMono } from "@/config/fonts";
import { timelineConfig, jobtimelineConfig } from "@/config/time";

export interface props {
  timelineConfig: timelineConfig[];
  jobtimelineConfig: jobtimelineConfig[];
}

export const Protimeline: React.FC<props> = ({
  timelineConfig,
  jobtimelineConfig,
}): JSX.Element => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

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

  const iwillkillmyself: CustomFlowbiteTheme["timeline"] = {
    item: {
      point: {
        line: isDarkMode
          ? "hidden h-0.5 w-full bg-red-500"
          : "hidden h-0.5 w-full bg-blue-500",
        marker: {
          base: {
            horizontal:
              "absolute -left-1.5 h-3 w-3 rounded-full border border-white bg-yellow-200 dark:border-gray-900 dark:bg-green-700",
            vertical:
              "absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-yellow-200 dark:border-gray-900 dark:bg-green-700",
          },
          icon: {
            base: "h-3 w-3 text-purple-600 dark:text-purple-300",
            wrapper:
              "absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-purple-200 ring-8 ring-white dark:bg-purple-900 dark:ring-gray-900",
          },
        },
      },
    },
  };

  const educationColors = isDarkMode
      ? "bg-gradient-to-r from-blue-900 to-indigo-800"
      : "bg-gradient-to-r from-blue-600 to-blue-500";

  const professionalColors = isDarkMode
    ? "bg-gradient-to-r from-green-800 to-green-700"
    : "bg-gradient-to-r from-green-600 to-green-500";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl px-6 sm:px-2 mx-auto">
      {/* Educational Journey Timeline */}
      <Timeline className="max-w-2xl" theme={iwillkillmyself}>
        {timelineConfig.map((item, index) => (
          <Timeline.Item key={index}>
            <Timeline.Point icon={item.icon} />
            <motion.div
              key={index}
              initial="hidden"
              variants={cardVariants}
              viewport={{ once: true, amount: 0.2 }}
              whileInView="visible"
            >
              <Timeline.Content>
                <Card
                  className={clsx(
                    "max-w-[400px] text-black py-2 bg-transparent shadow-none border-1 border-gray-200 hover:bg-gray-900 hover:text-white ",
                    
                  )}
                >
                  <CardHeader className="flex gap-3">
                    <div className="flex flex-col p-3 text-left">
                      <p
                        className={clsx(
                          "text-lg tracking-tight",
                          headingsDM.className
                        )}
                      >
                        {item.title}
                      </p>
                      <p className={clsx("text-small", paragraph.className)}>
                        {item.time}
                      </p>
                    </div>
                  </CardHeader>
                  <Divider className="bg-gray-300 opacity-50" />
                  <CardBody className="mx-2 my-1 sm:text-sm text-xs px-1 break-words">
                    <p className={clsx("p-1 px-3", fontMono.className)}>
                      {item.body}
                    </p>
                  </CardBody>
                </Card>
              </Timeline.Content>
            </motion.div>
          </Timeline.Item>
        ))}
      </Timeline>

      {/* Professional Journey Timeline */}
      <Timeline className="max-w-2xl">
        {jobtimelineConfig.map((item, index) => (
          <Timeline.Item key={index}>
            <Timeline.Point icon={item.icon} />
            <motion.div
              key={index}
              initial="hidden"
              variants={cardVariants}
              viewport={{ once: true, amount: 0.2 }}
              whileInView="visible"
            >
              <Timeline.Content>
                <Card
                  className={clsx(
                    "max-w-[400px] text-black py-2 shadow-none border-1 border-gray-200 bg-transparent hover:bg-gray-900 hover:text-white ",
                    
                  )}
                >
                  <CardHeader className="flex gap-3">
                    <div className="flex flex-col p-3 text-left">
                      <p
                        className={clsx(
                          "text-lg tracking-tight mb-2",
                          headingsDM.className
                        )}
                      >
                        {item.title}
                      </p>
                      <p className={clsx("text-small", paragraph.className)}>
                        {item.time}
                      </p>
                    </div>
                  </CardHeader>
                  <Divider className="bg-gray-300 opacity-50" />
                  <CardBody className="mx-2 my-1 sm:text-sm text-xs px-1">
                    <p className={clsx("p-1 px-3", fontMono.className)}>
                      {item.body}
                    </p>
                  </CardBody>
                </Card>
              </Timeline.Content>
            </motion.div>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  );
};
