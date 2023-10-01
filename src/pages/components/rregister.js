import React, { useState } from 'react'
import "../../styles/register.css";
import Image from 'next/image';
import { useRouter } from 'next/router';
import img from "../../../public/img-01.png";
import '@fortawesome/fontawesome-free/css/all.css';
import 'react-toastify/dist/ReactToastify.css';
import {  ToastContainer,toast } from 'react-toastify';

const register = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'user', // Assuming user registration by default
    });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let apiEndpoint = '';
        let successMessage = '';
        if (!emailRegex.test(formData.email)) {
            toast.error('Please enter a valid email address');
            return;
        }
        setIsLoading(true);
        if (formData.role === 'user') {
            apiEndpoint = '/api/users/register';
            successMessage = 'User registration successful!';
        } else if (formData.role === 'vendor') {
            apiEndpoint = '/api/vendors/createV';
            successMessage = 'Vendor registration successful!';
        }

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success(successMessage);
                if(formData.role=="user") router.push('/components/login');
                else router.push('/components/login-vendor');
        
            } else {
                const data = await response.json();
                toast.error(`Registration failed: ${data.message}`);
                setIsLoading(false);
                
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='login'>
            <div className='wrapper'>
                <ToastContainer/>
                <div>
                    <Image src={img} alt='back' width="400" />
                </div>
                <div className="container ">
                    <h2 className='title'>Register</h2>
                    <form onSubmit={handleSubmit} className='formAlign'>
                        <div className='row'>
                            <span className='symbol'><i className='fas fa-user'></i></span>
                            <input
                                className='input_field'
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder='Username'
                                required
                            />
                        </div>

                        <div className='row'>
                            <span className='symbol'>
                                <i className='fas fa-user'></i></span>
                            <input
                                className='input_field'
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='Email'
                                required
                            />
                        </div>

                        <div className='row'>
                            <span className='symbol'>
                                <i className='fas fa-lock'></i>
                            </span>
                            <input
                                className='input_field'
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder='password'
                                required
                            />
                        </div>

                        <div className='row'>
                            <span className='symbol'>
                                <i className='fas fa-users'></i>
                            </span>
                            <select
                                className='input_field'
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                placeholder='Role'
                                required
                            >
                                <option value="user">User</option>
                                <option value="vendor">Vendor</option>
                            </select>
                        </div>
                        <div className='row sub'>
                            <button className='button' type="submit">Register</button>
                        </div>
                        {isLoading && <div className="loader"></div>}
                    </form>
                </div>
            </div>
        </div>
    );
}
export default register