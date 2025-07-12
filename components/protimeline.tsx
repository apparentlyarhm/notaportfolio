"use client";
import * as React from "react";
import { Timeline } from "flowbite-react";
import { Card, CardHeader, CardBody, Divider } from "@heroui/react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { CustomFlowbiteTheme } from "flowbite-react";

import { paragraph, headingsDM, fontMono, nunito } from "@/config/fonts";
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
                    "max-w-[450px] rounded-3xl py-5 px-1 shadow-none bg-purple-300/30 text-purple-900 hover:border-white hover:bg-purple-950 hover:text-purple-300",
                    
                  )}
                >
                  <CardHeader className="flex gap-3">
                    <div className="flex flex-col p-3 text-left pb-7">
                      <p
                        className={clsx(
                          "text-xl tracking-tight font-black",
                          nunito.className
                        )}
                      >
                        {item.title}
                      </p>
                      <p className={clsx("text-small", fontMono.className)}>
                        {item.time}
                      </p>
                    </div>
                  </CardHeader>
                  <Divider className="bg-purple-700/30" />
                  <CardBody className="mx-2 my-1 sm:text-medium text-small px-1 break-words">
                    <p className={clsx("p-1 px-3", paragraph.className)}>
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
                    "max-w-[450px] rounded-3xl py-5 px-1 shadow-none bg-blue-200/30 text-cyan-700 hover:bg-blue-900 hover:text-blue-300",
                    
                  )}
                >
                  <CardHeader className="flex gap-3">
                    <div className="flex flex-col p-3 text-left pb-7">
                      <p
                        className={clsx(
                          "text-xl tracking-tight font-black mb-2",
                          nunito.className
                        )}
                      >
                        {item.title}
                      </p>
                      <p className={clsx("text-small", fontMono.className)}>
                        {item.time}
                      </p>
                    </div>
                  </CardHeader>
                  <Divider className="bg-blue-700/30" />
                  <CardBody className="mx-2 my-1 sm:text-medium text-small px-1">
                    <p className={clsx("p-1 px-3", paragraph.className)}>
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
