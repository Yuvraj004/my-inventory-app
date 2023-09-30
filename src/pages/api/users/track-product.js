import connectToDatabase from '../../../utils/db';
import User from '../../../models/users';

export default async (req, res) => {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { userId, productId, action } = req.body;

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      if (action === 'track') {
        // Add product to tracked list
        user.trackedProducts.push(productId);
      } else if (action === 'untrack') {
        // Remove product from tracked list
        user.trackedProducts = user.trackedProducts.filter(id => id.toString() !== productId);
      }

      await user.save();

      return res.status(200).json({ success: true, message: 'Product tracked successfully' });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
};
