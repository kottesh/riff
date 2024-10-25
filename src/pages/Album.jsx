import { useParams } from "react-router-dom";
import { Loader2, AlertCircle, Music } from "lucide-react";
import useAlbum from "../hooks/useAlbum";
import InfoCard from "../components/album/InfoCard";
import TrackList from "../components/album/TrackList";

export default function Album() {
    const { id } = useParams();
    const { album, isLoading, error } = useAlbum(id);

    if (isLoading) {
        return (
            <div className="flex h-[calc(100vh-64px)] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
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
                                Error loading album
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

    if (!album) {
        return (
            <div className="flex h-[calc(100vh-64px)] items-center justify-center px-4">
                <div className="flex flex-col items-center text-center">
                    <Music className="w-16 h-16 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">
                        Album not found
                    </h3>
                    <p className="text-gray-400 max-w-md">
                        The album you're looking for might have been removed or
                        is temporarily unavailable.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-gray-900 to-black mr-20 mb-16">
            <div className="max-w-[1920px] mx-auto">
                <div className="flex flex-col gap-8 pb-16">
                    <InfoCard album={album} />
                    <div className="px-6 md:px-8 lg:px-10">
                        <TrackList tracks={album.tracks} />
                    </div>
                </div>
            </div>
        </div>
    );
}
