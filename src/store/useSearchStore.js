import { create } from "zustand";
import { searchAPI } from "../services/dataAPI";

const useSearchStore = create((set) => ({
    searchQuery: "",
    searchResults: {
        tracks: [],
        artists: [],
        albums: [],
        genres: [],
    },
    activeTab: "all",
    isLoading: false,
    error: null,
    pagination: {
        tracks: null,
        artists: null,
        albums: null,
        genres: null,
    },

    setSearchQuery: (query) => set({ searchQuery: query }),
    setActiveTab: (tab) => set({ activeTab: tab }),

    searchAll: async (query) => {
        set({ isLoading: true, error: null });
        try {
            const [tracks, artists, albums, genres] = await Promise.all([
                searchAPI.searchTracks(query),
                searchAPI.searchArtists(query),
                searchAPI.searchAlbums(query),
                searchAPI.searchGenres(query),
            ]);

            set({
                searchResults: { tracks, artists, albums, genres },
                isLoading: false,
            });
        } catch (error) {
            set({
                error: error.message,
                isLoading: false,
                searchResults: {
                    tracks: [],
                    artists: [],
                    albums: [],
                    genres: [],
                },
            });
        }
    },

    clearSearch: () =>
        set({
            searchQuery: "",
            searchResults: {
                tracks: [],
                artists: [],
                albums: [],
                genres: [],
            },
            pagination: {
                tracks: null,
                artists: null,
                albums: null,
                genres: null,
            },
        }),
}));

export default useSearchStore;
