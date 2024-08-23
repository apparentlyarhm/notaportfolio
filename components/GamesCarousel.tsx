import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { CardConfig } from "@/config/CardConfig"; // Import the interface
import "../components/carousel.css"; // Import your carousel styles here
import { DesktopCard } from "@/components/DesktopCard"; // Import your DesktopCard component
import { Button } from "@nextui-org/button";
import { ArrowLeftCircle, ArrowRightCircle } from "react-feather";
import { card } from "@nextui-org/theme";

interface GamesCarouselProps {
  cardConfig: CardConfig[]; // Define the prop type
}

const GamesCarousel: React.FC<GamesCarouselProps> = ({ cardConfig }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (emblaApi) {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    }
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", () =>
        setSelectedIndex(emblaApi.selectedScrollSnap())
      );
    }
  }, [emblaApi]);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {cardConfig.map((card, index) => (
          <motion.div
            key={index}
            className="embla__slide"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <DesktopCard
              heading={card.heading}
              imgSrc={card.imgSrc}
              footerText={card.footerText}
            />
            <br />
          </motion.div>
        ))}
      </div>
      <br />
      <br />

      <Button
        isDisabled={selectedIndex === 0}
        // color="primary"
        className="mx-5 scale-110 bg-transparent"
        onClick={scrollPrev}
        variant="solid"
        endContent={<ArrowLeftCircle size={28} />}
      ></Button>

      <Button
        // color="success"
        onClick={scrollNext}
        className="scale-110 bg-transparent"
        variant="solid"
        isDisabled={selectedIndex === cardConfig.length - 1}
        endContent={<ArrowRightCircle size={28} />}
      ></Button>

      {/* <button onClick={scrollPrev} disabled={selectedIndex === 0}>
        Prev
      </button>
      <button
        onClick={scrollNext}
        disabled={selectedIndex === emblaApi?.scrollSnapList().length - 1}
      >
        Next
      </button> */}
    </div>
  );
};

export default GamesCarousel;
