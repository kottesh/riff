import { useNavigate } from "react-router-dom";
import { Play, Pause, Album } from "lucide-react";
import usePlayerStore from "../../store/use-player-store";

const AlbumCard = ({ album }) => {
    const navigate = useNavigate();
    const { currentTrack, isPlaying, playTrack, addToQueue, clearQueue } =
        usePlayerStore();

    const isCurrentAlbum = currentTrack?.albumId === album.id;

    const handlePlay = async (e) => {
        e.stopPropagation();

        if (!album.tracks || album.tracks.length === 0) {
            navigate(`/album/${album.id}`);
            return;
        }

        if (isCurrentAlbum) {
            usePlayerStore.getState().togglePlay();
            return;
        }

        clearQueue();
        addToQueue(album.tracks);
        await playTrack(album.tracks[0]);
    };

    return (
        <div
            className="relative p-4 rounded-2xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/10"
            onClick={() => navigate(`/album/${album.id}`)}
        >
            <div className="relative aspect-square mb-4 rounded-xl overflow-hidden shadow-xl">
                {album.coverUrl ? (
                    <img
                        src={album.coverUrl}
                        alt={album.title}
                        className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                        <Album className="w-1/3 h-1/3 text-gray-400" />
                    </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-all duration-300">
                    <button
                        className={`p-4 ${
                            isCurrentAlbum && isPlaying
                                ? "bg-purple-600"
                                : "bg-purple-500"
                        } rounded-full transform transition-all duration-300 hover:scale-110 hover:bg-purple-400 shadow-xl hover:shadow-purple-500/25`}
                        onClick={handlePlay}
                    >
                        {isCurrentAlbum && isPlaying ? (
                            <Pause
                                className="w-6 h-6 text-white"
                                fill="white"
                            />
                        ) : (
                            <Play className="w-6 h-6 text-white" fill="white" />
                        )}
                    </button>
                </div>
            </div>
            <div className="space-y-2">
                <h3
                    className={`font-medium truncate transition-colors duration-300 ${
                        isCurrentAlbum
                            ? "text-purple-400"
                            : "text-white hover:text-purple-400"
                    }`}
                >
                    {album.title}
                </h3>
                {album.artist && (
                    <p className="text-gray-400 text-sm truncate hover:text-gray-300 transition-colors duration-300">
                        {album.artist}
                    </p>
                )}
            </div>
        </div>
    );
};

export default AlbumCard;
