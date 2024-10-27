import { useState, useEffect } from "react";
import axios from "../services/axios";

export const useAlbum = (id) => {
    const [artist, setArtist] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtist = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`http://localhost:3000/api/artist/${id}`);
                setArtist(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArtist();
    }, [id]);

    return { artist, isLoading, error };
};
