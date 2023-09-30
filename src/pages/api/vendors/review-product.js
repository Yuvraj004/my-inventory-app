import connectToDatabase from '../../../utils/db';
import Product from '../../../models/products';

export default async (req, res) => {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { productId, vendorId, approve } = req.body;

    try {
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }

      // Update approval status and vendor who reviewed
      product.approved = approve;
      product.vendorReviewed = vendorId;
      await product.save();

      return res.status(200).json({ success: true, message: 'Product reviewed successfully' });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
};