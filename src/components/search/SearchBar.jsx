import React from "react";
import { Search, X } from "lucide-react";
import useSearchStore from "../../store/useSearchStore";

export const SearchBar = () => {
    const { searchQuery, setSearchQuery, clearSearch } = useSearchStore();

    return (
        <div className="relative mb-6">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                    type="search"
                    placeholder="Search for songs, artists, albums..."
                    className="w-full h-12 pl-10 pr-12 rounded-full border border-gray-300 focus:outline-none focus:border-gray-500 transition-colors"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                    <button
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        <X className="h-5 w-5" />
                    </button>
                )}
            </div>
        </div>
    );
};
