import React from "react";
import useSearchStore from "../../store/useSearchStore";

const TabButton = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 font-medium rounded-full transition-colors
      ${active ? "bg-black text-white" : "text-gray-600 hover:bg-gray-100"}`}
    >
        {children}
    </button>
);

export const SearchTabs = () => {
    const { activeTab, setActiveTab } = useSearchStore();

    return (
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
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
    );
};
