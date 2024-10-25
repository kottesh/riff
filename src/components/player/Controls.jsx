import React from "react";
import usePlayerStore from "../../store/usePlayerStore";
import {
    Shuffle,
    SkipBack,
    SkipForward,
    Play,
    Pause,
    Repeat,
    Repeat1,
    Loader,
} from "lucide-react";

export const Controls = () => {
    const {
        isPlaying,
        isShuffled,
        repeatMode,
        isLoading,
        togglePlay,
        playNext,
        playPrevious,
        toggleShuffle,
        toggleRepeatMode,
    } = usePlayerStore();

    return (
        <div className="flex items-center justify-center gap-6">
            <button
                className={`p-2 rounded-full transition ${
                    isShuffled
                        ? "text-green-500"
                        : "text-neutral-400 hover:text-white"
                }`}
                onClick={toggleShuffle}
                disabled={isLoading}
            >
                <Shuffle className="w-5 h-5" />
            </button>

            <button
                className="p-2 rounded-full text-neutral-400 hover:text-white transition"
                onClick={playPrevious}
                disabled={isLoading}
            >
                <SkipBack className="w-5 h-5" />
            </button>

            <button
                className="p-3 rounded-full bg-white hover:scale-105 transition disabled:opacity-50 disabled:hover:scale-100"
                onClick={togglePlay}
                disabled={isLoading}
            >
                {isLoading ? (
                    <Loader className="w-5 h-5 text-black animate-spin" />
                ) : isPlaying ? (
                    <Pause className="w-5 h-5 text-black" />
                ) : (
                    <Play className="w-5 h-5 text-black" />
                )}
            </button>

            <button
                className="p-2 rounded-full text-neutral-400 hover:text-white transition"
                onClick={playNext}
                disabled={isLoading}
            >
                <SkipForward className="w-5 h-5" />
            </button>

            <button
                className={`p-2 rounded-full transition ${
                    repeatMode !== "OFF"
                        ? "text-green-500"
                        : "text-neutral-400 hover:text-white"
                }`}
                onClick={toggleRepeatMode}
                disabled={isLoading}
            >
                {repeatMode === "ONE" ? (
                    <Repeat1 className="w-5 h-5" />
                ) : (
                    <Repeat className="w-5 h-5" />
                )}
            </button>
        </div>
    );
};
