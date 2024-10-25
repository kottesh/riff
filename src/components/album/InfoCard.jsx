import { format } from "date-fns";
import { Clock, Music2, Play, Pause, Shuffle } from "lucide-react";
import usePlayerStore from "../../store/usePlayerStore";

const Button = ({
    children,
    size = "md",
    className = "",
    variant = "primary",
    onClick,
}) => {
    const baseClasses =
        "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2";

    const sizeClasses = {
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
    };

    const variantClasses = {
        primary: "bg-purple-600 hover:bg-purple-700 text-white",
        secondary: "bg-white/10 hover:bg-white/20 text-white",
    };

    return (
        <button
            className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

const InfoCard = ({ album }) => {
    const { addToQueue, playTrack, clearQueue, currentTrack, isPlaying } =
        usePlayerStore();

    if (!album) return null;

    const totalDuration = album.tracks.reduce(
        (acc, track) => acc + (track.duration || 0),
        0
    );
    const hours = Math.floor(totalDuration / 3600);
    const minutes = Math.floor((totalDuration % 3600) / 60);

    const formatDuration = () => {
        if (hours > 0) {
            return `${hours} hr ${minutes} min`;
        }
        return `${minutes} min`;
    };

    const isCurrentAlbumPlaying =
        currentTrack &&
        album.tracks.some((track) => track.id === currentTrack.id) &&
        isPlaying;

    const isFromCurrentAlbum =
        currentTrack &&
        album.tracks.some((track) => track.id === currentTrack.id);

    const handlePlayAlbum = () => {
        // If currently playing this album, toggle pause by passing the current track
        if (isCurrentAlbumPlaying && currentTrack) {
            playTrack(currentTrack);
            return;
        }

        if (isFromCurrentAlbum && currentTrack) {
            playTrack(currentTrack);
            return;
        }

        // Otherwise, start playing from the beginning
        clearQueue();
        addToQueue(album.tracks);
        playTrack(album.tracks[0]);
    };

    const handleShuffleAlbum = () => {
        const shuffledTracks = [...album.tracks]
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);

        clearQueue();
        addToQueue(shuffledTracks);
        playTrack(shuffledTracks[0]);
    };

    return (
        <div className="rounded-lg shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/95 to-gray-900/75" />

            <div
                className="absolute inset-0 opacity-20 blur-xl"
                style={{
                    backgroundImage: `url(${album.coverUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            <div className="relative flex flex-row items-center gap-8 p-6 md:p-8 lg:p-10">
                <div className="relative group">
                    <img
                        src={album.coverUrl}
                        alt={album.title}
                        className="h-40 w-40 md:h-52 md:w-52 rounded-lg shadow-xl ring-1 ring-white/10 transition-all duration-300 group-hover:ring-white/20 group-hover:shadow-2xl"
                    />
                    <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/40 transition-colors duration-300 rounded-lg" />
                </div>
                <div className="flex gap-8">
                    <div className="text-left flex flex-col gap-4 min-w-0">
                        <span className="text-xs md:text-sm font-medium text-gray-400 tracking-wider">
                            Album
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight truncate max-w-[1000px]">
                            {album.title}
                        </h1>

                        <div className="flex items-center gap-6 text-sm text-gray-400">
                            <span className="flex items-center gap-2">
                                <Music2 className="w-4 h-4" />
                                {album.tracks.length} songs
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {formatDuration()}
                            </span>
                            <span className="flex items-center">
                                {format(new Date(album.releaseDate), "yyyy")}
                            </span>
                        </div>
                    </div>
                    {/* Play, Pause, Shuffle */}
                    <div className="flex items-center gap-4">
                        <Button
                            size="lg"
                            variant="primary"
                            onClick={handlePlayAlbum}
                        >
                            {isCurrentAlbumPlaying ? (
                                <>
                                    <Pause className="w-5 h-5" />
                                </>
                            ) : (
                                <>
                                    <Play className="w-5 h-5" />
                                </>
                            )}
                        </Button>
                        <Button
                            size="lg"
                            variant="secondary"
                            onClick={handleShuffleAlbum}
                        >
                            <Shuffle className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoCard;
