import React from "react";
import { Play, Shuffle, Music } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

export const AlbumHeader = ({ album, onPlay, onShufflePlay }) => (
    <div className="flex flex-col md:flex-row gap-8 items-start md:items-end p-8 bg-gradient-to-b from-gray-800/80 to-gray-900/80">
        <div className="w-48 h-48 flex-shrink-0">
            {album.coverUrl ? (
                <img
                    src={album.coverUrl}
                    alt={album.title}
                    className="w-full h-full object-cover rounded-lg shadow-xl"
                />
            ) : (
                <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
                    <Music className="w-16 h-16 text-gray-400" />
                </div>
            )}
        </div>
        <div className="flex flex-col gap-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Album
            </div>
            <h1 className="text-4xl font-bold text-white">{album.title}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>{album.tracks?.length || 0} songs</span>
                <span>•</span>
                <span>Released {formatDate(album.releaseDate)}</span>
            </div>
            <div className="flex gap-4">
                <button
                    onClick={onPlay}
                    className="flex items-center gap-2 px-8 py-3 bg-green-500 hover:bg-green-400 transition rounded-full text-black font-semibold"
                >
                    <Play className="w-5 h-5 fill-current" />
                    Play
                </button>
                <button
                    onClick={onShufflePlay}
                    className="flex items-center gap-2 px-8 py-3 bg-gray-800 hover:bg-gray-700 transition rounded-full text-white font-semibold"
                >
                    <Shuffle className="w-5 h-5" />
                    Shuffle
                </button>
            </div>
        </div>
    </div>
);
