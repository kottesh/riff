import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Content from "./components/Content";
import Album from "./pages/Album";
import Genre from "./components/Genre";
export default function AppRoutes() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/search" element={<Search />} />
          <Route path="/album/:id" element={<Album />} />
          <Route path="/genres" element={<Genre />} />
        </Routes>
    </div>
  );
}
