import React from "react";
import { Clock } from "lucide-react";
import { formatDuration } from "../../utils/formatDuration";

export const TrackList = ({ tracks, currentTrackId, onTrackPlay }) => (
    <div className="px-8 py-4">
        <table className="w-full">
            <thead>
                <tr className="text-sm text-gray-400 border-b border-gray-800">
                    <th className="w-12 px-4 py-2 text-left">#</th>
                    <th className="px-4 py-2 text-left">Title</th>
                    <th className="px-4 py-2 text-left hidden md:table-cell">
                        Artists
                    </th>
                    <th className="px-4 py-2 text-right">
                        <Clock className="w-4 h-4 inline-block" />
                    </th>
                </tr>
            </thead>
            <tbody>
                {tracks.map((track, index) => (
                    <tr
                        key={track.id}
                        className={`group hover:bg-gray-800/50 transition cursor-pointer ${
                            currentTrackId === track.id ? "bg-gray-800/30" : ""
                        }`}
                        onClick={() => onTrackPlay(track, index)}
                    >
                        <td className="w-12 px-4 py-3 text-left text-sm text-gray-400">
                            <span className="group-hover:hidden">
                                {index + 1}
                            </span>
                            <Play className="w-4 h-4 hidden group-hover:block" />
                        </td>
                        <td className="px-4 py-3 text-left">
                            <div className="flex flex-col">
                                <span
                                    className={`font-medium ${
                                        currentTrackId === track.id
                                            ? "text-green-500"
                                            : "text-white"
                                    }`}
                                >
                                    {track.title}
                                </span>
                            </div>
                        </td>
                        <td className="px-4 py-3 text-left hidden md:table-cell text-sm text-gray-400">
                            {track.artists
                                .map((artist) => artist.name)
                                .join(", ")}
                        </td>
                        <td className="px-4 py-3 text-right text-sm text-gray-400">
                            {formatDuration(track.duration)}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
