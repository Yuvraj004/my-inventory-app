const reviewProduct = async (productId, vendorId, approve) => {
    const response = await fetch('/api/vendors/review-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, vendorId, approve }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to review product');
    }
  
    const data = await response.json();
    return data;
  };
export default reviewProduct;  