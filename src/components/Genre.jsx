import React from "react";

export default function Genre() {
  return (
    <div className="relative flex flex-1 lg:flex-grow font-raleway">
      <div className="flex-col flex-1 h-full mb-0 ml-60 rounded-md mt-3 p-3 overflow-y-auto">
        <h1 className="text-white font-sans text-2xl font-semibold text-left my-2 mt-4">
          Genres
        </h1>
        <div className="h-fit p-3 flex flex-row text-white mb-0 overflow-y-auto no-scrollbar">
          <p className="cat-btn ">All</p>
          <p className="cat-btn">Pop</p>
          <p className="cat-btn">Hip Hop</p>
          <p className="cat-btn">Rock</p>
          <p className="cat-btn">Party</p>
          <p className="cat-btn">Dance</p>
          <p className="cat-btn">Chill</p>
          <p className="cat-btn">Sleep</p>
          <p className="cat-btn">Jazz</p>
          <p className="cat-btn">Metal</p>
        </div>
        <div className="h-fit rounded-lg text-concol p-2 flex overflow-x-auto">
          <div className="grid grid-rows-2 grid-cols-5 rounded-lg gap-2 min-w-max p-4 shadow-lg">
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
  );
}
