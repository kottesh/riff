import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ArtistInfo({ artist }) {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        artist && (
            <div className="w-3/4 p-6 bg-none rounded-lg">
                {/* Top section for image and name */}
                <div className="flex items-center mb-6">
                    {/* Image */}
                    <div className="flex-shrink-0">
                        <img
                            src={artist.image}
                            alt={artist.name}
                            className="w-52 h-52 shadow-md shadow-gray-800 rounded-full object-cover border-collapse hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    {/* Name */}
                    <h1 className="text-4xl font-bold text-white ml-6">
                        {artist.name}
                    </h1>
                </div>

                {/* Bio section below */}
                <div className="mt-4">
                    <p className="text-gray-100 text-sm text-left">
                        {!isExpanded ? (
                            <>
                                {artist.bio.slice(0, 400)}
                                {artist.bio.length > 400 && "... "}
                                {artist.bio.length > 400 && (
                                    <button
                                        onClick={() => setIsExpanded(true)}
                                        className="text-gray-100 hover:text-gray-400 font-medium inline-flex items-center transition-colors duration-200"
                                    >
                                        MORE
                                    </button>
                                )}
                            </>
                        ) : (
                            <>
                                {artist.bio}..
                                <button
                                    onClick={() => setIsExpanded(false)}
                                    className="text-gray-100 hover:text-gray-400 font-medium inline-flex items-center ml-1 transition-colors duration-200"
                                >
                                    LESS
                                </button>
                            </>
                        )}
                    </p>
                </div>
            </div>
        )
    );
}
