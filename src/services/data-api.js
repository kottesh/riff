import api from "../utils/axios";

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
        const response = await api.get(
            `/api/genre?search=${encodeURIComponent(query)}`
        );
        return response.genres || [];
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

export async function getAlbumById(id) {
    try {
        const response = await api.get(`api/album/${id}`);
        return response;
    } catch (error) {
        console.log("Error in fetching album by id:", error.message);
    }
}

export async function getGenreById(id) {
    try {
        const response = await api.get(`api/genre/${id}`);
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error fetching genre by id: ", error.message);
    }
}

export async function getAllsongs() {
    try {
        const response = await api.get("/api/song");
        return response.tracks;
    } catch (error) {
        console.log("Fetching error (songs) : ", error.message);
    }
}

export async function getAllgenres() {
    try {
        const response = await api.get("/api/genre");
        return response.genres;
    } catch (error) {
        console.log("Error in fetching genres:", error.message);
    }
}

export async function getAllalbums() {
    try {
        const response = await api.get("/api/album");
        return response.data;
    } catch (error) {
        console.log("Error in fetching genres:", error.message);
    }
}

export async function getArtistById(id) {
    try {
        const response = await api.get(`/api/artist/${id}`);
        return response.data;
    } catch (error) {
        console.log("Error in fetching artist by id:", error.message);
    }
}
