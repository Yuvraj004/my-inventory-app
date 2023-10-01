import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  // Define states for selected products and orders
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const userId = '65196b0b03149f9d039e8b95';
  // Simulated API call to fetch user's selected products
  useEffect(() => {
    const fetchSelectedProducts = async () => {
      const response =  await fetch('/api/users/get-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
      // const data = await response.json();
      // setSelectedProducts(data);
    };

    fetchSelectedProducts();
  }, []);

  // Simulated API call to fetch user's orders
  useEffect(() => {
    const fetchUserOrders = async () => {
      const response = await fetch('/api/orders/getO',{method:"GET"});
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

  return (
    <div>
      <h2>User Profile</h2>
      <div>
        <h3>Selected Products</h3>
        <ul>
          {!selectedProducts ?  (<p>no selectecd Products</p>) : selectedProducts.map(product => (
            <li key={product._id}>{product.name}</li>
          ))}
        </ul>
        <button onClick={handleBuyProducts}>Buy Selected Products</button>
      </div>
      <div>
        <h3>Orders</h3>
        <ul>
          {orders.map(order => (
            <li key={order._id}>{order.orderNumber}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
