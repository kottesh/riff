import React from "react";
import Vibrant from "node-vibrant";
import { getArtistById } from "../../services/dataAPI";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsFillSkipStartCircleFill,
  BsSkipEndCircleFill,
  BsFillSkipEndCircleFill,
} from "react-icons/bs";
import { useRef, useEffect, useState } from "react";

export default function Player({
  audioref,
  isplaying,
  setisplaying,
  currentSong,
  setCurrentSong,
  songs,
}) {
  const refe = useRef();
  const [ themeColor, setThemeColor ] = useState("#ffffff")
  const [ artist, setArtist ] =useState([]);
  useEffect(() => {
    // Extract the vibrant color from the album cover
    if (currentSong.coverUrl) {
      Vibrant.from(currentSong.coverUrl)
        .getPalette()
        .then((palette) => {
          // You can use palette.Vibrant, palette.DarkVibrant, etc.
          setThemeColor(palette.Vibrant.hex); // Set the theme to the vibrant color
        })
        .catch((err) => {
          console.error("Vibrant color extraction failed:", err);
        });
    }
  }, [currentSong.coverUrl]);

  // useEffect(()=>{
  //     if(currentSong.artistIds){
  //       currentSong.artistIds.map(async(id)=>{
  //         const data = await getArtistById(id);
  //         setArtist(...artist,data.name);
  //       })
  //     }
  // },[currentSong.artistIds]);
  
  const PlayPause = ()=>
    {
      setisplaying(!isplaying);
  
    }

    const checkWidth = (e)=>
    {
      let width = refe.current.clientWidth;
      const offset = e.nativeEvent.offsetX;
  
      const divprogress = offset / width * 100;
      audioref.current.currentTime = divprogress / 100 * currentSong.length;
  
    }
  
    const skipBack = ()=>
    {
      const index = songs.findIndex(x=>x.title == currentSong.title);
      if (index == 0)
      {
        setCurrentSong(songs[songs.length - 1])
      }
      else
      {
        setCurrentSong(songs[index - 1])
      }
      audioref.current.currentTime = 0;
      setisplaying(true);
      setTimeout(() => {
        audioref.current.play();
      }, 0);
      
    }

    const skiptoNext = ()=>
    {
      const index = songs.findIndex(x=>x.title == currentSong.title);
  
      if (index == songs.length-1)
      {
        setCurrentSong(songs[0])
      }
      else
      {
        setCurrentSong(songs[index + 1])
      }
      audioref.current.currentTime = 0;
      setisplaying(true);
      setTimeout(() => {
        audioref.current.play();
      }, 0);
      
    }
  return (
    <div className="w-full h-20 p-2 text-gray-300 flex flex-row items-center">
      <img className="w-10 h-10 mr-2 rounded-md border border-black" src={currentSong.coverUrl}/>
      <div className="text-gray-200 w-15">
        <h1 className="text-base font-medium title">{currentSong.title}</h1>
        <p className="text-xs opacity-30">{artist[0]}</p>
      </div>
      <div className="flex flex-col w-96 items-center ml-14 justify-center">
        <div className="text-inherit flex items-center">
          <div className="text-2xl my-3 cursor-pointer items-center hover:text-white flex flex-row">
            <BsFillSkipStartCircleFill
              className="mr-3"
              onClick={skipBack}
            />
            {isplaying ? (
              <BsFillPauseCircleFill
                className="mr-3 size-9"
                onClick={PlayPause}
              />
            ) : (
              <BsFillPlayCircleFill
                className="mr-3 size-9"
                onClick={PlayPause}
              />
            )}
            <BsFillSkipEndCircleFill
              onClick={skiptoNext}
            />
          </div>
          {/* <div className="pp text-4xl"></div> */}
        </div>
        <div className="w-full">
          <div
            className="min-w-full bg-gray-600 bg-opacity-75 h-1.5 rounded-full cursor-pointer"
            onClick={checkWidth}
            ref={refe}
          >
            <div
              className=" h-full hover:bg-white rounded-full w-0"
              style={{ width: `${currentSong.progress + "%"}`,backgroundColor:themeColor }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
