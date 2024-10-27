import React from "react";
import { Play, Pause } from "lucide-react";
import { formatDuration } from "../../utils/format-duration";

const TrackItem = ({ track, isCurrentTrack, isPlaying, onPlay }) => {
    const isThisPlaying = isCurrentTrack && isPlaying;

    return (
        <div
            className="flex items-center space-x-4 p-4 hover:bg-white/5 rounded-lg transition cursor-pointer group"
            onClick={() => onPlay(track)}
        >
            <div className="relative w-12 h-12 flex-shrink-0">
                {track.coverUrl && (
                    <img
                        src={track.coverUrl}
                        alt={track.title}
                        className="w-full h-full object-cover rounded"
                    />
                )}
                <div
                    className={`absolute inset-0 flex items-center justify-center bg-black/40 transition ${
                        isCurrentTrack
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                    }`}
                >
                    {isThisPlaying ? (
                        <Pause className="w-6 h-6" />
                    ) : (
                        <Play className="w-6 h-6" />
                    )}
                </div>
            </div>

            <div className="text-left flex-grow min-w-0">
                <h3
                    className={`text-base font-bold truncate ${
                        isCurrentTrack ? "text-rose-400" : "text-white"
                    }`}
                >
                    {track.title}
                </h3>
                <p className="text-sm text-gray-400 truncate">
                    {track.artists?.map((artist) => artist.name).join(", ")}
                </p>
            </div>

            <div className="text-sm text-gray-400">
                {formatDuration(track.duration)}
            </div>
        </div>
    );
};

export default TrackItem;
