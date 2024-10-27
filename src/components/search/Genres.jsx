import React from "react";
import { Music } from "lucide-react";
import Carousel from "../utils/Carousel";
import { useNavigate } from "react-router-dom";

export const Genres = ({ genres = [] }) => {
    if (!genres.length) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <Music className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-400">No genres found</p>
            </div>
        );
    }

    const navigate = useNavigate();

    const GenreCard = ({ genre }) => (
        <div
            key={genre.id}
            className="relative overflow-hidden rounded-lg aspect-square cursor-pointer min-w-[160px] md:min-w-[180px] lg:min-w-[200px]"
            onClick={() => navigate(`/genre/${genre.id}`)}
        >
            <div className="absolute inset-0 w-full h-full">
                <img
                    src={genre.image || "/api/placeholder/400/400"}
                    alt={genre.name}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 group">
                <div className="flex items-end justify-between">
                    <div className="transition-transform duration-300 hover:translate-y-[-8px]">
                        <h3 className="text-white font-semibold text-base mb-1">
                            {genre.name}
                        </h3>
                        <div className="flex items-center gap-2">
                            <Music className="w-4 h-4 text-gray-300" />
                            <p className="text-gray-300 text-xs">
                                {genre.trackCount} tracks
                            </p>
                        </div>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center opacity-0 translate-y-2 transition-all duration-300 group-hover:[&:not(:hover)]:opacity-0 group-hover:[&:not(:hover)]:translate-y-2 hover:opacity-100 hover:translate-y-0">
                        <Music className="w-4 h-4 text-black" />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="px-4">
            <Carousel title="Genres">
                {genres.map((genre) => (
                    <GenreCard key={genre.id} genre={genre} />
                ))}
            </Carousel>
        </div>
    );
};
