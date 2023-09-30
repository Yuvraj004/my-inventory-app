import connectToDatabase from '../../../utils/db';
import Product from '../../../models/products';
import { authMiddleware } from '../../../utils/auth';

const removeProduct = authMiddleware(async (req, res) => {
  await connectToDatabase();

  if (req.method === 'DELETE') {
    const { id } = req.query;

    try {
      const removedProduct = await Product.findByIdAndRemove(id);

      if (!removedProduct) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }

      return res.status(200).json({ success: true, message: 'Product removed successfully' });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
});

export default removeProduct;
