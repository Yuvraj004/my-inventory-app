const trackProduct = async (userId, productId, action) => {
    const response = await fetch('/api/users/track-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, productId, action }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to track product');
    }
  
    const data = await response.json();
    return data;
  };
export default trackProduct;  