import React from 'react'
import Forms from '../layouts/forms';
import { useState } from 'react';
export default function Login() {
    const lab = [ 'Email' ,'Password'];
    const typ = ['text' , 'password'];
    const [ data , setData ] = useState([]);
    const handleReceived = (d) =>{
        setData(d);
        console.log(d);
    }
  return (
    <div>
      <Forms title={'Log In'} labels={lab} types={typ} sendData={handleReceived}/>
    </div>
  )
}
