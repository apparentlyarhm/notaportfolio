import React from "react"
import SongCard from "../components/SongCard"
import { motion } from "framer-motion"

interface SpotifyTrack {
  name: string
  artists: { name: string }[]
  album: {
    name: string
    images: { url: string; width: number; height: number }[]
  }
}

interface TopTracksListProps {
  tracks: SpotifyTrack[]
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }
  
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
  }

const TopTracksList: React.FC<TopTracksListProps> = ({ tracks }) => {
  return (
    <motion.div
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    {tracks.map((track, index) => {
      const imageUrl =
        track.album.images.find((img) => img.width === 300)?.url ||
        track.album.images[0]?.url ||
        ""

      return (
        <motion.div
          key={index}
          variants={cardVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="w-full"
        >
          <SongCard
            songName={track.name}
            artists={track.artists.map((artist) => artist.name.toLowerCase())}
            albumName={track.album.name.toLowerCase()}
            imageUrl={imageUrl}
          />
        </motion.div>
      )
    })}
  </motion.div>
  )
}

export default TopTracksList
