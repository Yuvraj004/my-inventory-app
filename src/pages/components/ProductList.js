"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [userId, setUserId] = useState(''); // Add a state for the user ID
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear('token');
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
    const token = sessionStorage.getItem('token');

    if (token) {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    }
  }, []);

  const handleSelectProduct = async (productId) => {
    setSelectedProducts([...selectedProducts, productId]);

    // Make a request to the API to add the product to the user's order
    await fetch('/api/users/add-to-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, userId }),
    });
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
            <p>Description:<p></p>{product.description}</p>
            <button onClick={() => handleSelectProduct(product._id)}>Select</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductList;
