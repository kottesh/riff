import React from "react";
import { useParams } from "react-router-dom";
import useGenre from "../hooks/use-genre";
import GenreHeader from "../components/genre/GenreHeader";
import GenreTrackList from "../components/genre/GenreTrackList";
import LoadingState from "../components/utils/LoadingState";
import ErrorState from "../components/utils/ErrorState";

const Genre = () => {
    const { id } = useParams();
    const { genre, isLoading, error } = useGenre(id);

    if (isLoading) {
        return <LoadingState />;
    }

    if (error || !genre) {
        return <ErrorState message={error || "Genre not found"} />;
    }

    return (
        <div className="min-h-screen bg-black text-white mb-16">
            <GenreHeader genre={genre} />
            <GenreTrackList tracks={genre.tracks} />
        </div>
    );
};

export default Genre;
