import React, { useState } from 'react'
import Image from 'next/image';
import "../styles/login.css";
import Link from 'next/link';
import '@fortawesome/fontawesome-free/css/all.css';
import img from "../../public/img-01.png";
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer,toast } from 'react-toastify';

const login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPass: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(formData.email)) {
    //   toast.error('Please enter a valid email address');
    //   window.location.reload();
    //   return;
    // }
    if(formData.password !== formData.confirmPass) {
      toast.error("Password & Confirm Password are not same!!");
    }
    try {
      const response = await fetch('/api/vendors/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          formData
        ),
      });

      if (response.ok) {
        const data = await response.json();
        let vendor = await data.vendor;
        const token = data.token;
        toast.success('Login successful!');
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('userId',vendor._id);
          localStorage.setItem('token', token);
        }
        toast.success('Login successful!');
        router.push('/components/vendor/VendorDashboard');
      } else {
        const data = await response.json();
        toast.error(`Login failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  return (
    <div className='login'>
      <div className='wrapper'>
        <ToastContainer/>
        <div >
          <Image src={img} alt='back' width="400" />
        </div>

        <div className='container'>
          <span className='title'><h2><b>Vendor Login</b></h2></span>
          <span>For Users: <Link href="/components/login" style={{ textDecoration: 'none' }}>Member Login</Link></span>
          <form onSubmit={handleSubmit}>
            <div className='row' data-validate="input is required">
              <span className='symbol'>
                <i className='fas fa-user'></i>
              </span>
              <input className="input_field" type='text' placeholder='Username'
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />

            </div>
            <div className='row'>
              <span className='symbol'>
                <i className='fas fa-lock'></i>
              </span>
              <input className="input_field" type='Password' placeholder='Password'
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className='row'>
              <span className='symbol'>
                <i className='fas fa-lock'></i>
              </span>
              <input className="input_field"
                type='password'
                placeholder='Confirm_Password'
                name="confirmPass"
                value={formData.confirmPass}
                onChange={handleChange}
                required
              />
            </div>
            <div className='row sub'>
              <input className='button' type='submit' value="Login" />
              <Link href="/components/rregister" style={{ textDecoration: 'none' }}>Create Account</Link>

            </div>
          </form>
        </div>

      </div>

    </div>
  )
}

export default login