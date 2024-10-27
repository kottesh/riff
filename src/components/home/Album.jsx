import Button from "../utils/Button";

export const AlbumsSection = ({ albums, onSeeMore }) => {
    if (!albums?.length) return null;

    return (
        <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                    Popular Albums
                </h2>
                <Button
                    onClick={onSeeMore}
                    className="text-sm hover:text-white transition-colors"
                >
                    See All Albums
                </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {albums.map((album) => (
                    <div key={album.id} className="group">
                        <div className="relative mb-4">
                            <img
                                src={album.coverUrl || "/placeholder-cover.jpg"}
                                alt={album.title}
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
                        <h3 className="text-white font-medium truncate">
                            {album.title}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
};
