import React from "react";
import usePlayerStore from "../../store/usePlayerStore";
import { Volume2, VolumeX, Volume1 } from "lucide-react";

export const VolumeControl = () => {
    const { volume, setVolume } = usePlayerStore();

    const renderVolumeIcon = () => {
        if (volume === 0) {
            return <VolumeX className="w-5 h-5 text-gray-400" />;
        } else if (volume > 0 && volume <= 0.5) {
            return <Volume1 className="w-5 h-5 text-gray-400" />;
        } else {
            return <Volume2 className="w-5 h-5 text-gray-400" />;
        }
    };

    return (
        <div className="flex items-center gap-2">
            <button
                className="p-2 rounded-full hover:bg-gray-800"
                onClick={() => setVolume(volume === 0 ? 1 : 0)}
            >
                {renderVolumeIcon()}
            </button>
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-24 accent-purple-500"
            />
        </div>
    );
};
