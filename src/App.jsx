import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, useState, useEffect } from "react";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Album from "./pages/Album";
import Genre from "./pages/Genre";
import Player from "./components/player/Player";
import Queue from "./components/player/Queue";
import Sidebar from "./components/SideBar";
import LoadingSpinner from "./components/utils/LoadingSpinner";

import "./App.css";

const App = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // This will ensure the loading spinner shows until everything is loaded
        window.onload = () => {
            setIsLoading(false);
        };

        // Fallback in case window.onload doesn't trigger
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // Adjust timeout as needed

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Router>
            <Suspense fallback={<LoadingSpinner />}>
                <div className="flex h-screen bg-gradient-to-b from-gray-900 to-black">
                    <Sidebar />

                    <div className="flex flex-col flex-1">
                        <main className="flex-1 overflow-auto">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/search" element={<Search />} />
                                <Route path="/album/:id" element={<Album />} />
                                <Route path="/genre/:id" element={<Genre />} />
                                <Route
                                    path="/artist/:id"
                                    element={
                                        <Artist />
                                    }
                                />
                                <Route
                                    path="/library"
                                    element={<div>Library Page</div>}
                                />
                                <Route
                                    path="/create-playlist"
                                    element={<div>Create Playlist Page</div>}
                                />
                                <Route
                                    path="/playlists"
                                    element={<div>Playlists Page</div>}
                                />
                            </Routes>
                        </main>

                        <div className="sticky bottom-0 bg-black border-t border-gray-800">
                            <div className="flex">
                                <div className="flex-1">
                                    <Player />
                                </div>
                                <div className="w-80 border-l border-gray-700">
                                    <Queue />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Suspense>
        </Router>
    );
};

export default App;