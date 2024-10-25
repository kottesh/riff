import React from "react";
import { useParams } from "react-router-dom";
import { useAlbum } from "../hooks/useAlbum";
import { AlbumHeader } from "../components/album/AlbumHeader";
import { TrackList } from "../components/album/TrackList";
import usePlayerStore from "../store/usePlayerStore";

const Album = () => {
    const { id } = useParams();
    const { album, isLoading, error } = useAlbum(id);

    const {
        currentTrack,
        setQueue,
        setCurrentTrack,
        setCurrentIndex,
        playTrack,
        shuffleQueue,
    } = usePlayerStore();

    const handlePlay = () => {
        if (album?.tracks?.length) {
            setQueue(album.tracks);
            setCurrentTrack(album.tracks[0]);
            setCurrentIndex(0);
            playTrack();
        }
    };

    const handleShufflePlay = () => {
        if (album?.tracks?.length) {
            setQueue(album.tracks);
            shuffleQueue();
        }
    };

    const handleTrackPlay = (track, index) => {
        setQueue(album.tracks);
        setCurrentTrack(track);
        setCurrentIndex(index);
        playTrack();
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-full text-red-400">
                Error: {error}
            </div>
        );
    }

    if (!album) {
        return (
            <div className="flex items-center justify-center h-full text-gray-400">
                Album not found
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <AlbumHeader
                album={album}
                onPlay={handlePlay}
                onShufflePlay={handleShufflePlay}
            />
            <TrackList
                tracks={album.tracks}
                currentTrackId={currentTrack?.id}
                onTrackPlay={handleTrackPlay}
            />
        </div>
    );
};

export default Album;
