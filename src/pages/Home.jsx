import React from "react";
import Sidebar from "../components/Sidebar";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "../AppRoutes";
import Content from "../components/Content";
import Player from "../components/musicPlayer/Player";
import Index from "../components/musicPlayer/Index";
import PlayerN from "../components/musicPlayer/PlayerN";
export default function Home() {
  return (
    <div className="relative w-full h-screen flex flex-col md:flex-row">
      <BrowserRouter>
        <Sidebar />
        <main className="flex-1 overflow-y-auto  mb-0 rounded-md p-3">
          <AppRoutes />
        </main>
          <Index />
      </BrowserRouter>
    </div>
  );
}
