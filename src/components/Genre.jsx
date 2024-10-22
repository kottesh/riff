import React, { useEffect, useState } from "react";
import { getAllgenres } from '../services/dataAPI'
export default function Genre() {
  const [ genres, setGeneres ] = useState([{id : {}, name : {},image : {}}]);
  useEffect(()=>{
    const fetchGenres = async() =>{
      try{
        const data = await getAllgenres();
        setGeneres(data);
      }
      catch(error){
        console.log("Error in API call (genres) : ",error.message);
      }
      
    }
    fetchGenres();
    console.log(genres);
  },[])
  return (
    <div className="relative flex flex-1 lg:flex-grow font-raleway">
      <div className="flex-col flex-1 h-full mb-0 ml-60 rounded-md mt-3 p-3 overflow-y-auto">
        <h1 className="text-white font-sans text-2xl font-semibold text-left my-2 mt-4">
          Genres
        </h1>
        {/* <div className="h-fit p-3 flex flex-row text-white mb-0 overflow-y-auto no-scrollbar">
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
        </div> */}
        <div className="h-fit rounded-lg text-concol p-2 flex overflow-x-auto">
          <div className="grid grid-rows-2 grid-cols-4 rounded-lg gap-2 min-w-max p-4 shadow-lg">
             {genres.map((genre) => {
              <div className="music-card" key={genre.id}>
                <img src={genre.image} alt={genre.id} />
                <div>
                  <h3>{genre.name}</h3>
                </div>
              </div>
            })}  
          </div>
        </div>
      </div>
    </div>
  );
}
