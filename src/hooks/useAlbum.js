import { useState, useEffect } from "react";
import axios from "../services/axios";

export const useAlbum = (id) => {
    const [album, setAlbum] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`http://localhost:3000/api/album/${id}`);
                setAlbum(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAlbum();
    }, [id]);

    return { album, isLoading, error };
};
