import { useState } from 'react';

const OrderReview = () => {
  const [orderItems, setOrderItems] = useState([]);

  const handleSendOrder = () => {
    // Simulated API call to send order for review
    // This should interact with your backend API
    alert('Order sent for review!');
  };

  return (
    <div>
      <h2>Order Review</h2>
      {orderItems.map(item => (
        <div key={item._id}>
          <h3>{item.name}</h3>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
      <button onClick={handleSendOrder}>Send Order for Review</button>
    </div>
  );
};

export default OrderReview;
