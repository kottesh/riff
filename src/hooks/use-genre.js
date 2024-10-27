import { useState, useEffect } from "react";
import { getGenreById } from "../services/data-api";

const useGenre = (id) => {
    const [genre, setGenre] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        const fetchGenre = async () => {
            try {
                const response = await getGenreById(id);
                if (response.genre) {
                    setGenre(response.genre);
                } else {
                    setError("No genre data received");
                }
            } catch (error) {
                console.error("Error fetching genre: ", error);
                setError(error?.response?.message || "Failed to load genre");
            } finally {
                setIsLoading(false);
            }
        };
        if (id) fetchGenre();
        else {
            setError("No genre ID provided");
            setIsLoading(false);
        }
    }, [id]);

    return { genre, isLoading, error };
};

export default useGenre;
