import React from "react";
import useSearchStore from "../../store/useSearchStore";

const TabButton = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200
            ${
                active
                    ? "bg-gray-800 text-white ring-1 ring-gray-700"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
            }
            focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-black
            shrink-0
        `}
    >
        {children}
    </button>
);

export const SearchTabs = () => {
    const { activeTab, setActiveTab } = useSearchStore();

    return (
        <div className="relative mb-6">
            <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-2 px-2 py-1 min-w-min">
                    <TabButton
                        active={activeTab === "all"}
                        onClick={() => setActiveTab("all")}
                    >
                        All
                    </TabButton>
                    <TabButton
                        active={activeTab === "songs"}
                        onClick={() => setActiveTab("songs")}
                    >
                        Songs
                    </TabButton>
                    <TabButton
                        active={activeTab === "artists"}
                        onClick={() => setActiveTab("artists")}
                    >
                        Artists
                    </TabButton>
                    <TabButton
                        active={activeTab === "albums"}
                        onClick={() => setActiveTab("albums")}
                    >
                        Albums
                    </TabButton>
                    <TabButton
                        active={activeTab === "genres"}
                        onClick={() => setActiveTab("genres")}
                    >
                        Genres
                    </TabButton>
                </div>
            </div>
        </div>
    );
};
