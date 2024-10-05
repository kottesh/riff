import React from "react";
import Sidebar from "../components/Sidebar";
import { Navigate, useNavigate } from "react-router-dom";
import Routes from "../AppRoutes";
import AppRoutes from "../AppRoutes";
import Header from "../components/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <Sidebar />
      
    </div>
  );
}
