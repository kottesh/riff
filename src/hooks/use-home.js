import { useState, useEffect } from "react";
import { getAllsongs, getAllAlbums, artistAPI } from "../services/data-api";

export const useHome = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState({
        featuredTracks: [],
        popularAlbums: [],
        popularArtists: [],
        recentTracks: [],
    });

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                setIsLoading(true);

                const [tracks, albums, artists] = await Promise.all([
                    getAllsongs(),
                    getAllAlbums(),
                    artistAPI.getAllArtist(),
                ]);

                // TODO: setup the users and replace this with the users recent data.
                const recentTracks = tracks ? tracks.slice(0, 8) : [];

                setData({
                    recentTracks: recentTracks,
                    featuredTracks: tracks ? tracks.slice(0, 10) : [],
                    popularAlbums: albums ? albums.slice(0, 12) : [],
                    popularArtists: artists ? artists.slice(0, 12) : [],
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHomeData();
    }, []);

    return { data, isLoading, error };
};
