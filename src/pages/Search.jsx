import React, { useEffect } from "react";
import { Loader2, AlertCircle, Music } from "lucide-react";
import { SearchBar } from "../components/search/SearchBar";
import { SearchTabs } from "../components/search/SearchTabs";
import { Songs } from "../components/search/Songs";
import { Albums } from "../components/search/Albums";
import { Artists } from "../components/search/Artists";
import { Genres } from "../components/search/Genres";
import useSearchStore from "../store/useSearchStore";

const EmptyState = ({ searchQuery }) => (
    <div className="flex flex-col items-center justify-center py-12">
        <Music className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-white mb-2">
            {searchQuery ? "No results found" : "Start searching"}
        </h3>
        <p className="text-gray-400 text-center">
            {searchQuery
                ? "Try searching for something else"
                : "Search for songs, artists, albums, or genres"}
        </p>
    </div>
);

const Search = () => {
    const {
        searchQuery,
        searchResults,
        activeTab,
        isLoading,
        error,
        searchAll,
        clearSearch,
    } = useSearchStore();

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (searchQuery.trim()) {
                searchAll(searchQuery);
            } else {
                clearSearch();
            }
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [searchQuery, searchAll, clearSearch]);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
            );
        }

        if (!searchQuery) {
            return <EmptyState searchQuery={searchQuery} />;
        }

        switch (activeTab) {
            case "all":
                return (
                    <div className="space-y-12">
                        {searchResults.tracks.length > 0 && (
                            <Songs tracks={searchResults.tracks.slice(0, 5)} />
                        )}
                        {searchResults.albums.length > 0 && (
                            <Albums albums={searchResults.albums.slice(0, 8)} />
                        )}
                        {searchResults.artists.length > 0 && (
                            <Artists
                                artists={searchResults.artists.slice(0, 5)}
                            />
                        )}
                        {searchResults.genres.length > 0 && (
                            <Genres genres={searchResults.genres.slice(0, 4)} />
                        )}
                    </div>
                );
            case "songs":
                return <Songs tracks={searchResults.tracks} />;
            case "albums":
                return <Albums albums={searchResults.albums} />;
            case "artists":
                return <Artists artists={searchResults.artists} />;
            case "genres":
                return <Genres genres={searchResults.genres} />;
            default:
                return <EmptyState searchQuery={searchQuery} />;
        }
    };

    return (
        <div className="container mx-8 max-w-7xl px-4 pb-16">
            <SearchBar />
            {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                    <p className="flex items-center gap-2 text-red-400">
                        <AlertCircle className="h-5 w-5" />
                        {error}
                    </p>
                </div>
            )}
            <SearchTabs />
            {renderContent()}
        </div>
    );
};

export default Search;
