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

export async function getAllsongs() {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/song`
        );
        const data = await response.json();
        return data.tracks;
    } catch (error) {
        console.log("Fetching error (songs) : ", error.message);
    }
}

export async function getAllgenres() {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/genre`
        );
        const data = await response.json();
        return data.genres;
    } catch (error) {
        console.log("Error in fetching genres:", error.message);
    }
}

export async function getAllalbums() {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/album`
        );
        const data = await response.json();
        return data.album;
    } catch (error) {
        console.log("Error in fetching genres:", error.message);
    }
}

export async function getArtistById(id) {
    try {
        const response = await fetch(
            `${import.meta.VITE_BACKEND_URL}/api/artist/${id}`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error in fetching artist by id:", error.message);
    }
}

export async function getAlbumById(id) {
    try {
        const response = await fetch(
            `${import.meta.VITE_BACKEND_URL}/api/album/${id}`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error in fetching album by id:", error.message);
    }
}
