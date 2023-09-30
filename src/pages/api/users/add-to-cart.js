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

      const existingCartItem = user.temporaryCart.find(item => item.product.toString() === productId);

      if (existingCartItem) {
        // Update quantity if product is already in cart
        existingCartItem.quantity += quantity;
      } else {
        // Add new item to cart
        user.temporaryCart.push({ product: productId, quantity });
      }

      await user.save();

      return res.status(200).json({ success: true, message: 'Product added to cart successfully' });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
};
