import { useState, useEffect } from "react";
import { getAlbumById } from "../services/data-api";

export default function useAlbum(id) {
    const [album, setAlbum] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                setIsLoading(true);
                const data = await getAlbumById(id);
                setAlbum(data);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchAlbum();
        }
    }, [id]);

    return { album, isLoading, error };
}
