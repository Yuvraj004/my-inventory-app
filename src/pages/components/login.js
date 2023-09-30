import React, { useState } from 'react'
import bck from "../../../public/background.jpg";
import Image from 'next/image';
import "../../styles/login.css";
import Link from 'next/link';
import '@fortawesome/fontawesome-free/css/all.css';
import img from "../../../public/img-01.png";

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
      <div className='wrapper'>
        <div style={{ "will-change": "transform","transform": "perspective(300px) rotateX(0deg) rotateY(0deg)"}}>
          <Image src={img} alt='back' width="400" />
        </div>
        
        <div className='container'>
          <span className='title'><h2><b>Member Login</b></h2></span>
          <form action="#">
            <div className='row' data-validate="input is required">
              <span className='symbol'>
                <i className='fas fa-user'></i>
              </span>
              <input className="input_field" type='text' placeholder='Email' />

            </div>
            <div className='row'>
              <span className='symbol'>
                <i className='fas fa-lock'></i>
              </span>
              <input className="input_field" type='Password' placeholder='password' />
            </div>
            <div className='row'>
              <span className='symbol'>
                <i className='fas fa-lock'></i>
              </span>
              <input className="input_field" type='password' placeholder='Confirm_Password' />
            </div>
            <div className='row sub'>
              <input className='button' type='submit' value="Login" />
              <Link href="/components/register" style={{ textDecoration: 'none' }}>Create Account</Link>
            </div>

          </form>
        </div>

      </div>

    </div>
  )
}

export default login