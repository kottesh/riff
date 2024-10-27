import React, { useState, useRef } from "react";
import usePlayerStore from "../../store/use-player-store";
import { Volume2, VolumeX, Volume1 } from "lucide-react";

export const VolumeControl = () => {
    const { volume, setVolume } = usePlayerStore();
    const [isDragging, setIsDragging] = useState(false);
    const volumeBarRef = useRef(null);

    const handleVolumeChange = (clientX) => {
        const rect = volumeBarRef.current.getBoundingClientRect();
        const percent = Math.max(
            0,
            Math.min(1, (clientX - rect.left) / rect.width)
        );
        setVolume(percent);
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        handleVolumeChange(e.clientX);
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            handleVolumeChange(e.clientX);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
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
        <div className="flex items-center gap-4">
            <button
                onClick={() => setVolume(volume === 0 ? 1 : 0)}
                className="p-1 hover:bg-gray-700 rounded-full transition-colors"
            >
                {volume === 0 ? (
                    <VolumeX size={16} className="text-gray-400" />
                ) : volume <= 0.5 ? (
                    <Volume1 size={16} className="text-gray-400" />
                ) : (
                    <Volume2 size={16} className="text-gray-400" />
                )}
            </button>

            <div className="w-24">
                <div
                    ref={volumeBarRef}
                    className="h-2 bg-gray-800 rounded-full cursor-pointer group relative"
                    onMouseDown={handleMouseDown}
                >
                    <div
                        className="h-full bg-purple-500 rounded-full group-hover:bg-purple-400 transition-colors relative"
                        style={{ width: `${volume * 100}%` }}
                    >
                        <div
                            className={`absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full transform scale-0 group-hover:scale-100 transition-transform ${
                                isDragging ? "scale-100" : ""
                            }`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VolumeControl;
