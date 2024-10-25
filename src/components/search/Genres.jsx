import React from "react";
import { Music } from "lucide-react";

export const Genres = ({ genres = [] }) => {
    if (!genres.length) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <Music className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-400">No genres found</p>
            </div>
        );
    }

    return (
        <div className="px-4">
            <h2 className="text-white text-left text-xl font-bold mb-6">
                Genres
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {genres.map((genre) => (
                    <div
                        key={genre.id}
                        className="p-6 rounded-lg bg-gradient-to-br 
                                 from-gray-800/30 to-gray-700/30 
                                 hover:from-gray-800/50 hover:to-gray-700/50 
                                 transition-all duration-300"
                    >
                        <h3 className="text-white font-medium text-lg">
                            {genre.name}
                        </h3>
                        <p className="text-gray-400 text-sm mt-2">
                            {genre.trackCount} tracks
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};
