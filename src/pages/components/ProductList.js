"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';
import '../../styles/userProf.css';
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [userId, setUserId] = useState(''); // Add a state for the user ID
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const us = localStorage.getItem('userId');
    setUserId(us);
  }, [])
  
  const handleLogout = () => {
    localStorage.clear('token');
    localStorage.clear('userId');
    router.push('/login');
  };
  useEffect(() => {
    // Simulated API call to fetch products
    const fetchProducts = async () => {
      const response = await fetch('/api/products/getP');
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    }
  }, []);
  
  const handleSelectProduct = async (productId) => {
    setSelectedProducts([...selectedProducts, productId]);
    setIsLoading(true);
    const response  = await fetch('/api/users/add-to-cart', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, userId }),
    });
      
    try{
      setIsLoading(false);
      const data  = await response.json();
      console.log(data);
    }
    catch(err){console.error(data.message)};
  };

  return (
    <>
      <nav className='navbar'>
        
        <Link className='productbtn' href='/components/products/ProductList' style={{"textDecoration":"none","textAlign":"center","alignItems":"center"}}>
          Products Page
        </Link>
        <Link className='productbtn' href={`/components/user/UserProfile`} style={{"textDecoration":"none"}}>
          Go to Your Profile
        </Link>
        <button className='productbtn' onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <h2><center>Product List</center></h2>
      <div className='productsList' >
        {products.map(product => (
          <div className='productCard' key={product._id}>
            <h3>{product.name}</h3>
            <p>Description:</p>
            <p>{product.description}</p>
            <button onClick={() => handleSelectProduct(product._id)}>Select</button>
            {isLoading && <div className="loader"></div>}
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductList;
