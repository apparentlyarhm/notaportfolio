import * as React from "react";
import { Image } from "@heroui/react";
import { motion } from "framer-motion";

import { ghostsList } from "@/config/homepageGhosts";

const generateRandomSize = (baseSize: number, variation: number) => {
  return baseSize + Math.floor(Math.random() * variation * 2) - variation;
};

const floatingAnimation = (delay: number) => ({
  y: [0, -10, 0],
  transition: {
    duration: 6,
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "loop" as const,
    delay,
  },
});

export const Ghosts: React.FC = () => {
  const [isMobile, setIsMobile] = React.useState<boolean | null>(null);
  const [viewport, setViewport] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const handleResize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // initial run
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const ghostImages = React.useMemo(() => {
    // Skip rendering until window dimensions are known
    if (isMobile === null || viewport.width === 0 || viewport.height === 0)
      return [];

    return Array.from({ length: 20 }, (_, index) => {
      const size = generateRandomSize(isMobile ? 20 : 40, 10);

      return {
        id: index,
        size,
        src: ghostsList[index % ghostsList.length].src,
        alt: ghostsList[index % ghostsList.length].alt,
        delay: Math.random() * 10,
        top: `${Math.random() * (100 - (size / viewport.height) * 100)}vh`,
        left: `${Math.random() * (100 - (size / viewport.width) * 100)}vw`,
      };
    });
  }, [isMobile, viewport]);

  return (
    <>
      {ghostImages.map((ghost) => (
        <motion.div
          key={ghost.id}
          animate={floatingAnimation(ghost.delay)}
          className="absolute"
          style={{
            top: ghost.top,
            left: ghost.left,
            zIndex: 1000,
          }}
        >
          <Image
            alt={ghost.alt}
            draggable={false}
            height={ghost.size}
            isBlurred={true}
            src={ghost.src}
            width={ghost.size}
          />
        </motion.div>
      ))}
    </>
  );
};
