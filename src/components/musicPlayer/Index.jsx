import React, { useEffect, useRef } from "react";
import Player from "./Player";
import { useState } from "react";
import { getAllsongs } from "../../services/dataAPI";
import {songData} from './sampleSongData'
export default function musicPlayer() {
    const [songs, setSongs] = useState(songData);
    const [isplaying, setisplaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(songData[0]);
    
    const audioref = useRef();
    // useEffect(() => {
    //   const fetchSongs = async () => {
    //     try {
    //       const data = await getAllsongs();
    //       setSongs(data);
    //         setCurrentSong({
    //           title : data[0].title,
    //           url : data[0].fileUrl
    //         });
    //       console.log("Fetched song data : ", data);
    //     } catch (error) {
    //       console.log("Error in API call (songs): ", error.message);
    //     }
    //   };
        
    //   fetchSongs();
    // },[]);
    useEffect(() => {
      if (currentSong && audioref.current) {
        if (isplaying) {
          audioref.current.play();
        } else {
          audioref.current.pause();
        }
      }
    }, [isplaying, currentSong]);

  const onPlaying = () => {
    const duration = audioref.current.duration;
    const ct = audioref.current.currentTime;

    setCurrentSong({
      ...currentSong,
      progress: (ct / duration) * 100,
      length: duration,
    });
  };
  
  return (
    <div className="fixed glass w-fit z-50 h-20 bottom-5 p-6 ml-[25%] items-center flex flex-row">
      <audio
        src={currentSong.fileUrl}
        ref={audioref}
        onTimeUpdate={onPlaying}
      ></audio>
      <Player
        songs={songData}
        setSongs={setSongs}
        isplaying={isplaying}
        setisplaying={setisplaying}
        audioref={audioref}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
      />
    </div>
  );
}
