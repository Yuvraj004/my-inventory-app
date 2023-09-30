import connectToDatabase from '../../../utils/db';
import Product from '../../../models/products';
import { authMiddleware } from '../../../utils/auth';

const updateProduct = authMiddleware(async (req, res) => {
  await connectToDatabase();

  if (req.method === 'PUT') { // Using PUT method for updates
    const { id } = req.query; // Assuming the product ID is passed as a query parameter

    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        req.body, // Update with the request body
        { new: true } // Return the updated product
      );

      if (!updatedProduct) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }

      return res.status(200).json({ success: true, message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
});

export default updateProduct;
