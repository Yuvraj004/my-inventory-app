import connect from '../../../utils/db';
import Product from '../../../models/products';

const createProduct =  async (req, res) => {
  await connect();

  if (req.method === 'POST') {
    try {
      const newProduct = new Product(req.body);
      await newProduct.save();
      return res.status(201).json({ success: true, message: 'Product created successfully' });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
};

export default createProduct;