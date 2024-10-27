import { TrackCard } from "../utils/TrackCard";

export const RecentlyPlayed = ({ tracks }) => {
    if (!tracks?.length) return null;

    return (
        <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
                Recently Played
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {tracks.map((track) => (
                    <TrackCard key={track.id} track={track} />
                ))}
            </div>
        </div>
    );
};
