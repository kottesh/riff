import { create } from "zustand";
import { searchAPI } from "../services/data-api";

const validateSearchResults = (results, type) => {
    if (!results || !Array.isArray(results)) {
        console.warn(`Invalid ${type} results:`, results);
        return [];
    }
    return results;
};

const useSearchStore = create((set, get) => ({
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

    setSearchQuery: (query) => {
        console.log("Setting search query:", query);
        set({ searchQuery: query });
    },

    setActiveTab: (tab) => {
        console.log("Setting active tab:", tab);
        set({ activeTab: tab });
    },

    searchAll: async (query) => {
        if (!query?.trim()) {
            console.warn("Empty search query");
            return;
        }

        console.log("Starting search for:", query);
        set({ isLoading: true, error: null });

        try {
            const results = await Promise.all([
                searchAPI.searchTracks(query).catch((error) => {
                    console.error("Error fetching tracks:", error);
                    return [];
                }),
                searchAPI.searchArtists(query).catch((error) => {
                    console.error("Error fetching artists:", error);
                    return [];
                }),
                searchAPI.searchAlbums(query).catch((error) => {
                    console.error("Error fetching albums:", error);
                    return [];
                }),
                searchAPI.searchGenres(query).catch((error) => {
                    console.error("Error fetching genres:", error);
                    return [];
                }),
            ]);

            const [tracks, artists, albums, genres] = results;

            // Validate and log the results
            const validatedResults = {
                tracks: validateSearchResults(tracks, "tracks"),
                artists: validateSearchResults(artists, "artists"),
                albums: validateSearchResults(albums, "albums"),
                genres: validateSearchResults(genres, "genres"),
            };

            console.log("Search results:", validatedResults);

            set({
                searchResults: validatedResults,
                isLoading: false,
            });

            // Log the updated state
            const currentState = get();
            console.log("Updated state:", {
                query: currentState.searchQuery,
                results: currentState.searchResults,
                isLoading: currentState.isLoading,
            });
        } catch (error) {
            console.error("Search failed:", error);
            set({
                error: error.message || "Search failed",
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

    clearSearch: () => {
        console.log("Clearing search");
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
        });
    },
}));

export default useSearchStore;
