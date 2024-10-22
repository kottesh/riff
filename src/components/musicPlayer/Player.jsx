import React from "react";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsFillSkipStartCircleFill,
  BsSkipEndCircleFill,
  BsFillSkipEndCircleFill,
} from "react-icons/bs";
import { useRef, useEffect, useState } from "react";

export default function Player({
  refi,
  isplaying,
  setisplaying,
  currentSong,
  setCurrentSong,
  songs,
}) {
  const refe = useRef();
  const PlayPause = ()=>
    {
      setisplaying(!isplaying);
  
    }

    const checkWidth = (e)=>
    {
      let width = refe.current.clientWidth;
      const offset = e.nativeEvent.offsetX;
  
      const divprogress = offset / width * 100;
      refi.current.currentTime = divprogress / 100 * currentSong.length;
  
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
      refi.current.currentTime = 0;
      
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
      refi.current.currentTime = 0;
      
    }
  return (
    <div className="w-full h-20 p-4 text-gray-300 flex flex-row items-center">
      <img className="w-10 h-10 mr-4" />
      <div className="text-gray-200">
        <h1 className="text-inherit title">{currentSong.title}</h1>
      </div>
      <div className="flex flex-col w-96 items-center ml-20 justify-center">
        <div className="text-inherit flex items-center">
          <div className="btn_action text-2xl mx-4 cursor-pointer hover:text-white">
            <BsFillSkipStartCircleFill
              className="btn_action"
              onClick={skipBack}
            />
            {isplaying ? (
              <BsFillPauseCircleFill
                className="btn_action pp"
                onClick={PlayPause}
              />
            ) : (
              <BsFillPlayCircleFill
                className="btn_action pp"
                onClick={PlayPause}
              />
            )}
            <BsFillSkipEndCircleFill
              className="btn_action"
              onClick={skiptoNext}
            />
          </div>
          {/* <div className="pp text-4xl"></div> */}
        </div>
        <div className="w-full">
          <div
            className="min-w-full bg-gray-600 bg-opacity-75 h-1.5 rounded-full cursor-pointer"
            onClick={checkWidth}
            ref={refi}
          >
            <div
              className=" h-full bg-green-600 rounded-full w-0"
              style={{ width: `${currentSong.progress + "%"}` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
