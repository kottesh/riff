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
} from "lucide-react";

export const Controls = () => {
    const {
        isPlaying,
        isShuffled,
        repeatMode,
        togglePlay,
        playNext,
        playPrevious,
        toggleShuffle,
        cycleRepeatMode,
    } = usePlayerStore();

    const renderRepeatIcon = () => {
        switch (repeatMode) {
            case "ONE":
                return <Repeat1 className="w-5 h-5 text-white" />;
            case "ALL":
                return <Repeat className="w-5 h-5 text-white" />;
            default:
                return <Repeat className="w-5 h-5 text-gray-400" />;
        }
    };

    return (
        <div className="flex items-center justify-center gap-6">
            <button
                className={`p-2 rounded-full transition ${
                    isShuffled
                        ? "text-green-500"
                        : "text-neutral-400 hover:text-white"
                }`}
                onClick={toggleShuffle}
            >
                <Shuffle className="w-5 h-5" />
            </button>

            <button
                className="p-2 rounded-full text-neutral-400 hover:text-white transition"
                onClick={playPrevious}
            >
                <SkipBack className="w-5 h-5" />
            </button>

            <button
                className="p-3 rounded-full bg-white hover:scale-105 transition"
                onClick={togglePlay}
            >
                {isPlaying ? (
                    <Pause className="w-5 h-5 text-black" />
                ) : (
                    <Play className="w-5 h-5 text-black" />
                )}
            </button>

            <button
                className="p-2 rounded-full text-neutral-400 hover:text-white transition"
                onClick={playNext}
            >
                <SkipForward className="w-5 h-5" />
            </button>

            <button
                className={`p-2 rounded-full transition ${
                    repeatMode !== "OFF"
                        ? "text-green-500"
                        : "text-neutral-400 hover:text-white"
                }`}
                onClick={cycleRepeatMode}
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
