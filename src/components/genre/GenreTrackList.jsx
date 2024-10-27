import React from "react";
import usePlayerStore from "../../store/use-player-store";
import TrackItem from "./TrackItem";

const GenreTrackList = ({ tracks }) => {
    const { currentTrack, isPlaying, playTrack } = usePlayerStore();

    const handlePlayTrack = (track) => {
        if (currentTrack?.id === track.id) {
            playTrack(track);
            return;
        }
        playTrack(track);
    };

    return (
        <div className="max-w-7xl mx-auto pb-16 px-4 sm:px-6 lg:px-8 pt-2">
            <div className="space-y-2">
                {tracks?.map((track) => (
                    <TrackItem
                        key={track.id}
                        track={track}
                        isCurrentTrack={currentTrack?.id === track.id}
                        isPlaying={isPlaying}
                        onPlay={handlePlayTrack}
                    />
                ))}
            </div>
        </div>
    );
};

export default GenreTrackList;
