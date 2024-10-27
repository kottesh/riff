import React from "react";
import { Play, Clock, Music } from "lucide-react";
import { formatDuration } from "../../utils/format-duration";
import usePlayerStore from "../../store/use-player-store";
import { useNavigate } from "react-router-dom";

const PlayingAnimation = () => (
    <div className="flex items-center gap-0.5 h-3">
        <span className="w-0.5 h-full bg-purple-500 animate-music-bar-1" />
        <span className="w-0.5 h-full bg-purple-500 animate-music-bar-2" />
        <span className="w-0.5 h-full bg-purple-500 animate-music-bar-3" />
        <span className="w-0.5 h-full bg-purple-500 animate-music-bar-4" />
    </div>
);

export const RecentlyPlayed = ({ tracks }) => {
    const { currentTrack, isPlaying, playTrack } = usePlayerStore();
    const navigate = useNavigate();

    if (!tracks?.length) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <Music className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-400">No recently played tracks</p>
            </div>
        );
    }

    const handlePlay = (track, e) => {
        e.stopPropagation();
        playTrack(track);
    };

    const handleArtistClick = (artistId, e) => {
        e.stopPropagation();
        navigate(`/artist/${artistId}`);
    };

    return (
        <div className="bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-transparent rounded-2xl p-6 backdrop-blur-md shadow-2xl border border-white/5">
            <table className="w-full table-auto">
                <thead>
                    <tr className="text-sm text-gray-400 border-b border-gray-800">
                        <th className="w-16 pb-4 text-center">#</th>
                        <th className="pb-4 text-left">Title</th>
                        <th className="w-16 pb-4 text-center">
                            <div className="flex justify-center">

                                <Clock className="w-4 h-4" />
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody className="before:content-[''] before:block before:h-4">
                    {tracks.map((track, index) => {
                        const isCurrentTrack = currentTrack?.id === track.id;
                        const isCurrentlyPlaying = isCurrentTrack && isPlaying;

                        return (
                            <tr
                                key={track.id}
                                onClick={(e) => handlePlay(track, e)}
                                className={`group hover:bg-white/5 transition-colors cursor-pointer rounded-lg
                                    ${isCurrentTrack ? "bg-white/10" : ""}
                                `}
                            >
                                <td className="w-16 py-2 text-center rounded-l-lg">
                                    <div className="w-full flex justify-center items-center h-12">
                                        {isCurrentlyPlaying ? (
                                            <PlayingAnimation />
                                        ) : (
                                            <div className="relative w-8 h-8 flex items-center justify-center">
                                                <span className="text-gray-400 text-sm group-hover:opacity-0 transition-opacity">
                                                    {index + 1}
                                                </span>
                                                <Play className="w-4 h-4 text-white absolute opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="py-2">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 relative flex-shrink-0 rounded-lg overflow-hidden shadow-lg">
                                            {track.coverUrl ? (
                                                <img
                                                    src={track.coverUrl}
                                                    alt={track.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                                    <Music className="w-6 h-6 text-gray-400" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <span
                                                className={`text-left font-bold ${
                                                    isCurrentTrack
                                                        ? "text-purple-500"
                                                        : "text-white"
                                                }`}
                                            >
                                                {track.title}
                                            </span>
                                            <div className="flex items-center gap-1 text-sm text-gray-400">
                                                {track.artists?.map(
                                                    (artist, index) => (
                                                        <React.Fragment
                                                            key={artist.id}
                                                        >
                                                            <button
                                                                onClick={(e) =>
                                                                    handleArtistClick(
                                                                        artist.id,
                                                                        e
                                                                    )
                                                                }
                                                                className="hover:text-white hover:underline transition-colors"
                                                            >
                                                                {artist.name}
                                                            </button>
                                                            {index <
                                                                track.artists
                                                                    .length -
                                                                    1 && ", "}
                                                        </React.Fragment>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="w-16 py-2 text-center pr-2 rounded-r-lg">
                                    <span className="text-sm text-gray-400">
                                        {formatDuration(track.duration)}
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
