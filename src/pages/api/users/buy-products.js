import connectToDatabase from '../../../utils/db';
import User from '../../../models/users';

export default async (req, res) => {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { userId, products } = req.body;

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      // Add purchased products to the user's purchasedProducts array
      user.purchasedProducts.push(...products);
      await user.save();

      return res.status(200).json({ success: true, message: 'Products purchased successfully' });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
};
