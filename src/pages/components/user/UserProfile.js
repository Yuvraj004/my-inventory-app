import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import trackProduct from './trackProduct';
import '../../../styles/userProfile.css';
const UserProfile = () => {
  // Define states for selected products and orders
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const userId = '65196b0b03149f9d039e8b95';
  const router = useRouter();

  const handleLogout = () => {

    localStorage.clear('token');
    router.push('/login'); 
  };
  useEffect(() => {
    const fetchSelectedProducts = async () => {
      const response = await fetch('/api/users/get-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      setSelectedProducts(data);
    };

    fetchSelectedProducts();
  }, []);

  // Simulated API call to fetch user's orders
  useEffect(() => {
    const fetchUserOrders = async () => {
      const response = await fetch('/api/orders/getO', { method: "GET" });
      const data = await response.json();
      setOrders(data);
    };

    fetchUserOrders();
  }, []);

  const handleBuyProducts = async () => {
    // Simulated API call to buy selected products
    await fetch('/api/add-to-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedProducts }),
    });
  };
  const handleTracking = async (productId) => {
    // Simulated API call to buy selected products
    try {
      const res = await trackProduct(userId, productId, 'track');
      // alert('Added to tracking');
    } catch (err) {
      console.log(err);
    }

  };

  return (
    <div>
      <nav className='navbar'>
        <h2>User Profile</h2>
        <button className='logoutbtn btn' onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div className='details'>
        <h3>Selected Products</h3>
        <ul>
          {!selectedProducts ? (<p>no selectecd Products</p>) : selectedProducts.map(product => (
            <li key={product._id}>{product.name}</li>
          ))}
        </ul>
        <button className='btn' onClick={handleBuyProducts}>Buy Selected Products</button>
      </div>
      <div className='details'>
        <h3>Orders</h3>
        <ul>
          {orders.map(order => (
            <div className='card' key={order._id}>
              <h3>Order ID: <p>{order._id}</p></h3>
              <hr />
              <ol className='products'>
                {order.products.map(product => (
                  <>
                    <li key={product.productId}>
                      <div className='productcard' >
                        <p>Product:</p>
                        <hr />
                        <p>Product ID:
                          <p> {product[0]}</p>
                        </p>
                        <p>Quantity: {product[1]}</p>
                        <button className='btn' onClick={() => handleTracking(product.productId)}>Track Product</button>
                      </div>
                    </li>
                    <hr />
                  </>
                ))}
              </ol>
            </div>
          ))}

        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
