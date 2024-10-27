import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Album from "./pages/Album";
import Artist from "./pages/Artist";
import Player from "./components/player/Player";
import Queue from "./components/player/Queue";
import Sidebar from "./components/SideBar";

import "./App.css";

const App = () => {
    return (
        <Router>
            <div className="flex h-screen bg-gradient-to-b from-gray-900 to-black">
                <Sidebar />

                <div className="flex flex-col flex-1">
                    <main className="flex-1 overflow-auto p-8">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/album/:id" element={<Album />} />
                            <Route path="/artist/:id" element={<Artist />} />
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
        </Router>
    );
};

export default App;
