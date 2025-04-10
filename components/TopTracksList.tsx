import React from "react";
import SongCard from "../components/SongCard";
import { motion } from "framer-motion";

interface SpotifyTrack {
  name: string;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string; width: number; height: number }[];
  };
}

interface TopTracksListProps {
  tracks: SpotifyTrack[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

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

const TopTracksList: React.FC<TopTracksListProps> = ({ tracks }) => {
  return (
    <motion.div
      className="flex flex-col justify-center gap-14 max-w-[95vw] sm:max-w-[88vw] md:max-w-[75vw] lg:max-w-[65vw] mx-auto"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {tracks.map((track, index) => {
        const imageUrl =
          track.album.images.find((img) => img.width === 300)?.url ||
          track.album.images[0]?.url ||
          "";

        return (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <SongCard
              songName={track.name.toLowerCase()}
              artists={track.artists.map((artist) => artist.name.toLowerCase())}
              albumName={track.album.name}
              imageUrl={imageUrl}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default TopTracksList;
