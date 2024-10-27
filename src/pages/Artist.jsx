import React from "react";
import ArtistInfo from "../components/artist/ArtistInfo";
import ArtistSongs from "../components/artist/ArtistSongs";
import ArtistAlbums from "../components/artist/ArtistAlbums";
import { useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/utils/LoadingSpinner";
//import { getDominantColor } from "../utils/extractColor";
import { useArtist } from "../hooks/use-artist";
import { UserRound } from "lucide-react";
export default function Artist() {
    
    const [themeColor, setThemeColor] = useState(null);
    const { id } = useParams();
    const { artist, tracks, albums, isLoading, error } = useArtist(id);

    // useEffect(() => {
    //     const fetchColor = async (artist) => {
    //         try {
    //             if (artist && artist.image) {
    //                 const dominantColor = await getDominantColor(artist.image);
    //                 setThemeColor(dominantColor);
    //                 console.log("Dominant Color:", dominantColor);
    //             }
    //         } catch (error) {
    //             console.error("Failed to get dominant color:", error);
    //         }
    //     };

        
    //     if (artist) {
    //         //fetchColor(artist);
    //     }
    // }, [artist]); 

    if (isLoading) {
        return (
            <div className="flex h-[calc(100vh-64px)] items-center justify-center">
                <LoadingSpinner className="h-8 w-8 animate-spin text-gray-400" />
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex h-[calc(100vh-64px)] items-center justify-center px-4">
                <div className="max-w-md w-full bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                    <div className="flex items-center gap-3">
                        <AlertCircle className="h-6 w-6 text-red-400 flex-shrink-0" />
                        <div>
                            <h3 className="text-lg font-medium text-red-400">
                                Error loading artist
                            </h3>
                            <p className="mt-1 text-sm text-red-400/80">
                                {error}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!artist) {
        return (
            <div className="flex h-[calc(100vh-64px)] items-center justify-center px-4">
                <div className="flex flex-col items-center text-center">
                    <UserRound className="w-16 h-16 text-gray-400 mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">
                        Artist not found
                    </h3>
                    <p className="text-gray-400 max-w-md">
                        The artist you're looking for might have been removed or
                        is temporarily unavailable.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            style={{
                background: `linear-gradient(to bottom, 
                ${themeColor} 0%, 
                ${themeColor} 10%, 
                rgba(24, 27, 34, 255) 50%, 
                rgba(24, 27, 34, 255) 100%
            )`,
            }}
            className="mr-28 mb-16 h-fit  mx-8 rounded-lg rounded-b-none"
        >
            { isLoading ? (
                <div>

                </div>
            ):(
                <div className="container mx-8 my-8 max-w-7xl px-4 pb-16">
                <ArtistInfo artist={artist} />
                <ArtistSongs tracks={tracks} />
                <ArtistAlbums albums={albums} color={themeColor} />
            </div>
            )}
        </div>
    );
}
