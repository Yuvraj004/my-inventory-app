import React, { useState } from 'react'
import bck from "../../../public/background.jpg";
import Image from 'next/image';
import "../../styles/login.css";
const login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
  };
  return (
    <div className='login'>
      <Image src={bck} alt='back' />
      <div className='wrapper'>
        <div className='container'>
          <span className='title'>Login Form</span>
          <form action="#">
            <div className='row'>
              <i className='fas fa-user'></i>
              <input type='text' placeholder='Email'/>
            </div>
            <div className='row'>
              <input type='password' placeholder='password'/>
            </div>
            <div className='row'>
              <input type='password' placeholder='Confirmpassword'/>
            </div>
            <div className='row'>
              <input type='submit' value="Login"/>
              <div className='pass'><a href="#">Forgot Password</a></div>
            </div>

          </form>
        </div>

      </div>

    </div>
  )
}

export default login