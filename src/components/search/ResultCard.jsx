import React from "react";
import { Play, Pause, User, Music, Disc } from "lucide-react";
import usePlayerStore from "../../store/usePlayerStore";

const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

// reusable image component with fallback support
const ImageWithFallback = ({ src, alt, fallbackSrc, className, isRounded }) => (
    <img
        src={src}
        alt={alt}
        className={`${className} ${isRounded ? "rounded-full" : ""}`}
        onError={(e) => {
            e.target.src = fallbackSrc;
        }}
    />
);

export const ResultCard = ({ item, type }) => {
    const { currentTrack, isPlaying, playTrack } = usePlayerStore();

    const isCurrentTrack = currentTrack?.id === item.id;

    const handlePlayClick = () => {
        playTrack(item);
    };

    const renderPlayButton = () => {
        if (type !== "tracks") return null;

        return (
            <button
                onClick={handlePlayClick}
                className="absolute inset-0 w-full h-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            >
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    {isCurrentTrack && isPlaying ? (
                        <Pause className="w-6 h-6 text-white" />
                    ) : (
                        <Play className="w-6 h-6 text-white" />
                    )}
                </div>
            </button>
        );
    };

    const renderTracks = () => (
        <>
            <div className="aspect-square relative bg-gray-100 group">
                <ImageWithFallback
                    src={item.coverUrl || item.album?.coverUrl}
                    alt={item.title}
                    fallbackSrc="/default-cover.png"
                    className="object-cover w-full h-full"
                />
                {renderPlayButton()}
            </div>
            <div className="p-3">
                <h3 className="font-semibold truncate">{item.title}</h3>
                <p className="text-sm text-gray-500 truncate">
                    {item.artists?.map((artist) => artist.name).join(", ")}
                </p>
                <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-gray-400">{item.album?.title}</p>
                    <p className="text-xs text-gray-400">
                        {formatDuration(item.duration)}
                    </p>
                </div>
            </div>
        </>
    );

    const renderArtists = () => (
        <>
            <div className="aspect-square relative bg-gray-100">
                {item.image ? (
                    <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        fallbackSrc="/default-artist.png"
                        className="object-cover w-full h-full"
                        isRounded={true}
                    />
                ) : (
                    <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="w-1/3 h-1/3 text-gray-400" />
                    </div>
                )}
            </div>
            <div className="p-3 text-center">
                <h3 className="font-semibold truncate">{item.name}</h3>
                <p className="text-sm text-gray-500">
                    {item.trackIds?.length || 0} tracks
                </p>
                {item.bio && (
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                        {item.bio}
                    </p>
                )}
            </div>
        </>
    );

    const renderAlbums = () => (
        <>
            <div className="aspect-square relative bg-gray-100">
                {item.coverUrl ? (
                    <ImageWithFallback
                        src={item.coverUrl}
                        alt={item.title}
                        fallbackSrc="/default-album.png"
                        className="object-cover w-full h-full"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <Disc className="w-1/3 h-1/3 text-gray-400" />
                    </div>
                )}
            </div>
            <div className="p-3">
                <h3 className="font-semibold truncate">{item.title}</h3>
                <p className="text-sm text-gray-500">
                    {new Date(item.releaseDate).getFullYear()}
                </p>
            </div>
        </>
    );

    const renderGenres = () => (
        <>
            <div className="aspect-square relative bg-gray-100">
                {item.image ? (
                    <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        fallbackSrc="/default-genre.png"
                        className="object-cover w-full h-full"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <Music className="w-1/3 h-1/3 text-gray-400" />
                    </div>
                )}
            </div>
            <div className="p-3">
                <h3 className="font-semibold truncate">{item.name}</h3>
            </div>
        </>
    );

    const renderContent = () => {
        switch (type) {
            case "tracks":
                return renderTracks();
            case "artists":
                return renderArtists();
            case "albums":
                return renderAlbums();
            case "genres":
                return renderGenres();
            default:
                return null;
        }
    };

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            {renderContent()}
        </div>
    );
};

export default ResultCard;
