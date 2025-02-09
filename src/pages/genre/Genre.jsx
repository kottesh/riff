import React from "react";
import useGenre from "../../hooks/use-genre";
import LoadingSpinner from "../../components/utils/LoadingSpinner";
import { Music, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Genre() {
    const navigate = useNavigate();

    const handleGenreClick = (id) => {
        navigate(`/genre/${id}`);
    };

    const { genre, isLoading, err } = useGenre();
    if (isLoading) {
        return (
            <div className="flex h-[calc(100vh-64px)] items-center justify-center">
                <LoadingSpinner className="h-8 w-8 animate-spin text-gray-400" />
            </div>
        );
    }

    if (err) {
        return (
            <div className="flex h-[calc(100vh-64px)] items-center justify-center px-4">
                <div className="max-w-md w-full bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                    <div className="flex items-center gap-3">
                        <AlertCircle className="h-6 w-6 text-red-400 flex-shrink-0" />
                        <div>
                            <h3 className="text-lg font-medium text-red-400">
                                Error loading genres
                            </h3>
                            <p className="mt-1 text-sm text-red-400/80">
                                {err}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    if (!genre) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <Music className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-400">No genres found</p>
            </div>
        );
    }
    return (
        <div className="container w-full px-10 mt-10 mb-28 overflow-auto">
            <h2 className="text-white text-left text-3xl font-bold mb-6">
                Genres
            </h2>
            <div className="grid grid-cols-5 gap-8">
                {genre.map((gen) => (
                    <div
                        key={gen.id}
                        className="relative bg-gray-900/80 rounded-lg p-2 hover:bg-gray-900/90 
                      transition-all duration-300 cursor-pointer max-w-[300px]"
                        onClick={() => handleGenreClick(gen.id)}
                        role="button"
                        tabIndex={0}
                    >
                        <div
                            className="bg-gray-900/80 rounded-lg p-3 hover:bg-gray-900/90 
                            transition-all duration-300 cursor-pointer max-w-[300px]"
                        >
                            <div className="aspect-square relative mb-3">
                                {gen.image ? (
                                    <img
                                        src={gen.image}
                                        alt={gen.name}
                                        className="object-cover w-full h-full rounded-lg"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-zinc-800 rounded-lg">
                                        <Play className="w-12 h-12 text-gray-400" />
                                    </div>
                                )}
                                <div
                                    className="absolute inset-0 bg-black/20 opacity-0 group-hover/card:opacity-100
                                    transition-opacity duration-300 flex items-center justify-center rounded-lg"
                                >
                                    <button
                                        className="bg-violet-500 rounded-full p-3 transform hover:scale-110
                                        transition-transform duration-200 shadow-xl"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent album navigation when clicking play
                                            // Add your play functionality here
                                        }}
                                    >
                                        <Play className="w-6 h-6 text-white" />
                                    </button>
                                </div>
                            </div>
                            <div className="px-1">
                                <h3 className="text-white font-bold truncate text-base">
                                    {gen.name}
                                </h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
