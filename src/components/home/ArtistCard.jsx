import React from "react";
import { useNavigate } from "react-router-dom";
import { Play, Pause, UserRound, Loader2 } from "lucide-react";
import usePlayerStore from "../../store/use-player-store";

const ArtistCard = ({ artist }) => {
    const navigate = useNavigate();
    const {
        playTrack,
        pauseTrack,
        isPlaying,
        currentTrack,
        isLoading,
        clearQueue,
        addToQueue,
    } = usePlayerStore();

    const currentTrackArtistId = currentTrack?.artistId;
    const isCurrentArtist = currentTrackArtistId === artist.id;
    const hasTracks = artist.tracks && artist.tracks.length > 0;

    // Only show loading for the current artist being processed
    const showLoading = isLoading && isCurrentArtist;

    const handleTogglePlay = (e) => {
        e.stopPropagation();
        if (!hasTracks) return;

        try {
            if (isCurrentArtist) {
                // If it's the current artist, simply toggle play/pause
                if (isPlaying) {
                    pauseTrack();
                } else {
                    // Resume playing the current track
                    playTrack(currentTrack);
                }
            } else {
                // If it's a different artist, load their tracks
                clearQueue();
                const tracks = [...artist.tracks]; // Create a copy to avoid mutations
                addToQueue(tracks);
                playTrack(tracks[0]);
            }
        } catch (error) {
            console.error("Error toggling playback:", error);
        }
    };

    return (
        <div className="relative cursor-pointer">
            <div
                className="relative aspect-square w-full"
                onClick={() => navigate(`/artist/${artist.id}`)}
            >
                <div className="w-full h-full rounded-full overflow-hidden">
                    {artist.image ? (
                        <img
                            src={artist.image}
                            alt={artist.name}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                            <UserRound className="w-1/2 h-1/2 text-gray-400" />
                        </div>
                    )}
                </div>

                {hasTracks && (
                    <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button
                            onClick={handleTogglePlay}
                            disabled={showLoading}
                            className="p-3 bg-purple-500 rounded-full hover:bg-purple-400 transform transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-purple-500/25"
                        >
                            {showLoading ? (
                                <Loader2 className="w-5 h-5 text-white animate-spin" />
                            ) : isCurrentArtist && isPlaying ? (
                                <Pause
                                    className="w-5 h-5 text-white"
                                    fill="white"
                                />
                            ) : (
                                <Play
                                    className="w-5 h-5 text-white"
                                    fill="white"
                                />
                            )}
                        </button>
                    </div>
                )}

                {isCurrentArtist && isPlaying && (
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

            <h3 className="mt-4 text-white font-medium truncate text-center">
                {artist.name}
            </h3>
        </div>
    );
};

export default ArtistCard;
