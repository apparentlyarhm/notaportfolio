import * as React from "react";
import { ghostsList } from "@/config/homepageGhosts";
import { Image } from "@heroui/react";
import { motion } from "framer-motion";

export interface Props {}

const generateRandomSize = (baseSize: number, variation: number) => {
  return baseSize + Math.floor(Math.random() * variation * 2) - variation;
};

const floatingAnimation = (delay: number) => ({
  y: [0, -10, 0], // Subtle up and down motion
  transition: {
    duration: 6,
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "loop" as const,
    delay, // Introduce a delay
  },
});

export const Ghosts: React.FC<Props> = (): JSX.Element => {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const ghostImages = React.useMemo(() => {
    return Array.from({ length: 20 }, (_, index) => ({
      id: index,
      size: generateRandomSize(isMobile ? 20 : 40, 10),
      src: ghostsList[index % ghostsList.length].src,
      alt: ghostsList[index % ghostsList.length].alt,
      delay: Math.random() * 10,
    }));
  }, [isMobile]);
  return (
    <>
      {ghostImages.map((ghost) => (
        <motion.div
          key={ghost.id}
          className="absolute"
          style={{
            top: `${Math.random() * (100 - (ghost.size / window.innerHeight) * 100)}vh`,
            left: `${Math.random() * (100 - (ghost.size / window.innerWidth) * 100)}vw`,
            zIndex: 1000,
          }}
          animate={floatingAnimation(ghost.delay)}
        >
          <Image
            draggable={false}
            isBlurred={true}
            src={ghost.src}
            alt={ghost.alt}
            height={ghost.size}
            width={ghost.size}
          />
        </motion.div>
      ))}
    </>
  );
};
