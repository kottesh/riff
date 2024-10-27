import Button from "../utils/Button";

export const ArtistsSection = ({ artists, onSeeMore }) => {
    return (
        <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                    Popular Artists
                </h2>
                <Button
                    onClick={onSeeMore}
                    className="text-sm hover:text-white transition-colors"
                >
                    See All Artists
                </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {artists.map((artist) => (
                    <div key={artist.id} className="group text-center">
                        <div className="relative mb-4">
                            <img
                                src={artist.image || "/placeholder-artist.jpg"}
                                alt={artist.name}
                                className="w-full aspect-square object-cover rounded-full shadow-lg"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full flex items-center justify-center">
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
                                            d="M5 12h14M12 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <h3 className="text-white font-medium truncate">
                            {artist.name}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
};
