import React from "react";
import { Music, Play, Pause } from "lucide-react";
import usePlayerStore from "../../store/usePlayerStore";

const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export const Songs = ({ tracks = [] }) => {
    const { currentTrack, isPlaying, playTrack } = usePlayerStore();

    if (!tracks.length) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <Music className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-400">No songs found</p>
            </div>
        );
    }

    return (
        <div className="w-full px-4">
            <h2 className="text-white text-left text-2xl font-bold mb-6">
                Songs
            </h2>
            <div className="space-y-2">
                {tracks.map((track) => {
                    const isCurrentTrack = currentTrack?.id === track.id;

                    return (
                        <div
                            key={track.id}
                            className={`flex items-center p-3 rounded-xl hover:bg-gray-800/50 
                         transition-all duration-200 group cursor-pointer
                         ${
                             isCurrentTrack
                                 ? "bg-gray-800/30 ring-1 ring-gray-700"
                                 : ""
                         }`}
                        >
                            <button
                                onClick={() => playTrack(track)}
                                className="relative w-14 h-14 mr-4 rounded-lg overflow-hidden 
                           bg-gray-800 flex-shrink-0 group shadow-lg"
                            >
                                {track.coverUrl ? (
                                    <img
                                        src={track.coverUrl}
                                        alt={track.title}
                                        className="object-cover w-full h-full transform group-hover:scale-105
                               transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center w-full h-full">
                                        <Music className="w-6 h-6 text-gray-400" />
                                    </div>
                                )}
                                <div
                                    className={`absolute inset-0 flex items-center justify-center
                              bg-black/40 transition-opacity duration-200
                              ${
                                  isCurrentTrack
                                      ? "opacity-100"
                                      : "opacity-0 group-hover:opacity-100"
                              }`}
                                >
                                    {isCurrentTrack && isPlaying ? (
                                        <Pause className="w-6 h-6 text-white" />
                                    ) : (
                                        <Play className="w-6 h-6 text-white translate-x-0.5" />
                                    )}
                                </div>
                            </button>

                            <div className="flex-grow min-w-0">
                                <h3 className="text-left font-bold truncate text-white">
                                    {track.title}
                                </h3>
                                <p className="text-left font-medium text-sm text-gray-400 truncate">
                                    {track.artists
                                        ?.map((artist) => artist.name)
                                        .join(", ")}
                                </p>
                            </div>

                            <span className="text-sm text-gray-400 ml-4 font-medium">
                                {formatDuration(track.duration)}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
