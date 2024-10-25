import React, { useState, useRef } from "react";
import { Rewind, FastForward } from "lucide-react";
import usePlayerStore from "../../store/usePlayerStore";

const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const ProgressBar = () => {
    const { progress, duration, seekTo } = usePlayerStore();
    const [isDragging, setIsDragging] = useState(false);
    const progressBarRef = useRef(null);

    const handleSeek = (clientX) => {
        const rect = progressBarRef.current.getBoundingClientRect();
        const percent = Math.max(
            0,
            Math.min(1, (clientX - rect.left) / rect.width)
        );
        seekTo(percent * duration);
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        handleSeek(e.clientX);
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            handleSeek(e.clientX);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const seekForward = () => {
        seekTo(Math.min(duration, progress + 10));
    };

    const seekBackward = () => {
        seekTo(Math.max(0, progress - 10));
    };

    React.useEffect(() => {
        if (isDragging) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
            return () => {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
            };
        }
    }, [isDragging]);

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={seekBackward}
                className="p-1 hover:bg-gray-700 text-white rounded-full transition-colors"
            >
                <Rewind size={16} />
            </button>

            <span className="text-sm text-gray-400 min-w-[40px]">
                {formatTime(progress)}
            </span>

            <div
                ref={progressBarRef}
                className="flex-1 h-2 bg-gray-800 rounded-full cursor-pointer group relative"
                onMouseDown={handleMouseDown}
            >
                <div
                    className="h-full bg-purple-500 rounded-full group-hover:bg-purple-400 transition-colors relative"
                    style={{ width: `${(progress / duration) * 100}%` }}
                >
                    <div
                        className={`absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full transform scale-0 group-hover:scale-100 transition-transform ${
                            isDragging ? "scale-100" : ""
                        }`}
                    />
                </div>
            </div>

            <span className="text-sm text-gray-400 min-w-[40px]">
                {formatTime(duration)}
            </span>

            <button
                onClick={seekForward}
                className="p-1 text-white hover:bg-gray-700 rounded-full transition-colors"
            >
                <FastForward size={16} />
            </button>
        </div>
    );
};

export default ProgressBar;
