import React from 'react'
import Player from './Player'
import { useState } from 'react';
export default function musicPlayer() {
  const songData = [
    {
      id: "671565602baecde22dfd1c0b",
      title: 'Aasa Kooda (From "Think Indie")',
      duration: 0,
      fileUrl:
        "https://firebasestorage.googleapis.com/v0/b/riff-storage.appspot.com/o/audio%2F1729455433387-Aasa%20Kooda%20(From%20%EF%BC%82Think%20Indie%EF%BC%82).m4a?alt=media&token=620e3f7f-17cf-41f6-a948-362137b34c3c",
      coverUrl:
        "https://res.cloudinary.com/djdtxgqgv/image/upload/v1729455455/covers/vtpdnvsmzd0iitwsedlr.png",
    },
    {
      id: "671564c32baecde22dfd1c0a",
      title: 'Janiye (from the Netflix Film "Chor Nikal Ke Bhaga")',
      duration: 0,
      fileUrl:
        "https://firebasestorage.googleapis.com/v0/b/riff-storage.appspot.com/o/audio%2F1729455291089-Janiye%20(from%20the%20Netflix%20Film%20%EF%BC%82Chor%20Nikal%20Ke%20Bhaga%EF%BC%82).m4a?alt=media&token=1a003d6f-89be-4da9-b252-260ab995e88b",
      coverUrl:
        "https://res.cloudinary.com/djdtxgqgv/image/upload/v1729455299/covers/tym9pyud4eb7axv0itim.png",
    }
  ];

  const [songs, setSongs] = useState(songData);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currSong, setCurrSong] = useState(songData[0]);
  
  return (
    <div>
      <audio controls src={currSong.fileUrl}className="opacity-40"></audio>
      {/* <Player /> */}
    </div>
  )
}
