import React from "react";
import Carousel from "../utils/Carousel";
import AlbumCard from "./AlbumCard";
import ArtistCard from "./ArtistCard";
import TrackCard from "./TrackCard";

const PopularSection = ({
    albums,
    artists,
    tracks,
    onSeeMoreAlbums,
    onSeeMoreArtists,
    onSeeMoreTracks,
}) => {
    return (
        <div className="space-y-12 mx-4 my-4">
            {albums?.length > 0 && (
                <Carousel
                    title="Popular Albums"
                    onSeeMore={onSeeMoreAlbums}
                    titleClassName="text-2xl font-bold text-white/90 mb-6"
                >
                    {albums.map((album) => (
                        <div key={album.id} className="min-w-[200px] px-2">
                            <AlbumCard album={album} />
                        </div>
                    ))}
                </Carousel>
            )}

            {artists?.length > 0 && (
                <Carousel
                    title="Popular Artists"
                    onSeeMore={onSeeMoreArtists}
                    titleClassName="text-2xl font-bold text-white/90 mb-6"
                >
                    {artists.map((artist) => (
                        <div key={artist.id} className="min-w-[200px] px-2">
                            <ArtistCard artist={artist} />
                        </div>
                    ))}
                </Carousel>
            )}

            {tracks?.length > 0 && (
                <Carousel
                    title="Featured Tracks"
                    onSeeMore={onSeeMoreTracks}
                    titleClassName="text-2xl font-bold text-white/90 mb-6"
                >
                    {tracks.map((track) => (
                        <div key={track.id} className="min-w-[200px] px-2">
                            <TrackCard track={track} />
                        </div>
                    ))}
                </Carousel>
            )}
        </div>
    );
};

export default PopularSection;
