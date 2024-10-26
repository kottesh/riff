import React from "react";
import { Search, X } from "lucide-react";
import useSearchStore from "../../store/use-search-store";

export const SearchBar = () => {
    const { searchQuery, setSearchQuery, clearSearch } = useSearchStore();

    return (
        <div className="max-w-xl mb-6">
            <div className="relative group">
                <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 
                             group-hover:text-gray-300 transition-colors"
                    strokeWidth={1.5}
                />
                <input
                    type="search"
                    placeholder="What do you want to listen to?"
                    className="w-full h-10 pl-10 pr-12 rounded-full 
                             bg-gray-800/50 text-white placeholder-gray-400
                             border border-transparent
                             focus:border-gray-700 focus:bg-gray-800
                             hover:bg-gray-800/70
                             transition-all duration-200
                             text-sm
                             focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                    <button
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 -translate-y-1/2 
                                 text-gray-400 hover:text-gray-200
                                 transition-colors duration-200"
                        aria-label="Clear search"
                    >
                        <X className="h-4 w-4" strokeWidth={2} />
                    </button>
                )}
            </div>
        </div>
    );
};
