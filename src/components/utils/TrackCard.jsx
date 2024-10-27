export const TrackCard = ({ track }) => {
    return (
        <div className="group bg-gray-900/50 p-4 rounded-xl hover:bg-gray-800/50 transition-all duration-300">
            <div className="relative mb-4">
                <img
                    src={track.coverUrl || "/placeholder-cover.jpg"}
                    alt={track.title}
                    className="w-full aspect-square object-cover rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                    <button className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <h3 className="text-white font-medium truncate mb-1">
                {track.title}
            </h3>
            <p className="text-gray-400 text-sm truncate">
                {track.artists
                    ? track.artists.map((artist) => artist.name).join(", ")
                    : "Unknown Artist"}
            </p>
        </div>
    );
};
