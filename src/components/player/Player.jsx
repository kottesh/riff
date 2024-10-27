import React, { useEffect } from "react";
import usePlayerStore from "../../store/use-player-store";
import { Controls } from "./Controls";
import { VolumeControl } from "./VolumeControl";
import { ProgressBar } from "./ProgressBar";
import { useNavigate } from "react-router-dom";

const Player = () => {
    const navigate = useNavigate();
    const { currentTrack, initializeAudio } = usePlayerStore();
    useEffect(() => {
        initializeAudio();
    }, []);

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 shadow-lg h-24">
            <div className="flex items-center h-full px-4 gap-4">
                <div className="flex items-center gap-4 flex-1">
                    <div className="relative w-16 h-16">
                        {currentTrack ? (
                            <img
                                src={currentTrack.coverUrl}
                                alt={currentTrack.title}
                                className="h-16 w-16 rounded-lg object-cover"
                                onError={(e) => {
                                    e.target.src = "/placeholder-music.png";
                                }}
                            />
                        ) : (
                            <div className="h-16 w-16 rounded-lg bg-gray-800 flex items-center justify-center">
                                <svg
                                    className="w-8 h-8 text-gray-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                                    />
                                </svg>
                            </div>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-left text-white truncate">
                            {currentTrack?.title || "No track selected"}
                        </h3>
                        <p className="text-sm text-left text-gray-400 truncate">
                            {currentTrack?.artists?.map((artist, index) => (
                                <React.Fragment key={artist.id}>
                                    <span
                                        className="hover:underline cursor-pointer"
                                        onClick={() =>
                                            navigate(`/artist/${artist.id}`)
                                        }
                                    >
                                        {artist.name}
                                    </span>
                                    {index < currentTrack.artists.length - 1
                                        ? ", "
                                        : ""}
                                </React.Fragment>
                            )) || "Unknown artist"}
                        </p>
                    </div>
                </div>

                <div className="flex-1 max-w-2xl">
                    <div className="flex flex-col gap-2">
                        <Controls />
                        <ProgressBar />
                    </div>
                </div>

                <div className="flex-1 flex justify-end">
                    <VolumeControl />
                </div>
            </div>
        </div>
    );
};

export default Player;
