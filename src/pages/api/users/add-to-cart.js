import connectToDatabase from '../../../utils/db';
import User from '../../../models/user';

export default async (req, res) => {
  await connectToDatabase();

  if (req.method === 'GET') {
    try {
      const {productId,userId} = req.body.userId; 
      const user = await User.findById(userId);
      const selectedProducts = await user.selectedProducts.push({productId});
      return res.status(200).json(selectedProducts);
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
};
