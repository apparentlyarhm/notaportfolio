"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Button,
  Chip,
} from "@heroui/react";
import NextLink from "next/link"; // Import Next.js Link
import clsx from "clsx";
import { ExternalLink } from "react-feather";

import {
  paragraph,
  codestuff,
  headingsDM,
  nunito

} from "@/config/fonts";

interface ProjectCardProps {
  title: string;
  projectDesc: string[];
  projectLink: string;
  images: string[];
  category: string;
  isMobile: boolean;
  status: "live" | "partially-live" | "unreleased" | "deprecated";
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  projectDesc,
  projectLink,
  images,
  isMobile,
  status
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "success";
      case "partially-live":
        return "warning";
      case "unreleased":
        return "secondary";
      case "deprecated":
        return "danger";
      default:
        return "default";
    }
  };

  const isLinkEmpty = !projectLink || projectLink.trim() === "";

  return (
    <NextLink passHref href={isLinkEmpty ? "javascript:void(0)" : projectLink}>
      <Card
        className="max-w-[700px] min-h-[400px] rounded-3xl bg-transparent border-1 dark:border-gray-500 hover:border-gray-400 dark:hover:border-orange-400"
        shadow="none"
      >
        <CardHeader className="flex flex-col md:flex-row gap-2">
          {/* Images section */}
          {!isMobile && (
            <div className="flex gap-3 sm:gap-2 p-2 sm:p-4 border-1 rounded-2xl dark:border-gray-500">
              {images.map((img, index) => (
                <Image
                  key={index}
                  alt={`Image ${index + 1}`}
                  height={35}
                  radius="sm"
                  src={img}
                  width={35}
                />
              ))}
            </div>
          )}

          {/* Title section */}

          <div
            className={clsx(
              "flex flex-col mt-2 tracking-tight md:mt-0 text-start px-2 py-4 sm:text-xl text-lg font-bold sm:font-bold",
              paragraph.className
            )}
          >
            <p className={clsx("text-lg tracking-tighter font-black", headingsDM.className)}>{title}</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className={clsx("p-6 sm:px-10 sm:py-12 sm:text-justify font-normal sm:text-sm text-gray-500 text-xs", codestuff.className)}>
          <ul className="list-disc">
            {projectDesc.map((desc, index) => (
              <p key={index}>{desc}</p>
            ))}
          </ul>
        </CardBody>
        <CardFooter className={clsx("p-6", codestuff.className)}>
        
            <div className="flex gap-4 justify-center items-center">
            <Button
              className="bg-gray-900 text-white flex items-center"
              endContent={<ExternalLink size={15} />}
              isDisabled={isLinkEmpty}
              size="lg"
              variant="solid"
            >
              {"SRC"}
            </Button>
            <Chip
              color={getStatusColor(status)}
              className={clsx("self-center tracking-normal", nunito.className)}
            >
              {status}
            </Chip>
            </div>

        </CardFooter>
      </Card>
    </NextLink>
  );
};
