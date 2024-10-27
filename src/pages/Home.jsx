import React from "react";
import { useNavigate } from "react-router-dom";
import { useHome } from "../hooks/use-home";
import Greeting from "../components/home/Greeting";
import { RecentlyPlayed } from "../components/home/Trending";
import PopularSection from "../components/home/PopularSection";
import LoadingState from "../components/utils/LoadingState";
import ErrorState from "../components/utils/ErrorState";

const Home = () => {
    const navigate = useNavigate();
    const { data, isLoading, error } = useHome();

    if (isLoading) return <LoadingState />;
    if (error) return <ErrorState message={error} />;

    return (
        <div className="relative min-h-screen">
            <main className="relative flex-1 overflow-y-auto pb-24">
                <div className="relative z-10 px-6 lg:px-8 py-8">
                    <div className="max-w-[96rem] max-auto space-y-16">
                        <section className="pt-4">
                            <Greeting />
                        </section>

                        <section>
                            <div className="space-y-6">
                                <h2 className="text-left text-2xl font-bold tracking-tight text-white/90">
                                    Trending Songs
                                </h2>
                                <RecentlyPlayed tracks={data.recentTracks} />
                            </div>
                        </section>

                        <section className="pb-16">
                            <PopularSection
                                albums={data.popularAlbums}
                                artists={data.popularArtists}
                                tracks={data.featuredTracks}
                                onSeeMoreAlbums={() => navigate("/albums")}
                                onSeeMoreArtists={() => navigate("/artists")}
                                onSeeMoreTracks={() => navigate("/tracks")}
                            />
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
