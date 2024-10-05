import React from 'react'
import AppRoutes from "../AppRoutes";
import { useNavigate } from 'react-router-dom';
export default function Header() {
    const nav = useNavigate();
  return (
    <div className="h-20 w-full shadow-md flex">
      <div className="mt-3/4 ml-auto flex flex-row p-3 items-center">
          <button
            className="w-fit h-fit p-3  rounded-2xl text-center font-semibold text-white
                 hover:bg-pur hover:text-black"
            onClick={() => nav("/signin")}
          >
            Sign In
          </button>
          <button
            className="w-fit h-fit p-3 mr-32 rounded-2xl text-center font-semibold text-white
                 hover:bg-pur hover:text-black"
            onClick={() =>nav("/login")}
          >
            Log In
          </button>
        </div>
    </div>
  )
}
