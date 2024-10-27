import React from "react";
import usePlayerStore from "../../store/use-player-store";
import { Music, Play, Pause } from "lucide-react";
import { formatDuration } from "../../utils/format-duration";
import { sortTracksByLatest } from "../../utils/sort-tracks";
import { useState } from "react";
import { use } from "framer-motion/client";
import { AlertCircle } from "lucide-react";
import { artistAPI } from "../../services/data-api";
import { useNavigate } from "react-router-dom";

export default function ArtistSongs({ tracks = [] }) {
    const { currentTrack, isPlaying, playTrack } = usePlayerStore();
    const sortedTracks = sortTracksByLatest(tracks);
    const [showAll, setShowAll] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const displayedTracks = showAll ? sortedTracks : sortedTracks.slice(0, 5);
    const navigate = useNavigate();
    if (!sortedTracks.length) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <Music className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-400">No songs found</p>
            </div>
        );
    }
    const handleArtistClick = (artistId, e) => {
        e.stopPropagation();
        navigate(`/artist/${artistId}`);
    };

    return (
        <div className="w-full px-4 pr-12 pl-12">
            <h2 className="text-white text-left text-2xl font-bold mb-6">
                Songs
            </h2>
            {isLoading ? (
                <div>
                    <div className="space-y-2 mr-3">
                        {displayedTracks.map((track) => {
                            const isCurrentTrack =
                                currentTrack?.id === track.id;
                            return (
                                <div
                                    key={track.id}
                                    className={`flex items-center p-3 rounded-xl hover:bg-gray-100/30 
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
                                            {track.artists?.map(
                                                (artist, index) => (
                                                    <React.Fragment
                                                        key={artist.id}
                                                    >
                                                        <button
                                                            onClick={(e) =>
                                                                handleArtistClick(
                                                                    artist.id,
                                                                    e
                                                                )
                                                            }
                                                            className="hover:text-white hover:underline transition-colors"
                                                        >
                                                            {artist.name}
                                                        </button>
                                                        {index <
                                                            track.artists
                                                                .length -
                                                                1 && ", "}
                                                    </React.Fragment>
                                                )
                                            )}
                                        </p>
                                    </div>

                                    <span className="text-sm text-gray-400 ml-4 font-medium">
                                        {formatDuration(track.duration)}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                    {sortedTracks.length > 5 && (
                        <button
                            onClick={() => setShowAll((prev) => !prev)}
                            className="px-4 py-2 mt-5 text-sm text-white font-bold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-black
                        shrink-0
                    "
                        >
                            {showAll ? "View Less" : "View More"}
                        </button>
                    )}
                </div>
            ) : (
                <div>
                    <AlertCircle className="h-5 w-5" />
                </div>
            )}
        </div>
    );
}
