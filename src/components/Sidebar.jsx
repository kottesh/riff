import React from 'react'
import { IoHome } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
export default function Sidebar() {
  return (
    <div className='flex'>
      <div className='h-screen w-16 text-white z-10 flex flex-col pt-20'>
        <div className='mt-5 text-2xl m-8'><IoHome/></div>
        <div className='mt-5 text-2xl m-8'><FaSearch/></div>
      </div>
    </div>
  )
}
