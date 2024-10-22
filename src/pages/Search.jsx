import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
export default function Search() {
  const [ data, setData ] = useState([
    { id: 1, name: "Test Song 1", artist: "Test Artist 1" },
    { id: 2, name: "Test Song 2", artist: "Test Artist 2" },
  ]);
  console.log("Length:",data?.length);
  return (
    <div className="relative w-full h-full font-raleway">
      <div className="flex-col mb-0 ml-64 rounded-md mt-3 p-3 overflow-y-auto ">
        <div className=" w-1/2 rounded-full border border-pur flex-row flex items-center">
          <IoSearchOutline className="text-white text-2xl m-2" />
          <form>
            <input
              type="text"
              placeholder="Search for songs,playlists,albums..."
              className=" w-96 outline-none bg-transparent r p-3 text-white"
            />
          </form>
        </div>
        {data?.length > 0 && (
          <div>
            <div className="h-fit rounded-lg p-2 m-2 flex flex-col">
              <h1 className=" text-white font-sans text-2xl font-semibold text-left">
                Songs
              </h1>
              <div className="h-64 w-full rounded-lg p-2 bg-comp mt-2 overflow-y-auto">
                <div className="grid grid-rows-7 grid-cols-1 rounded-lg gap-2 min-w-max px-2 pt-2 shadow-lg  content-center">
                  {/* {data.song.map((song) => {
                    <div className="sea-song" key={song.id}>
                    <img src={song.image[1].link} alt={song.id} />
                    <div>
                        <p>{song.name}</p>
                        <p className="text-xs text-gray-400">{song.artists.name}</p>
                    </div>
                    </div>
                    })}  */}
                  <div className="sea-song">
                    <img alt="" />
                    <div>
                      <p>Song.....................</p>
                      <p className="text-xs text-gray-400">artist</p>
                    </div>
                  </div>

                  <div className="sea-song">
                    <img alt="" />
                    <div>
                      <p>Song.....................</p>
                      <p className="text-xs text-gray-400">artist</p>
                    </div>
                  </div>

                  <div className="sea-song">
                    <img alt="" />
                    <div>
                      <p>Song.....................</p>
                      <p className="text-xs text-gray-400">artist</p>
                    </div>
                  </div>

                  <div className="sea-song">
                    <img alt="" />
                    <div>
                      <p>Song.....................</p>
                      <p className="text-xs text-gray-400">artist</p>
                    </div>
                  </div>

                  <div className="sea-song">
                    <img alt="" />
                    <div>
                      <p>Song.....................</p>
                      <p className="text-xs text-gray-400">artist</p>
                    </div>
                  </div>

                  <div className="sea-song">
                    <img alt="" />
                    <div>
                      <p>Song.....................</p>
                      <p className="text-xs text-gray-400">artist</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-fit rounded-lg p-2 m-2 flex flex-col">
              <h1 className="my-2 text-white font-sans text-2xl font-semibold text-left">
                Albums
              </h1>
              <div className="h-fit rounded-lg text-concol flex overflow-x-auto">
                <div className="grid grid-rows-1 grid-cols-5 rounded-lg gap-2 min-w-max p-4 shadow-lg">
                  {/* {data.albums.map((album) => {
            <div className="music-card" key={album.id}>
              <img src={album.image[1].link} alt={album.id} />
              <div>
                <h3>{album.name}</h3>
                <p className="artist-name">{album.artists.name}</p>
              </div>
            </div>
          })}  CODE FOR MAPPING WITH LIST OF DATA*/}
                  <div className="music-card-container">
                    <div className="music-card">
                      <img /*src={album.image[1].link} alt={album.id}*/ />
                      <div>
                        <h3>Name</h3>
                        <p className="artist-name">artist name</p>
                      </div>
                    </div>
                  </div>
                  <div className="music-card-container">
                    <div className="music-card">
                      <img /*src={album.image[1].link} alt={album.id}*/ />
                      <div>
                        <h3>Name</h3>
                        <p className="artist-name">artist name</p>
                      </div>
                    </div>
                  </div>
                  <div className="music-card-container">
                    <div className="music-card">
                      <img /*src={album.image[1].link} alt={album.id}*/ />
                      <div>
                        <h3>Name</h3>
                        <p className="artist-name">artist name</p>
                      </div>
                    </div>
                  </div>
                  <div className="music-card-container">
                    <div className="music-card">
                      <img /*src={album.image[1].link} alt={album.id}*/ />
                      <div>
                        <h3>Name</h3>
                        <p className="artist-name">artist name</p>
                      </div>
                    </div>
                  </div>
                  <div className="music-card-container">
                    <div className="music-card">
                      <img /*src={album.image[1].link} alt={album.id}*/ />
                      <div>
                        <h3>Name</h3>
                        <p className="artist-name">artist name</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
