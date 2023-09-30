const buyProducts = async (userId, selectedProducts) => {
    const response = await fetch('/api/users/buy-products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, products: selectedProducts }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to buy products');
    }
  
    const data = await response.json();
    return data;
  };
export default buyProducts;  