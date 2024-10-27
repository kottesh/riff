import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserRound } from "lucide-react";
export default function ArtistInfo({ artist }) {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        artist && (
            <div className="w-full p-6 pl-12 bg-none rounded-lg">
                {/* Top section for image and name */}
                <div className="flex items-center mb-6">
                    {/* Image */}
                    <div className="flex-shrink-0 rounded-full">
                        { artist.image ?(
                            <img
                            src={artist.image}
                            alt={artist.name}
                            className="w-52 h-52 shadow-md shadow-gray-800 rounded-full object-cover border-collapse hover:scale-105 transition-transform duration-500"
                        />
                        ) :(
                            <div className="w-full h-full flex items-center justify-center rounded-full p-2">
                                <UserRound className="w-52 h-52 shadow-md text-gray-500 shadow-gray-800 rounded-full object-cover border-collapse hover:scale-105 transition-transform duration-500" />
                            </div>
                        )}
                        
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
                                        className="text-purple-800 hover:text-purple-400 font-bold inline-flex items-center transition-colors duration-200"
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
                                    className="text-purple-800 hover:text-purple-400 font-bold inline-flex items-center ml-1 transition-colors duration-200"
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
