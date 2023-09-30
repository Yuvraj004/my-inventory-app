// pages/api/users/remove-from-cart.js

import connectToDatabase from '../../../utils/db';
import User from '../../../models/users';

export default async (req, res) => {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { userId, productId } = req.body;

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      // Remove the product from the temporary cart
      user.temporaryCart = user.temporaryCart.filter(item => item.product.toString() !== productId);
      await user.save();

      return res.status(200).json({ success: true, message: 'Product removed from cart successfully' });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
};
