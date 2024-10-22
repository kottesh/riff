import React, { useEffect, useRef } from "react";
import Player from "./Player";
import { useState } from "react";
import { getAllsongs } from "../../services/dataAPI";
export default function musicPlayer() {
    const [songs, setSongs] = useState([]);
    const [isplaying, setisplaying] = useState(false);
    const [currentSong, setCurrentSong] = useState({ title : "", url : ""});
    const ref = useRef(null);
    useEffect(() => {
      const fetchSongs = async () => {
        try {
          const data = await getAllsongs();
          setSongs(data);
            setCurrentSong({
              title : data[0].title,
              url : data[0].fileUrl
            });
          console.log("Fetched song data : ", data);
        } catch (error) {
          console.log("Error in API call (songs): ", error.message);
        }
      };
      fetchSongs();
    },[]);
    useEffect(() => {
      if (currentSong && ref.current) {
        if (isplaying) {
          ref.current.play();
        } else {
          ref.current.pause();
        }
      }
  
      // Cleanup function to pause audio on component unmount
      return () => {
        if (ref.current) {
          ref.current.pause();
        }
      };
    }, [isplaying, currentSong]);
  
  console.log("Current song:",currentSong);

  const onPlaying = () => {
    const duration = ref.current.duration;
    const ct = ref.current.currentTime;

    setCurrentSong({
      ...currentSong,
      progress: (ct / duration) * 100,
      length: duration,
    });
  };
  
  return (
    <div className="fixed glass w-fit z-50 h-16 bottom-5 p-6 ml-[25%] items-center flex flex-row">
      <audio
        src={currentSong.url}
        ref={ref}
        onTimeUpdate={onPlaying}
      ></audio>
      <Player
        songs={songs}
        setSongs={setSongs}
        isplaying={isplaying}
        setisplaying={setisplaying}
        refi={ref}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
      />
    </div>
  );
}
