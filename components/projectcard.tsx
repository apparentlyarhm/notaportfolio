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

interface ProjectCardProps {
  title: string;
  projectDesc: string[];
  projectLink: string;
  images: string[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  projectDesc,
  projectLink,
  images,
}) => {
  const isLinkEmpty = !projectLink || projectLink.trim() === "";
  return (
    <Card className="max-w-[700px] drop-shadow-2xl ">
      <CardHeader className="flex flex-col md:flex-row gap-2">
        {/* Images section */}
        <div className="flex gap-3 sm:gap-2 p-2 sm:p-4">
          {images.map((img, index) => (
            <Image
              isBlurred
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
      <Divider />
      <CardFooter className="p-6">
        <NextLink href={projectLink} passHref>
          <Button
            size="sm"
            color="primary"
            variant="solid"
            isDisabled={isLinkEmpty}
          >
            SRC
          </Button>
        </NextLink>
      </CardFooter>
    </Card>
  );
};
