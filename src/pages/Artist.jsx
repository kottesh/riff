import React from "react";
import ArtistInfo from "../components/artist/artistInfo";
import ArtistSongs from "../components/artist/ArtistSongs";
import ArtistAlbums from "../components/artist/ArtistAlbums";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { artistAPI, songsAPI, albumAPI } from "../services/data-api";
import { getDominantColor } from "../utils/extractColor";
export default function Artist() {
    const { id } = useParams();
    const [tracks, setTracks] = useState([]);
    const [ albums, setAlbums ] =useState();
    const [artist, setArtist] = useState(null);
    const [themeColor, setThemeColor] = useState(null);
    useEffect(() => {
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

        fetchArtist(id);
        fetchSongs(id);
        fetchAlbums(id);
    }, [id]);
    
    useEffect(() => {
        const fetchColor = async (artist) => {
            try {
                if (artist && artist.image) {
                    const dominantColor = await getDominantColor(artist.image);
                    setThemeColor(dominantColor);
                    console.log("Dominant Color:", dominantColor);
                }
            } catch (error) {
                console.error("Failed to get dominant color:", error);
            }
        };

        
        if (artist) {
            fetchColor(artist);
        }
    }, [artist]); 

    console.log("Songs by artist from page ",tracks);
    return (
        <div
            style={{
                background: `linear-gradient(to bottom, 
                ${themeColor} 0%, 
                ${themeColor} 10%, 
                rgba(24, 27, 34, 255) 50%, 
                rgba(24, 27, 34, 255) 100%
            )`,
            }}
            className="w-3/4 h-fit rounded-lg rounded-b-none"
        >
            <div className="container mx-8 max-w-7xl px-4 pb-16">
                <ArtistInfo artist={artist} />
                <ArtistSongs tracks={tracks} />
                <ArtistAlbums albums={albums} color={themeColor}/>
            </div>
        </div>
    );
}
