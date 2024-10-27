import { SiComsol } from "react-icons/si";
import { Songs } from "../components/search/Songs";
import api from "./axios";

export const searchAPI = {
    searchTracks: async (query) => {
        const { tracks } = await api.get(
            `/api/song?search=${encodeURIComponent(query)}`
        );
        return tracks || [];
    },

    searchArtists: async (query) => {
        const artists = await api.get(
            `/api/artist/search?query=${encodeURIComponent(query)}`
        );

        console.log(artists);
        return artists.data || [];
    },

    searchAlbums: async (query) => {
        const albums = await api.get(
            `/api/album/search?query=${encodeURIComponent(query)}`
        );
        return albums.data || [];
    },

    searchGenres: async (query) => {
        const genres = await api.get(
            `/api/genre?search=${encodeURIComponent(query)}`
        );
        return genres.data || [];
    },
};

export const songsAPI = {
    getSongsByArtist: async (id) => {
        try {
            const songs = await api.get(`/api/song/artist/${id}`);
            return songs.tracks || [];
        } catch (error) {
            console.log("Failed fetching songs by artist : ", error.message);
        }
    },
};

export const artistAPI = {
    getArtistById: async (id) => {
        try {
            const artist = await api.get(`api/artist/${id}`);
            return artist.data || [];
        } catch (error) {
            console.log("Failed fetching artist by ID");
        }
    },
};

export const albumAPI = {
    getAlbumsByArtist: async (id) =>{
        try{
            const albums = await api.get(`/api/album/artist/${id}`);
            return albums.albums || [];
        }catch(error){
            console.log("Failed fetching albums by artist ID:",error.message)
        }
    }
}

