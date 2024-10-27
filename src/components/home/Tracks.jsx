import { TrackCard } from "../utils/TrackCard";

export const FeaturedTracks = ({ tracks }) => {
    if (!tracks?.length) return null;

    return (
        <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
                Featured Tracks
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {tracks.map((track) => (
                    <TrackCard key={track.id} track={track} />
                ))}
            </div>
        </div>
    );
};
