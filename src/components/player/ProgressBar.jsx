import React from "react";
import usePlayerStore from "../../store/usePlayerStore";

const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const ProgressBar = () => {
    const { progress, duration, seekTo } = usePlayerStore();

    const handleSeek = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        seekTo(percent * duration);
    };

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400 min-w-[40px]">
                {formatTime(progress)}
            </span>

            <div
                className="flex-1 h-1 bg-gray-800 rounded-full cursor-pointer group"
                onClick={handleSeek}
            >
                <div
                    className="h-full bg-purple-500 rounded-full group-hover:bg-purple-400 transition-colors"
                    style={{ width: `${(progress / duration) * 100}%` }}
                />
            </div>

            <span className="text-sm text-gray-400 min-w-[40px]">
                {formatTime(duration)}
            </span>
        </div>
    );
};
