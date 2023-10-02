// vendorApi.js

// Function to get the list of products belonging to the vendor
export const getVendorProducts = async () => {
    const response = await fetch('/api/products/getP', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'authorization':`Bearer ${sessionStorage.getItem('token')}`,
        // Add any authentication headers if required
      },
    });
    const data = await response.json();
    // console.log(data);
    return data; // Assuming the response includes a 'products' property
  };
  
  // Function to create a new product
  export const createProduct = async (productData) => {
    const response = await fetch('/api/products/createP', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'authorization':`Bearer ${sessionStorage.getItem('token')}`,
        // Add any authentication headers if required
      },
      body: JSON.stringify(productData),
    });
    const data = await response.json();
    return data; // Assuming the response includes relevant information about the created product
  };
  
  // Function to delete a product
  export const deleteProduct = async (productId) => {
    const response = await fetch(`/api/products/removeP/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // 'authorization':`Bearer ${sessionStorage.getItem('token')}`,
        // Add any authentication headers if required
      },
    });
    const data = await response.json();
    return data; // Assuming the response includes relevant information about the deleted product
  };
  
  // Function to review a user-selected product
  export const reviewUserSelectedProduct = async (productId, approved) => {
    const response = await fetch(`/api/vendors/review-product/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization':`Bearer ${sessionStorage.getItem('token')}`,
        // Add any authentication headers if required
      },
      body: JSON.stringify({ approved:~approved }), // Assuming the API expects an 'approved' field
    });
    const data = await response.json();
    return data; // Assuming the response includes relevant information about the reviewed product
  };
  