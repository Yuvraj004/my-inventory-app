import Link from 'next/link';
import { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [userId, setUserId] = useState(''); // Add a state for the user ID

  useEffect(() => {
    // Simulated API call to fetch products
    const fetchProducts = async () => {
      const response = await fetch('/api/products/getP');
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
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
    <div>
      <h2>Product List</h2>
      {products.map(product => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <button onClick={() => handleSelectProduct(product._id)}>Select</button>
        </div>
      ))}
      <div className='link'>
        <Link href="/components/user/UserProfile"> GO TO YOUR PROFILE</Link>
      </div>
    </div>
  );
};

export default ProductList;
