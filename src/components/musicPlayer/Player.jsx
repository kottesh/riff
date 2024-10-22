import React from "react";
import { FaPlay } from "react-icons/fa";
import { IoPlayBack } from "react-icons/io5";
import { IoPlayForward } from "react-icons/io5";
import { useRef, useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
export default function Player() {
  return (
    <div>
      <div className="fixed glass w-full z-50 h-16 bottom-5 pl-6 justify-left items-center rounded-full flex flex-row">
        <p className="text-white text-sm"></p>
        <div className="seek_bar"></div>
      </div>
    </div>
  );
}
