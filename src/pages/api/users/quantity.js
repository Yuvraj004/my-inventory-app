// pages/api/users/adjust-quantity.js

import connectToDatabase from '../../../utils/db';
import User from '../../../models/users';

export default async (req, res) => {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { userId, productId, quantity } = req.body;

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      const cartItem = user.temporaryCart.find(item => item.product.toString() === productId);

      if (cartItem) {
        // Update the quantity if product is found in the cart
        cartItem.quantity = quantity;
        await user.save();

        return res.status(200).json({ success: true, message: 'Quantity adjusted successfully' });
      } else {
        return res.status(404).json({ success: false, message: 'Product not found in cart' });
      }
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
};
