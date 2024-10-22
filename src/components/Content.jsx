import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAllalbums } from "../services/dataAPI";
import {albumData} from './musicPlayer/sampleSongData';
export default function Content() {
  const [ albums, setAlbums ] =useState(albumData);
  
  useEffect(()=>{
    const fetchAlbum = async () =>{
      try{
        const albums = await getAllalbums();
        setAlbums(albums);
      }catch(error){
        console.log("Error in API call : ",error.message);
      }
      
    }
  },[]);
  
  // const onClickAlbum = () => {
  //   const sam = {
  //     id: 1,
  //     artist: "Artist name",
  //     title: "Album name",
  //     year: "2010",
  //   };
  //   nav("/album/${sam.id}", { state: sam });
  // };
  console.log("Albums : ",albums);
  return (
    <div className="relative flex flex-1 lg:flex-grow font-raleway">
      <div className="flex-col flex-1 h-full mb-0 ml-60 rounded-md mt-3 p-3 overflow-y-auto">
        <h1 className=" text-white font-sans text-2xl font-semibold text-left">
          New Releases
        </h1>
        <div className="h-fit rounded-lg text-concol p-2 flex overflow-x-auto">
          <div className="grid grid-rows-1 grid-cols-5 rounded-lg gap-2 min-w-max p-4 shadow-lg shadow-gray-700/30">
            {/*} {albums.map((album) => {
            <div className="music-card" key={album.id} >
              <img src={album.coverUrl} alt={album.id} />
              <div>
                <h3>{album.title}</h3>
              </div>
            </div>
          })} */}
            
            <div className="music-card-container">
              <div className="music-card">
                <img  />
                <div>
                  <h3>Name</h3>
                  <p className="artist-name">artist name</p>
                </div>
              </div>
            </div>
            <div className="music-card-container">
              <div className="music-card">
                <img />
                <div>
                  <h3>Name</h3>
                  <p className="artist-name">artist name</p>
                </div>
              </div>
            </div> 
          </div>
        </div>
        <h1 className="mt-4 text-white font-sans text-2xl font-semibold text-left">
          Recommended Songs
        </h1>
        <div className="h-fit rounded-lg text-concol p-2 flex overflow-x-auto mb-20">
          <div className="grid grid-rows-1 grid-cols-5 rounded-lg gap-2 min-w-max p-4 shadow-lg shadow-gray-700/30">
            {/* {albums.map((album) => {
            <div className="music-card" key={album.id} onClick={onClickAlbum(album)}>
              <img src={album.image[1].link} alt={album.id} />
              <div>
                <h3>{album.name}</h3>
                <p className="artist-name">{album.artists.name}</p>
              </div>
            </div>
          })}  CODE FOR MAPPING WITH LIST OF DATA NAMED "albums" */}
            <div className="music-card-container" >
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
  );
}
