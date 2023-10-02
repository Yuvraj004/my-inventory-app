// VendorDashboard.js
// This component represents the vendor's dashboard page

import React, { useState, useEffect } from 'react';
import { getVendorProducts, createProduct, deleteProduct, reviewUserSelectedProduct } from './vendorApi';

const VendorDashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProductData, setNewProductData] = useState({});

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
    <div>
      <h2>Vendor Dashboard</h2>
      <div>
        <h3>Create New Product</h3>
        <input
          type="text"
          placeholder="Product Name"
          onChange={(e) => setNewProductData({ ...newProductData, name: e.target.value })}
        />
        {/* Add more input fields for other product details */}
        <button onClick={handleCreateProduct}>Create Product</button>
      </div>
      <div>
        <h3>My Products</h3>
        {products && products.map((product) => (
          <div key={product._id}>
            <span>{product.name}</span>
            <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
          </div>
        ))}
      </div>
      <h3>Products to be approved</h3>
      {products && products.map((product) => {
          // Check if the product is not approved
          if (!product.approved) {
            return (
              <div key={product._id}>
                <p>{product.name}</p>
                <p>{product.descrption}</p>
                <p>{product.user && product.user.map((us)=>{
                  <li>{us}</li>
                }) }</p>
                <button onClick={() => handleReviewProduct(product._id,product.approved)}>Approve</button>
              </div>
            );
          } else {
            return null; // Return null if the product is already approved
          }
      })}

    </div>
  );
};

export default VendorDashboard;
