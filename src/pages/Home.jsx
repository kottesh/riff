import React from "react";
import { useNavigate } from "react-router-dom";
import { useHomeData } from "../hooks/use-home";
import { GreetingSection } from "../components/home/Greeting";
import { RecentlyPlayed } from "../components/home/RecentlyPlayed";
import { FeaturedTracks } from "../components/home/Tracks";
import { AlbumsSection } from "../components/home/Album";
import { ArtistsSection } from "../components/home/Artist";
import LoadingState from "../components/utils/LoadingState";
import ErrorState from "../components/utils/ErrorState";

const Home = () => {
    const navigate = useNavigate();
    const { data, isLoading, error } = useHomeData();

    if (isLoading) return <LoadingState />;
    if (error) return <ErrorState message={error} />;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black px-6 py-8">
            <GreetingSection />

            {data.recentTracks.length > 0 && (
                <RecentlyPlayed tracks={data.recentTracks} />
            )}

            <FeaturedTracks tracks={data.featuredTracks} />

            <AlbumsSection
                albums={data.popularAlbums}
                onSeeMore={() => navigate("/albums")}
            />

            <ArtistsSection
                artists={data.popularArtists}
                onSeeMore={() => navigate("/artists")}
            />
        </div>
    );
};

export default Home;
