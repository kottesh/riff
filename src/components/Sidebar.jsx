import React from 'react'
import { IoHome } from "react-icons/io5";
import { BiSearchAlt,BiHomeAlt2,BiCategoryAlt } from "react-icons/bi";
import { Link,useNavigate } from 'react-router-dom';
export default function Sidebar() {
  const nav = useNavigate();
  return (
    <div className='fixed z-50 bg-comp h-100 w-52 rounded-lg m-4 flex flex-col items-center font-raleway'>
      <div className='text-pur w-36 h-fit mx-8 my-2 p-2 text-2xl rounded-lg font-normal'>
        Riff
      </div>
      <hr className='w-3/4 h-0 p-2 px-4 border-t-1 border-pur'></hr>
      <div className='w-44 h-fit ml-4 mb-3 p-2 text-white flex items-center rounded-xl hover:bg-pur' onClick={()=>{nav("/")}}>
        < BiHomeAlt2 className='text-xl font-medium'/>
        <div className='ml-5 font-light text-base'>Home</div>
      </div>
      <div className='w-44 h-fit ml-4 p-2 mb-3 rounded-xl text-white flex items-center hover:bg-pur' onClick={()=>{nav("/search")}}>
        < BiSearchAlt className='text-xl font-medium'/>
        <div className='ml-5 font-light text-base'>Search</div>
      </div>
      <div className='w-44 h-fit ml-4 p-2 mb-3 rounded-xl text-white flex items-center hover:bg-pur' onClick={()=>{nav("/genres")}}>
        < BiCategoryAlt className='text-xl font-medium'/>
        <div className='ml-5 font-light text-base'>Categories</div>
      </div>
    </div>
  )
}
