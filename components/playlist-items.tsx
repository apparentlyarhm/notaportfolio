import React from 'react';

type Song = {
  id: string;
  image: string;
  name: string;
  artists: string[];
  duration: string;
  dateAdded: string;
};

export default function PlaylistView() {
  // Hardcoded playlist info
  const playlistName = "this is based";
  const totalSongs = 1028;

  // Hardcoded list of songs
  const songs: Song[] = [
    {
      id: '1',
      image: 'https://via.placeholder.com/48',
      name: 'Lo-fi Beat',
      artists: ['Artist A', 'Artist B'],
      duration: '3:24',
      dateAdded: '2025-07-10',
    },
    {
      id: '2',
      image: 'https://via.placeholder.com/48',
      name: 'Calm Breeze',
      artists: ['Artist C'],
      duration: '2:58',
      dateAdded: '2025-07-09',
    },
    {
      id: '3',
      image: 'https://via.placeholder.com/48',
      name: 'Night Walk',
      artists: ['Artist D'],
      duration: '4:12',
      dateAdded: '2025-07-08',
    },
    {
      id: '4',
      image: 'https://via.placeholder.com/48',
      name: 'Sunset Drive',
      artists: ['Artist E', 'Artist F'],
      duration: '3:45',
      dateAdded: '2025-07-07',
    },
    {
      id: '5',
      image: 'https://via.placeholder.com/48',
      name: 'Morning Coffee',
      artists: ['Artist G'],
      duration: '2:50',
      dateAdded: '2025-07-06',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-cente p-4">
      {/* Stats Row */}
      <div className="flex gap-8 mb-6">
        
        <div className="flex flex-row gap-2 items-end">
          <span className="text-sm text-gray-500">name</span>
          <span className="text-4xl font-black">{playlistName}</span>
        </div>

        <div className="flex flex-row gap-2 items-end">
          <span className="text-sm text-gray-500">songs</span>
          <span className="text-4xl font-black">{totalSongs}</span>
        </div>

      </div>

      {/* Playlist items */}
      <div className="w-full max-w-6xl border rounded-xl bg-white p-4">
        {songs.map((song) => (
          <div
            key={song.id}
            className="flex items-center gap-4 p-3 border-b last:border-b-0 hover:bg-gray-100 rounded-xl cursor-pointer"
            
          >
            <img
              src={song.image}
              alt={song.name}
              className="w-12 h-12 rounded"
            />
            <div className="flex-1">
              <div className="font-semibold">{song.name}</div>
              <div className="text-sm text-gray-500">{song.artists.join(', ')}</div>
            </div>
            <div className="flex flex-col items-end text-right">
              <span className="text-sm text-gray-500">length</span>
              <span className="font-medium">{song.duration}</span>
            </div>
            <div className="flex flex-col items-end text-right ml-4">
              <span className="text-sm text-gray-500">added on:</span>
              <span className="font-medium">{song.dateAdded}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
