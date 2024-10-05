import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function Forms({ title, labels, types , sendData}) {
  const [formdata, setformdata] = useState([]);
  const handleChange = (e) => {
    const { name , value } = e.target;
    setformdata(prev => ({
      ...prev,
      [name] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendData(formdata);
  };
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
      <div className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto px-12 pt-5 pb-5 border border-white rounded-md text-white text-center shadow-md shadow-pur">
        <h1 className="font-bold text-2xl mb-4">{title}</h1>
        <form onSubmit={handleSubmit}>
          {labels.map((label, i) => (
            <div className="w-full p- mb-4 text-left" key={i}>
              <label className="block text font-medium mb-2">{label}</label>
              <input
                type={types[i]}
                onChange={handleChange}
                name={label.toLowerCase()}
                className=" ml-2 border-b w-60 border-white hover:border-pur outline-none bg-transparent"
                required
              />
            </div>
          ))}
          <p
            /*href='/login'*/ className="text-white text-sm hover:text-pur mb-3"
          >
            {" "}
            Have an account? Log In
          </p>
          <div className="flex items-center justify-center my-6">
            <hr className="w-full border-t border-gray-300" />
            <span className=" px-1 text-pur">or</span>
            <hr className="w-full border-t border-gray-300" />
          </div>
          <button
            type="submit"
            className=" flex w-32 p-3 mt-3 mb-5 items-center justify-center border border-white font-semibold rounded-lg hover:bg-pur hover:text-black"
          >
            <FcGoogle /*href=""*//>
          </button>
          <button
            type="submit"
            className="w-full p-3 mt-3 items-center justify-center border border-white font-semibold rounded-2xl hover:bg-pur hover:text-black"
          >
            {title}
          </button>
        </form>
      </div>
    </div>
  );
}
