// VendorDashboard.js
// This component represents the vendor's dashboard page

import React, { useState, useEffect } from 'react';
import { getVendorProducts, createProduct, deleteProduct, reviewUserSelectedProduct } from './vendorApi';
import '../../../styles/userProf.css';
import '../../../styles/vendorDash.css';

const VendorDashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProductData, setNewProductData] = useState({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
  });
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getVendorProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleCreateProduct = async () => {
    await createProduct(newProductData);
    const data = await getVendorProducts();
    setProducts(data);
  };

  const handleDeleteProduct = async (productId) => {
    await deleteProduct(productId);
    const data = await getVendorProducts();
    setProducts(data);
  };

  const handleReviewProduct = async (productId, approved) => {
    await reviewUserSelectedProduct(productId, approved);
    const data = await getVendorProducts();
    setProducts(data);
  };

  return (
    <div style={{display:"flex",alignItems:"center",flexDirection:"column"}}>
      <h2>Vendor Dashboard</h2>
      <div className='createProduct'>
        <h3>Create New Product</h3>
        <div className='inputGroup'>
          <input
            type="text"
            placeholder="Product Name"
            value={newProductData.name}
            onChange={(e) => setNewProductData({ ...newProductData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newProductData.description}
            onChange={(e) => setNewProductData({ ...newProductData, description: e.target.value })}
          />
          <label> Price
            <input
              type="number"
              placeholder="Price"
              value={newProductData.price}
              onChange={(e) => setNewProductData({ ...newProductData, price: e.target.value })}
            />
          </label>
          <label> Quantity
            <input
              type="number"
              placeholder="Quantity"
              value={newProductData.quantity}
              onChange={(e) => setNewProductData({ ...newProductData, quantity: e.target.value })}
            />
          </label>
        </div>
        <button className='btn' onClick={handleCreateProduct}>Create Product</button>
      </div>
      <h3>My Products</h3>
      <div className='productList'>
        {products && products.map((product) => (
          <div className='productCard' key={product._id}>
            <p>{product.name}</p>
            <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
          </div>
        ))}
      </div>
      <h3>Products to be approved</h3>
      <div className='productList' >
        {products && products.map((product) => {
          // Check if the product is not approved
          if (!product.approved) {
            return (
              <div className='productCard' key={product._id}>
                <p>{product.name}</p>
                <p>{product.descrption}</p>
                <div >
                  {products.users && product.users.map((user) => (
                    <label key={user._id}>
                      <input
                        type="radio"
                        name="selectedUser"
                        value={user._id}
                        checked={selectedUserId === user._id}
                        onChange={() => setSelectedUserId(user._id)}
                      />
                      {user.name}
                    </label>
                  ))}
                </div>
                <button onClick={() => handleReviewProduct(product._id, product.approved)}>Approve</button>
              </div>
            );
          } else {
            return null; // Return null if the product is already approved
          }
        })}
      </div>
    </div>
  );
};

export default VendorDashboard;
