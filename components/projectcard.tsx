"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link as NextUILink,
  Image,
  Button,
} from "@nextui-org/react";
import NextLink from "next/link"; // Import Next.js Link
import {
  paragraph,
  codestuff,
  headingsDM,
  fontSans,
  fontMono,
  crimsonserif,
} from "@/config/fonts";
import clsx from "clsx";
import { ExternalLink } from "react-feather";

interface ProjectCardProps {
  title: string;
  projectDesc: string[];
  projectLink: string;
  images: string[];
  category: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  projectDesc,
  projectLink,
  images,
  category,
}) => {
  const isLinkEmpty = !projectLink || projectLink.trim() === "";
  return (
    <NextLink href={isLinkEmpty ? "javascript:void(0)" : projectLink} passHref>
      <Card
        className="max-w-[700px] min-h-[400px] rounded-3xl dark:bg-gray-900 bg-slate-100 border-1 dark:border-gray-500 hover:border-gray-400 dark:hover:border-orange-400"
        shadow="none"
      >
        <CardHeader className="flex flex-col md:flex-row gap-2">
          {/* Images section */}
          <div className="flex gap-3 sm:gap-2 p-2 sm:p-4">
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

          {/* Title section */}
          <div
            className={clsx(
              "flex flex-col mt-2 tracking-tight md:mt-0 sm:text-xl text-lg font-bold sm:font-bold",
              paragraph.className
            )}
          >
            <p className="text-md">{title}</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="p-6 sm:px-10 sm:py-12 sm:text-justify font-normal text-small">
          <ul className="list-disc">
            {projectDesc.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>
        </CardBody>
        <CardFooter className={clsx("p-6", codestuff.className)}>
          <Button
            size="lg"
            variant="solid"
            isDisabled={isLinkEmpty}
            className="dark:bg-gray-800 bg-white"
            endContent={<ExternalLink size={15} />}
          >
            {"SRC"}
          </Button>
        </CardFooter>
      </Card>
    </NextLink>
  );
};
