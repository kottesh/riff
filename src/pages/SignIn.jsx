import React, { useState } from 'react'
import Forms from '../layouts/forms'

export default function SignIn() {
    const lab = [ 'Username' , 'Email' ,'Password'];
    const typ = ['text' , 'email' , 'password'];
    const [ data , setData ] = useState([]);
    const handleReceived = (d) =>{
        setData(d);
        console.log(d);
    }
  return (
    <div>
      <Forms title={'Sign In'} labels={lab} types={typ} sendData={handleReceived}/>
    </div>
  )
}
