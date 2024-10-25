import { Play } from "lucide-react";
import Carousel from "./Carousel";
import { useNavigate } from "react-router-dom";

export const Albums = ({ albums = [] }) => {
    const navigate = useNavigate();

    const handleAlbumClick = (albumId) => {
        navigate(`/album/${albumId}`);
    };

    if (!albums.length) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <Play className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-400">No albums found</p>
            </div>
        );
    }

    return (
        <div className="px-4">
            <Carousel title="Albums">
                {albums.map((album) => (
                    <div
                        key={album.id}
                        className="flex-none w-48 md:w-56 group/card"
                        onClick={() => handleAlbumClick(album.id)}
                        role="button"
                        tabIndex={0}
                    >
                        <div
                            className="bg-gray-900/80 rounded-lg p-3 hover:bg-gray-900/90 
                            transition-all duration-300 cursor-pointer"
                        >
                            <div className="aspect-square relative mb-3">
                                {album.coverUrl ? (
                                    <img
                                        src={album.coverUrl}
                                        alt={album.title}
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
                                <h3 className="text-white font-bold truncate text-sm">
                                    {album.title}
                                </h3>
                                <p className="text-sm text-gray-400 truncate mt-1">
                                    {album.artist}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Albums;
