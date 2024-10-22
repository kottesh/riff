import React from "react";
import { useLocation } from "react-router-dom";
import { IoIosPlayCircle } from "react-icons/io";
import { MdAccessTime } from "react-icons/md";
export default function Album() {
  const loc = useLocation();
  const album = loc.state; //contains album data in JSON format
  return (
    <div>
      <div className="relative w-full h-full font-raleway">
        <div className="flex flex-row md:flex-col ml-56 rounded-md p-3 mb-0 mt-1 overflow-y-auto bg-comp">
          <div className="m-2 mb-4 h-60 text-white rounded-md flex flex-row shadow-md shadow-gray-700/30">
            <img className="h-40 w-40 mt-5 ml-28 rounded-md md:ml-14 " />
            <div className=" ml-10 my-8 text-left">
              <p className="text-sm">Album</p>
              <h1 className="text-4xl font-bold my-2">{album.title}</h1>
              <div className="flex flex-row">
                <span>No of songs</span>
                <p className="w-1 h-1 bg-white rounded-full m-2"></p>
                <span>{album.year}</span>
                <p className="w-1 h-1 bg-white rounded-full m-2"></p>
                <span>Total duration</span>
              </div>
              <IoIosPlayCircle className="text-5xl my-2" />
            </div>
          </div>
          <div className="p-2 ml-10 mb-20">
            <div className="flex flex-row text-white font-sans text-lg items-center p-2">
              <span className="ml-14">#</span>
              <span className="ml-24 mr-48">Title</span>
              <span className="ml-64">
                <MdAccessTime />
              </span>
            </div>
            <hr className="ml-5 mr-60 border border-cardhover"></hr>
            <div className="bg-comp m-2 mt-8 mr-56 h-fit">
              <div className="sea-song ml-5 mt-3">
                <p className="ml-6 mr-20 text-white text-lg ">1</p>
                <div>
                  <p>Song.....................</p>
                  <p className="text-xs">artist</p>
                </div>
                <p className="ml-80">Duration</p>
              </div>
              <div className="sea-song ml-5 mt-3">
                <p className="ml-6 mr-20 text-white text-lg ">2</p>
                <div>
                  <p>Song.....................</p>
                  <p className="text-xs">artist</p>
                </div>
                <p className="ml-80">Duration</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
