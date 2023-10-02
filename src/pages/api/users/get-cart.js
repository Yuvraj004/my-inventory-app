// pages/api/users/get-selected-products.js
import User from '../../../models/users';
import Product from '../../../models/products';

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const userId = req.body.userId; 
      const user = await User.findById(userId);
      const selectedProductIds = user.selectedProducts;

      // Fetch product information based on selectedProductIds
      const selectedProducts = await Product.find({ _id: { $in: selectedProductIds } });

      return res.status(200).json(selectedProducts);
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
};
