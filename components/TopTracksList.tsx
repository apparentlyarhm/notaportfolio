import React from "react";

import SongCard from "../components/SongCard";

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
  isMobile: boolean
}

const TopTracksList: React.FC<TopTracksListProps> = ({ tracks, isMobile }) => {
  return (
    <div
      className="flex flex-col justify-center gap-14 max-w-[95vw] sm:max-w-[88vw] md:max-w-[75vw] lg:max-w-[65vw] mx-auto"
    >
      {tracks.map((track, index) => {
        const imageUrl =
          track.album.images.find((img) => img.width === 300)?.url ||
          track.album.images[0]?.url ||
          "";

        return (
          <div
            key={index}
            className="w-full"
          >
            <SongCard
              albumName={track.album.name}
              artists={track.artists.map((artist) => artist.name.toLowerCase())}
              imageUrl={imageUrl}
              songName={track.name.toLowerCase()}
              isMobile={isMobile} 
              index={index}
            />
          </div>
        );
      })}
    </div>
  );
};

export default TopTracksList;
