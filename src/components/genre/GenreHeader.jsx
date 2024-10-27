import React from "react";
import { Music, Play, Pause, Shuffle, Clock } from "lucide-react";
import Button from "../utils/Button";
import usePlayerStore from "../../store/use-player-store";
import { formatDuration } from "../../utils/format-duration";

const GenreHeader = ({ genre }) => {
    const { addToQueue, playTrack, clearQueue, currentTrack, isPlaying } =
        usePlayerStore();

    // Calculate total duration in seconds
    const totalDurationSeconds = genre.tracks?.reduce(
        (acc, track) => acc + (track.duration || 0),
        0
    );

    const isCurrentGenrePlaying =
        currentTrack &&
        genre.tracks.some((track) => track.id === currentTrack.id) &&
        isPlaying;

    const isFromCurrentGenre =
        currentTrack &&
        genre.tracks.some((track) => track.id === currentTrack.id);

    const handlePlayGenre = () => {
        if (isCurrentGenrePlaying && currentTrack) {
            playTrack(currentTrack);
            return;
        }

        if (isFromCurrentGenre && currentTrack) {
            playTrack(currentTrack);
            return;
        }

        clearQueue();
        addToQueue(genre.tracks);
        playTrack(genre.tracks[0]);
    };

    const handleShuffleGenre = () => {
        const shuffledTracks = [...genre.tracks]
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);

        clearQueue();
        addToQueue(shuffledTracks);
        playTrack(shuffledTracks[0]);
    };

    return (
        <div className="relative h-80 overflow-hidden pt-8">
            <div className="absolute inset-0">
                {genre.image && (
                    <>
                        <div
                            className="absolute inset-0 scale-110"
                            style={{
                                backgroundImage: `url(${genre.image})`,
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                filter: "blur(20px)",
                                transform: "scale(1.1)",
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
                    </>
                )}
            </div>

            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="absolute top-6 left-8 flex items-start space-x-6">
                    <div className="w-44 h-44 flex-shrink-0 overflow-hidden rounded-lg shadow-2xl">
                        {genre.image && (
                            <img
                                src={genre.image}
                                alt={genre.name}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>

                    <div className="text-left flex flex-col justify-end pt-2">
                        <p className="text-sm font-semibold tracking-wider text-gray-300">
                            Genre
                        </p>
                        <h1 className="mt-1 text-5xl font-bold text-white">
                            {genre.name}
                        </h1>
                        <div className="mt-3 flex items-center space-x-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <Music className="w-5 h-5 text-gray-300" />
                                    <span className="text-gray-300">
                                        {genre.tracks?.length} tracks
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Clock className="w-5 h-5 text-gray-300" />
                                    <span className="text-gray-300">
                                        {formatDuration(totalDurationSeconds)}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Button
                                    size="lg"
                                    variant="primary"
                                    onClick={handlePlayGenre}
                                >
                                    {isCurrentGenrePlaying ? (
                                        <Pause className="w-5 h-5" />
                                    ) : (
                                        <Play className="w-5 h-5" />
                                    )}
                                </Button>
                                <Button
                                    size="lg"
                                    variant="secondary"
                                    onClick={handleShuffleGenre}
                                >
                                    <Shuffle className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenreHeader;
