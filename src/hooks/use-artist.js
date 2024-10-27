import { useState, useEffect } from "react";
import axios from "../services/axios";
import { artistAPI, songsAPI, albumAPI } from "../services/data-api";

export const useArtist = (id) => {
    const [tracks, setTracks] = useState([]);
    const [ albums, setAlbums ] =useState();
    const [artist, setArtist] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        const fetchArtist = async (id) => {
            try {
                const art = await artistAPI.getArtistById(id);
                setArtist(art);
            } catch (error) {
                console.log(
                    "Error fetching data from API call (Artist by Id) : ",
                    error.message
                );
            }
        };
        const fetchSongs = async (id) => {
            try {
                const songs = await songsAPI.getSongsByArtist(id);
                setTracks(songs);
            } catch (error) {
                console.log("Error fetching from API call (songs by artist):", error.message);
            }
        };
        const fetchAlbums = async (id) =>{
            try{
                const albs = await albumAPI.getAlbumsByArtist(id);
                setAlbums(albs);
            }catch(error){
                console.log("Error fetching from API call (albums by artist):", error.message);
            }
        }

        const fetchAllData = async () => {
            try {
              await Promise.all([fetchArtist(id), fetchSongs(id), fetchAlbums(id)]);
            } catch (error) {
              console.error("Error fetching one or more API calls:", error.message);
            } finally {
              setIsLoading(false);  
            }
          };
      
        fetchAllData();
    }, [id]);
   
    return { artist, tracks, albums, isLoading, error };
};
