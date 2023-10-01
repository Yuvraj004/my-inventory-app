import User from '../../../models/users';

export default async (req, res) => {

  if (req.method === 'POST') {
    try {
      const userId = req.body.userId; 
      const user = await User.findById(userId).populate('trackedProducts');
      const selectedProducts = user.selectedProducts;
      return res.status(200).json(selectedProducts);
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
};
