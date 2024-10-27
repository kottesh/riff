import React from "react";
import { Clock, Play, Pause, Music, Loader2 } from "lucide-react";
import usePlayerStore from "../../store/use-player-store";
import { formatDuration } from "../../utils/format-duration";

const TrackCard = ({ track }) => {
    const { playTrack, pauseTrack, isPlaying, currentTrack, isLoading } =
        usePlayerStore();
    const isCurrentTrack = currentTrack?.id === track.id;
    const showPauseIcon = isCurrentTrack && isPlaying;

    const handlePlayPause = async (e) => {
        e.stopPropagation();

        try {
            // if (isCurrentTrack) {
            //     if (isPlaying) {
            //         await playTrack(track);
            //     } else {
            //         await playTrack(track);
            //     }
            // } else {
            //     await playTrack(track);
            // }
            playTrack(track);
        } catch (error) {
            console.error("Error handling playback:", error);
        }
    };

    return (
        <div className="relative p-4 rounded-2xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/10 cursor-pointer">
            <div className="relative aspect-square mb-4 rounded-xl overflow-hidden shadow-xl">
                {track.coverUrl ? (
                    <img
                        src={track.coverUrl}
                        alt={track.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                        <Music className="w-1/3 h-1/3 text-gray-400" />
                    </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                        onClick={handlePlayPause}
                        disabled={isLoading}
                        className="p-4 bg-purple-500 rounded-full opacity-0 hover:opacity-100 transition-all duration-300 hover:bg-purple-400 shadow-xl hover:shadow-purple-500/25 transform hover:scale-105"
                    >
                        {isLoading ? (
                            <Loader2 className="w-6 h-6 text-white animate-spin" />
                        ) : showPauseIcon ? (
                            <Pause
                                className="w-6 h-6 text-white"
                                fill="white"
                            />
                        ) : (
                            <Play className="w-6 h-6 text-white" fill="white" />
                        )}
                    </button>
                </div>

                {isCurrentTrack && isPlaying && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                        <div className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                                <span
                                    key={i}
                                    className="w-1 h-1 bg-purple-500 rounded-full animate-bounce shadow-lg shadow-purple-500/50"
                                    style={{ animationDelay: `${i * 150}ms` }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <h3 className="text-white font-medium truncate hover:text-purple-400 transition-colors duration-300">
                    {track.title}
                </h3>
                <div className="flex items-center justify-between">
                    <p className="text-gray-400 text-sm truncate hover:text-gray-300 transition-colors duration-300">
                        {track.artistName}
                    </p>
                    <div className="text-gray-400 text-sm flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatDuration(track.duration)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrackCard;
